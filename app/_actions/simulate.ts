'use server';

import { z } from 'zod';
import Groq from 'groq-sdk';
import { createClient, type SimulationResult } from '@/lib/supabase/server';

/**
 * Zod schema for simulation input validation
 */
const SimulationInputSchema = z.object({
    content: z.string()
        .min(10, 'Content must be at least 10 characters')
        .max(2000, 'Content must not exceed 2000 characters'),
});

/**
 * Zod schema for AI response validation
 */
const AIResponseSchema = z.object({
    score: z.number().min(0).max(100),
    reasoning: z.string(),
    category: z.string(),
});

/**
 * State type for the simulation form
 */
export interface SimulationState {
    success: boolean;
    error: string | null;
    data: SimulationResult | null;
}

/**
 * Server Action: Run viral content simulation using Groq AI
 * 
 * @param prevState - Previous form state
 * @param formData - Form data containing 'content' field
 * @returns SimulationState with success/error status and data
 */
export async function runSimulation(
    prevState: SimulationState | null,
    formData: FormData
): Promise<SimulationState> {
    try {
        // 1. Extract and validate input
        const rawContent = formData.get('content');

        const validationResult = SimulationInputSchema.safeParse({
            content: rawContent,
        });

        if (!validationResult.success) {
            const firstError = validationResult.error.issues[0];
            return {
                success: false,
                error: firstError?.message ?? 'Invalid input',
                data: null,
            };
        }

        const { content } = validationResult.data;

        // 2. Check for Groq API key
        const groqApiKey = process.env.GROQ_API_KEY;
        if (!groqApiKey) {
            return {
                success: false,
                error: 'AI service not configured. Please add GROQ_API_KEY to environment.',
                data: null,
            };
        }

        // 3. Initialize Groq client
        const groq = new Groq({
            apiKey: groqApiKey,
        });

        // 4. System prompt for viral analysis
        const systemPrompt = `You are an expert Viral Content Analyst with deep expertise in social media trends, engagement patterns, and audience psychology.

Analyze the provided content and evaluate its viral potential. Consider:
- Hook strength (first few words/seconds)
- Emotional resonance (joy, surprise, anger, fear, curiosity)
- Shareability factors
- Platform suitability
- Trend alignment
- Call-to-action effectiveness

Return ONLY valid JSON in this exact format, no other text:
{
  "score": <number 0-100>,
  "reasoning": "<detailed 2-3 sentence analysis>",
  "category": "<one of: Educational, Entertainment, Emotional, Controversial, Trending, Evergreen>"
}`;

        // 5. Call Groq API
        const completion = await groq.chat.completions.create({
            model: 'llama3-70b-8192',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Analyze this content for viral potential:\n\n${content}` },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const aiResponse = completion.choices[0]?.message?.content;

        if (!aiResponse) {
            return {
                success: false,
                error: 'AI returned empty response. Please try again.',
                data: null,
            };
        }

        // 6. Parse and validate AI response
        let parsedResponse: unknown;
        try {
            // Extract JSON from response (in case AI adds extra text)
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in response');
            }
            parsedResponse = JSON.parse(jsonMatch[0]);
        } catch {
            return {
                success: false,
                error: 'Failed to parse AI response. Please try again.',
                data: null,
            };
        }

        const resultValidation = AIResponseSchema.safeParse(parsedResponse);
        if (!resultValidation.success) {
            return {
                success: false,
                error: 'AI response format invalid. Please try again.',
                data: null,
            };
        }

        const result = resultValidation.data;

        // 7. Save to Supabase
        try {
            const supabase = await createClient();

            // Get current user (optional)
            const { data: { user } } = await supabase.auth.getUser();

            await supabase.from('simulations').insert({
                user_id: user?.id ?? null,
                input_content: content,
                result_json: result,
                score: result.score,
                category: result.category,
                model_used: 'llama3-70b-8192',
            });

            // Log to event stream
            await supabase.from('event_stream').insert({
                user_id: user?.id ?? null,
                event_type: 'simulation_completed',
                payload: {
                    score: result.score,
                    category: result.category,
                    content_length: content.length,
                },
            });
        } catch {
            // Don't fail the request if DB save fails
            // The user still gets their result
        }

        // 8. Return success
        return {
            success: true,
            error: null,
            data: result,
        };

    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        return {
            success: false,
            error: message,
            data: null,
        };
    }
}

'use server';

import { z } from 'zod';
import Groq from 'groq-sdk';

/**
 * Zod schema for improve input validation
 */
const ImproveInputSchema = z.object({
    content: z.string()
        .min(10, 'Content must be at least 10 characters')
        .max(2000, 'Content must not exceed 2000 characters'),
});

/**
 * Zod schema for AI variation response
 */
const VariationSchema = z.object({
    headline: z.string(),
    body: z.string(),
});

const AIVariationsSchema = z.array(VariationSchema);

/**
 * Variation type for type safety
 */
export interface ContentVariation {
    headline: string;
    body: string;
}

/**
 * State type for the improve form
 */
export interface ImproveState {
    success: boolean;
    error: string | null;
    variations: ContentVariation[] | null;
}

/**
 * Server Action: Generate viral variations of content using Groq AI
 * 
 * @param prevState - Previous form state
 * @param formData - Form data containing 'content' field
 * @returns ImproveState with success/error status and variations
 */
export async function improveContent(
    prevState: ImproveState | null,
    formData: FormData
): Promise<ImproveState> {
    try {
        // 1. Extract and validate input
        const rawContent = formData.get('content');

        const validationResult = ImproveInputSchema.safeParse({
            content: rawContent,
        });

        if (!validationResult.success) {
            const firstError = validationResult.error.issues[0];
            return {
                success: false,
                error: firstError?.message ?? 'Invalid input',
                variations: null,
            };
        }

        const { content } = validationResult.data;

        // 2. Check for Groq API key
        const groqApiKey = process.env.GROQ_API_KEY;
        if (!groqApiKey) {
            return {
                success: false,
                error: 'AI service not configured. Please add GROQ_API_KEY.',
                variations: null,
            };
        }

        // 3. Initialize Groq client
        const groq = new Groq({
            apiKey: groqApiKey,
        });

        // 4. System prompt for viral variations
        const systemPrompt = `You are a world-class copywriter and viral content expert.

Analyze the user's content and provide exactly 3 distinct, improved variations that are optimized for virality.

Each variation should:
1. Have a stronger hook in the first line
2. Use more emotional triggers
3. Include clearer call-to-actions
4. Be more shareable and engaging

Return ONLY a valid JSON array with exactly 3 objects, no other text or explanation:
[
  {"headline": "Short punchy hook (5-10 words)", "body": "Full improved content"},
  {"headline": "Different angle hook", "body": "Full improved content with different approach"},
  {"headline": "Third unique hook", "body": "Full improved content with third variation"}
]`;

        // 5. Call Groq API
        const completion = await groq.chat.completions.create({
            model: 'llama3-70b-8192',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Improve this content for maximum virality:\n\n${content}` },
            ],
            temperature: 0.8,
            max_tokens: 1500,
        });

        const aiResponse = completion.choices[0]?.message?.content;

        if (!aiResponse) {
            return {
                success: false,
                error: 'AI returned empty response. Please try again.',
                variations: null,
            };
        }

        // 6. Parse and validate AI response
        let parsedResponse: unknown;
        try {
            // Extract JSON array from response
            const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
                throw new Error('No JSON array found in response');
            }
            parsedResponse = JSON.parse(jsonMatch[0]);
        } catch {
            return {
                success: false,
                error: 'Failed to parse AI response. Please try again.',
                variations: null,
            };
        }

        const variationsValidation = AIVariationsSchema.safeParse(parsedResponse);
        if (!variationsValidation.success) {
            return {
                success: false,
                error: 'AI response format invalid. Please try again.',
                variations: null,
            };
        }

        // 7. Return success (NOT saving to database - premium feature later)
        return {
            success: true,
            error: null,
            variations: variationsValidation.data,
        };

    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        return {
            success: false,
            error: message,
            variations: null,
        };
    }
}

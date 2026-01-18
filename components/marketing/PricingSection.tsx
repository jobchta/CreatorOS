"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS, getPaymentLink, formatPrice, type BillingInterval, type PlanId } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

export function PricingSection() {
    const [interval, setInterval] = useState<BillingInterval>("monthly");
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            }
        };
        fetchUser();
    }, []);

    const getLink = (planId: PlanId, interval: BillingInterval) => {
        const baseUrl = getPaymentLink(planId, interval);
        if (userId) {
            // Append client_reference_id for Stripe to track the user
            const separator = baseUrl.includes('?') ? '&' : '?';
            return `${baseUrl}${separator}client_reference_id=${userId}`;
        }
        return baseUrl;
    };

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900" id="pricing">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Simple, transparent pricing
                    </h2>
                    <p className="max-w-[900px] text-slate-500 md:text-xl dark:text-slate-400">
                        Choose the plan that fits your growth stage. No hidden fees.
                    </p>
                </div>

                <div className="flex justify-center mt-8">
                    <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <button
                            onClick={() => setInterval("monthly")}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                interval === "monthly"
                                    ? "bg-white dark:bg-slate-950 shadow-sm text-slate-900 dark:text-slate-50"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setInterval("annual")}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                interval === "annual"
                                    ? "bg-white dark:bg-slate-950 shadow-sm text-slate-900 dark:text-slate-50"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                            )}
                        >
                            Annual <span className="text-xs text-green-500 font-bold ml-1">-20%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(PLANS).map(([key, plan]) => {
                        const planId = key as PlanId;
                        const price = interval === "monthly" ? plan.priceMonthly : plan.priceAnnual;
                        // @ts-ignore - 'popular' property exists in our enhanced PLANS object
                        const isPopular = plan.popular;

                        return (
                            <Card
                                key={planId}
                                className={cn(
                                    "flex flex-col relative",
                                    isPopular ? "border-blue-500 shadow-lg scale-105 z-10" : "border-slate-200 dark:border-slate-800"
                                )}
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-blue-500 px-3 py-1 text-center text-sm font-medium text-white">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">{formatPrice(price)}</span>
                                        <span className="text-slate-500 dark:text-slate-400">/{interval === 'monthly' ? 'mo' : 'yr'}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                <Check className="w-4 h-4 mr-2 text-green-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        variant={isPopular ? "default" : "outline"}
                                        asChild
                                    >
                                        <a href={getLink(planId, interval)} target="_blank" rel="noopener noreferrer">
                                            {interval === "monthly" ? "Subscribe Monthly" : "Subscribe Annually"}
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

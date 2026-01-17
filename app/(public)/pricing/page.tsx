'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, Sparkles, Zap, Crown, Building2, HelpCircle, ChevronDown, Loader2 } from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Handle checkout
  const handleCheckout = async (plan: string) => {
    if (plan === 'Free') {
      window.location.href = '/signup';
      return;
    }

    setLoadingPlan(plan);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: plan.toLowerCase(),
          interval: annual ? 'annual' : 'monthly',
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Checkout failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      priceAnnual: '$0',
      description: 'Essential tools to get started.',
      features: [
        'Rate Calculator',
        'Engagement Analyzer',
        'Best Time to Post',
        'Watermarked Media Kit',
        'Email Signature Generator',
        '5 AI Captions/day',
      ],
      cta: 'Get Started Free',
      highlighted: false,
      icon: Zap,
      color: 'slate'
    },
    {
      name: 'Creator',
      price: '$19',
      priceAnnual: '$15',
      period: '/month',
      description: 'For creators ready to monetize.',
      features: [
        'Everything in Free',
        'Unlimited Media Kits',
        'Premium Rate Reports',
        '10 Deal Pipeline Slots',
        'Invoice Generator',
        'Unlimited AI Captions',
      ],
      cta: 'Start Creator Plan',
      highlighted: false,
      icon: Sparkles,
      color: 'indigo'
    },
    {
      name: 'Pro',
      price: '$49',
      priceAnnual: '$39',
      period: '/month',
      description: 'The complete creator business OS.',
      features: [
        'Everything in Creator',
        'Unlimited Deals',
        'Digital Products (3% fee)',
        '5,000 Email Subscribers',
        'Priority Support',
        'API Access',
      ],
      cta: 'Go Pro',
      highlighted: true,
      icon: Crown,
      color: 'amber'
    },
    {
      name: 'Agency',
      price: '$199',
      priceAnnual: '$159',
      period: '/month',
      description: 'For teams managing creators.',
      features: [
        'Everything in Pro',
        '10 Creator Accounts',
        'White-label Options',
        'Unlimited Subscribers',
        '2% Product Fee',
        'Dedicated Success Manager',
      ],
      cta: 'Contact Sales',
      highlighted: false,
      icon: Building2,
      color: 'purple'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20">
      {/* Header */}
      <div className="pt-20 pb-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Simple, <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">transparent</span> pricing
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
          Start free, upgrade when you're ready. No hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-14 h-8 rounded-full transition-colors ${annual ? 'bg-amber-500' : 'bg-slate-700'
              }`}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${annual ? 'translate-x-6' : ''
                }`}
            />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-slate-500'}`}>
            Annual <span className="text-emerald-400 font-medium">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl p-6 transition-all ${tier.highlighted
                  ? 'bg-gradient-to-b from-amber-500/10 to-transparent ring-2 ring-amber-500/50 scale-[1.02]'
                  : 'bg-slate-900/50 ring-1 ring-white/10 hover:ring-white/20'
                }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Icon & Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${tier.color === 'slate' ? 'bg-slate-700' :
                    tier.color === 'indigo' ? 'bg-indigo-500/20' :
                      tier.color === 'amber' ? 'bg-amber-500/20' : 'bg-purple-500/20'
                  }`}>
                  <tier.icon className={`w-5 h-5 ${tier.color === 'slate' ? 'text-slate-300' :
                      tier.color === 'indigo' ? 'text-indigo-400' :
                        tier.color === 'amber' ? 'text-amber-400' : 'text-purple-400'
                    }`} />
                </div>
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              </div>

              <p className="text-sm text-slate-400 mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {annual ? tier.priceAnnual : tier.price}
                </span>
                {tier.period && <span className="text-slate-400">{tier.period}</span>}
                {annual && tier.price !== '$0' && (
                  <div className="text-xs text-emerald-400 mt-1">Billed annually</div>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleCheckout(tier.name)}
                disabled={loadingPlan === tier.name}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${tier.highlighted
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400'
                    : tier.name === 'Free'
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
              >
                {loadingPlan === tier.name ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  tier.cta
                )}
              </button>

              {/* Features */}
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Can I switch plans anytime?',
              a: 'Yes! You can upgrade, downgrade, or cancel anytime. Changes take effect on your next billing cycle.'
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, debit cards, and PayPal through our secure Stripe payment system.'
            },
            {
              q: 'Is there a free trial?',
              a: 'The Free plan is always free. For paid plans, we offer a 14-day money-back guarantee if you\'re not satisfied.'
            },
            {
              q: 'What happens if I cancel?',
              a: 'You\'ll keep access to your paid features until the end of your billing period. After that, you\'ll be moved to the Free plan.'
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className="group bg-slate-900/50 border border-slate-800 rounded-xl p-4"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-medium text-white">{faq.q}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-slate-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16 px-4">
        <p className="text-slate-400 mb-4">
          Questions? <Link href="/contact" className="text-amber-400 hover:underline">Contact our team</Link>
        </p>
      </div>
    </div>
  );
}

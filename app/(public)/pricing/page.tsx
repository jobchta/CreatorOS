'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, Sparkles, Zap, Crown, Building2, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      priceAnnual: '$0',
      description: 'Essential tools to get started.',
      features: {
        rateCalculator: true,
        engagementAnalyzer: true,
        bestTimeToPost: true,
        mediaKit: 'Watermarked',
        emailSignature: true,
        premiumRateReport: false,
        contentCalendar: false,
        dealPipeline: false,
        invoicing: false,
        aiCaptions: '5/day',
        hashtags: '5/day',
        linkInBio: 'Basic',
        digitalProducts: false,
        emailSubscribers: false,
        teamMembers: false,
        prioritySupport: false,
      },
      cta: 'Get Started Free',
      ctaLink: '/signup',
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
      features: {
        rateCalculator: true,
        engagementAnalyzer: true,
        bestTimeToPost: true,
        mediaKit: 'Unlimited',
        emailSignature: true,
        premiumRateReport: true,
        contentCalendar: true,
        dealPipeline: '10 deals',
        invoicing: true,
        aiCaptions: 'Unlimited',
        hashtags: 'Unlimited',
        linkInBio: 'Premium themes',
        digitalProducts: false,
        emailSubscribers: '500',
        teamMembers: false,
        prioritySupport: false,
      },
      cta: 'Start Creator Plan',
      ctaLink: '/signup?plan=creator',
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
      features: {
        rateCalculator: true,
        engagementAnalyzer: true,
        bestTimeToPost: true,
        mediaKit: 'Unlimited',
        emailSignature: true,
        premiumRateReport: true,
        contentCalendar: true,
        dealPipeline: 'Unlimited',
        invoicing: true,
        aiCaptions: 'Unlimited',
        hashtags: 'Unlimited',
        linkInBio: 'Custom domain',
        digitalProducts: '3% fee',
        emailSubscribers: '5,000',
        teamMembers: false,
        prioritySupport: true,
      },
      cta: 'Start Pro Plan',
      ctaLink: '/signup?plan=pro',
      highlighted: true,
      icon: Crown,
      color: 'amber'
    },
    {
      name: 'Agency',
      price: '$199',
      priceAnnual: '$159',
      period: '/month',
      description: 'For teams managing multiple creators.',
      features: {
        rateCalculator: true,
        engagementAnalyzer: true,
        bestTimeToPost: true,
        mediaKit: 'White-label',
        emailSignature: true,
        premiumRateReport: true,
        contentCalendar: true,
        dealPipeline: 'Unlimited',
        invoicing: true,
        aiCaptions: 'Unlimited',
        hashtags: 'Unlimited',
        linkInBio: 'White-label',
        digitalProducts: '2% fee',
        emailSubscribers: 'Unlimited',
        teamMembers: '10 creators',
        prioritySupport: true,
      },
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlighted: false,
      icon: Building2,
      color: 'purple'
    }
  ];

  const featureList = [
    { key: 'rateCalculator', name: 'Rate Calculator', category: 'Free Tools' },
    { key: 'engagementAnalyzer', name: 'Engagement Analyzer', category: 'Free Tools' },
    { key: 'bestTimeToPost', name: 'Best Time to Post', category: 'Free Tools' },
    { key: 'emailSignature', name: 'Email Signature Generator', category: 'Free Tools' },
    { key: 'mediaKit', name: 'Media Kit Generator', category: 'Core Features' },
    { key: 'premiumRateReport', name: 'Premium Rate Reports', category: 'Core Features' },
    { key: 'contentCalendar', name: 'Content Calendar', category: 'Core Features' },
    { key: 'dealPipeline', name: 'Deal Pipeline (CRM)', category: 'Core Features' },
    { key: 'invoicing', name: 'Invoice Generator', category: 'Core Features' },
    { key: 'aiCaptions', name: 'AI Caption Generator', category: 'AI Tools' },
    { key: 'hashtags', name: 'Hashtag Research', category: 'AI Tools' },
    { key: 'linkInBio', name: 'Link-in-Bio Page', category: 'Monetization' },
    { key: 'digitalProducts', name: 'Digital Product Sales', category: 'Monetization' },
    { key: 'emailSubscribers', name: 'Email Subscribers', category: 'Monetization' },
    { key: 'teamMembers', name: 'Team / Multi-creator', category: 'Advanced' },
    { key: 'prioritySupport', name: 'Priority Support', category: 'Advanced' },
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-emerald-400" />;
    }
    if (value === false) {
      return <X className="w-5 h-5 text-slate-600" />;
    }
    return <span className="text-sm text-white">{value}</span>;
  };

  return (
    <div className="bg-slate-950 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Simple, transparent pricing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Invest in your business,<br />
            <span className="text-gradient-vibrant">not just your content.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your stage of growth. Start free, upgrade when you're ready. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${annual ? 'left-8' : 'left-1'
                }`}
            />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-slate-400'}`}>
            Annual <span className="text-emerald-400 font-medium">(Save 20%)</span>
          </span>
        </div>

        {/* Pricing Cards - Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl p-6 lg:p-8 transition-all ${tier.highlighted
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

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${tier.color === 'slate' ? 'bg-slate-700' :
                    tier.color === 'indigo' ? 'bg-indigo-500/20' :
                      tier.color === 'amber' ? 'bg-amber-500/20' :
                        'bg-purple-500/20'
                  }`}>
                  <tier.icon className={`w-5 h-5 ${tier.color === 'slate' ? 'text-slate-300' :
                      tier.color === 'indigo' ? 'text-indigo-400' :
                        tier.color === 'amber' ? 'text-amber-400' :
                          'text-purple-400'
                    }`} />
                </div>
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              </div>

              <p className="text-sm text-slate-400 mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {annual ? tier.priceAnnual : tier.price}
                </span>
                {tier.period && (
                  <span className="text-slate-400">{tier.period}</span>
                )}
                {annual && tier.price !== '$0' && (
                  <div className="text-xs text-emerald-400 mt-1">
                    Billed annually
                  </div>
                )}
              </div>

              <Link
                href={tier.ctaLink}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-center transition-all ${tier.highlighted
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400'
                    : tier.name === 'Free'
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
              >
                {tier.cta}
              </Link>

              {/* Quick feature list */}
              <ul className="mt-6 space-y-3">
                {tier.name === 'Free' && (
                  <>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> All free tools
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> 5 AI captions/day
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Basic link-in-bio
                    </li>
                  </>
                )}
                {tier.name === 'Creator' && (
                  <>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Everything in Free
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Unlimited media kits
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Deal pipeline (10)
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Invoicing
                    </li>
                  </>
                )}
                {tier.name === 'Pro' && (
                  <>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Everything in Creator
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Unlimited deals
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Digital products (3%)
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> 5,000 email subs
                    </li>
                  </>
                )}
                {tier.name === 'Agency' && (
                  <>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Everything in Pro
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> 10 creator accounts
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> White-label options
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" /> Priority support
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table - Desktop */}
        <div className="hidden lg:block">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Compare all features</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                  {tiers.map((tier) => (
                    <th key={tier.name} className="text-center py-4 px-4">
                      <span className={`font-bold ${tier.highlighted ? 'text-amber-400' : 'text-white'}`}>
                        {tier.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureList.map((feature, index) => (
                  <tr
                    key={feature.key}
                    className={`border-b border-white/5 ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                  >
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-300">{feature.name}</span>
                    </td>
                    {tiers.map((tier) => (
                      <td key={tier.name} className="text-center py-4 px-4">
                        {renderFeatureValue(tier.features[feature.key as keyof typeof tier.features])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences."
              },
              {
                q: "Is there a free trial for paid plans?",
                a: "All paid plans come with a 14-day free trial. No credit card required to start."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and Apple Pay. For Agency plans, we also offer invoice billing."
              },
              {
                q: "Can I get a refund?",
                a: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-900/50 rounded-xl border border-white/5">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-400" />
                  {faq.q}
                </h3>
                <p className="text-slate-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
          >
            Contact our team
          </Link>
        </div>
      </div>
    </div>
  );
}

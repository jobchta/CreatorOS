import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Essential tools for new creators.',
      features: [
        '3 Tool uses per day',
        '7-day Analytics history',
        '1 Platform connection',
        'Basic Rate Calculator',
        'Engagement Analyzer'
      ],
      cta: 'Start for Free',
      highlighted: false
    },
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      description: 'For growing creators who need data.',
      features: [
        'Unlimited Tool uses',
        'All-time Analytics history',
        '1 Platform connection',
        'Advanced Rate Calculator',
        'Competitor Tracking (3)'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'The complete business operating system.',
      features: [
        'Everything in Starter',
        'Content Calendar',
        '3 Platform connections',
        'Export Reports (PDF)',
        'Idea Backlog'
      ],
      cta: 'Start Pro Trial',
      highlighted: true
    },
    {
      name: 'Business',
      price: '$39',
      period: '/month',
      description: 'For creators with brand deals.',
      features: [
        'Everything in Pro',
        'Brand Deal CRM',
        'Invoicing & Payments',
        'Team Access (3 users)',
        'Priority Support'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-500">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Invest in your business, not just your content.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-400">
          Choose the plan that fits your stage of growth. No hidden fees. Cancel anytime.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl p-8 ring-1 ring-white/10 xl:p-10 ${
                tier.highlighted ? 'bg-blue-600/10 ring-2 ring-blue-500' : 'bg-slate-900/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 id={tier.name} className="text-lg font-semibold leading-8 text-white">
                    {tier.name}
                  </h3>
                  {tier.highlighted && (
                    <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-400">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">{tier.price}</span>
                  {tier.period && <span className="text-sm font-semibold leading-6 text-slate-400">{tier.period}</span>}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-blue-500" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/signup"
                className={`mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.highlighted
                    ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600'
                    : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

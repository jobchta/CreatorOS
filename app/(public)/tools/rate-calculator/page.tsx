'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export default function RateCalculator() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  async function handleCalculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const platform = formData.get('platform') as string
    const followers = parseInt(formData.get('followers') as string)
    const engagement = parseFloat(formData.get('engagement') as string)

    // 1. Logic runs in the browser now
    let baseMultiplier = 10
    if (platform === 'YouTube') baseMultiplier = 20
    if (platform === 'TikTok') baseMultiplier = 5
    let engagementMultiplier = engagement > 3 ? 1.2 : 1
    const finalRate = Math.round((followers / 1000) * baseMultiplier * engagementMultiplier)

    setResult(finalRate)

    // 2. Save to Supabase (Client-Side Insert)
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { error } = await supabase.from('rate_calculations').insert({
        user_id: user.id,
        platform,
        followers,
        engagement_rate: engagement,
        estimated_min: finalRate * 0.8,
        estimated_max: finalRate * 1.2,
        calculated_at: new Date().toISOString()
      })
      if (error) console.error('Save failed:', error.message)
    }

    setLoading(false)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white/5 rounded-xl border border-white/10 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-white">Rate Calculator</h1>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label className="block text-sm mb-2 text-gray-300">Platform</label>
          <select name="platform" className="w-full bg-black/20 border border-white/10 rounded p-2 text-white">
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="YouTube">YouTube</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-300">Followers</label>
          <input type="number" name="followers" placeholder="10000" required className="w-full bg-black/20 border border-white/10 rounded p-2 text-white" />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-300">Engagement Rate (%)</label>
          <input type="number" name="engagement" placeholder="2.5" step="0.1" required className="w-full bg-black/20 border border-white/10 rounded p-2 text-white" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded transition-colors">
          {loading ? 'Calculating...' : 'Calculate Rate'}
        </button>
      </form>

      {result !== null && (
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
          <p className="text-sm text-gray-400">Estimated Rate</p>
          <p className="text-3xl font-bold text-emerald-400">${result}</p>
        </div>
      )}
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export default function Dashboard() {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('rate_calculations')
          .select('*')
          .order('calculated_at', { ascending: false })
          .limit(5)

        if (data) setHistory(data)
        if (error) console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>

      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Calculations</h2>
        {history.length === 0 ? (
          <p className="text-gray-400">No calculations found.</p>
        ) : (
          <div className="space-y-3">
            {history.map(item => (
              <div key={item.id} className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                <span>{item.platform} ({item.followers} followers)</span>
                <span className="font-bold text-emerald-400">
                  ${item.estimated_min || item.calculated_rate} - ${item.estimated_max}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import React from 'react'
import ModeSelector from '@/ModeSelector.jsx'
import QuickActionCard from '@/QuickActionCard.jsx'
import LoadingState from '@/components/ui/LoadingState.jsx'

function Pages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white p-6 space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-slate-300">Welcome to your Base44 sandbox</p>
          <h1 className="text-3xl font-semibold text-white">Component Playground</h1>
        </div>
        <ModeSelector />
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        <QuickActionCard />
        <QuickActionCard title="Security posture" description="Stay ahead of threats with proactive analysis." />
        <QuickActionCard title="Observability" description="Monitor, alert, and keep your services healthy." />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <LoadingState title="Loading analytics" description="Aggregating metrics across services..." />
        <LoadingState title="Refreshing cache" description="Syncing latest data snapshots..." />
        <LoadingState title="Starting workers" description="Booting up background processes..." />
      </section>
    </div>
  )
}

export default Pages

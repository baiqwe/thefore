'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Hammer, Calculator as CalculatorIcon, Trash2, Plus, AlertTriangle, Info, Zap, Skull, CheckCircle } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import oresData from '@/data/ores.json'

// Type Definitions
type Ore = typeof oresData[0]
interface AddedOre {
  id: string
  name: string
  count: number
}

const weaponThresholds = [
  { type: "Dagger", min: 1, max: 5, stats: "Very Fast / Low Dmg" },
  { type: "Katana / Rapier / SS", min: 6, max: 15, stats: "Fast / Medium Dmg" },
  { type: "Great Sword / Axe", min: 16, max: 29, stats: "Slow / High Dmg" },
  { type: "Colossal Sword", min: 30, max: 999, stats: "Very Slow / Extreme Dmg" }
];

export default function ForgingCalculatorPage() {
  const [targetType, setTargetType] = useState<string>(weaponThresholds[1].type)
  const [selectedOreName, setSelectedOreName] = useState<string>(oresData[0].name)
  const [amount, setAmount] = useState<number>(1)
  const [addedOres, setAddedOres] = useState<AddedOre[]>([])

  // Helper to find ore data
  const getOreData = (name: string) => oresData.find(o => o.name === name)

  // Add Ore Handler
  const handleAddOre = () => {
    if (amount <= 0) return;
    const existing = addedOres.find(o => o.name === selectedOreName)
    if (existing) {
      setAddedOres(addedOres.map(o => o.name === selectedOreName ? { ...o, count: o.count + amount } : o))
    } else {
      setAddedOres([...addedOres, { id: Math.random().toString(36).substr(2, 9), name: selectedOreName, count: amount }])
    }
  }

  // Remove Ore Handler
  const handleRemoveOre = (name: string) => {
    setAddedOres(addedOres.filter(o => o.name !== name))
  }

  // Calculations
  const stats = useMemo(() => {
    const totalCount = addedOres.reduce((sum, item) => sum + item.count, 0)

    // 1. Determine Actual Weapon Type
    let actualType = "None"
    let isMatch = false
    const match = weaponThresholds.find(t => totalCount >= t.min && totalCount <= t.max)

    if (totalCount > 0 && match) {
      actualType = match.type
    }

    const targetThreshold = weaponThresholds.find(t => t.type === targetType)
    if (targetThreshold && totalCount >= targetThreshold.min && totalCount <= targetThreshold.max) {
      isMatch = true
    }

    if (totalCount === 0) return { totalCount, actualType, multiplier: "0.000", activeTraits: [], warnings: [], isMatch, targetThreshold }

    // 2. Calculate Multiplier (Average)
    // Formula: Sum(Multiplier * Count) / TotalCount
    const totalMultiplierWeight = addedOres.reduce((sum, item) => {
      const ore = getOreData(item.name)
      return sum + ((ore?.multiplier || 0) * item.count)
    }, 0)
    const finalMultiplier = totalMultiplierWeight / totalCount

    // 3. Calculate Traits & Warnings
    const activeTraits: { name: string, source: string, percent: number }[] = []
    const warnings: { msg: string, level: 'low' | 'high' | 'critical' }[] = []

    // Eye Ore Check
    const eyeOre = addedOres.find(o => o.name === "Eye Ore")
    if (eyeOre) {
      if (eyeOre.count >= 10) {
        warnings.push({ msg: "INSTANT DEATH WARNING: 10+ Eye Ores = -100% HP. You will die instantly on spawn.", level: 'critical' })
      } else if (eyeOre.count >= 5) {
        warnings.push({ msg: `DANGER: -${eyeOre.count * 10}% Max HP. You are extremely fragile.`, level: 'high' })
      }
    }

    // Coal Check
    const coal = addedOres.find(o => o.name === "Coal")
    if (coal) {
      warnings.push({ msg: "Warning: Coal is a fuel source (0.4x) and will severely reduce your weapon stats.", level: 'low' })
    }

    // Trait Activation (10% Rule)
    addedOres.forEach(item => {
      const ore = getOreData(item.name)
      if (!ore?.trait) return;

      const percent = (item.count / totalCount) * 100
      if (percent >= 10) {
        activeTraits.push({
          name: ore.trait, // It's a string now
          source: ore.name,
          percent: percent
        })
      }
    })

    // Dilution Check
    const hasLowTier = addedOres.some(o => ["Stone", "Sandstone", "Copper"].includes(o.name))
    if (hasLowTier && finalMultiplier > 1.0) {
      // Only warn if we are trying to make something good
      warnings.push({ msg: "Efficiency Warning: Low tier ores are diluting your final multiplier.", level: 'low' })
    }

    return {
      totalCount,
      actualType,
      multiplier: finalMultiplier.toFixed(3),
      activeTraits,
      warnings,
      isMatch,
      targetThreshold
    }
  }, [addedOres, targetType])

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: 'Forging Calculator', url: '/tools/forging-calculator' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          The Forge Weapon Builder
        </h1>
        <p className="text-gray-700 text-lg">
          <strong>Deep Check Version (Winter 2025)</strong>: Plan your build with precision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-1 space-y-6">

          {/* Step 1: Target */}
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">1. Select Target Weapon</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                className="w-full p-2 border rounded-lg bg-white mb-2"
                value={targetType}
                onChange={(e) => setTargetType(e.target.value)}
              >
                {weaponThresholds.map(t => (
                  <option key={t.type} value={t.type}>{t.type}</option>
                ))}
              </select>
              <div className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                Requires: <strong>{weaponThresholds.find(t => t.type === targetType)?.min} - {weaponThresholds.find(t => t.type === targetType)?.max} Ores</strong>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Add Ores */}
          <Card className="border-t-4 border-t-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                2. Add Ores to Mix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Select Ore</label>
                <select
                  className="w-full p-2 border rounded-lg bg-white"
                  value={selectedOreName}
                  onChange={(e) => setSelectedOreName(e.target.value)}
                >
                  {oresData.map(ore => (
                    <option key={ore.name} value={ore.name}>
                      {ore.name} ({ore.multiplier}x)
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Count</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    className="w-20 p-2 border rounded-lg text-center"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  />
                  <Button onClick={handleAddOre} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold">
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Mix List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Mix ({stats.totalCount})</CardTitle>
            </CardHeader>
            <CardContent>
              {addedOres.length === 0 ? (
                <div className="text-center py-4 text-gray-400 text-sm">Empty</div>
              ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {addedOres.map(ore => (
                    <div key={ore.name} className="flex justify-between items-center p-2 bg-gray-50 rounded border text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{ore.count}x</span>
                        <span className={getOreData(ore.name)?.color}>{ore.name}</span>
                      </div>
                      <button onClick={() => handleRemoveOre(ore.name)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => setAddedOres([])} className="w-full text-red-600 text-xs">Clear All</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Banner */}
          <div className={`p-6 rounded-xl border-2 flex items-center justify-between ${stats.totalCount === 0 ? 'bg-gray-100 border-gray-300' :
              stats.isMatch ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
            }`}>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {stats.totalCount === 0 ? 'Start Building...' :
                  stats.isMatch ? 'Build Valid: Target Reached!' : 'Build Invalid: Ore Count Mismatch'}
              </h2>
              <p className="text-gray-600">
                Current: <strong>{stats.actualType}</strong> ({stats.totalCount} Ores)
                {!stats.isMatch && stats.totalCount > 0 && <span> (Need {stats.targetThreshold?.min}-{stats.targetThreshold?.max})</span>}
              </p>
            </div>
            {stats.isMatch && <CheckCircle className="h-10 w-10 text-green-500" />}
            {!stats.isMatch && stats.totalCount > 0 && <AlertTriangle className="h-10 w-10 text-red-400" />}
          </div>

          {/* Stats Card */}
          <Card className="bg-slate-900 text-white border-0 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CalculatorIcon className="h-32 w-32 text-white" />
            </div>
            <CardContent className="p-8 space-y-8">

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-gray-400 text-sm uppercase tracking-widest mb-1">Final Multiplier</div>
                  <div className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                    {stats.multiplier}x
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Average of all ore multipliers</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm uppercase tracking-widest mb-1">Weapon Type</div>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stats.actualType}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stats.totalCount} Ores inserted</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-purple-400 font-bold mb-4 uppercase tracking-wider text-sm">
                  <Zap className="h-4 w-4" /> Active Traits
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stats.activeTraits.length === 0 ? (
                    <div className="text-gray-500 italic text-sm">No traits active (Must be &gt;10% of mix)</div>
                  ) : (
                    stats.activeTraits.map((t, idx) => (
                      <div key={idx} className="bg-purple-900/40 border border-purple-500/30 p-3 rounded flex justify-between items-center">
                        <span className="text-purple-200 font-medium">{t.name}</span>
                        <span className="text-xs bg-purple-950 px-2 py-1 rounded text-purple-300">{t.percent.toFixed(0)}%</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Warnings Container */}
          <div className="space-y-3">
            {stats.warnings.map((w, i) => (
              <div key={i} className={`p-4 rounded-lg flex items-start gap-3 border ${w.level === 'critical' ? 'bg-red-950 border-red-600 text-red-100' :
                  w.level === 'high' ? 'bg-red-100 border-red-300 text-red-800' :
                    'bg-amber-50 border-amber-200 text-amber-800'
                }`}>
                {w.level === 'critical' ? <Skull className="h-6 w-6 shrink-0 animate-pulse text-red-500" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
                <div>
                  <span className="font-bold uppercase text-xs tracking-wider block mb-1">
                    {w.level === 'critical' ? 'CRITICAL ALERT' : w.level === 'high' ? 'HIGH DANGER' : 'WARNING'}
                  </span>
                  {w.msg}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'

export default function QuestTracker({ questId }: { questId: string }) {
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(`quest_${questId}`)
    if (saved) setCompleted(true)
  }, [questId])

  const toggle = () => {
    const newState = !completed
    setCompleted(newState)
    if (newState) {
      localStorage.setItem(`quest_${questId}`, 'true')
    } else {
      localStorage.removeItem(`quest_${questId}`)
    }
  }

  return (
    <button 
      onClick={toggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        completed 
          ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
      }`}
    >
      {completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
      {completed ? 'Completed' : 'Mark as Complete'}
    </button>
  )
}






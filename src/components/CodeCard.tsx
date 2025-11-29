"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CodeCardProps {
  code: string
  reward: string
  status: "Active" | "Expired"
}

export function CodeCard({ code, reward, status }: CodeCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant={status === "Active" ? "active" : "expired"}>
            {status}
          </Badge>
        </div>
        <div className="mb-4">
          <label className="text-sm font-semibold text-zinc-400 mb-2 block">
            Code:
          </label>
          <div className="bg-zinc-950 border-2 border-dashed border-zinc-700 rounded-lg p-4 flex items-center justify-between gap-4">
            <code className="text-lg font-bold text-amber-500 font-mono">
              {code}
            </code>
            <Button
              size="icon"
              variant="outline"
              onClick={handleCopy}
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-zinc-400 mb-1 block">
            Reward:
          </label>
          <p className="text-amber-500 font-semibold text-lg">{reward}</p>
        </div>
      </CardContent>
    </Card>
  )
}


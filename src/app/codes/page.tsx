import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import codesData from "@/data/codes.json"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CopyButton } from "@/components/CopyButton"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: `The Forge Codes - ${new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })}`,
  description: `Latest active codes for The Forge Roblox game. Get free gems, rerolls, and rewards!`,
  keywords: [
    "The Forge Codes",
    "The Forge Codes 2024",
    "Roblox The Forge Codes",
    "The Forge Redeem Codes",
    "The Forge Wiki",
    "The Forge Roblox",
  ],
}

export default function CodesPage() {
  const activeCodes = codesData.filter((code) => code.status === "Active")
  const expiredCodes = codesData.filter((code) => code.status === "Expired")

  // Schema markup for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I redeem codes in The Forge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open the game and click on the 'Codes' button in the main menu. Enter the code exactly as shown (case-sensitive) and click 'Redeem' to claim your rewards.",
        },
      },
      {
        "@type": "Question",
        name: "Are The Forge codes case-sensitive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, codes are case-sensitive. Make sure to enter them exactly as shown on this page.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-4 text-zinc-100">
            The Forge Codes -{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h1>
          <p className="text-zinc-400 text-lg">
            Use these codes in-game to get free rewards! Codes are updated
            regularly, so check back often.
          </p>
        </div>

        {/* How to Redeem */}
        <div className="bg-amber-950/30 border border-amber-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-400">
            How to Redeem Codes
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-amber-200">
            <li>Open The Forge game on Roblox</li>
            <li>Click on the &quot;Codes&quot; button in the main menu</li>
            <li>Enter the code exactly as shown below (case-sensitive)</li>
            <li>Click &quot;Redeem&quot; to claim your rewards</li>
            <li>Check your inventory for the items and gems</li>
          </ol>
        </div>

        {/* Active Codes Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-zinc-100">
            Active Codes ({activeCodes.length})
          </h2>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Reward</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeCodes.map((code, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono font-bold text-amber-500">
                      {code.code}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {code.reward}
                    </TableCell>
                    <TableCell>
                      <Badge variant="active">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <CopyButton text={code.code} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Expired Codes */}
        {expiredCodes.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-zinc-400">
              Expired Codes
            </h2>
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden opacity-60">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiredCodes.map((code, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-zinc-500">
                        {code.code}
                      </TableCell>
                      <TableCell className="text-zinc-500">
                        {code.reward}
                      </TableCell>
                      <TableCell>
                        <Badge variant="expired">Expired</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2 text-amber-400">💡 Tips</h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Codes are case-sensitive - enter them exactly as shown</li>
            <li>Each code can only be redeemed once per account</li>
            <li>Check back regularly for new codes</li>
            <li>Follow our social media for exclusive codes</li>
          </ul>
        </div>
      </div>
    </>
  )
}

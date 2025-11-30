import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import codesData from '@/data/codes.json'

export const metadata: Metadata = {
  title: 'Redeem Codes',
  description: `Latest redeem codes for ${siteConfig.name}. Get free coins, items, and rewards!`,
}

export default function CodesPage() {
  const activeCodes = codesData.filter((code) => code.status === 'Active')
  const expiredCodes = codesData.filter((code) => code.status === 'Expired')

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4">Redeem Codes</h1>
        <p className="text-gray-600 text-lg">
          Use these codes in-game to get free rewards! Codes are updated regularly, so check back often.
        </p>
      </div>

      {/* How to Redeem */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-3 text-blue-900">How to Redeem Codes</h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Open the game and click on the &quot;Codes&quot; button in the main menu</li>
          <li>Enter the code exactly as shown below (case-sensitive)</li>
          <li>Click &quot;Redeem&quot; to claim your rewards</li>
          <li>Check your inventory for the items and coins</li>
        </ol>
      </div>

      {/* Active Codes */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Active Codes ({activeCodes.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCodes.map((code, index) => (
            <div
              key={index}
              className="bg-white border-2 border-green-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                  ACTIVE
                </span>
                {code.expires !== 'Never' && (
                  <span className="text-xs text-gray-500">Expires: {code.expires}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-1 block">Code:</label>
                <div className="bg-gray-100 p-3 rounded font-mono text-lg font-bold text-center border-2 border-dashed border-gray-300">
                  {code.code}
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-1 block">Reward:</label>
                <p className="text-blue-600 font-semibold">{code.reward}</p>
              </div>
              <p className="text-sm text-gray-600">{code.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expired Codes (if any) */}
      {expiredCodes.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-400">Expired Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expiredCodes.map((code, index) => (
              <div
                key={index}
                className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6 opacity-60"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gray-300 text-gray-600 text-xs font-bold rounded-full">
                    EXPIRED
                  </span>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">Code:</label>
                  <div className="bg-gray-200 p-3 rounded font-mono text-lg font-bold text-center">
                    {code.code}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">Reward:</label>
                  <p className="text-gray-500 font-semibold">{code.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2 text-yellow-900">💡 Tips</h3>
        <ul className="list-disc list-inside space-y-1 text-yellow-800">
          <li>Codes are case-sensitive - enter them exactly as shown</li>
          <li>Each code can only be redeemed once per account</li>
          <li>Check back regularly for new codes</li>
          <li>Follow our social media for exclusive codes</li>
        </ul>
      </div>
    </div>
  )
}


import Link from 'next/link'

interface Item {
  slug: string
  name: string
  location: string
  type: string
  description: string
  stats: Record<string, string | undefined>
}

interface ItemTableProps {
  items: Item[]
}

export default function ItemTable({ items }: ItemTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rarity
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.slug} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/item/${item.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {item.name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {item.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {item.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {item.stats.rarity || 'Common'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


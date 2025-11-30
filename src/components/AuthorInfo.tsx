import { Card, CardContent } from "@/components/ui/card"

interface AuthorInfoProps {
  author: string
  authorBio?: string
  lastUpdated?: string
}

export function AuthorInfo({ author, authorBio, lastUpdated }: AuthorInfoProps) {
  return (
    <Card className="mt-8 border-amber-200 bg-amber-50">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-amber-700 mb-2">
              About the Author
            </h3>
            <p className="text-gray-800 font-medium">{author}</p>
            {authorBio && (
              <p className="text-gray-700 text-sm mt-2">{authorBio}</p>
            )}
          </div>
          {lastUpdated && (
            <div className="pt-3 border-t border-amber-200">
              <p className="text-xs text-gray-600">
                Last updated: {new Date(lastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
          <div className="pt-3 border-t border-amber-200">
            <p className="text-xs text-gray-600">
              This content is created by experienced players and tested in-game. 
              We verify all information through multiple playthroughs to ensure accuracy.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


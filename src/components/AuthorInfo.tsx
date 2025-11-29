import { Card, CardContent } from "@/components/ui/card"

interface AuthorInfoProps {
  author: string
  authorBio?: string
  lastUpdated?: string
}

export function AuthorInfo({ author, authorBio, lastUpdated }: AuthorInfoProps) {
  return (
    <Card className="mt-8 border-amber-800 bg-amber-950/20">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">
              About the Author
            </h3>
            <p className="text-zinc-300 font-medium">{author}</p>
            {authorBio && (
              <p className="text-zinc-400 text-sm mt-2">{authorBio}</p>
            )}
          </div>
          {lastUpdated && (
            <div className="pt-3 border-t border-zinc-800">
              <p className="text-xs text-zinc-500">
                Last updated: {new Date(lastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
          <div className="pt-3 border-t border-zinc-800">
            <p className="text-xs text-zinc-400">
              This content is created by experienced players and tested in-game. 
              We verify all information through multiple playthroughs to ensure accuracy.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


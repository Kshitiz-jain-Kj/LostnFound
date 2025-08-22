"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MapPin, Calendar } from "lucide-react"

interface SmartMatchesProps {
  currentItem?: any
  matches: any[]
  onContactMatch: (matchId: string) => void
}

export function SmartMatches({ currentItem, matches, onContactMatch }: SmartMatchesProps) {
  if (!matches.length) return null

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          Smart Matches Found!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          AI has found potential matches for your item based on description, location, and timing.
        </p>

        <div className="space-y-3">
          {matches.map((match) => (
            <div key={match.id} className="flex items-start gap-3 p-3 bg-background rounded-lg border">
              <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0">
                {match.images?.[0] ? (
                  <img
                    src={match.images[0] || "/placeholder.svg"}
                    alt={match.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-lg" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium truncate">{match.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{match.description}</p>
                  </div>
                  <Badge variant={match.type === "lost" ? "destructive" : "default"} className="flex-shrink-0">
                    {match.type}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {match.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {match.date}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {match.matchScore}% match
                  </Badge>
                </div>

                <Button size="sm" className="mt-2" onClick={() => onContactMatch(match.id)}>
                  Contact Owner
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

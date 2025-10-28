"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import data from "./mock-data"
import type { Blog } from "./types"

function getPriority(b: Blog): "high" | "medium" | "low" {
  if (b.priority) return b.priority
  if (b.tags?.includes("featured")) return "high"
  if (b.status === "published") return "medium"
  return "low"
}

export default function BlogsCards() {
  const items = data as Blog[]
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((b) => (
        <Card key={b.id}>
          <CardHeader className="gap-2">
            <CardTitle className="text-pretty">{b.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{b.status ?? "draft"}</Badge>
              <Badge variant="outline">{getPriority(b)}</Badge>
              {b.language ? <Badge variant="outline">{b.language}</Badge> : null}
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <div className="mb-2">
              {b.author ? <span>By {b.author}</span> : <span>Unknown author</span>}
              {b.publishDate ? (
                <span>
                  {" • "}
                  {new Date(b.publishDate).toLocaleDateString()}
                </span>
              ) : null}
              {typeof b.readTime === "number" ? (
                <span>
                  {" • "}
                  {b.readTime} min
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-1">
              {(b.tags ?? []).slice(0, 4).map((t) => (
                <Badge key={t} variant="outline">
                  #{t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react"
import type { Blog } from "./types"

type Props = {
  data: Blog[]
  selected: string[]
  onChangeSelected: (ids: string[]) => void
}

export function BlogsTable({ data, selected, onChangeSelected }: Props) {
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)

  const pageCount = Math.max(1, Math.ceil(data.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * pageSize
  const end = Math.min(start + pageSize, data.length)
  const paged = React.useMemo(() => data.slice(start, end), [data, start, end])

  const allSelected = paged.length > 0 && paged.every((d) => selected.includes(d.id))

  function toggleAll(checked: boolean) {
    if (checked) {
      const idsToAdd = paged.map((d) => d.id).filter((id) => !selected.includes(id))
      onChangeSelected([...selected, ...idsToAdd])
    } else {
      const idsToKeep = selected.filter((id) => !paged.some((d) => d.id === id))
      onChangeSelected(idsToKeep)
    }
  }

  function toggle(id: string, checked: boolean) {
    onChangeSelected(checked ? [...selected, id] : selected.filter((x) => x !== id))
  }

  function onEdit(id: string) {
    alert(`Edit blog ${id}`)
  }

  function onDelete(id: string) {
    alert(`Delete blog ${id}`)
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <span className="sr-only">Select all</span>
              <Checkbox
                checked={allSelected}
                onCheckedChange={(v) => toggleAll(Boolean(v))}
                aria-label="Select all rows on this page"
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="hidden sm:table-cell">Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="hidden md:table-cell">Language</TableHead>
            <TableHead className="hidden md:table-cell">Read time</TableHead>
            <TableHead className="hidden lg:table-cell">Published</TableHead>
            <TableHead className="hidden lg:table-cell text-left">Engagement</TableHead>
            <TableHead className="w-32 text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paged.map((row) => {
            const isChecked = selected.includes(row.id)
            return (
              <TableRow key={row.id} data-selected={isChecked ? "" : undefined}>
                <TableCell className="w-10">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => toggle(row.id, Boolean(v))}
                    aria-label={`Select row for ${row.title}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="max-w-[380px] text-pretty">{row.title}</div>
                </TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <PriorityBadge priority={row.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell className="space-x-1">
                  {row.tags.slice(0, 3).map((t) => (
                    <Badge key={t} variant="secondary" className="capitalize">
                      {t}
                    </Badge>
                  ))}
                  {row.tags.length > 3 ? <span className="text-muted-foreground">+{row.tags.length - 3}</span> : null}
                </TableCell>
                <TableCell className="hidden md:table-cell">{row.language?.toUpperCase() ?? "—"}</TableCell>
                <TableCell className="hidden md:table-cell">{row.readTime} min</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {row.publicationDate ? new Date(row.publicationDate).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-left">
                  {typeof row.views === "number" ? `${row.views.toLocaleString()} views` : "—"}
                  {typeof row.commentsCount === "number" ? (
                    <span className="text-muted-foreground">{` • ${row.commentsCount} comments`}</span>
                  ) : null}
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex justify-start gap-1">
                    <Button size="icon" variant="ghost" onClick={() => onEdit(row.id)} aria-label={`Edit ${row.title}`}>
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete(row.id)}
                      aria-label={`Delete ${row.title}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
          {paged.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center text-muted-foreground">
                No results. Try adjusting your filters.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 border-t p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              const next = Number(v)
              setPageSize(next)
              setPage(1)
            }}
          >
            <SelectTrigger className="h-8 w-[88px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              {[5, 10, 20, 50].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground" aria-live="polite">
            {data.length === 0 ? "0–0" : `${start + 1}–${end}`} of {data.length}
          </span>
        </div>

        <Pagination className="md:justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setPage((p) => Math.max(1, p - 1))
                }}
              />
            </PaginationItem>
            {renderPageItems(currentPage, pageCount, (p) => setPage(p))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setPage((p) => Math.min(pageCount, p + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

function renderPageItems(current: number, total: number, go: (p: number) => void) {
  const items: React.ReactNode[] = []
  const addLink = (p: number, isActive = false) =>
    items.push(
      <PaginationItem key={`p-${p}`}>
        <PaginationLink
          href="#"
          isActive={isActive}
          onClick={(e) => {
            e.preventDefault()
            go(p)
          }}
        >
          {p}
        </PaginationLink>
      </PaginationItem>,
    )

  const addEllipsis = (key: string) =>
    items.push(
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>,
    )

  if (total <= 7) {
    for (let p = 1; p <= total; p++) addLink(p, p === current)
  } else {
    addLink(1, current === 1)
    if (current <= 4) {
      addLink(2, current === 2)
      addLink(3, current === 3)
      addLink(4, current === 4)
      addEllipsis("e-right")
      addLink(total, current === total)
    } else if (current >= total - 3) {
      addEllipsis("e-left")
      addLink(total - 3, current === total - 3)
      addLink(total - 2, current === total - 2)
      addLink(total - 1, current === total - 1)
      addLink(total, current === total)
    } else {
      addEllipsis("e-left")
      addLink(current - 1, false)
      addLink(current, true)
      addLink(current + 1, false)
      addEllipsis("e-right")
      addLink(total, current === total)
    }
  }
  return items
}

function StatusBadge({ status }: { status: Blog["status"] }) {
  const map: Record<Blog["status"], { label: string; className?: string }> = {
    draft: { label: "Draft", className: "bg-muted text-foreground" },
    published: {
      label: "Published",
      className: "bg-[color:var(--color-chart-2)]/15 text-[color:var(--color-chart-2)]",
    },
    scheduled: {
      label: "Scheduled",
      className: "bg-[color:var(--color-chart-5)]/15 text-[color:var(--color-chart-5)]",
    },
  }
  return <Badge className={cn("capitalize", map[status].className)}>{map[status].label}</Badge>
}

function PriorityBadge({ priority }: { priority: Blog["priority"] }) {
  if (!priority) return <span className="text-muted-foreground">—</span>
  const map: Record<NonNullable<Blog["priority"]>, { label: string; className?: string }> = {
    high: { label: "High", className: "bg-red-500/15 text-red-600" },
    medium: { label: "Medium", className: "bg-amber-500/15 text-amber-600" },
    low: { label: "Low", className: "bg-emerald-500/15 text-emerald-600" },
  }
  return <Badge className={cn("capitalize", map[priority].className)}>{map[priority].label}</Badge>
}

export function BlogsCards({ data }: { data: Blog[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((b) => (
        <Card key={b.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{b.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <PriorityBadge priority={b.priority} />
              <StatusBadge status={b.status} />
              <span className="text-xs text-muted-foreground">{b.readTime} min</span>
            </div>
            <div className="text-sm text-muted-foreground">By {b.author}</div>
            <div className="flex flex-wrap gap-1">
              {b.tags.slice(0, 4).map((t) => (
                <Badge key={t} variant="secondary" className="capitalize">
                  {t}
                </Badge>
              ))}
              {b.tags.length > 4 ? <span className="text-muted-foreground">+{b.tags.length - 4}</span> : null}
            </div>
            <div className="text-sm">{b.publicationDate ? new Date(b.publicationDate).toLocaleDateString() : "—"}</div>
          </CardContent>
        </Card>
      ))}
      {data.length === 0 ? (
        <div className="col-span-full rounded-md border p-8 text-center text-muted-foreground">
          No results. Try adjusting your filters.
        </div>
      ) : null}
    </div>
  )
}

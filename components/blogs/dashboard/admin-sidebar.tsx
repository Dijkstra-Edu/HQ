"use client"
import { Button } from "@/components/ui/button"
import { BookOpen, Zap } from "lucide-react"

interface AdminSidebarProps {
  activeSection: "manual" | "auto-generated"
  onSectionChange: (section: "manual" | "auto-generated") => void
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <aside className="w-64 border-r bg-background p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold tracking-tight">Blog Management</h2>
        <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
      </div>

      <nav className="space-y-2">
        <Button
          variant={activeSection === "manual" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSectionChange("manual")}
        >
          <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
          Manual Blogs
        </Button>

        <Button
          variant={activeSection === "auto-generated" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSectionChange("auto-generated")}
        >
          <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
          Auto-Generated Blogs
        </Button>
      </nav>
    </aside>
  )
}

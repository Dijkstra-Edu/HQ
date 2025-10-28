"use client"

import * as React from "react"
import AdminDashboard from "@/components/blogs/dashboard/admin-dashboard"
import { AdminSidebar } from "@/components/blogs/dashboard/admin-sidebar"

export function AdminLayout() {
  const [activeSection, setActiveSection] = React.useState<"manual" | "auto-generated">("manual")

  return (
    <div className="flex h-screen">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 overflow-auto">
        <AdminDashboard section={activeSection} />
      </div>
    </div>
  )
}

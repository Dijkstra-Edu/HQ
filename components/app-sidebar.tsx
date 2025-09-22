"use client";

import * as React from "react";
import {
  IconCamera,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconSearch,
  IconSettings,
  IconBriefcase,
  IconFileText,
  IconHome,
  IconLayoutDashboard,
  IconSchool,
  IconTrophy,
  IconUsersGroup,
  IconDatabase,
  IconFileWord,
  IconReport,
  IconNotes,
  IconTargetArrow,
  IconUserCog,
  IconFidgetSpinner,
  IconHierarchy2,
  IconStars,
  IconUsers,
  IconBrandGithub,
  IconGitBranch,
  IconBellRinging,
  IconBuilding,
  IconBuildingSkyscraper,
  IconFileCertificate,
  IconFileInvoice,
  IconIdBadge2,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";

const data = {
  user: {
    name: "Jonathan Rufus Samuel",
    email: "jonathan.rufus.samuel@cern.ch",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: IconHome, // classic home icon
    }
  ],

  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/administration/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/administration/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/administration/search",
      icon: IconSearch,
    },
  ],
  administration: [
    {
      name: "Blog Administration",
      url: "/blog-administration",
      icon: IconNotes,
    },
    {
      name: "Post Administration",
      url: "/post-administration",
      icon: IconFileText,
    },
    {
      name: "User Administration",
      url: "/user-administration",
      icon: IconUserCog,
    },
    {
      name: "Learning Hub Administration",
      url: "/learning-hub-administration",
      icon: IconSchool,
    },
    {
      name: "Jira Administration",
      url: "/jira-administration",
      icon: IconFidgetSpinner,
    },
    {
      name: "Challenge Administration",
      url: "/challenge-administration",
      icon: IconTrophy,
    },
    {
      name: "Opportunity Administration",
      url: "/opportunity-administration",
      icon: IconTargetArrow,
    },
  ],
  users: [
    {
      name: "User List",
      url: "/user-list",
      icon: IconUsers,
    },
    {
      name: "Hierarchy",
      url: "/user-hierarchy",
      icon: IconHierarchy2,
    },
    {
      name: "Team Viewer",
      url: "/team-viewer",
      icon: IconUsersGroup,
    },
    {
      name: "Talent Pool",
      url: "/talent-pool",
      icon: IconStars,
    },
  ],
  monitoring: [
    {
      name: "DataForge",
      url: "/monitoring/dataforge",
      icon: IconDatabase,
    },
    {
      name: "GitRipper",
      url: "/monitoring/gitripper",
      icon: IconGitBranch,
    },
    {
      name: "Student Portal",
      url: "/monitoring/dijkstra-web",
      icon: IconSchool,
    },
    {
      name: "University Portal",
      url: "/monitoring/dijkstra-university-portal",
      icon: IconBuilding,
    },
    {
      name: "Company Portal",
      url: "/monitoring/dijkstra-company-portal",
      icon: IconBuildingSkyscraper,
    },
    {
      name: "Alerts & Notifications",
      url: "/monitoring/alerts",
      icon: IconBellRinging,
    },
  ],
  finances: [
    {
      name: "University Contracts",
      url: "/finances/university-contracts",
      icon: IconFileCertificate,
    },
    {
      name: "Company Contracts",
      url: "/finances/company-contracts",
      icon: IconFileInvoice,
    },
    {
      name: "Personnel Contracts",
      url: "/finances/personnel-contracts",
      icon: IconIdBadge2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    data.user.name = session.user.name || "No name";
    data.user.email = session.user.email || "No email";
    data.user.avatar = session.user.avatar_url || session.user.image || ""; // your extended avatar_url or fallback
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          {/* <SidebarMenuItem>
            <Link href="/" className="flex items-center gap-2">
              <img src="/icon.png" alt="Logo" className="h-12 w-auto" />
              <span className="text-base font-semibold">Dijkstra</span>
            </Link>
          </SidebarMenuItem> */}
          <SidebarMenuItem>
            <Link href="/" className="flex items-center gap-2">
              <img src="/icon.png" alt="Logo" className="h-12 w-auto" />

              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold">Dijkstra</span>
                <span className="text-xs text-gray-400">
                  HQ - Admin Console
                </span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments title="Administration" titleUrl="/administration" items={data.administration} />
        <NavDocuments title="User Management" titleUrl="/user-management" items={data.users} />
        <NavDocuments title="Monitoring" titleUrl="/monitoring" items={data.monitoring} />
        <NavDocuments title="Finances" titleUrl="/finances" items={data.finances} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

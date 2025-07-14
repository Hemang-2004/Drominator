"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Map, BarChart3, LogOut, X } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { WalmartLogo } from "@/components/walmart-logo"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    router.push("/")
  }

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: Map, label: "Map", href: "/dashboard/map" },
  ]

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false)
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
          <Link href="/" className="flex items-center">
            <WalmartLogo width={100} height={50} className="hover:opacity-80 transition-opacity" />
          </Link>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className={`w-full justify-start h-12 text-base font-syabil ${
                  pathname === item.href
                    ? "bg-[#0071ce] text-white hover:bg-[#004c91] shadow-lg"
                    : "text-gray-700 hover:bg-blue-50 hover:text-[#0071ce]"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start h-12 text-base font-syabil text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Burger Menu Button */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Full Page Content */}
        <main className="flex-1 p-4 bg-gray-50">
          <div className="max-w-full mx-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  )
}

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Re-use your sidebar links logic here or import it
const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "My Bio", href: "/dashboard/bio" },
  { name: "Deals CRM", href: "/dashboard/crm" },
  { name: "Analytics", href: "/dashboard/analytics" },
];

export function ResponsiveShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* MOBILE OVERLAY (Drawer) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-6 transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl font-bold">LogicLoom</h1>
              <button onClick={() => setMobileMenuOpen(false)}><X size={24}/></button>
            </div>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-300 hover:text-white"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-900 text-gray-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">LogicLoom</h1>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-1 flex-col md:pl-64 overflow-hidden">

        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center justify-between bg-white border-b p-4">
          <span className="font-bold text-lg">LogicLoom</span>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu />
          </Button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

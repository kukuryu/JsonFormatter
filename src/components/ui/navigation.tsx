"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "JSON Formatter", icon: "📄" },
    { href: "/html-formatter", label: "HTML Formatter", icon: "🌐" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                🛠️ Dev Tools
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={cn(
                    "flex items-center space-x-2",
                    pathname === item.href && "bg-slate-100 dark:bg-slate-700"
                  )}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
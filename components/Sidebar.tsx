'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Link2, Activity, CreditCard, Settings } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Connections', href: '/', icon: Link2 },
    { label: 'Usage & Quota', href: '/usage', icon: Activity },
    { label: 'Plan & Billing', href: '/billing', icon: CreditCard },
  ];

  return (
    <aside className="sidebar hidden md:flex flex-col p-6 h-full border-r border-[var(--border-inverse)]">
      <div className="font-bold text-xl mb-10 flex items-center gap-2">
        <div className="w-6 h-6 rounded-sm bg-[var(--color-volt)]"></div>
        Ads MCP
      </div>
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${
                isActive
                  ? 'bg-[var(--brand-primary)] text-black'
                  : 'text-white opacity-70 hover:opacity-100 hover:bg-[#2C3131]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-6 border-t border-[var(--border-inverse)]">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${
            pathname === '/settings'
              ? 'bg-[var(--brand-primary)] text-black'
              : 'text-white opacity-70 hover:opacity-100 hover:bg-[#2C3131]'
          }`}
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}

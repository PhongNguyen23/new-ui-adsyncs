'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { LogOut, Trash2, Key, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState('Katalon Marketing');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[var(--background-default)]">
        <header className="app-header flex items-center px-8 sticky top-0 z-10 w-full">
          <h1 className="heading-title">Settings</h1>
        </header>

        <div className="p-8 max-w-4xl mx-auto space-y-8 pb-20">
          
          {/* General Settings */}
          <section className="card p-8">
            <div className="border-b border-[var(--border-default)] pb-4 mb-6">
              <h2 className="heading-section">General</h2>
              <p className="text-muted text-sm mt-1">Manage your workspace and basic preferences.</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:items-center">
                <label className="font-semibold text-sm text-[var(--foreground-default)]">Email address</label>
                <div className="md:col-span-2">
                  <input 
                    type="email" 
                    className="input bg-[var(--background-surface-soft)] text-[var(--foreground-muted)] cursor-not-allowed" 
                    value="phong@company.com" 
                    disabled 
                  />
                  <p className="text-xs text-muted mt-2">Email is managed by your identity provider.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:items-center">
                <label className="font-semibold text-sm text-[var(--foreground-default)]">Workspace name</label>
                <div className="md:col-span-2">
                  <input 
                    type="text" 
                    className="input" 
                    value={workspaceName} 
                    onChange={e => setWorkspaceName(e.target.value)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:items-center">
                <label className="font-semibold text-sm text-[var(--foreground-default)]">Default currency</label>
                <div className="md:col-span-2">
                  <select 
                    className="select" 
                    value={currency} 
                    onChange={e => setCurrency(e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="VND">VND (₫)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:items-center">
                <label className="font-semibold text-sm text-[var(--foreground-default)]">Language</label>
                <div className="md:col-span-2">
                  <select 
                    className="select" 
                    value={language} 
                    onChange={e => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="vi">Tiếng Việt</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="button button-primary">Save changes</button>
            </div>
          </section>

          {/* Account Actions */}
          <section className="card p-8">
            <div className="border-b border-[var(--border-default)] pb-4 mb-6">
              <h2 className="heading-section text-[var(--foreground-default)] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[var(--foreground-muted)]" />
                Account Details
              </h2>
              <p className="text-muted text-sm mt-1">Manage your account security and sessions.</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-muted)] bg-[var(--background-surface-soft)]">
                <div>
                  <h3 className="font-semibold text-sm text-[var(--foreground-default)] mb-1">Password</h3>
                  <p className="text-xs text-muted">A secure password helps protect your MCP account.</p>
                </div>
                <button className="button button-outline shrink-0 bg-white">
                  <Key className="w-4 h-4" /> Change password
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-muted)] bg-[var(--background-surface-soft)]">
                <div>
                  <h3 className="font-semibold text-sm text-[var(--foreground-default)] mb-1">Sign Out</h3>
                  <p className="text-xs text-muted">Log out from this device.</p>
                </div>
                <button className="button button-outline shrink-0 bg-white text-[var(--foreground-default)]">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--danger-border)] bg-[var(--danger-bg)] mt-8">
                <div>
                  <h3 className="font-semibold text-sm text-[var(--danger-text)] mb-1">Delete Account</h3>
                  <p className="text-xs text-[var(--danger-text)] opacity-80">
                    Permanently remove your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <button className="button shrink-0 bg-[var(--danger-default)] text-white border border-[var(--danger-default)] hover:bg-[#C92A2E] transition-colors">
                  <Trash2 className="w-4 h-4" /> Delete account
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { 
  CreditCard,
  AlertTriangle,
  Download,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react';

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toLocaleString();
};

function ProgressBar({ 
  label, 
  current, 
  max 
}: { 
  label: string, 
  current: number, 
  max: number
}) {
  const percentage = Math.min(100, Math.round((current / max) * 100));
  const isNearLimit = percentage > 80;
  const barColor = isNearLimit ? 'bg-[var(--color-heat)]' : 'bg-[var(--color-volt)]';
  
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="font-semibold text-default text-[var(--foreground-default)]">{label}</span>
        <span className="text-small text-muted font-medium tracking-wide">
           <span className={`${isNearLimit ? 'text-[var(--color-heat)]' : 'text-[var(--foreground-default)]'}`}>
             {formatNumber(current)}
           </span> / {formatNumber(max)}
        </span>
      </div>
      <div className="w-full h-3 bg-[var(--background-surface-soft)] rounded-full overflow-hidden border border-[var(--border-muted)]">
        <div 
          className={`h-full ${barColor} rounded-full transition-all duration-500 will-change-[width]`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function BillingPage() {
  const invoices = [
    { date: "May 10, 2026", amount: "$19.00", status: "Paid" },
    { date: "Apr 10, 2026", amount: "$19.00", status: "Paid" },
    { date: "Mar 10, 2026", amount: "$19.00", status: "Paid" },
  ];

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[var(--background-default)]">
        <header className="app-header flex items-center px-8 sticky top-0 z-10 w-full">
          <h1 className="heading-title">Plan & Billing</h1>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8 pb-20">
          
          {/* 1. Current Plan Summary */}
          <section className="card p-6 border-l-4 border-l-[var(--brand-primary)] overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--brand-primary)] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold leading-tight">Starter Plan</h2>
                  <span className="badge badge-success px-2 py-0.5 text-xs font-bold tracking-wider uppercase border-none">Active</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 mt-6 text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-[var(--foreground-muted)] uppercase tracking-wider font-semibold text-xs">Billing cycle</span>
                    <span className="font-semibold text-base text-[var(--foreground-default)]">Monthly</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[var(--foreground-muted)] uppercase tracking-wider font-semibold text-xs">Renewal date</span>
                    <span className="font-semibold text-base text-[var(--foreground-default)]">Jun 10, 2026</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[var(--foreground-muted)] uppercase tracking-wider font-semibold text-xs">Workspace</span>
                    <span className="font-semibold text-base text-[var(--foreground-default)]">Katalon Marketing</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <button className="button button-outline font-semibold">Manage billing</button>
                <button className="button button-heat font-semibold shadow-sm">Upgrade to Pro</button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 2. Usage vs plan limits */}
            <section className="card p-6 flex flex-col">
              <h2 className="heading-section mb-6">Usage vs Limits</h2>
              
              <div className="bg-[var(--warning-bg)] border border-[var(--warning-border)] text-[var(--warning-text)] px-4 py-3 rounded-xl mb-8 flex items-start gap-3 shadow-sm">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-heat)]" />
                <div>
                  <p className="font-bold text-sm">You are close to your monthly MCP call limit.</p>
                  <p className="text-sm opacity-90 mt-0.5">Upgrade to Pro to avoid interruptions.</p>
                </div>
              </div>

              <div className="space-y-7 flex-1">
                <ProgressBar label="MCP calls" current={4200} max={5000} />
                <ProgressBar label="Connected ad accounts" current={8} max={10} />
                <ProgressBar label="Connected platforms" current={2} max={3} />
                <ProgressBar label="Monthly rows queried" current={820000} max={1000000} />
                <ProgressBar label="Sheets exports" current={42} max={50} />
                <ProgressBar label="Team members" current={2} max={3} />
              </div>
            </section>

            <div className="space-y-8 flex flex-col">
              {/* 5. Billing details */}
              <section className="card p-6">
                <h2 className="heading-section mb-6">Billing Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="card-soft p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Payment method</span>
                    </div>
                    <span className="font-semibold text-sm">Visa ending in 4242</span>
                  </div>
                  
                  <div className="card-soft p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Billing email</span>
                    </div>
                    <span className="font-semibold text-sm truncate" title="phong@company.com">phong@company.com</span>
                  </div>

                  <div className="card-soft p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Plan frequency</span>
                    </div>
                    <span className="font-semibold text-sm">Monthly</span>
                  </div>

                  <div className="card-soft p-4 flex flex-col gap-2 bg-[var(--brand-primary-soft)] border-[var(--success-border)]">
                    <div className="flex items-center gap-2 text-[var(--success-text)]">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Next invoice</span>
                    </div>
                    <span className="font-bold text-sm text-[var(--success-text)]">Jun 10, 2026 — $19.00</span>
                  </div>
                </div>
              </section>

              {/* 6. Invoice history */}
              <section className="card flex-1 flex flex-col">
                <div className="p-6 pb-2 border-b border-[var(--border-default)]">
                  <h2 className="heading-section">Invoice History</h2>
                </div>
                <div className="overflow-x-auto flex-1">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th className="font-semibold py-3">Date</th>
                        <th className="font-semibold py-3">Amount</th>
                        <th className="font-semibold py-3">Status</th>
                        <th className="font-semibold py-3 text-right">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice, idx) => (
                        <tr key={idx} className="hover:bg-[var(--background-surface-soft)] transition-colors">
                          <td className="py-3 px-3 font-medium text-[var(--foreground-default)] text-sm">{invoice.date}</td>
                          <td className="py-3 px-3 font-mono text-sm">{invoice.amount}</td>
                          <td className="py-3 px-3">
                            <span className="badge badge-success text-[10px] uppercase tracking-wider">{invoice.status}</span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button className="text-[var(--brand-primary-active)] hover:text-[var(--brand-primary-hover)] flex items-center gap-1 ml-auto text-sm font-semibold transition-colors">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>

          {/* 3. Plan comparison table */}
          <section>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="heading-section">Plan Comparison</h2>
            </div>
            
            <div className="card overflow-x-auto rounded-2xl">
              <table className="table w-full text-center text-sm md:text-base border-hidden">
                <thead className="bg-[#FAF9F6]">
                  <tr>
                    <th className="text-left py-5 px-6 w-1/4 font-semibold text-[var(--foreground-default)] border-r border-[var(--border-default)] align-bottom">
                      Feature
                    </th>
                    <th className="py-5 px-6 w-1/4 border-r border-[var(--border-default)] align-bottom">
                      <div className="font-bold text-[var(--foreground-default)] text-xl mb-2">Starter</div>
                      <div className="badge border-gray-300 bg-white text-gray-500 font-bold uppercase tracking-wider text-[10px]">Current plan</div>
                    </th>
                    <th className="pt-3 pb-5 px-6 w-1/4 relative border-r border-[var(--border-default)] bg-[#FDFDF9] align-bottom">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-[var(--brand-primary)]"></div>
                      <div className="flex justify-center mb-3">
                        <span className="bg-[var(--brand-primary)] text-black text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                          Recommended
                        </span>
                      </div>
                      <div className="font-bold text-[var(--foreground-default)] text-xl mb-2">Pro</div>
                      <div className="badge bg-[var(--brand-primary-soft)] text-[#354500] border-[#D7F25A] font-bold uppercase tracking-wider text-[10px]">Best value</div>
                    </th>
                    <th className="py-5 px-6 w-1/4 align-bottom">
                      <div className="font-bold text-[var(--foreground-default)] text-xl mb-2">Business</div>
                      <div className="h-6"></div> {/* Spacer for aligning with badges */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left py-4 px-6 font-semibold text-[var(--foreground-default)] border-r border-[var(--border-default)]">Price</td>
                    <td className="py-4 px-6 font-bold text-xl border-r border-[var(--border-default)]">$7<span className="text-muted text-sm font-medium">/mo</span></td>
                    <td className="py-4 px-6 font-bold text-xl border-r border-[var(--border-default)] bg-[#FDFDF9]">$19<span className="text-muted text-sm font-medium">/mo</span></td>
                    <td className="py-4 px-6 font-bold text-xl">$39<span className="text-muted text-sm font-medium">/mo</span></td>
                  </tr>
                  <tr>
                    <td className="text-left py-4 px-6 font-medium border-r border-[var(--border-default)]">MCP calls/month</td>
                    <td className="py-4 px-6 font-medium border-r border-[var(--border-default)]">5,000</td>
                    <td className="py-4 px-6 bg-[#FDFDF9] font-bold border-r border-[var(--border-default)] text-[var(--brand-primary-active)]">25,000</td>
                    <td className="py-4 px-6 font-medium">100,000</td>
                  </tr>
                  <tr>
                    <td className="text-left py-4 px-6 font-medium border-r border-[var(--border-default)]">Rows queried/month</td>
                    <td className="py-4 px-6 font-medium border-r border-[var(--border-default)]">1M</td>
                    <td className="py-4 px-6 bg-[#FDFDF9] font-bold border-r border-[var(--border-default)] text-[var(--brand-primary-active)]">5M</td>
                    <td className="py-4 px-6 font-medium">20M</td>
                  </tr>
                  <tr className="bg-[#FAF9F6] border-t border-[var(--border-default)] object-bottom">
                    <td className="text-left py-5 px-6 border-b-0 border-r border-[var(--border-default)]"></td>
                    <td className="py-5 px-6 border-b-0 border-r border-[var(--border-default)]">
                      <button className="button button-outline w-full bg-white opacity-50 cursor-not-allowed hidden sm:flex">Current</button>
                    </td>
                    <td className="py-5 px-6 border-b-0 border-r border-[var(--border-default)] bg-[#FDFDF9]">
                      <button className="button button-heat w-full shadow-sm">Upgrade</button>
                    </td>
                    <td className="py-5 px-6 border-b-0">
                      <button className="button button-black w-full shadow-sm">Upgrade</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

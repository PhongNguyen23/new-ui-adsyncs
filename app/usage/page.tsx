'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Filter, Calendar } from 'lucide-react';

const platformUsageData = [
  { name: 'Google Ads', calls: 680, color: '#EA4335' },
  { name: 'Meta Ads', calls: 420, color: '#1877F2' },
  { name: 'LinkedIn Ads', calls: 130, color: '#0A66C2' },
  { name: 'TikTok Ads', calls: 54, color: '#000000' },
];

const sessions = [
  { id: 1, client: 'Claude Desktop', user: 'Phong', calls: 24, platforms: 'Google Ads, Meta', lastActivity: '12 min ago', status: 'Active' },
  { id: 2, client: 'ChatGPT', user: 'Phong', calls: 18, platforms: 'Google Ads', lastActivity: '1 hour ago', status: 'Completed' },
  { id: 3, client: 'Cursor', user: 'Sanh', calls: 6, platforms: 'LinkedIn Ads', lastActivity: 'Yesterday', status: 'Completed' },
];

export default function UsagePage() {
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [platformFilter, setPlatformFilter] = useState('All Platforms');

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[var(--background-default)]">
        <header className="app-header flex items-center px-8 sticky top-0 z-10 w-full justify-between">
          <h1 className="heading-title">Usage & Quota</h1>
          <div className="flex gap-4">
             <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
               <select 
                 className="select pl-9" 
                 value={timeFilter} 
                 onChange={e => setTimeFilter(e.target.value)}
               >
                 <option>This Month</option>
                 <option>Last 7 Days</option>
                 <option>Today</option>
               </select>
             </div>
             <div className="relative">
               <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
               <select 
                 className="select pl-9"
                 value={platformFilter}
                 onChange={e => setPlatformFilter(e.target.value)}
               >
                 <option>All Platforms</option>
                 <option>Google Ads</option>
                 <option>Meta Ads</option>
                 <option>LinkedIn Ads</option>
                 <option>TikTok Ads</option>
               </select>
             </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          
          {/* 1. Usage Summary */}
          <section>
            <h2 className="heading-section mb-4">Usage Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card p-5">
                <p className="text-muted text-small mb-1 font-semibold uppercase tracking-wider">Tool Calls</p>
                <div className="text-3xl font-bold">1,284 <span className="text-muted text-lg font-normal">/ 5,000</span></div>
              </div>
              <div className="card p-5">
                <p className="text-muted text-small mb-1 font-semibold uppercase tracking-wider">Ad Accounts</p>
                <div className="text-3xl font-bold">8 <span className="text-muted text-lg font-normal">connected</span></div>
              </div>
              <div className="card p-5">
                <p className="text-muted text-small mb-1 font-semibold uppercase tracking-wider">Read Requests</p>
                <div className="text-3xl font-bold">240,000</div>
              </div>
              <div className="card p-5">
                <p className="text-muted text-small mb-1 font-semibold uppercase tracking-wider">Write Actions</p>
                <div className="text-3xl font-bold">3</div>
              </div>
            </div>
          </section>

          {/* 2. Plan Limit & Quota */}
          <section className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-section">Plan Limit & Quota</h2>
              <span className="badge badge-primary px-3 py-1 text-sm">Current Plan: Starter</span>
            </div>
            
            <div className="space-y-6">
              <ProgressBar label="Monthly MCP calls" current={1284} max={5000} format="number" />
              <ProgressBar label="Connected platforms" current={2} max={3} format="number" />
              <ProgressBar label="Connected ad accounts" current={8} max={10} format="number" />
              <ProgressBar label="Tool call (concurrency)" current={12} max={50} format="number" />
            </div>
          </section>

          {/* 3. Usage by platform & 4. Usage by tool */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="card p-6">
              <h2 className="heading-subsection mb-6">Platform Usage (Calls)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformUsageData}
                      dataKey="calls"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {platformUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value} calls`, 'Usage']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {platformUsageData.map(p => (
                  <div key={p.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
                    <span className="text-sm font-medium">{p.name} <span className="text-muted">({p.calls})</span></span>
                  </div>
                ))}
              </div>
            </section>

            <section className="card p-6">
              <h2 className="heading-subsection mb-6">Usage by Operation</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'get_campaigns', calls: 860 },
                      { name: 'get_metrics', calls: 320 },
                      { name: 'create_ad', calls: 3 },
                      { name: 'update_budget', calls: 101 },
                    ]}
                    layout="vertical"
                    margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-muted)" />
                    <XAxis type="number" stroke="var(--foreground-muted)" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="var(--foreground-muted)" fontSize={12} width={100} />
                    <Tooltip 
                      cursor={{fill: 'var(--background-surface-soft)'}}
                      contentStyle={{ borderRadius: '8px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}
                    />
                    <Bar dataKey="calls" fill="var(--brand-primary)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* 5. Recent MCP Sessions */}
          <section>
             <h2 className="heading-section mb-4">Recent MCP Sessions</h2>
             <div className="card overflow-x-auto">
               <table className="table">
                 <thead>
                   <tr>
                     <th>Client</th>
                     <th>User</th>
                     <th>Calls</th>
                     <th>Platforms Touched</th>
                     <th>Last Activity</th>
                     <th>Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {sessions.map(session => (
                     <tr key={session.id}>
                       <td className="font-medium text-[var(--foreground-default)]">{session.client}</td>
                       <td>{session.user}</td>
                       <td className="font-mono text-sm">{session.calls}</td>
                       <td>
                         <div className="flex gap-1 flex-wrap">
                           {session.platforms.split(', ').map(p => (
                             <span key={p} className="badge bg-white">{p}</span>
                           ))}
                         </div>
                       </td>
                       <td className="text-muted">{session.lastActivity}</td>
                       <td>
                         {session.status === 'Active' ? (
                           <span className="badge badge-success">{session.status}</span>
                         ) : (
                           <span className="badge text-muted">{session.status}</span>
                         )}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </section>

        </div>
      </main>
    </div>
  );
}

function ProgressBar({ 
  label, 
  current, 
  max, 
  format 
}: { 
  label: string, 
  current: number, 
  max: number, 
  format: 'number' | 'percent' 
}) {
  const percentage = Math.min(100, Math.round((current / max) * 100));
  const isNearLimit = percentage > 85;
  const barColor = isNearLimit ? 'bg-[var(--color-heat)]' : 'bg-[var(--color-volt)]';
  
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="font-semibold text-default">{label}</span>
        <span className="text-small text-muted font-medium">
           <span className={`${isNearLimit ? 'text-[var(--color-heat)]' : 'text-[var(--foreground-default)]'}`}>
             {current.toLocaleString()}
           </span> / {max.toLocaleString()}
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

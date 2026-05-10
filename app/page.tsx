'use client';

import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  Linkedin, 
  Globe, 
  Video, 
  Plus, 
  X, 
  Trash2, 
  AlertCircle,
  Link2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '@/components/Sidebar';

type AdAccount = {
  id: string;
  name: string;
  connectedAt: string;
  authMethod?: string;
};

type AuthMethod = {
  id: string;
  name: string;
};

type Connector = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  accounts: AdAccount[];
  authMethods?: AuthMethod[];
};

const INITIAL_CONNECTORS: Connector[] = [
  {
    id: 'google_ads',
    name: 'Google Ads',
    description: 'Connect your Google Ads to sync campaigns and performance data directly into your workflow.',
    icon: Search,
    accounts: [
      { id: 'g-1', name: 'Primary Google Ads', connectedAt: '2025-10-12T08:30:00Z' },
      { id: 'g-2', name: 'Client X Account', connectedAt: '2025-11-01T14:20:00Z' }
    ]
  },
  {
    id: 'meta_ads',
    name: 'Meta Ads',
    description: 'Sync your Facebook and Instagram ad accounts to monitor creative performance and spend.',
    icon: Megaphone,
    accounts: [
      { id: 'm-1', name: 'Personal FB Ads', connectedAt: '2025-12-05T09:15:00Z' }
    ]
  },
  {
    id: 'linkedin_ads',
    name: 'LinkedIn Ads',
    description: 'Manage B2B advertising campaigns and sync professional audience metrics from LinkedIn.',
    icon: Linkedin,
    accounts: []
  },
  {
    id: 'bing_ads',
    name: 'Bing Ads',
    description: 'Connect Microsoft Advertising accounts to expand your search network insights.',
    icon: Globe,
    accounts: [],
    authMethods: [
      { id: 'microsoft', name: 'Microsoft' },
      { id: 'google', name: 'Google' }
    ]
  },
  {
    id: 'tiktok_ads',
    name: 'TikTok Ads',
    description: 'Import your TikTok ad performance data to track viral campaigns.',
    icon: Video,
    accounts: [
       { id: 't-1', name: 'Viral Campaign TikTok', connectedAt: '2026-01-10T10:00:00Z' }
    ]
  }
];

export default function ConnectionsPage() {
  const [connectors, setConnectors] = useState<Connector[]>(INITIAL_CONNECTORS);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);

  const handleDisconnect = (connectorId: string, accountId: string) => {
    setConnectors(prev => prev.map(c => {
      if (c.id === connectorId) {
        return { ...c, accounts: c.accounts.filter(a => a.id !== accountId) };
      }
      return c;
    }));
    
    if (selectedConnector && selectedConnector.id === connectorId) {
      setSelectedConnector(prev => prev ? {
        ...prev,
        accounts: prev.accounts.filter(a => a.id !== accountId)
      } : null);
    }
  };

  const handleConnectRequest = (connectorId: string, methodId?: string) => {
    const connector = connectors.find(c => c.id === connectorId);
    if (!connector) return;
    
    const viaMethod = methodId ? ` via ${connector.authMethods?.find(m => m.id === methodId)?.name}` : '';
    alert(`Redirecting to ${connector.name} login page${viaMethod}...`);
  };

  const handleCardConnectClick = (connector: Connector) => {
    if (connector.authMethods && connector.authMethods.length > 1) {
      setSelectedConnector(connector);
    } else {
      handleConnectRequest(connector.id);
    }
  };

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[var(--background-default)]">
        <header className="app-header flex items-center px-8 sticky top-0 z-10 w-full">
           <h1 className="heading-title">Connections</h1>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <div className="mb-8">
             <h2 className="heading-section mb-2">Ad Platform Integrations</h2>
             <p className="text-muted">Connect your advertising accounts to start syncing data with MCP.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectors.map(connector => (
              <ConnectorCard 
                key={connector.id} 
                connector={connector} 
                onDetail={() => setSelectedConnector(connector)}
                onConnect={() => handleCardConnectClick(connector)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Detal Modal */}
      <AnimatePresence>
        {selectedConnector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
               onClick={() => setSelectedConnector(null)} 
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="dialog relative w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 border-b border-[var(--border-default)] flex items-center justify-between bg-white z-10">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[var(--background-surface-soft)] text-[var(--foreground-default)]">
                     <selectedConnector.icon className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="heading-section m-0 leading-none mb-1">{selectedConnector.name}</h3>
                     <p className="text-muted text-small">{selectedConnector.accounts.length} account{selectedConnector.accounts.length !== 1 ? 's' : ''} connected</p>
                   </div>
                 </div>
                 <button 
                  className="p-2 hover:bg-[var(--background-surface-soft)] rounded-full transition" 
                  onClick={() => setSelectedConnector(null)}
                  aria-label="Close dialog"
                 >
                   <X className="w-5 h-5 text-[var(--foreground-muted)]" />
                 </button>
              </div>

              <div className="p-6 overflow-y-auto bg-[var(--background-canvas)] flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                   <h4 className="heading-subsection">Connected Accounts</h4>
                   
                   {/* Connect Header Buttons */}
                   {selectedConnector.authMethods && selectedConnector.authMethods.length > 0 ? (
                     <div className="flex flex-wrap gap-2">
                       {selectedConnector.authMethods.map(method => (
                         <button 
                           key={method.id} 
                           className="button button-primary text-xs h-8 px-3" 
                           onClick={() => handleConnectRequest(selectedConnector.id, method.id)}
                         >
                           <Plus className="w-3 h-3" /> Connect via {method.name}
                         </button>
                       ))}
                     </div>
                   ) : (
                     <button className="button button-primary h-9 px-4" onClick={() => handleConnectRequest(selectedConnector.id)}>
                       <Plus className="w-4 h-4" /> Connect New
                     </button>
                   )}
                </div>

                {selectedConnector.accounts.length === 0 ? (
                  <div className="text-center py-12 border border-[var(--border-default)] border-dashed rounded-xl bg-white shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[var(--background-surface-soft)] flex items-center justify-center mx-auto mb-4">
                      <Link2 className="w-8 h-8 text-[var(--foreground-muted)]" />
                    </div>
                    <p className="text-default font-semibold text-[var(--foreground-default)]">No accounts connected</p>
                    <p className="text-muted text-small mt-1 mb-6 max-w-sm mx-auto">Connect your workspace to start importing campaigns from {selectedConnector.name}.</p>
                    
                    {/* Connect Empty State Buttons */}
                    {selectedConnector.authMethods && selectedConnector.authMethods.length > 0 ? (
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        {selectedConnector.authMethods.map(method => (
                          <button 
                            key={method.id} 
                            className="button button-black" 
                            onClick={() => handleConnectRequest(selectedConnector.id, method.id)}
                          >
                            Connect via {method.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button className="button button-black" onClick={() => handleConnectRequest(selectedConnector.id)}>
                        Connect to {selectedConnector.name}
                      </button>
                    )}

                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedConnector.accounts.map(account => (
                      <div key={account.id} className="card-soft p-4 flex items-center justify-between bg-white hover:border-[var(--border-strong)] transition-colors">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-default">{account.name}</span>
                            <span className="badge badge-success text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">Active</span>
                            {account.authMethod && (
                              <span className="badge text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gray-100 border-gray-200 text-gray-600">via {account.authMethod}</span>
                            )}
                          </div>
                          <div className="text-muted text-small">
                            Connected on {new Date(account.connectedAt).toLocaleDateString()} at {new Date(account.connectedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                        <button 
                          className="button button-ghost text-[var(--color-heat)] hover:text-[#E85B10] hover:bg-[var(--danger-bg)] h-10 w-10 p-0 rounded-full shrink-0"
                          onClick={() => handleDisconnect(selectedConnector.id, account.id)}
                          title="Disconnect account"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Disconnect</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConnectorCard({ 
  connector, 
  onDetail, 
  onConnect 
}: { 
  connector: Connector, 
  onDetail: () => void, 
  onConnect: () => void 
}) {
  return (
    <div className="card card-hover flex flex-col p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--background-surface-soft)] text-[var(--foreground-default)]">
          <connector.icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 bg-[var(--background-canvas)] border border-[var(--border-muted)] px-3 py-1 rounded-full">
          <span className="text-sm font-bold text-[var(--foreground-default)]">{connector.accounts.length}</span>
          <span className="text-muted text-xs font-medium uppercase tracking-wider">{connector.accounts.length === 1 ? 'account' : 'accounts'}</span>
        </div>
      </div>
      
      <div className="flex-1 mb-8">
        <h3 className="heading-subsection mb-2">{connector.name}</h3>
        <p className="text-light text-small line-clamp-2">{connector.description}</p>
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <button className="button button-outline flex-1" onClick={onDetail}>
          Detail
        </button>
        <button className="button button-primary flex-1" onClick={onConnect}>
          Connect
        </button>
      </div>
    </div>
  );
}

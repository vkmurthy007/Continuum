import { useState } from 'react';
import type { View } from './lib/types';
import Sidebar from './components/layout/Sidebar';
import JourneyMapView from './views/JourneyMapView';
import CareDesertView from './views/CareDesertView';
import HealthPassportView from './views/HealthPassportView';
import ApiKeyModal from './components/layout/ApiKeyModal';
import ComplianceModal from './components/layout/ComplianceModal';
import IntroScreen from './components/layout/IntroScreen';
import InAppBrowserGate from './components/layout/InAppBrowserGate';
import DemoBanner from './components/layout/DemoBanner';
import AuditTrail from './components/layout/AuditTrail';
import { ClipboardList, Activity, Map, Database } from 'lucide-react';
import { isInAppBrowser, safeSession } from './lib/browserUtils';

export default function App() {
  const [view, setView] = useState<View>('journey');
  const [showApiModal, setShowApiModal] = useState(false);
  const [introSeen, setIntroSeen] = useState(
    () => safeSession.get('intro_seen') === 'true'
  );
  const [complianceAccepted, setComplianceAccepted] = useState(
    () => safeSession.get('compliance_accepted') === 'true'
  );
  const [showAudit, setShowAudit] = useState(false);

  // Block in-app browsers before anything else
  if (isInAppBrowser()) return <InAppBrowserGate />;

  const handleIntroContinue = () => {
    safeSession.set('intro_seen', 'true');
    setIntroSeen(true);
  };

  const handleAccept = () => {
    safeSession.set('compliance_accepted', 'true');
    setComplianceAccepted(true);
  };

  const mobileNavItems = [
    { id: 'journey' as View, label: 'Journey', icon: <Activity size={20} /> },
    { id: 'desert' as View, label: 'Care Desert', icon: <Map size={20} /> },
    { id: 'passport' as View, label: 'Passport', icon: <Database size={20} /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Intro gate — shown first, once per session */}
      {!introSeen && <IntroScreen onContinue={handleIntroContinue} />}

      {/* Compliance gate — shown after intro */}
      {introSeen && !complianceAccepted && <ComplianceModal onAccept={handleAccept} />}

      {/* Top demo banner */}
      <DemoBanner />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop only */}
        <div className="hidden md:flex">
          <Sidebar currentView={view} onNavigate={setView} onApiKey={() => setShowApiModal(true)} />
        </div>

        <main className="flex-1 overflow-hidden">
          {view === 'journey' && <JourneyMapView />}
          {view === 'desert' && <CareDesertView />}
          {view === 'passport' && <HealthPassportView />}
        </main>

        {/* Audit trail drawer */}
        {showAudit && (
          <div className="w-72 bg-[#111111] border-l border-white/[0.06] overflow-y-auto">
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Audit Trail</span>
              <button onClick={() => setShowAudit(false)} className="text-white/25 hover:text-white/60 text-xs transition-colors">Close</button>
            </div>
            <AuditTrail />
          </div>
        )}
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden flex border-t border-white/[0.06] bg-[#111111] safe-area-bottom">
        {mobileNavItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
              view === item.id ? 'text-white' : 'text-white/30'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setShowAudit(v => !v)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
            showAudit ? 'text-white' : 'text-white/30'
          }`}
        >
          <ClipboardList size={20} />
          <span>Audit</span>
        </button>
      </div>

      {/* Audit trail toggle — desktop only */}
      <button
        onClick={() => setShowAudit(v => !v)}
        className="hidden md:flex fixed bottom-4 right-4 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.08] text-white/60 hover:text-white text-xs px-3 py-2 rounded-xl items-center gap-2 transition-colors"
      >
        <ClipboardList size={13} />
        Audit Trail
      </button>

      {showApiModal && <ApiKeyModal onClose={() => setShowApiModal(false)} />}
    </div>
  );
}

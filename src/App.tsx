import { useState } from 'react';
import type { View } from './lib/types';
import Sidebar from './components/layout/Sidebar';
import JourneyMapView from './views/JourneyMapView';
import CareDesertView from './views/CareDesertView';
import HealthPassportView from './views/HealthPassportView';
import ApiKeyModal from './components/layout/ApiKeyModal';
import ComplianceModal from './components/layout/ComplianceModal';
import IntroScreen from './components/layout/IntroScreen';
import DemoBanner from './components/layout/DemoBanner';
import AuditTrail from './components/layout/AuditTrail';
import { ClipboardList } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<View>('journey');
  const [showApiModal, setShowApiModal] = useState(false);
  const [introSeen, setIntroSeen] = useState(
    () => sessionStorage.getItem('intro_seen') === 'true'
  );
  const [complianceAccepted, setComplianceAccepted] = useState(
    () => sessionStorage.getItem('compliance_accepted') === 'true'
  );
  const [showAudit, setShowAudit] = useState(false);

  const handleIntroContinue = () => {
    sessionStorage.setItem('intro_seen', 'true');
    setIntroSeen(true);
  };

  const handleAccept = () => {
    sessionStorage.setItem('compliance_accepted', 'true');
    setComplianceAccepted(true);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Intro gate — shown first, once per session */}
      {!introSeen && <IntroScreen onContinue={handleIntroContinue} />}

      {/* Compliance gate — shown after intro */}
      {introSeen && !complianceAccepted && <ComplianceModal onAccept={handleAccept} />}

      {/* Top demo banner */}
      <DemoBanner />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={view} onNavigate={setView} onApiKey={() => setShowApiModal(true)} />

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

      {/* Audit trail toggle button */}
      <button
        onClick={() => setShowAudit(v => !v)}
        className="fixed bottom-4 right-4 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.08] text-white/60 hover:text-white text-xs px-3 py-2 rounded-xl flex items-center gap-2 transition-colors"
      >
        <ClipboardList size={13} />
        Audit Trail
      </button>

      {showApiModal && <ApiKeyModal onClose={() => setShowApiModal(false)} />}
    </div>
  );
}

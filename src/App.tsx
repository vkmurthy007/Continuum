import { useState } from 'react';
import type { View } from './lib/types';
import Sidebar from './components/layout/Sidebar';
import JourneyMapView from './views/JourneyMapView';
import CareDesertView from './views/CareDesertView';
import HealthPassportView from './views/HealthPassportView';
import ApiKeyModal from './components/layout/ApiKeyModal';

export default function App() {
  const [view, setView] = useState<View>('journey');
  const [showApiModal, setShowApiModal] = useState(false);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      <Sidebar currentView={view} onNavigate={setView} onApiKey={() => setShowApiModal(true)} />
      <main className="flex-1 overflow-hidden">
        {view === 'journey' && <JourneyMapView />}
        {view === 'desert' && <CareDesertView />}
        {view === 'passport' && <HealthPassportView />}
      </main>
      {showApiModal && <ApiKeyModal onClose={() => setShowApiModal(false)} />}
    </div>
  );
}

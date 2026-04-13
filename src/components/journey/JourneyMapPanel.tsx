import { useState } from 'react';
import type { Patient } from '../../lib/types';
import CareTimeline from './CareTimeline';
import ArrivalGauge from './ArrivalGauge';
import CascadeSimulator from './CascadeSimulator';
import InterventionConsole from './InterventionConsole';
import SignalHistory from './SignalHistory';

interface Props {
  patient: Patient;
}

export default function JourneyMapPanel({ patient }: Props) {
  const [activeSection, setActiveSection] = useState<'overview' | 'cascade' | 'interventions'>('overview');

  return (
    <div className="flex-1 overflow-y-auto bg-black">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-semibold text-white">{patient.initials}</span>
            <span className="text-sm text-white/60">{patient.condition_label}</span>
            <span className="text-xs text-white/25">·</span>
            <span className="text-sm text-white/60">{patient.organization}</span>
          </div>
          <div className="text-xs text-white/40 mt-1">{patient.signal_label}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold font-mono text-white">{patient.continuum_score}</div>
          <div className={`text-xs font-medium ${
            patient.risk_tier === 'critical' ? 'text-red-400' :
            patient.risk_tier === 'at_risk' ? 'text-orange-400' :
            patient.risk_tier === 'watch' ? 'text-amber-400' : 'text-white/80'
          }`}>{patient.risk_tier.replace('_', ' ').toUpperCase()}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06] px-6">
        {(['overview', 'cascade', 'interventions'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            className={`py-2.5 px-4 text-sm font-medium border-b-2 transition-colors capitalize ${
              activeSection === tab
                ? 'border-white text-white'
                : 'border-transparent text-white/40 hover:text-white/80'
            }`}
          >
            {tab === 'cascade' ? 'Cascade Simulation' : tab === 'interventions' ? 'Interventions' : 'Overview'}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {activeSection === 'overview' && (
          <>
            <CareTimeline patient={patient} />
            <ArrivalGauge patient={patient} />
            <SignalHistory patient={patient} />
          </>
        )}
        {activeSection === 'cascade' && (
          <CascadeSimulator patient={patient} />
        )}
        {activeSection === 'interventions' && (
          <InterventionConsole patient={patient} />
        )}
      </div>
    </div>
  );
}

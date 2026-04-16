import { useState } from 'react';
import records from '../data/health_passport_records.json';
import type { HealthPassportRecord } from '../lib/types';
import SignalFeed from '../components/passport/SignalFeed';
import IntegrationDestinations from '../components/passport/IntegrationDestinations';
import ROICalculator from '../components/passport/ROICalculator';
import { Shield, X } from 'lucide-react';

const CONDITIONS = ['All', 'ESRD', 'Oncology', 'Post-Discharge', 'I/DD', 'Behavioral Health'];

export default function HealthPassportView() {
  const [condition, setCondition] = useState('All');
  const [consentDismissed, setConsentDismissed] = useState(false);

  const filtered = (records as HealthPassportRecord[]).filter(
    r => condition === 'All' || r.condition === condition
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-black">
      <div className="px-6 py-4 border-b border-white/[0.06]">
        <div className="text-lg font-semibold text-white">Health Passport API Explorer</div>
        <div className="text-xs text-white/40 mt-1">Real-time SDOH signal feed · B2B data product demonstration</div>
      </div>

      {/* CCPA / Consent notice */}
      {!consentDismissed && (
        <div className="mx-4 mt-3 flex items-start gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3">
          <Shield size={15} className="text-white/40 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-xs font-medium text-white/80">Data Use & Consent Notice </span>
            <span className="text-xs text-white/40 leading-relaxed">
              In production, patients would be notified under{' '}
              <strong className="text-white/60">CCPA (California)</strong> that their transportation
              behavior is being analyzed and shared with care partners. Behavioral health data would
              be governed separately under{' '}
              <strong className="text-white/60">42 CFR Part 2</strong>.{' '}
              All records in this demo are fictional — no real patient consent is required or implied.
              Export destinations shown are illustrative only; no data leaves this browser.
            </span>
          </div>
          <button onClick={() => setConsentDismissed(true)} className="text-white/25 hover:text-white/60 transition-colors flex-shrink-0">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Mobile: horizontal pill filter */}
      <div className="md:hidden flex gap-2 px-4 py-3 overflow-x-auto border-b border-white/[0.06] flex-shrink-0">
        {CONDITIONS.map(c => (
          <button
            key={c}
            onClick={() => setCondition(c)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${
              condition === c
                ? 'bg-white text-black font-medium'
                : 'bg-white/[0.06] text-white/50 border border-white/[0.08]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col md:flex-row mt-0 md:mt-3">
        {/* Left: population selector — desktop only */}
        <div className="hidden md:block w-48 bg-[#111111] border-r border-white/[0.06] p-4 flex-shrink-0">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Population</div>
          {CONDITIONS.map(c => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              className={`w-full text-left text-sm px-3 py-2 rounded-xl mb-1 transition-colors ${
                condition === c
                  ? 'bg-white/[0.08] text-white font-medium'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
              }`}
            >
              {c}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <div className="text-xs text-white/25">Active signals</div>
            <div className="text-2xl font-mono font-semibold text-white">{filtered.length}</div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-xs text-white/20">
              <Shield size={10} />
              <span>Demo data only<br />No real PHI</span>
            </div>
          </div>
        </div>

        {/* Center: signal feed */}
        <div className="flex-1 md:overflow-y-auto">
          <SignalFeed records={filtered} />
        </div>

        {/* Right: integrations + ROI */}
        <div className="md:w-80 md:border-l border-t md:border-t-0 border-white/[0.06] md:overflow-y-auto bg-[#111111]">
          <IntegrationDestinations />
          <ROICalculator />
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import records from '../data/health_passport_records.json';
import type { HealthPassportRecord } from '../lib/types';
import SignalFeed from '../components/passport/SignalFeed';
import IntegrationDestinations from '../components/passport/IntegrationDestinations';
import ROICalculator from '../components/passport/ROICalculator';

const CONDITIONS = ['All', 'ESRD', 'Oncology', 'Post-Discharge', 'I/DD', 'Behavioral Health'];

export default function HealthPassportView() {
  const [condition, setCondition] = useState('All');

  const filtered = (records as HealthPassportRecord[]).filter(
    r => condition === 'All' || r.condition === condition
  );

  return (
    <div className="h-full flex flex-col bg-gray-950">
      <div className="px-6 py-4 border-b border-gray-800">
        <div className="text-lg font-bold text-white">Health Passport API Explorer</div>
        <div className="text-xs text-gray-500 mt-1">Real-time SDOH signal feed · B2B data product demonstration</div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Left: population selector */}
        <div className="w-48 bg-gray-900 border-r border-gray-800 p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Population</div>
          {CONDITIONS.map(c => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg mb-1 transition-colors ${
                condition === c
                  ? 'bg-gray-800 text-white font-medium'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              {c}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="text-xs text-gray-600">Active signals</div>
            <div className="text-2xl font-mono font-bold text-white">{filtered.length}</div>
          </div>
        </div>

        {/* Center: signal feed */}
        <div className="flex-1 overflow-y-auto">
          <SignalFeed records={filtered} />
        </div>

        {/* Right: integrations + ROI */}
        <div className="w-80 border-l border-gray-800 overflow-y-auto bg-gray-900/50">
          <IntegrationDestinations />
          <ROICalculator />
        </div>
      </div>
    </div>
  );
}

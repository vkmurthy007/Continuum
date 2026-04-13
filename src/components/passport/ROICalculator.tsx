import { useState } from 'react';

export default function ROICalculator() {
  const [members, setMembers] = useState(5000);
  const [readmissionRate, setReadmissionRate] = useState(12);

  const avgCost = 18400;
  const reductionRate = 0.20;
  const baseReadmissions = Math.round(members * (readmissionRate / 100));
  const avoidedReadmissions = Math.round(baseReadmissions * reductionRate);
  const savings = avoidedReadmissions * avgCost;

  return (
    <div className="p-4">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">ROI Calculator</div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs text-gray-500">Member population</label>
          <input
            type="number"
            value={members}
            onChange={e => setMembers(Math.max(100, parseInt(e.target.value) || 0))}
            className="w-full mt-1 bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Current readmission rate (%)</label>
          <input
            type="number"
            value={readmissionRate}
            onChange={e => setReadmissionRate(Math.min(100, Math.max(1, parseInt(e.target.value) || 0)))}
            className="w-full mt-1 bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Annual readmissions (baseline)</span>
          <span className="text-gray-300 font-mono">{baseReadmissions.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">CONTINUUM reduction (20%)</span>
          <span className="text-emerald-400 font-mono">−{avoidedReadmissions.toLocaleString()}</span>
        </div>
        <div className="border-t border-gray-800 pt-2 flex justify-between">
          <span className="text-xs text-gray-400 font-medium">Estimated annual savings</span>
          <span className="text-sm font-bold font-mono text-emerald-400">${(savings / 1000000).toFixed(1)}M</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-700">Based on $18,400 avg readmission cost · 20% reduction in CONTINUUM-active cohorts</div>
    </div>
  );
}

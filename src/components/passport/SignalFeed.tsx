import type { HealthPassportRecord } from '../../lib/types';

interface Props {
  records: HealthPassportRecord[];
}

const severityColor: Record<string, string> = {
  critical: 'text-red-400 border-red-500/30',
  high: 'text-orange-400 border-orange-500/30',
  medium: 'text-amber-400 border-amber-500/30',
  low: 'text-emerald-400 border-emerald-500/30',
};

export default function SignalFeed({ records }: Props) {
  if (records.length === 0) {
    return (
      <div className="p-8 text-center text-white/25 text-sm">No signals for selected population.</div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Live Signal Feed</div>
      {records.map(rec => (
        <div key={rec.record_id} className="bg-[#111111] border border-white/[0.06] rounded-2xl p-4 font-mono text-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-white/25">signal</span>
              <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${severityColor[rec.severity]}`}>
                {rec.severity.toUpperCase()}
              </span>
            </div>
            <span className="text-white/20">{rec.condition}</span>
          </div>

          <pre className="text-white/80 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">{JSON.stringify({
            patient_id: rec.patient_id,
            signal_type: rec.signal_type,
            severity: rec.severity,
            condition: rec.condition,
            completion_rate_current: rec.completion_rate_current,
            completion_rate_prior: rec.completion_rate_prior,
            predicted_readmission_risk_30d: rec.predicted_readmission_risk_30d,
            recommended_sdoh_code: rec.recommended_sdoh_code,
            confidence: rec.confidence,
          }, null, 2)}</pre>

          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2 flex-wrap">
            {rec.export_destinations.map(dest => (
              <span key={dest} className="px-2 py-1 bg-white/[0.06] text-white/60 rounded-full text-xs">{dest}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

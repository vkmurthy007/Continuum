import { useState } from 'react';
import type { Patient, CascadeResult } from '../../lib/types';
import { simulateCascade } from '../../lib/claudeApi';
import { useAuditStore } from '../../lib/auditStore';
import { AlertTriangle, Loader, ShieldAlert } from 'lucide-react';

export default function CascadeSimulator({ patient }: { patient: Patient }) {
  const log = useAuditStore(s => s.log);
  const [result, setResult] = useState<CascadeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    log({ type: 'ai', message: `Cascade simulation requested for ${patient.initials} — ${patient.appointment_type} ${patient.next_appointment_label}`, patientId: patient.patient_id });
    try {
      const res = await simulateCascade(patient);
      setResult(res);
      log({ type: 'ai', message: `Cascade simulation completed — readmission risk ${Math.round(res.readmission_probability_14d * 100)}%, est. cost $${(res.estimated_cost / 1000).toFixed(0)}k`, patientId: patient.patient_id });
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'NO_API_KEY') {
        setError('Set your Anthropic API key in the sidebar to run live simulations.');
      } else {
        setError('Simulation failed. Check your API key and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/[0.04] rounded-2xl px-5 py-4 border border-white/[0.06]">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-sm font-medium text-white">Cascade Simulation</div>
            <div className="text-xs text-white/40 mt-0.5">Claude AI · What happens if {patient.initials} misses {patient.next_appointment_label}?</div>
          </div>
          <AlertTriangle size={16} className="text-amber-400 mt-0.5" />
        </div>

        {!result && !loading && (
          <div className="mt-4">
            <div className="text-xs text-white/40 mb-4 leading-relaxed">
              Run Claude's care cascade simulation to understand the downstream clinical and cost implications of a missed {patient.appointment_type} appointment.
            </div>
            <button
              onClick={run}
              className="w-full bg-amber-400/10 hover:bg-amber-400/[0.15] border border-amber-400/20 text-amber-400 text-sm py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle size={14} />
              Simulate Miss — {patient.next_appointment_label}
            </button>
            {error && (
              <div className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</div>
            )}
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-3 py-6 justify-center text-white/40">
            <Loader size={16} className="animate-spin" />
            <span className="text-sm">Running cascade simulation...</span>
          </div>
        )}

        {result && (
          <div className="mt-4 space-y-4">
            {/* AI advisory notice */}
            <div className="flex items-start gap-2 bg-amber-400/[0.06] border border-amber-400/20 rounded-xl px-3 py-2">
              <ShieldAlert size={13} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-400/70 leading-relaxed">
                <strong className="text-amber-400">AI-generated estimate — not clinical documentation.</strong>{' '}
                This simulation is advisory only. All escalations require coordinator review and must not substitute for clinical judgment.
              </p>
            </div>

            {/* Cascade chain */}
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Projected Cascade</div>
              {result.cascade_steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 mb-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                      step.probability > 0.6 ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                      step.probability > 0.3 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>{i + 1}</div>
                    {i < result.cascade_steps.length - 1 && (
                      <div className="w-px h-4 bg-white/[0.08] my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="text-sm text-white/90">{step.step}</div>
                    <div className="text-xs text-white/40 mt-0.5 flex items-center gap-2">
                      <span>{step.timeframe}</span>
                      <span>·</span>
                      <span>{Math.round(step.probability * 100)}% probability</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.06]">
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3 text-center">
                <div className="text-lg font-semibold font-mono text-red-400">{Math.round(result.readmission_probability_14d * 100)}%</div>
                <div className="text-xs text-white/40 mt-1">Readmission risk<br/>14 days</div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-3 text-center">
                <div className="text-lg font-semibold font-mono text-orange-400">${(result.estimated_cost / 1000).toFixed(0)}k</div>
                <div className="text-xs text-white/40 mt-1">Est. system<br/>cost</div>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-3 text-center">
                <div className="text-lg font-semibold font-mono text-white/80">{Math.round(result.confidence * 100)}%</div>
                <div className="text-xs text-white/40 mt-1">Model<br/>confidence</div>
              </div>
            </div>

            <div className="text-xs text-white/25 italic border-t border-white/[0.06] pt-3">{result.clinical_basis}</div>

            <button onClick={() => setResult(null)} className="text-xs text-white/25 hover:text-white/60 transition-colors">
              Reset simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

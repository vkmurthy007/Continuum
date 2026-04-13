import { useState } from 'react';
import type { Patient, InterventionRecommendation } from '../../lib/types';
import { getInterventionRecommendation } from '../../lib/claudeApi';
import { useAuditStore } from '../../lib/auditStore';
import { Zap, Loader, CheckCircle, ShieldAlert, AlertTriangle } from 'lucide-react';

const urgencyStyle: Record<string, string> = {
  immediate: 'text-red-400 bg-red-500/10 border-red-500/25',
  within_24h: 'text-orange-400 bg-orange-500/10 border-orange-500/25',
  this_week: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
};

const urgencyLabel: Record<string, string> = {
  immediate: 'Immediate',
  within_24h: 'Within 24h',
  this_week: 'This week',
};

export default function InterventionConsole({ patient }: { patient: Patient }) {
  const log = useAuditStore(s => s.log);
  const [rec, setRec] = useState<InterventionRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [executed, setExecuted] = useState<Set<number>>(new Set());
  const [confirming, setConfirming] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    log({ type: 'ai', message: `Intervention recommendations requested for ${patient.initials}`, patientId: patient.patient_id });
    try {
      const res = await getInterventionRecommendation(patient);
      setRec(res);
      log({ type: 'ai', message: `Intervention recommendations generated for ${patient.initials} — ${res.interventions.length} actions`, patientId: patient.patient_id });
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'NO_API_KEY') {
        setError('Set your Anthropic API key to generate AI intervention recommendations.');
      } else {
        setError('Failed to generate recommendations. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmExecute = (i: number) => setConfirming(i);

  const commitExecute = (i: number, action: string) => {
    setExecuted(prev => new Set([...prev, i]));
    setConfirming(null);
    log({ type: 'action', message: `Coordinator confirmed intervention: "${action}"`, patientId: patient.patient_id });
  };

  return (
    <div className="bg-white/[0.04] rounded-2xl px-5 py-4 border border-white/[0.06]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm font-medium text-white">Intervention Console</div>
          <div className="text-xs text-white/40 mt-0.5">Claude AI · Ranked interventions for {patient.initials}</div>
        </div>
        <Zap size={16} className="text-emerald-400 mt-0.5" />
      </div>

      {!rec && !loading && (
        <div className="mt-3">
          <button
            onClick={load}
            className="w-full bg-white/[0.08] hover:bg-white/[0.12] text-white text-sm py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Zap size={14} />
            Generate AI Recommendations
          </button>
          {error && (
            <div className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</div>
          )}
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 py-6 justify-center text-white/40">
          <Loader size={16} className="animate-spin" />
          <span className="text-sm">Analyzing patient signals...</span>
        </div>
      )}

      {rec && (
        <div className="mt-3 space-y-4">
          {/* AI advisory notice */}
          <div className="flex items-start gap-2 bg-amber-400/[0.06] border border-amber-400/20 rounded-xl px-3 py-2">
            <ShieldAlert size={13} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-400/70 leading-relaxed">
              <strong className="text-amber-400">AI-generated recommendations — advisory only.</strong>{' '}
              A human coordinator must confirm every action before it is logged. These suggestions do not constitute clinical instructions.
            </p>
          </div>

          <div className="text-sm text-white/80 leading-relaxed bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
            {rec.explanation}
          </div>

          <div className="space-y-2">
            {rec.interventions.map((item, i) => (
              <div key={i}>
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${urgencyStyle[item.urgency]}`}>
                  <span className="text-xs font-medium w-5 text-center opacity-60">{i + 1}</span>
                  <div className="flex-1">
                    <div className="text-sm text-white/90">{item.action}</div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs font-medium">{urgencyLabel[item.urgency]}</span>
                      <span className="text-xs text-white/40">+{Math.round(item.predicted_lift * 100)}% predicted lift</span>
                    </div>
                  </div>
                  {executed.has(i) ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <CheckCircle size={12} /> Confirmed
                    </span>
                  ) : (
                    <button
                      onClick={() => confirmExecute(i)}
                      className="text-xs px-3 py-1.5 rounded-xl font-medium bg-white/[0.08] hover:bg-white/[0.12] text-white/80 transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                </div>

                {/* Human-in-the-loop confirmation gate */}
                {confirming === i && (
                  <div className="mt-1.5 bg-white/[0.04] border border-amber-400/20 rounded-xl p-3">
                    <div className="flex items-start gap-2 mb-3">
                      <AlertTriangle size={13} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-white/60 leading-relaxed">
                        <strong className="text-white">Coordinator confirmation required.</strong> By confirming, you acknowledge this is your decision — not an automated AI action — and it will be logged to the audit trail.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => commitExecute(i, item.action)}
                        className="flex-1 bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs py-2 rounded-xl font-medium transition-colors"
                      >
                        I confirm — log this action
                      </button>
                      <button
                        onClick={() => setConfirming(null)}
                        className="px-3 text-xs text-white/40 hover:text-white/80 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => { setRec(null); setExecuted(new Set()); setConfirming(null); }} className="text-xs text-white/25 hover:text-white/60 transition-colors">
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}

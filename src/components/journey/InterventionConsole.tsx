import { useState } from 'react';
import type { Patient, InterventionRecommendation } from '../../lib/types';
import { getInterventionRecommendation } from '../../lib/claudeApi';
import { Zap, Loader, CheckCircle } from 'lucide-react';

const urgencyStyle: Record<string, string> = {
  immediate: 'text-red-400 bg-red-900/20 border-red-800',
  within_24h: 'text-orange-400 bg-orange-900/20 border-orange-800',
  this_week: 'text-amber-400 bg-amber-900/20 border-amber-800',
};

const urgencyLabel: Record<string, string> = {
  immediate: 'Immediate',
  within_24h: 'Within 24h',
  this_week: 'This week',
};

export default function InterventionConsole({ patient }: { patient: Patient }) {
  const [rec, setRec] = useState<InterventionRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [executed, setExecuted] = useState<Set<number>>(new Set());

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getInterventionRecommendation(patient);
      setRec(res);
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

  const execute = (i: number) => {
    setExecuted(prev => new Set([...prev, i]));
  };

  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm font-semibold text-white">Intervention Console</div>
          <div className="text-xs text-gray-500 mt-0.5">Claude AI · Ranked interventions for {patient.initials}</div>
        </div>
        <Zap size={16} className="text-emerald-500 mt-0.5" />
      </div>

      {!rec && !loading && (
        <div className="mt-3">
          <button
            onClick={load}
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white text-sm py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Zap size={14} />
            Generate AI Recommendations
          </button>
          {error && (
            <div className="mt-3 text-xs text-red-400 bg-red-900/20 border border-red-800 rounded-lg p-3">{error}</div>
          )}
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 py-6 justify-center text-gray-500">
          <Loader size={16} className="animate-spin" />
          <span className="text-sm">Analyzing patient signals...</span>
        </div>
      )}

      {rec && (
        <div className="mt-3 space-y-4">
          <div className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            {rec.explanation}
          </div>

          <div className="space-y-2">
            {rec.interventions.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${urgencyStyle[item.urgency]}`}>
                <span className="text-xs font-bold w-5 text-center opacity-60">{i + 1}</span>
                <div className="flex-1">
                  <div className="text-sm text-gray-200">{item.action}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs font-medium px-1.5 py-0.5 rounded">
                      {urgencyLabel[item.urgency]}
                    </span>
                    <span className="text-xs text-gray-500">+{Math.round(item.predicted_lift * 100)}% predicted lift</span>
                  </div>
                </div>
                <button
                  onClick={() => execute(i)}
                  disabled={executed.has(i)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                    executed.has(i)
                      ? 'bg-gray-700 text-gray-500 cursor-default'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  }`}
                >
                  {executed.has(i) ? <><CheckCircle size={12} /> Done</> : 'Execute'}
                </button>
              </div>
            ))}
          </div>

          <button onClick={() => { setRec(null); setExecuted(new Set()); }} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}

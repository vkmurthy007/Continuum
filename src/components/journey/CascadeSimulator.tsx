import { useState } from 'react';
import type { Patient, CascadeResult } from '../../lib/types';
import { simulateCascade } from '../../lib/claudeApi';
import { AlertTriangle, Loader } from 'lucide-react';

export default function CascadeSimulator({ patient }: { patient: Patient }) {
  const [result, setResult] = useState<CascadeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await simulateCascade(patient);
      setResult(res);
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
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-sm font-semibold text-white">Cascade Simulation</div>
            <div className="text-xs text-gray-500 mt-0.5">Claude AI · What happens if {patient.initials} misses {patient.next_appointment_label}?</div>
          </div>
          <AlertTriangle size={16} className="text-amber-500 mt-0.5" />
        </div>

        {!result && !loading && (
          <div className="mt-4">
            <div className="text-xs text-gray-500 mb-4 leading-relaxed">
              Run Claude's care cascade simulation to understand the downstream clinical and cost implications of a missed {patient.appointment_type} appointment.
            </div>
            <button
              onClick={run}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white text-sm py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle size={14} />
              Simulate Miss — {patient.next_appointment_label}
            </button>
            {error && (
              <div className="mt-3 text-xs text-red-400 bg-red-900/20 border border-red-800 rounded-lg p-3">{error}</div>
            )}
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-3 py-6 justify-center text-gray-500">
            <Loader size={16} className="animate-spin" />
            <span className="text-sm">Running cascade simulation...</span>
          </div>
        )}

        {result && (
          <div className="mt-4 space-y-4">
            {/* Cascade chain */}
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Cascade Chain</div>
              {result.cascade_steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 mb-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      step.probability > 0.6 ? 'bg-red-900/50 text-red-400 border border-red-700' :
                      step.probability > 0.3 ? 'bg-orange-900/50 text-orange-400 border border-orange-700' :
                      'bg-amber-900/50 text-amber-400 border border-amber-700'
                    }`}>{i + 1}</div>
                    {i < result.cascade_steps.length - 1 && (
                      <div className="w-px h-4 bg-gray-700 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="text-sm text-gray-200">{step.step}</div>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                      <span>{step.timeframe}</span>
                      <span>·</span>
                      <span>{Math.round(step.probability * 100)}% probability</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-800">
              <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold font-mono text-red-400">{Math.round(result.readmission_probability_14d * 100)}%</div>
                <div className="text-xs text-gray-500 mt-1">Readmission risk<br/>14 days</div>
              </div>
              <div className="bg-orange-900/20 border border-orange-800/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold font-mono text-orange-400">${(result.estimated_cost / 1000).toFixed(0)}k</div>
                <div className="text-xs text-gray-500 mt-1">Est. system<br/>cost</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
                <div className="text-lg font-bold font-mono text-gray-300">{Math.round(result.confidence * 100)}%</div>
                <div className="text-xs text-gray-500 mt-1">Model<br/>confidence</div>
              </div>
            </div>

            <div className="text-xs text-gray-600 italic border-t border-gray-800 pt-3">{result.clinical_basis}</div>

            <button
              onClick={() => setResult(null)}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Reset simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

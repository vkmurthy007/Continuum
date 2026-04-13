import type { CareDesertInsight } from '../../lib/types';
import { AlertTriangle, TrendingDown, Eye } from 'lucide-react';

interface Props {
  insights: CareDesertInsight[];
}

const typeIcon: Record<string, React.ReactNode> = {
  CARE_DESERT_ALERT: <AlertTriangle size={14} className="text-red-400" />,
  POPULATION_DRIFT_ALERT: <TrendingDown size={14} className="text-orange-400" />,
  EMERGING_PATTERN: <Eye size={14} className="text-amber-400" />,
};

const typeBorder: Record<string, string> = {
  CARE_DESERT_ALERT: 'border-l-red-500',
  POPULATION_DRIFT_ALERT: 'border-l-orange-500',
  EMERGING_PATTERN: 'border-l-amber-500',
};

export default function IntelligenceFeed({ insights }: Props) {
  return (
    <div>
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="text-sm font-medium text-white">Intelligence Feed</div>
        <div className="text-xs text-white/40 mt-0.5">{insights.length} active insights</div>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {insights.map(insight => (
          <div key={insight.insight_id} className={`p-4 border-l-4 ${typeBorder[insight.type]}`}>
            <div className="flex items-start gap-2 mb-2">
              {typeIcon[insight.type]}
              <div>
                <div className="text-sm font-medium text-white">{insight.title}</div>
                <div className="text-xs text-white/40 mt-0.5">{insight.geography_label}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white/[0.06] rounded-xl p-2">
                <div className="text-xs text-white/40">Patients affected</div>
                <div className="text-sm font-mono font-semibold text-white">{insight.affected_patient_count.toLocaleString()}</div>
              </div>
              <div className="bg-white/[0.06] rounded-xl p-2">
                <div className="text-xs text-white/40">Est. annual cost</div>
                <div className="text-sm font-mono font-semibold text-red-400">${(insight.estimated_downstream_cost / 1000000).toFixed(1)}M</div>
              </div>
              <div className="bg-white/[0.06] rounded-xl p-2">
                <div className="text-xs text-white/40">Completion rate</div>
                <div className="text-sm font-mono font-semibold text-orange-400">{Math.round(insight.completion_rate * 100)}%</div>
              </div>
              <div className="bg-white/[0.06] rounded-xl p-2">
                <div className="text-xs text-white/40">Platform avg</div>
                <div className="text-sm font-mono font-semibold text-white/80">{Math.round(insight.platform_benchmark * 100)}%</div>
              </div>
            </div>

            <div className="text-xs text-white/60 mb-3 leading-relaxed">{insight.infrastructure_recommendation}</div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-white/25">Confidence: {Math.round(insight.confidence * 100)}%</div>
              <button className="text-xs bg-white/[0.08] hover:bg-white/[0.12] text-white/80 px-3 py-1.5 rounded-xl font-medium transition-colors">
                {insight.action_label}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { Patient } from '../../lib/types';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export default function SignalHistory({ patient }: { patient: Patient }) {
  const maxLen = Math.max(
    patient.sparkline_lead_time.length,
    patient.sparkline_completion.length,
    patient.sparkline_caregiver.length
  );

  const data = Array.from({ length: maxLen }, (_, i) => ({
    i,
    lead_time: patient.sparkline_lead_time[i] ?? null,
    completion: patient.sparkline_completion[i] != null ? patient.sparkline_completion[i] * 100 : null,
    caregiver: patient.sparkline_caregiver[i] != null ? patient.sparkline_caregiver[i] * 100 : null,
  }));

  const charts = [
    { key: 'lead_time' as const, label: 'Booking Lead Time (hrs)', color: '#10b981', suffix: 'h' },
    { key: 'completion' as const, label: 'Completion Rate (%)', color: '#3b82f6', suffix: '%' },
    { key: 'caregiver' as const, label: 'Caregiver Response Rate (%)', color: '#a78bfa', suffix: '%' },
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
      <div className="text-sm font-semibold text-white mb-4">Signal History — Last 90 Days</div>
      <div className="grid grid-cols-3 gap-4">
        {charts.map(chart => (
          <div key={chart.key}>
            <div className="text-xs text-gray-500 mb-2">{chart.label}</div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey={chart.key}
                    stroke={chart.color}
                    strokeWidth={1.5}
                    dot={false}
                    connectNulls={false}
                  />
                  <Tooltip
                    contentStyle={{ background: '#111827', border: '1px solid #374151', fontSize: 11 }}
                    formatter={(v: unknown) => [`${(v as number)?.toFixed(1)}${chart.suffix}`, chart.label]}
                    labelFormatter={() => ''}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

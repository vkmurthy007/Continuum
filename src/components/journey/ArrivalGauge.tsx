import type { Patient } from '../../lib/types';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export default function ArrivalGauge({ patient }: { patient: Patient }) {
  const prob = patient.arrival_probability;
  const color = prob >= 80 ? '#10b981' : prob >= 60 ? '#f59e0b' : '#ef4444';

  const data = [{ value: prob, fill: color }, { value: 100 - prob, fill: '#1f2937' }];

  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
      <div className="text-sm font-semibold text-white mb-4">AI Arrival Probability</div>
      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%" cy="50%"
              innerRadius="65%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              data={data}
            >
              <RadialBar dataKey="value" cornerRadius={4} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold font-mono" style={{ color }}>{prob}%</span>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-2" style={{ color }}>
            {prob >= 80 ? 'Low Risk' : prob >= 60 ? 'Moderate Risk' : 'High Risk'}
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">{patient.arrival_explanation}</p>
          <div className="mt-2 flex gap-2 text-xs text-gray-600">
            <span>Next: {patient.appointment_type}</span>
            <span>·</span>
            <span>{patient.next_appointment_label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

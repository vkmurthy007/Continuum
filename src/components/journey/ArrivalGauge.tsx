import { useEffect } from 'react';
import type { Patient } from '../../lib/types';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { useAuditStore } from '../../lib/auditStore';
import { AlertTriangle } from 'lucide-react';

export default function ArrivalGauge({ patient }: { patient: Patient }) {
  const log = useAuditStore(s => s.log);
  const prob = patient.arrival_probability;
  const color = prob >= 80 ? '#10b981' : prob >= 60 ? '#f59e0b' : '#ef4444';
  const data = [{ value: prob, fill: color }, { value: 100 - prob, fill: '#1a1a1a' }];

  useEffect(() => {
    log({
      type: 'view',
      message: `Arrival probability viewed for ${patient.initials} (${prob}%)`,
      patientId: patient.patient_id,
    });
  }, [patient.patient_id]);

  return (
    <div className="bg-white/[0.04] rounded-2xl px-5 py-4 border border-white/[0.06]">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-white">AI Arrival Probability</div>
        <div className="flex items-center gap-1.5 text-xs text-amber-400/80 bg-amber-400/[0.08] border border-amber-400/20 px-2 py-1 rounded-full">
          <AlertTriangle size={10} />
          AI estimate · not clinical documentation
        </div>
      </div>
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
            <span className="text-2xl font-semibold font-mono" style={{ color }}>{prob}%</span>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-2" style={{ color }}>
            {prob >= 80 ? 'Low Risk' : prob >= 60 ? 'Moderate Risk' : 'High Risk'}
          </div>
          <p className="text-xs text-white/60 leading-relaxed">{patient.arrival_explanation}</p>
          <div className="mt-2 flex gap-2 text-xs text-white/25">
            <span>Next: {patient.appointment_type}</span>
            <span>·</span>
            <span>{patient.next_appointment_label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

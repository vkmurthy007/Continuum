import type { Patient, RiskTier } from '../../lib/types';

interface Props {
  patients: Patient[];
  selected: Patient;
  onSelect: (p: Patient) => void;
}

const tierColors: Record<RiskTier, string> = {
  critical: 'text-red-400 bg-red-900/30 border-red-700',
  at_risk: 'text-orange-400 bg-orange-900/30 border-orange-700',
  watch: 'text-amber-400 bg-amber-900/30 border-amber-700',
  stable: 'text-emerald-400 bg-emerald-900/30 border-emerald-700',
};

const tierDot: Record<RiskTier, string> = {
  critical: 'bg-red-500',
  at_risk: 'bg-orange-500',
  watch: 'bg-amber-500',
  stable: 'bg-emerald-500',
};

const sortOrder: RiskTier[] = ['critical', 'at_risk', 'watch', 'stable'];

export default function PatientList({ patients, selected, onSelect }: Props) {
  const sorted = [...patients].sort(
    (a, b) => sortOrder.indexOf(a.risk_tier) - sortOrder.indexOf(b.risk_tier)
  );

  return (
    <div className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="text-sm font-semibold text-white">Active Patients</div>
        <div className="text-xs text-gray-500 mt-0.5">Sorted by CONTINUUM risk score</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sorted.map(patient => (
          <button
            key={patient.patient_id}
            onClick={() => onSelect(patient)}
            className={`w-full text-left px-4 py-3.5 border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors ${
              selected.patient_id === patient.patient_id ? 'bg-gray-800' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${tierDot[patient.risk_tier]}`} />
                <span className="font-mono text-sm font-medium text-white">{patient.initials}</span>
                <span className="text-xs text-gray-500">{patient.condition_label}</span>
              </div>
              <span className={`text-xs px-1.5 py-0.5 rounded border font-mono font-bold ${tierColors[patient.risk_tier]}`}>
                {patient.continuum_score}
              </span>
            </div>
            <div className="text-xs text-gray-500 truncate">{patient.signal_label}</div>
            <div className="text-xs text-gray-600 mt-0.5">{patient.next_appointment_label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

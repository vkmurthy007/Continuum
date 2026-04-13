import type { Patient, RiskTier } from '../../lib/types';
import { useAuditStore } from '../../lib/auditStore';
import { Lock } from 'lucide-react';

interface Props {
  patients: Patient[];
  selected: Patient;
  onSelect: (p: Patient) => void;
}

const tierColors: Record<RiskTier, string> = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/30',
  at_risk: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  watch: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  stable: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
};

const tierDot: Record<RiskTier, string> = {
  critical: 'bg-red-500',
  at_risk: 'bg-orange-500',
  watch: 'bg-amber-500',
  stable: 'bg-emerald-500',
};

const sortOrder: RiskTier[] = ['critical', 'at_risk', 'watch', 'stable'];

export default function PatientList({ patients, selected, onSelect }: Props) {
  const log = useAuditStore(s => s.log);
  const sorted = [...patients].sort(
    (a, b) => sortOrder.indexOf(a.risk_tier) - sortOrder.indexOf(b.risk_tier)
  );

  const handleSelect = (patient: Patient) => {
    onSelect(patient);
    log({ type: 'view', message: `Patient record opened: ${patient.initials} (${patient.condition_label})`, patientId: patient.patient_id });
  };

  return (
    <div className="w-72 bg-[#111111] border-r border-white/[0.06] flex flex-col">
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="text-sm font-semibold text-white">Active Patients</div>
        <div className="text-xs text-white/40 mt-0.5">Sorted by CONTINUUM risk score</div>
        {/* Anonymization notice */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-white/25">
          <Lock size={10} className="flex-shrink-0" />
          <span>Anonymized IDs · No PII stored or displayed</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sorted.map(patient => (
          <button
            key={patient.patient_id}
            onClick={() => handleSelect(patient)}
            className={`w-full text-left px-4 py-3.5 border-b border-white/[0.04] hover:bg-white/[0.04] transition-colors ${
              selected.patient_id === patient.patient_id ? 'bg-white/[0.06]' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${tierDot[patient.risk_tier]}`} />
                <span className="font-mono text-sm font-medium text-white">{patient.initials}</span>
                <span className="text-xs text-white/40">{patient.condition_label}</span>
              </div>
              <span className={`text-xs px-1.5 py-0.5 rounded-full border font-mono font-medium ${tierColors[patient.risk_tier]}`}>
                {patient.continuum_score}
              </span>
            </div>
            <div className="text-xs text-white/40 truncate">{patient.signal_label}</div>
            <div className="flex items-center justify-between mt-0.5">
              <div className="text-xs text-white/25">{patient.next_appointment_label}</div>
              {/* Anonymized ID badge */}
              <div className="flex items-center gap-1 text-white/20">
                <Lock size={9} />
                <span className="text-xs font-mono">{patient.patient_id.slice(0, 12)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

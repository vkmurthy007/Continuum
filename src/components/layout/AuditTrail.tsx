import { useAuditStore } from '../../lib/auditStore';
import { Clock, User, Cpu, CheckCircle } from 'lucide-react';

const iconFor = (type: string) => {
  if (type === 'ai') return <Cpu size={11} className="text-purple-400" />;
  if (type === 'action') return <CheckCircle size={11} className="text-white/80" />;
  return <User size={11} className="text-white/60" />;
};

export default function AuditTrail() {
  const entries = useAuditStore(s => s.entries);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={13} className="text-white/40" />
        <span className="text-xs text-white/40 uppercase tracking-wider">Simulated Audit Trail</span>
      </div>

      {entries.length === 0 && (
        <p className="text-xs text-white/20 italic">
          No actions yet. In production, every view, AI call, and coordinator action would be logged here with user ID, timestamp, and data accessed.
        </p>
      )}

      <div className="space-y-2">
        {[...entries].reverse().map(entry => (
          <div key={entry.id} className="flex gap-2.5 text-xs">
            <div className="mt-0.5 flex-shrink-0">{iconFor(entry.type)}</div>
            <div className="flex-1">
              <span className="text-white/80">{entry.message}</span>
              <div className="text-white/20 mt-0.5 flex items-center gap-2">
                <span>{entry.timestamp}</span>
                {entry.patientId && <span>· {entry.patientId}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {entries.length > 0 && (
        <p className="text-xs text-white/20 italic mt-4 pt-3 border-t border-white/[0.06]">
          In production: immutable log, stored 24 months, exportable for HIPAA audit.
        </p>
      )}
    </div>
  );
}

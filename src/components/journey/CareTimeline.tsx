import type { Patient } from '../../lib/types';

const outcomeColor: Record<string, string> = {
  completed: 'bg-emerald-500 border-emerald-400',
  no_show_patient: 'bg-red-500 border-red-400',
  no_show_driver: 'bg-orange-500 border-orange-400',
  cancelled_late: 'bg-amber-500 border-amber-400',
  cancelled_advance: 'bg-white/30 border-white/50',
  rescheduled: 'bg-blue-500 border-blue-400',
};

const outcomeLabel: Record<string, string> = {
  completed: 'Arrived',
  no_show_patient: 'No-show',
  no_show_driver: 'Driver miss',
  cancelled_late: 'Late cancel',
  cancelled_advance: 'Cancelled',
  rescheduled: 'Rescheduled',
};

export default function CareTimeline({ patient }: { patient: Patient }) {
  return (
    <div className="bg-white/[0.04] rounded-2xl px-5 py-4 border border-white/[0.06]">
      <div className="text-sm font-medium text-white mb-4">Care Timeline</div>
      <div className="relative">
        <div className="absolute top-3 left-0 right-0 h-px bg-white/[0.08]" />
        <div className="flex gap-3 overflow-x-auto pb-2">
          {patient.ride_history.map((ride, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[64px]">
              <div className={`w-6 h-6 rounded-full border-2 z-10 ${outcomeColor[ride.outcome] || 'bg-white/[0.06] border-white/20'}`}
                   title={outcomeLabel[ride.outcome]} />
              <div className="text-xs text-white/25 text-center whitespace-nowrap">
                {new Date(ride.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className={`text-xs font-medium ${
                ride.outcome === 'completed' ? 'text-emerald-400' :
                ride.outcome.startsWith('no_show') ? 'text-red-400' : 'text-amber-400'
              }`}>
                {outcomeLabel[ride.outcome]}
              </div>
            </div>
          ))}
          {/* Next appointment */}
          <div className="flex flex-col items-center gap-2 min-w-[64px]">
            <div className="w-6 h-6 rounded-full border-2 border-dashed border-amber-500 bg-amber-500/10 z-10 animate-pulse" />
            <div className="text-xs text-white/25 text-center whitespace-nowrap">{patient.next_appointment_label}</div>
            <div className="text-xs font-medium text-amber-400">Next</div>
          </div>
        </div>
      </div>
    </div>
  );
}

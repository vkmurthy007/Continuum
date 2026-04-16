import { Shield, AlertTriangle, Eye, ChevronDown } from 'lucide-react';

interface Props {
  onAccept: () => void;
}

const layers = [
  {
    icon: <Shield size={15} className="text-white/80" />,
    title: 'Fictional Data Only',
    body: 'All patient records, ride histories, and clinical signals are entirely fabricated. No real PHI is stored, transmitted, or processed anywhere in this demo.',
  },
  {
    icon: <AlertTriangle size={15} className="text-amber-400" />,
    title: 'AI Outputs Are Advisory — Not Clinical Documentation',
    body: 'Cascade simulations, arrival probabilities, and intervention recommendations are AI-generated estimates. They do not constitute medical advice and must not be used as the basis for clinical decisions. In production this tool would require FDA SaMD review before any clinical escalation feature goes live.',
  },
  {
    icon: <Eye size={15} className="text-white/60" />,
    title: 'Human in the Loop — Always',
    body: 'Every AI recommendation requires explicit coordinator confirmation before any action is logged. CONTINUUM surfaces signals; a human makes every decision.',
  },
  {
    icon: <Shield size={15} className="text-purple-400" />,
    title: 'Production Would Require Full HIPAA Architecture',
    body: 'Real deployment requires BAAs with all data partners, a HIPAA-compliant cloud environment, server-side API proxying (no keys in browser), patient consent under CCPA, and a complete audit trail. None of those exist in this demo.',
  },
];

export default function ComplianceModal({ onAccept }: Props) {
  return (
    <div className="bg-[#111111] flex flex-col" style={{ minHeight: '100dvh' }}>

      {/* Header — always visible at top */}
      <div className="px-6 pt-8 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <Shield size={20} className="text-white flex-shrink-0" />
          <span className="text-white font-semibold text-base leading-snug">CONTINUUM — Demo Notice</span>
        </div>
        <p className="text-xs text-white/40 leading-relaxed mt-1">
          This is a demo using fictional data. AI outputs are advisory only.
        </p>
      </div>

      {/* Enter Demo button — always above the fold */}
      <div className="px-6 pb-5 flex-shrink-0">
        <button
          onClick={onAccept}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold bg-white hover:bg-white/90 text-black transition-colors"
        >
          Enter Demo
        </button>
      </div>

      {/* Scroll hint */}
      <div className="flex items-center gap-2 px-6 pb-4 flex-shrink-0">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-xs text-white/20 flex items-center gap-1">
          <ChevronDown size={11} />
          Scroll to review compliance details
        </span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      {/* Scrollable compliance details */}
      <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-5">
        {layers.map((layer, i) => (
          <div key={i} className="flex gap-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-4">
            <div className="mt-0.5 flex-shrink-0">{layer.icon}</div>
            <div>
              <div className="text-sm font-medium text-white/90 mb-1">{layer.title}</div>
              <p className="text-xs text-white/40 leading-relaxed">{layer.body}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

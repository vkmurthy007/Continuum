import { Shield, AlertTriangle, Eye, CheckCircle } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      {/* Flex-col so the button is always visible — content scrolls, button stays pinned */}
      <div className="bg-[#111111] border border-white/[0.08] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg flex flex-col" style={{ maxHeight: '90dvh' }}>
        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3 mb-1">
              <Shield size={20} className="text-white" />
              <span className="text-white font-semibold text-base">CONTINUUM — Demo Compliance Notice</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Before proceeding, please review how this demo handles data and AI outputs.
            </p>
          </div>

          {/* Layers */}
          <div className="px-6 py-4 space-y-4">
            {layers.map((layer, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-0.5 flex-shrink-0">{layer.icon}</div>
                <div>
                  <div className="text-sm font-medium text-white/90 mb-0.5">{layer.title}</div>
                  <p className="text-xs text-white/40 leading-relaxed">{layer.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — always visible, never scrolled out of view */}
        <div className="px-6 pb-6 pt-4 border-t border-white/[0.08] flex-shrink-0">
          <button
            onClick={onAccept}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-black"
          >
            <CheckCircle size={15} />
            Enter Demo
          </button>
        </div>
      </div>
    </div>
  );
}

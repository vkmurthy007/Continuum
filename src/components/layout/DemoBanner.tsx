import { Shield, Lock } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="flex items-center gap-2 bg-[#111111] border-b border-white/[0.06] px-4 py-1.5 text-xs text-white/50">
      <Shield size={11} className="text-white/60 flex-shrink-0" />
      <span>
        <span className="text-white font-semibold">DEMO MODE</span>
        {' '}· All patient data is fictional · No real PHI · AI outputs are advisory only
      </span>
      <div className="ml-auto flex items-center gap-1 text-white/25">
        <Lock size={10} />
        <span>Anonymized IDs · Non-reversible hashing simulated</span>
      </div>
    </div>
  );
}

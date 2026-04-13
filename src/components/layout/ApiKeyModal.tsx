import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ApiKeyModal({ onClose }: Props) {
  const [key, setKey] = useState(localStorage.getItem('continuum_api_key') || '');

  const save = () => {
    localStorage.setItem('continuum_api_key', key);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 w-[420px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold text-white">Anthropic API Key</div>
            <div className="text-xs text-white/40 mt-0.5">Required for cascade simulation and intervention AI</div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors">
            <X size={18} />
          </button>
        </div>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="sk-ant-..."
          className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
        />
        <div className="text-xs text-white/25 mt-2 leading-relaxed">
          Stored in <strong className="text-white/40">localStorage only</strong> — never sent anywhere except directly to <code className="text-white/40">api.anthropic.com</code>.
        </div>
        <div className="text-xs text-amber-400/70 mt-2 leading-relaxed border border-amber-400/20 bg-amber-400/[0.06] rounded-xl px-2 py-1.5">
          ⚠ Demo limitation: in production, API calls would be proxied server-side so the key is never exposed in the browser.
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={save} className="flex-1 bg-white hover:bg-white/90 text-black text-sm py-2 rounded-xl font-medium transition-colors">
            Save Key
          </button>
          <button onClick={onClose} className="px-4 text-sm text-white/40 hover:text-white/80 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

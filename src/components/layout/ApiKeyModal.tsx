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
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-[420px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold text-white">Anthropic API Key</div>
            <div className="text-xs text-gray-500 mt-0.5">Required for cascade simulation and intervention AI</div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <X size={18} />
          </button>
        </div>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="sk-ant-..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
        />
        <div className="text-xs text-gray-600 mt-2">Stored in localStorage only. Never sent to any server except api.anthropic.com.</div>
        <div className="flex gap-2 mt-4">
          <button onClick={save} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm py-2 rounded-lg font-medium transition-colors">
            Save Key
          </button>
          <button onClick={onClose} className="px-4 text-sm text-gray-400 hover:text-gray-200">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import type { View } from '../../lib/types';
import { Activity, Map, Database, Key } from 'lucide-react';

interface Props {
  currentView: View;
  onNavigate: (v: View) => void;
  onApiKey: () => void;
}

const navItems: { id: View; label: string; sub: string; icon: React.ReactNode }[] = [
  { id: 'journey', label: 'Journey Map', sub: 'Patient care continuity', icon: <Activity size={18} /> },
  { id: 'desert', label: 'Care Desert', sub: 'Geographic intelligence', icon: <Map size={18} /> },
  { id: 'passport', label: 'Health Passport', sub: 'SDOH data product', icon: <Database size={18} /> },
];

export default function Sidebar({ currentView, onNavigate, onApiKey }: Props) {
  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="px-4 py-5 border-b border-gray-800">
        <div className="text-white font-bold text-lg tracking-wide">CONTINUUM</div>
        <div className="text-gray-500 text-xs mt-0.5">Uber Health · Care Intelligence</div>
      </div>

      <nav className="flex-1 py-3">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
              currentView === item.id
                ? 'bg-gray-800 text-white border-l-2 border-emerald-500'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            <span className="mt-0.5">{item.icon}</span>
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onApiKey}
          className="w-full flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors py-2"
        >
          <Key size={14} />
          Set API Key
        </button>
        <div className="text-xs text-gray-700 mt-2">Demo v1.0 · April 2026</div>
      </div>
    </aside>
  );
}

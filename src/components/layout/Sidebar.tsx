import type { View } from '../../lib/types';
import { Activity, Map, Database } from 'lucide-react';

interface Props {
  currentView: View;
  onNavigate: (v: View) => void;
  onApiKey?: () => void;
}

const navItems: { id: View; label: string; sub: string; icon: React.ReactNode }[] = [
  { id: 'journey', label: 'Journey Map', sub: 'Patient care continuity', icon: <Activity size={18} /> },
  { id: 'desert', label: 'Care Desert', sub: 'Geographic intelligence', icon: <Map size={18} /> },
  { id: 'passport', label: 'Health Passport', sub: 'SDOH data product', icon: <Database size={18} /> },
];

export default function Sidebar({ currentView, onNavigate }: Props) {
  return (
    <aside className="w-56 bg-[#1a1a1a] border-r border-white/[0.06] flex flex-col">
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="text-white font-semibold text-lg tracking-wide">CONTINUUM</div>
        <div className="text-white/25 text-xs mt-0.5">Uber Health · Care Intelligence</div>
      </div>

      <nav className="flex-1 py-3">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
              currentView === item.id
                ? 'bg-[#111111] text-white border-l-2 border-white'
                : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
            }`}
          >
            <span className="mt-0.5">{item.icon}</span>
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-white/25 mt-0.5">{item.sub}</div>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/[0.06]">
        <div className="text-xs text-white/20">Demo v1.0 · April 2026</div>
      </div>
    </aside>
  );
}

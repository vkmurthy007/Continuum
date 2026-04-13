import { CheckCircle, Circle } from 'lucide-react';

const INTEGRATIONS = [
  { id: 'epic', label: 'Epic FHIR R4', status: 'connected', detail: 'SMART on FHIR · Z-code push' },
  { id: 'cerner', label: 'Cerner Oracle', status: 'connected', detail: 'CDS Hooks integration' },
  { id: 'payer', label: 'Payer Platform', status: 'demo', detail: '837P + SDOH supplement' },
  { id: 'aco', label: 'ACO Dashboard', status: 'demo', detail: 'Population health API' },
];

export default function IntegrationDestinations() {
  return (
    <div className="p-4 border-b border-gray-800">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Integration Destinations</div>
      <div className="space-y-2">
        {INTEGRATIONS.map(int => (
          <div key={int.id} className="flex items-center gap-3 p-2.5 bg-gray-800/50 rounded-lg">
            {int.status === 'connected'
              ? <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
              : <Circle size={14} className="text-gray-600 flex-shrink-0" />
            }
            <div className="flex-1">
              <div className="text-sm text-gray-200">{int.label}</div>
              <div className="text-xs text-gray-600">{int.detail}</div>
            </div>
            <button className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2.5 py-1 rounded transition-colors">
              {int.status === 'connected' ? 'Send' : 'Demo'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

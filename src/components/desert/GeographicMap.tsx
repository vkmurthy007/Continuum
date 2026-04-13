import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { CareDesertInsight } from '../../lib/types';
import 'leaflet/dist/leaflet.css';

interface Props {
  insights: CareDesertInsight[];
}

const typeColor: Record<string, string> = {
  CARE_DESERT_ALERT: '#ef4444',
  POPULATION_DRIFT_ALERT: '#f97316',
  EMERGING_PATTERN: '#f59e0b',
};

export default function GeographicMap({ insights }: Props) {
  return (
    <div className="h-full relative">
      <div className="absolute top-4 left-4 z-[1000] bg-gray-900/90 border border-gray-700 rounded-lg px-3 py-2">
        <div className="text-xs font-semibold text-white mb-1.5">Care Desert Intelligence</div>
        <div className="space-y-1">
          {[
            { label: 'Care Desert Alert', color: '#ef4444' },
            { label: 'Population Drift', color: '#f97316' },
            { label: 'Emerging Pattern', color: '#f59e0b' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              <span className="text-xs text-gray-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <MapContainer
        center={[37.76, -122.20]}
        zoom={10}
        style={{ height: '100%', width: '100%', background: '#030712' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {insights.map(insight => (
          <CircleMarker
            key={insight.insight_id}
            center={[insight.lat, insight.lng]}
            radius={Math.min(8 + insight.affected_patient_count / 200, 30)}
            fillColor={typeColor[insight.type] || '#888'}
            color={typeColor[insight.type] || '#888'}
            weight={1}
            fillOpacity={0.5}
            opacity={0.8}
          >
            <Popup>
              <div style={{ background: '#111827', color: '#f9fafb', padding: 8, minWidth: 200, fontSize: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{insight.title}</div>
                <div style={{ color: '#9ca3af', marginBottom: 4 }}>{insight.geography_label}</div>
                <div>Patients affected: <strong>{insight.affected_patient_count.toLocaleString()}</strong></div>
                <div>Completion: <strong style={{ color: '#ef4444' }}>{Math.round(insight.completion_rate * 100)}%</strong> vs {Math.round(insight.platform_benchmark * 100)}% benchmark</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

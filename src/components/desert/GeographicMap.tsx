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
      <div className="absolute top-4 left-4 z-[1000] bg-black/80 border border-white/[0.08] rounded-2xl px-3 py-2 backdrop-blur-sm">
        <div className="text-xs font-medium text-white mb-1.5">Care Desert Intelligence</div>
        <div className="space-y-1">
          {[
            { label: 'Care Desert Alert', color: '#ef4444' },
            { label: 'Population Drift', color: '#f97316' },
            { label: 'Emerging Pattern', color: '#f59e0b' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              <span className="text-xs text-white/60">{item.label}</span>
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
              <div style={{ background: '#111111', color: '#ffffff', padding: 8, minWidth: 200, fontSize: 12, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{insight.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{insight.geography_label}</div>
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

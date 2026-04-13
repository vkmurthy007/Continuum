import insightsData from '../data/care_desert_insights.json';
import type { CareDesertInsight } from '../lib/types';
import GeographicMap from '../components/desert/GeographicMap';
import IntelligenceFeed from '../components/desert/IntelligenceFeed';

export default function CareDesertView() {
  const insights = insightsData as CareDesertInsight[];

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <GeographicMap insights={insights} />
      </div>
      <div className="w-96 bg-[#111111] border-l border-white/[0.06] overflow-y-auto">
        <IntelligenceFeed insights={insights} />
      </div>
    </div>
  );
}

import insightsData from '../data/care_desert_insights.json';
import type { CareDesertInsight } from '../lib/types';
import GeographicMap from '../components/desert/GeographicMap';
import IntelligenceFeed from '../components/desert/IntelligenceFeed';

export default function CareDesertView() {
  const insights = insightsData as CareDesertInsight[];

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-y-auto">
      <div className="h-64 md:h-auto md:flex-1 flex-shrink-0">
        <GeographicMap insights={insights} />
      </div>
      <div className="md:w-96 bg-[#111111] md:border-l border-t md:border-t-0 border-white/[0.06] overflow-y-auto">
        <IntelligenceFeed insights={insights} />
      </div>
    </div>
  );
}

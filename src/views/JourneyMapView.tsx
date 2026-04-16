import { useState } from 'react';
import type { Patient } from '../lib/types';
import patients from '../data/patients.json';
import PatientList from '../components/journey/PatientList';
import JourneyMapPanel from '../components/journey/JourneyMapPanel';
import { ChevronLeft } from 'lucide-react';

export default function JourneyMapView() {
  const [selected, setSelected] = useState<Patient>(patients[0] as Patient);
  const [mobileShowPanel, setMobileShowPanel] = useState(false);

  const handleSelect = (p: Patient) => {
    setSelected(p);
    setMobileShowPanel(true);
  };

  return (
    <div className="flex h-full">
      {/* Patient list — hidden on mobile when panel is open */}
      <div className={`${mobileShowPanel ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-auto`}>
        <PatientList
          patients={patients as Patient[]}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>

      {/* Journey panel — full screen on mobile when open */}
      <div className={`${mobileShowPanel ? 'flex' : 'hidden'} md:flex flex-col flex-1 overflow-hidden`}>
        {/* Mobile back button */}
        <div className="md:hidden flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-black">
          <button
            onClick={() => setMobileShowPanel(false)}
            className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            All Patients
          </button>
          <span className="ml-auto text-sm font-medium text-white">{selected.initials}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <JourneyMapPanel patient={selected} />
        </div>
      </div>
    </div>
  );
}

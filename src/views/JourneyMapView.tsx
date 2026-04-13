import { useState } from 'react';
import type { Patient } from '../lib/types';
import patients from '../data/patients.json';
import PatientList from '../components/journey/PatientList';
import JourneyMapPanel from '../components/journey/JourneyMapPanel';

export default function JourneyMapView() {
  const [selected, setSelected] = useState<Patient>(patients[0] as Patient);

  return (
    <div className="flex h-full">
      <PatientList
        patients={patients as Patient[]}
        selected={selected}
        onSelect={setSelected}
      />
      <JourneyMapPanel patient={selected} />
    </div>
  );
}

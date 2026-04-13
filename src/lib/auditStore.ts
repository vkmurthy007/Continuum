import { create } from 'zustand';

export interface AuditEntry {
  id: string;
  type: 'view' | 'ai' | 'action';
  message: string;
  timestamp: string;
  patientId?: string;
}

interface AuditStore {
  entries: AuditEntry[];
  log: (entry: Omit<AuditEntry, 'id' | 'timestamp'>) => void;
}

function now() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export const useAuditStore = create<AuditStore>((set) => ({
  entries: [],
  log: (entry) =>
    set(state => ({
      entries: [
        ...state.entries,
        { ...entry, id: crypto.randomUUID(), timestamp: now() },
      ].slice(-50), // keep last 50
    })),
}));

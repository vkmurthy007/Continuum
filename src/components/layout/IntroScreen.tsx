import { ArrowRight, Activity, Map, Database, Shield } from 'lucide-react';

interface Props {
  onContinue: () => void;
}

const stakeholders = [
  {
    role: 'Care Coordinators',
    description: 'Surface ride-behavior risk signals before a missed appointment — with ranked, Uber-executable interventions and a full audit trail.',
  },
  {
    role: 'Health Plan Clinical Ops',
    description: 'Monitor population-level care desert patterns and identify geographic clusters where transportation is driving avoidable readmissions.',
  },
  {
    role: 'Uber Health BD & Partnerships',
    description: 'Demonstrate the SDOH data product to payer and provider partners — showing transport behavior as a billable signal layer, not just a ride commodity.',
  },
  {
    role: 'Risk & Compliance Teams',
    description: 'Every AI output is advisory-only, every action requires human confirmation, and every interaction is logged — built compliance-forward from day one.',
  },
];

const modules = [
  {
    icon: <Activity size={16} className="text-white/60" />,
    name: 'Journey Map',
    description: 'Patient-level care continuity view. AI arrival probability, Claude-powered cascade simulation, and Uber-scoped intervention console.',
  },
  {
    icon: <Map size={16} className="text-white/60" />,
    name: 'Care Desert Intelligence',
    description: 'Population-level geographic failure analysis. Where is transportation the breaking point between a patient and their care plan?',
  },
  {
    icon: <Database size={16} className="text-white/60" />,
    name: 'Health Passport API',
    description: 'SDOH signal feed and data product explorer. Demonstrates how ride behavior becomes a structured, exportable clinical signal for payer partners.',
  },
];

export default function IntroScreen({ onContinue }: Props) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col overflow-y-auto z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
        <div>
          <div className="text-white font-semibold text-lg tracking-wide">CONTINUUM</div>
          <div className="text-white/25 text-xs mt-0.5">Uber Health · Care Orchestration Intelligence</div>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/20 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full">
          <Shield size={10} />
          Demo — No real PHI
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-8 py-12">

        {/* Hero */}
        <div className="mb-14">
          <div className="text-xs font-medium text-white/25 uppercase tracking-widest mb-4">Care Intelligence Platform</div>
          <h1 className="text-4xl font-semibold text-white leading-tight mb-5">
            Transportation behavior<br />is a clinical signal.
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-xl">
            CONTINUUM turns Uber Health's ride-booking behavioral data into predictive risk intelligence — surfacing care continuity failures before they happen, and delivering interventions within Uber Health's own toolkit.
          </p>
          <button
            onClick={onContinue}
            className="mt-7 bg-white hover:bg-white/90 text-black text-sm font-semibold px-6 py-3 rounded-2xl transition-colors flex items-center gap-2"
          >
            View Demo
            <ArrowRight size={15} />
          </button>
        </div>

        {/* The insight */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-5 mb-10">
          <div className="text-xs text-white/25 uppercase tracking-wider mb-3">The core insight</div>
          <p className="text-white/80 text-sm leading-relaxed">
            A dialysis patient whose booking lead time collapses from 6 weeks to 3 weeks is showing a measurable behavioral signal of planning breakdown — weeks before a missed appointment triggers a $18k readmission. Healthcare has the outcome data. Uber Health has the leading indicator. CONTINUUM closes that gap.
          </p>
        </div>

        {/* Modules */}
        <div className="mb-12">
          <div className="text-xs text-white/25 uppercase tracking-wider mb-4">Three modules</div>
          <div className="grid grid-cols-3 gap-3">
            {modules.map(m => (
              <div key={m.name} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-4">
                <div className="flex items-center gap-2 mb-2">
                  {m.icon}
                  <span className="text-sm font-medium text-white">{m.name}</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholders */}
        <div className="mb-12">
          <div className="text-xs text-white/25 uppercase tracking-wider mb-4">Built for</div>
          <div className="space-y-3">
            {stakeholders.map(s => (
              <div key={s.role} className="flex items-start gap-4 border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                <div className="text-sm font-medium text-white/80 w-52 flex-shrink-0">{s.role}</div>
                <div className="text-sm text-white/40 leading-relaxed">{s.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI & compliance callout */}
        <div className="flex gap-4 mb-12">
          <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-4">
            <div className="text-xs text-white/25 uppercase tracking-wider mb-2">AI moments</div>
            <div className="text-sm text-white/70 leading-relaxed">Claude powers two live AI features: <strong className="text-white/90">cascade simulation</strong> (what happens if a patient misses their appointment) and <strong className="text-white/90">intervention ranking</strong> (what Uber Health should do right now). Both require human confirmation before any action is logged.</div>
          </div>
          <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-4">
            <div className="text-xs text-white/25 uppercase tracking-wider mb-2">Compliance posture</div>
            <div className="text-sm text-white/70 leading-relaxed">Built compliance-forward: anonymized patient IDs, advisory-only AI labels, human-in-the-loop confirmation gates, CCPA notice on data sharing, and a real-time audit trail on every view and action.</div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onContinue}
          className="w-full bg-white hover:bg-white/90 text-black text-sm font-semibold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2"
        >
          View Demo
          <ArrowRight size={15} />
        </button>
        <p className="text-center text-xs text-white/20 mt-3">All patient data is fictional · No real PHI · AI outputs are advisory only</p>
      </div>
    </div>
  );
}

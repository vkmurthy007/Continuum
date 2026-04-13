# PRD: CONTINUUM
## Uber Health's AI-Native Care Orchestration Intelligence

**Author:** [Your Name]
**Status:** Draft v1.0
**Last Updated:** April 2026
**Intended Audience:** Engineering, Design, Data Science, Healthcare Partnerships, Leadership

---

## 0. The Founding Insight

Uber Health launched rider self-booking in March 2026 — giving patients direct control over organization-funded transportation. That feature unlocked something no one fully anticipated: a real-time behavioral signal stream on whether patients are actually engaging with their own care.

Not claims data. Not EHR notes. Not surveys. Actual movement. Actual booking choices. Actual no-shows. At individual patient level. Continuously.

No hospital has this. No payer has this. No EHR vendor has this.

**CONTINUUM is what you build when you understand what that signal stream actually is.**

It is not a better dashboard. It is not a smarter notification system. It is the first AI system that treats the entire care journey — across patients, providers, payers, and logistics — as a single interconnected system to be understood, predicted, and orchestrated in real time.

Uber Health's current positioning: a transportation platform that serves healthcare.
CONTINUUM's positioning: the connective tissue of the care journey itself.

---

## 1. Problem Statement

### 1.1 The fragmentation failure

Healthcare fails not primarily at the clinical level. It fails at the handoff level — the moments between a diagnosis and a treatment, between a discharge and a follow-up, between a scheduled appointment and an actual arrival. Every actor in the system holds one fragment:

- The hospital knows about the appointment
- The EHR knows about the diagnosis
- The payer knows about the claim (90 days later)
- The caregiver knows about the patient's home situation
- Nobody knows the patient missed their ride until the chair is empty

Uber Health now sits between all of these actors. It sees the movement — or the absence of it — that connects every piece. That position has never been occupied before. CONTINUUM is what that position makes possible.

### 1.2 The self-booking data unlock

Before self-booking, Uber Health saw coordinator-initiated ride events. Rich, but one-sided: an organization's behavior, not a patient's.

After self-booking, Uber Health sees patient-initiated behavior: when they book, how far in advance, whether they cancel, when they re-book, what time of day they prefer, whether they respond to reminders. This is a behavioral health dataset of a kind that has never existed at scale.

A patient who used to book rides 3 days in advance and now books same-day is showing a behavioral signal. A patient whose booking lead time collapses over 3 weeks before a hospitalization — that pattern is learnable. CONTINUUM learns it.

### 1.3 The SDOH measurement gap

80% of health outcomes are driven by social determinants of health (SDOH). Transportation access is the most measurable, most impactful, and least well-measured SDOH factor in existence.

Current SDOH measurement: annual surveys, ICD-10 Z-codes entered inconsistently by overwhelmed clinicians, insurance enrollment data. All lagging. All sparse. All inaccurate.

CONTINUUM generates the most accurate real-time SDOH dataset in existence — not as a byproduct, but as a core product.

---

## 2. Product Vision

CONTINUUM has three capabilities that have never existed in a single system:

### Capability 1 — The Living Care Thread
When a patient misses a ride, CONTINUUM does not log a no-show. It pulls the thread — understanding the downstream cascade of that miss across their care journey, coordinating response across every relevant actor, and learning from outcome to predict the next one earlier.

### Capability 2 — Care Desert Inversion
CONTINUUM identifies structural transportation failure patterns at population scale — specific corridors, specific appointment types, specific times — and surfaces infrastructure recommendations: where mobile care units should deploy, where telehealth activation should trigger, where care access is fundamentally broken and why.

### Capability 3 — The Behavioral Health Passport
Every ride, no-show, booking pattern, and behavioral signal becomes a longitudinal health record. CONTINUUM packages this as a structured, privacy-compliant SDOH data product that travels with the patient — and that payers, ACOs, and health systems will pay for because they cannot get it anywhere else.

---

## 3. Users

### Primary: Care Coordinator / Patient Navigator
- Manages 40-120 active patients with recurring transportation needs
- Currently operates reactively: learns about missed rides after the appointment slot is gone
- Needs: a proactive intelligence layer that tells them which patients are at risk before the miss
- Core question: "Which of my patients is about to fall off their care plan and what do I do right now?"

### Secondary: Uber Health Partner Success Manager
- Manages 20-50 healthcare organization accounts
- Needs: visibility into which organizations have populations showing structural care access failure
- Core question: "Where is the platform not working at a population level, and what is the systemic fix?"

### Tertiary: Health System / ACO Population Health Director
- Responsible for care quality and readmission rates across a patient population
- Needs: a leading indicator of care disengagement that shows up weeks before clinical deterioration
- Core question: "Which patients are drifting away from their care plans before I can see it in clinical data?"

### Quaternary: Payer / Value-Based Care Analyst
- Manages risk under value-based care contracts
- Needs: SDOH data that is current, behavioral, and individual-level — not survey-based
- Core question: "Which members have transportation barriers driving avoidable costs?"

---

## 4. The Three Screens

### Screen 1: The Journey Map

**Concept:** A living, patient-level view of the full care trajectory — not a ride tracker but a care continuity intelligence view.

**Layout:** Two-panel. Left: patient list sorted by CONTINUUM risk score. Right: selected patient Journey Map.

**Patient list columns:**
- Patient initials (anonymized)
- Condition type (Dialysis / Oncology / PT / Behavioral / Post-discharge)
- Next appointment (date + time)
- CONTINUUM risk score (0-100, color-coded)
- Risk reason (single phrase: "booking lead time collapse" / "two consecutive misses" / "caregiver unreachable" / "budget exhaustion in 4 days")
- Recommended action (single CTA button)

**Journey Map right panel sections:**

Care Timeline: A horizontal timeline showing the patient's last 90 days and next 30 days. Each appointment is a node. Color: green (arrived), red (missed), amber (at risk), gray (future). Clicking any node shows ride detail, booking behavior, and outcome.

AI Arrival Probability: For each upcoming appointment, a probability gauge (0-100%) with plain-English explanation:
"67% arrival probability. This patient has missed 2 of their last 5 sessions. Their last 3 rides were booked same-day, down from 48hr advance booking 6 weeks ago. Pattern matches pre-disengagement profiles in our training data."

Cascade Simulation (Claude API powered): What happens if this patient misses their next ride? The AI surfaces the downstream chain:
"If Patient A misses Wednesday dialysis → fluid load reaches critical threshold by Friday → ER admission probability: 41% within 14 days → estimated system cost: $18,400"
Each node in the cascade is clickable showing the clinical basis for the prediction.

Intervention Console: AI-ranked actions with predicted effectiveness:
1. Send caregiver notification (predicted lift: +18% arrival probability)
2. Reschedule to 2hr later pickup window (predicted lift: +12%)
3. Coordinator outreach call (predicted lift: +9%)
4. Escalate to clinical team (if cascade severity > threshold)
Each action is one-click to execute. Outcome is logged and fed back to the model.

Signal History: Sparkline charts for the last 90 days:
- Booking lead time trend
- Cancellation rate trend
- Caregiver response rate
- Arrival rate vs. patient cohort benchmark

---

### Screen 2: Care Desert Intelligence

**Concept:** A geographic + population intelligence view showing where transportation failure is structural, not individual — and what to do about it.

**Layout:** Full-width map (left 60%) + Intelligence Feed (right 40%)

**The Map:**
City/region-level view with overlays:
- Heat map: concentration of no-shows and ride failures by zip code
- Appointment type filter: show only dialysis, only oncology, etc.
- Time filter: surface patterns that occur only at specific times (6-8am peak)
- Driver supply overlay: toggle to show where Uber driver density is lowest during healthcare pickup windows

**Intelligence Feed right panel:**
Each item is an AI-generated insight card with: affected patient count, estimated downstream cost, confidence level, action button.

Sample insight types:
- Care Desert Alert: structural supply-demand mismatch in a corridor
- Population Drift Alert: completion rate decline coinciding with org change
- Emerging Pattern: Friday discharge patients show 2.3x higher no-show at 72hr follow-up

Infrastructure Recommendation Engine: Ranked list of AI-generated proposals:
- Mobile dialysis unit opportunity (with ROI model)
- Telehealth activation zones
- Driver incentive zones by time window

---

### Screen 3: The Health Passport API Explorer

**Concept:** Demonstration of CONTINUUM's B2B data product — the SDOH signal feed that makes CONTINUUM a platform, not just a product.

**Layout:** Three-column API explorer.

Left column: Patient population selector (Dialysis / Oncology / Post-discharge / I/DD / Behavioral Health) with aggregate stats.

Center column: Live-updating signal feed, each structured as a data object:
{
  "patient_id": "anon_8a2f91",
  "signal_type": "transportation_adherence_decline",
  "severity": "high",
  "condition": "ESRD",
  "completion_rate_current": 0.61,
  "completion_rate_prior": 0.89,
  "predicted_readmission_risk_30d": 0.38,
  "recommended_sdoh_code": "Z59.4",
  "confidence": 0.84
}

Right column: Integration destinations (Epic FHIR R4, Cerner, payer platform, ACO dashboard) with integration status and one-click demo send.

Bottom: ROI calculator. Input: member population size + current readmission rate. Output: estimated avoided readmissions, cost savings, SDOH documentation improvement.

---

## 5. AI Models

### 5.1 Arrival Prediction Model

Type: Gradient boosted classifier with transformer fine-tune for sequence features

Inputs:
- Patient ride history: completion rate, cancellation rate, lead time trend (sequence not aggregate)
- Appointment type and clinical acuity score
- Caregiver contact responsiveness history
- Organizational behavior: coordinator activation rate, policy configuration quality
- Geographic: driver supply density at pickup time, historical completion rate for corridor
- Temporal: day of week, time of day, days since last completed ride, proximity to prior miss sequences

Output: Arrival probability 0-100%, updated every 6 hours per scheduled ride, with plain-English explanation of top 3 drivers

### 5.2 Health Signal Engine

Type: Anomaly detection + time-series classification

Core insight: Transportation adherence patterns are a leading indicator of health status change. The model learns the signature of pre-deterioration behavioral drift from historical patients whose transportation patterns preceded an adverse clinical event.

Signal types:
- ADHERENCE_DECLINE: sustained downward trend in completion rate over 14-21 days
- LEAD_TIME_COLLAPSE: booking advance window shrinking over time (proxy for executive function decline or disengagement)
- CAREGIVER_DISCONNECT: increasing gap between patient booking and caregiver confirmation
- APPOINTMENT_AVOIDANCE: pattern of rescheduling rather than cancelling (subtle disengagement signal)
- BUDGET_PROXIMITY_ANXIETY: spike in same-day cancellations when monthly ride limit is approaching

### 5.3 Policy Simulation Engine

Type: Causal inference model (propensity-weighted observational study design)

Purpose: Given a proposed policy change at an organization, predict population-level outcome impact before deployment.

Output: Predicted change in completion rate (with confidence interval), predicted change in budget utilization, predicted change in rider activation rate, flag for potential unintended consequences.

---

## 6. Data Model

Patient (anonymized)
- patient_id (hashed, non-reversible)
- condition_type (enum: ESRD, oncology, behavioral, PT, post_discharge, IDD, other)
- organization_id (FK)
- ride_limit_monthly
- budget_remaining
- continuum_score (float 0-100, updated daily)
- risk_tier (enum: stable, watch, at_risk, critical)
- primary_signal_type

RideEvent
- ride_id
- patient_id (FK)
- scheduled_at
- booking_created_at
- lead_time_hours (computed)
- outcome (enum: completed, no_show_patient, no_show_driver, cancelled_advance, cancelled_late, rescheduled)
- caregiver_notified (bool)
- caregiver_responded (bool)
- intervention_triggered (bool)
- post_intervention_outcome

CareSignal
- signal_id
- patient_id (FK)
- signal_type
- severity (enum: low, medium, high, critical)
- detected_at
- confidence (float)
- feature_attribution (JSON: top 3 drivers with weights)
- recommended_sdoh_code (ICD-10 Z-code)
- routed_to (array: care_team, coordinator, payer, ehr)
- resolved (bool)
- resolution_outcome (enum: intervention_succeeded, patient_disengaged, clinical_event_occurred, false_positive)

CareDesertInsight
- insight_id
- geography_type (enum: zip, corridor, city, region)
- geography_key
- affected_patient_count
- completion_rate (float)
- platform_benchmark_completion_rate (float)
- hypothesized_cause (enum: supply_demand, org_transition, policy_misconfiguration, structural_access)
- confidence (float)
- infrastructure_recommendation
- estimated_downstream_cost (float)

InterventionLog
- log_id
- patient_id (FK)
- triggered_by_signal (FK)
- intervention_type (enum: caregiver_notify, coordinator_call, reschedule_offer, clinical_escalation, rider_outreach)
- recommended_by (enum: ai, coordinator, system_rule)
- executed_at
- predicted_lift (float)
- actual_outcome
- lift_realized (float, computed)

HealthPassportRecord
- record_id
- patient_id (FK)
- period_start / period_end
- adherence_score (float)
- predicted_readmission_risk_30d (float)
- predicted_readmission_risk_90d (float)
- recommended_sdoh_codes (array)
- export_destinations (array: epic, cerner, payer_platform, aco_dashboard)

---

## 7. Intervention Logic

Level 1 — Automated (no human required)
Triggered: signal severity medium + caregiver on file
Actions: push caregiver notification, send rider app reminder with reschedule offer, log action and predicted lift

Level 2 — Coordinator-assisted (AI recommends, human executes)
Triggered: signal severity high OR no caregiver on file
Actions: surfaces in coordinator intervention queue ranked by cascade severity, AI provides reason + recommended action + predicted lift + script suggestion, coordinator executes with one click

Level 3 — Clinical escalation (AI flags, clinical team acts)
Triggered when:
- 30-day readmission risk > 35%
- Three consecutive missed high-acuity appointments
- LEAD_TIME_COLLAPSE sustained > 14 days for ESRD or oncology patient
Routes to clinical team via EHR alert or secure message

---

## 8. Sample Data for Demo

6 sample patients:

Patient A | ESRD / Dialysis | Risk: 82 Critical | Signal: Lead time collapse 3 weeks | Next: Wed 7am | Cascade: 41% readmission in 14 days if missed
Patient B | Oncology / Infusion | Risk: 61 At Risk | Signal: Caregiver disconnect, 2 missed in 30 days | Next: Thu 10am | Cascade: Treatment delay, protocol deviation risk
Patient C | Post-discharge | Risk: 44 Watch | Signal: First 72hr follow-up, no prior ride history | Next: Tomorrow 2pm | Cascade: High vulnerability window, no baseline
Patient D | Behavioral Health | Risk: 28 Stable | Signal: None, consistent 3-month history | Next: Fri 11am | Cascade: Low, monitoring only
Patient E | I/DD | Risk: 71 At Risk | Signal: Budget exhaustion in 5 days | Next: Mon-Wed-Fri | Cascade: Rides will fail silently when budget hits $0
Patient F | Physical Therapy | Risk: 19 Stable | Signal: Optimized, 100% last 12 rides | Next: Mon | Cascade: None

3 Care Desert Insight cards:
1. 94621 corridor dialysis — 3,200 patients, 61% vs 88% platform avg, driver density -43% before 7am, $4.2M/year downstream cost
2. Hillside Behavioral Health — 34% completion decline over 8 weeks, coordinator staffing change, org transition failure pattern
3. Friday post-discharge — 2.3x higher no-show at 72hr follow-up vs Mon-Thu, 6 hospitals affected, weekend coverage gap hypothesis

---

## 9. Success Metrics

Signal quality:
- Arrival prediction model AUC > 0.82 at 7-day horizon
- False positive rate < 18% at 70% threshold
- Health signal precision > 60% for high-severity signals (% flagged patients with documented clinical event within 30 days)

Intervention effectiveness:
- Level 1 automated interventions: +22% lift vs no-intervention control
- Level 2 coordinator actions within 24 hours: 75% target
- Cascade event reduction in CONTINUUM-active cohort vs matched control: 15% at 6 months

Platform adoption:
- Coordinators using intervention queue daily: 65% within 90 days
- Partner orgs with at least one SDOH signal exported to EHR: 40% within 6 months
- Payer Health Passport contracts: 3 in year 1

Business impact:
- No-show rate reduction in CONTINUUM-active portfolio: 20%
- Net Revenue Retention improvement vs control accounts: +8 NRR points
- Health Passport data product ARR year 1: $2M

---

## 10. Technical Architecture (Demo Scope)

Stack:
- React + Vite
- Recharts (sparklines, gauges)
- Leaflet.js (Care Desert map)
- TailwindCSS
- Mock JSON data layer
- Anthropic API (claude-sonnet-4-20250514) for live cascade simulation and intervention generation

Claude API usage in demo — two live AI moments:

Moment 1: Cascade Simulation
When coordinator clicks "Simulate Miss" on a patient's upcoming appointment, calls Claude API with patient condition, history, and appointment type to generate a real-time cascade narrative.

const cascadePrompt = `
You are CONTINUUM's care cascade simulation engine.
Patient profile:
- Condition: ${patient.condition}
- Appointment type: ${patient.appointmentType}
- Appointment acuity: ${patient.acuity}
- Recent history: ${patient.rideHistory}
If this patient misses their next appointment, simulate the downstream
care cascade. Be specific about clinical implications, timeframes, and
estimated system costs. Output as structured JSON with fields:
cascade_steps (array), readmission_probability_14d, estimated_cost,
confidence, clinical_basis.
`;

Moment 2: Intervention Recommendation
When coordinator opens a high-risk patient, Claude generates a personalized plain-English intervention recommendation explaining exactly why this patient is at risk and what to do.

Component tree:
App
├── Sidebar (Journey Map / Care Desert / Health Passport)
├── JourneyMapView
│   ├── PatientList (sorted by CONTINUUM score)
│   ├── JourneyMapPanel
│   │   ├── CareTimeline
│   │   ├── ArrivalProbabilityGauge
│   │   ├── CascadeSimulator (Claude API)
│   │   ├── InterventionConsole
│   │   └── SignalHistory
├── CareDesertView
│   ├── GeographicMap (Leaflet)
│   ├── IntelligenceFeed
│   └── InfrastructureRecommendations
└── HealthPassportView
    ├── PopulationSelector
    ├── SignalFeed
    ├── IntegrationDestinations
    └── ROICalculator

Mock data files needed:
- patients.json
- care_signals.json
- care_desert_insights.json
- intervention_outcomes.json
- health_passport_records.json
- portfolio_trends.json

---

## 11. Compliance and Privacy

- No patient PII stored or transmitted
- All patient data referenced by hashed non-reversible ID
- Health Passport requires explicit org opt-in and HIPAA BAA coverage
- All AI clinical risk scores carry confidence interval and disclaimer: "This is a logistics-derived behavioral signal, not a clinical diagnosis"
- Cascade simulation outputs labeled "AI-generated estimate" — cannot be used as clinical documentation
- Level 3 escalations route through existing clinical infrastructure (EHR secure messaging), not CONTINUUM direct channels
- CONTINUUM is positioned as care coordination tool, not CDSS, to avoid FDA SaMD classification in v1
- Health Passport SDOH signals map to Z-codes (administrative) not clinical diagnosis codes
- All AI recommendations are advisory — human in the loop preserved at every clinical touchpoint

---

## 12. Phased Roadmap

v1 — Demo / Pilot (current scope):
Journey Map with Claude-powered cascade simulation, Care Desert visualization, Health Passport API explorer, 6 sample patients, manual intervention logging

v2 — Pilot with 3-5 health systems:
Real data integration (de-identified, HIPAA compliant), arrival prediction model on historical Uber Health data, Epic FHIR R4 integration pilot, intervention outcome tracking

v3 — Platform launch:
Health Passport as purchased data product, payer integration (2-3 initial contracts), Policy Simulation Engine live, Care Desert Infrastructure Recommendation Engine live, coordinator mobile app

v4 — Care orchestration platform:
Multi-modal care coordination (transportation + pharmacy + telehealth routing), real-time clinical system bidirectional integration, autonomous Level 1 intervention at scale, ACO population health partnership

---

## 13. Open Questions

1. Clinical advisory board: CONTINUUM's health signal engine maps behavioral patterns to clinical risk. Who are the right clinical partners for v2 pilot validation?

2. EHR integration sequencing: Epic vs. Cerner vs. smaller EHRs — which integration unlocks the most value fastest?

3. Signal vs. noise calibration: How many AI-generated flags are too many? Coordinator trust depends on signal precision. Precision threshold for Level 2 signals should be validated with coordinator user research in v2.

4. Health Passport pricing model: PMPM tied to signal volume? Annual license? Outcome-based pricing (share of avoided admission cost)?

5. Autonomous vs. assisted intervention: At what signal severity threshold, if any, is it appropriate for CONTINUUM to act without coordinator review? Ethics and liability question requiring legal and clinical input before v3.

---

## 14. Narrative Pitch

Healthcare does not fail because clinicians are bad at their jobs. It fails because the system has no connective tissue — no layer that understands a patient's entire care journey, across every actor, in real time.

Uber Health's self-booking launch created something that has never existed before: a real-time behavioral signal stream on whether patients are actually engaging with their care. That signal is more accurate than claims data. More current than EHR notes. More honest than any survey.

CONTINUUM is what you build when you understand what that signal actually is. Not a better dashboard. Not a smarter notification. The connective tissue the healthcare system has always been missing — an AI that treats the care journey as a system to be understood, predicted, and orchestrated in real time.

Uber Health moves patients. CONTINUUM makes sure those patients arrive — and makes the entire care system smarter every time they do.

---

## 15. Change Log

| Date | Section Changed | What Changed | Why |
|---|---|---|---|
| 2026-04-13 | All | Initial PRD created | First draft |

---

*End of PRD v1.0*

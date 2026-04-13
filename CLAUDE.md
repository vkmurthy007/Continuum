# CONTINUUM — Claude Code Instructions

You have access to `ContinuumContinuumPRD.md` in this repo. It is the single source of truth for this project.

## Your standing rule for every session

Whenever we make a decision that changes scope, adds a feature, removes something, or changes a data model — **update `ContinuumContinuumPRD.md` to reflect the current state of the project before writing any code**.

This includes:
- Adding or removing a screen or component
- Changing a data model field or entity
- Changing an AI model approach or prompt
- Cutting something to a later version
- Changing a library, framework, or architectural decision
- Any deliberate deviation from what the PRD currently says

## How to update ContinuumPRD.md

Edit the relevant section in place. The PRD should always read as the current plan — not the original plan plus a list of changes.

After every PRD update, run:

git add ContinuumPRD.md && git commit -m "PRD: [one line describing what changed and why]"

Then append a row to the Change Log in Section 15.

## What CONTINUUM is

An AI-native care orchestration intelligence platform built on Uber Health's self-booking behavioral data. Three screens:

1. Journey Map — patient-level care continuity view with Claude-powered cascade simulation
2. Care Desert Intelligence — population-level geographic failure pattern analysis
3. Health Passport API Explorer — SDOH data product demonstration

## Stack

- React + Vite
- TailwindCSS
- Recharts (sparklines, gauges)
- Leaflet.js (Care Desert map)
- Anthropic API claude-sonnet-4-20250514 (cascade simulation + intervention recommendation)
- Mock JSON data layer — no backend in v1

## Claude API usage

Two live AI moments in the demo:

Moment 1 — Cascade Simulation (Journey Map screen)
Called when coordinator clicks "Simulate Miss" on a patient's upcoming appointment.
Prompt includes: patient condition, appointment type, acuity, recent ride history.
Returns: cascade_steps array, readmission_probability_14d, estimated_cost, confidence, clinical_basis.

Moment 2 — Intervention Recommendation (Journey Map screen)
Called when coordinator opens a high-risk patient.
Returns: plain-English explanation of why the patient is at risk + ranked intervention recommendations.

API call pattern:
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }]
  })
});

## Mock data files to create

- src/data/patients.json (6 patients — see PRD Section 8)
- src/data/care_signals.json
- src/data/care_desert_insights.json (3 insights — see PRD Section 8)
- src/data/intervention_outcomes.json
- src/data/health_passport_records.json
- src/data/portfolio_trends.json

## Build order

1. Mock data layer first
2. JourneyMapView (PatientList + JourneyMapPanel)
3. CascadeSimulator with Claude API
4. CareDesertView (map + intelligence feed)
5. HealthPassportView (signal feed + ROI calculator)
6. Polish + narrative framing

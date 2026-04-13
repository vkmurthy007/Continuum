import type { CascadeResult, InterventionRecommendation, Patient } from './types';

const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// Always use the server-side proxy — key never touches the browser
const API_URL = '/api/claude';

async function callClaude(body: object): Promise<{ content: Array<{ text: string }> }> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error: ${err}`);
  }

  return response.json();
}

export async function simulateCascade(patient: Patient): Promise<CascadeResult> {
  const rideHistorySummary = patient.ride_history
    .slice(-5)
    .map(r => `${r.date}: ${r.outcome} (lead time: ${r.lead_time_hours}h)`)
    .join(', ');

  const prompt = `You are CONTINUUM's care cascade simulation engine. A care coordinator needs to understand the downstream consequences of a missed appointment.

Patient profile:
- Condition: ${patient.condition_type} (${patient.condition_label})
- Appointment type: ${patient.appointment_type}
- Appointment acuity: ${patient.acuity}
- Recent ride history (last 5): ${rideHistorySummary}
- Current risk signal: ${patient.primary_signal || 'none'}
- Arrival probability: ${patient.arrival_probability}%

If this patient misses their next appointment (${patient.next_appointment_label}), simulate the downstream care cascade. Be specific about clinical implications, timeframes, and estimated system costs.

Respond ONLY with valid JSON in this exact format:
{
  "cascade_steps": [
    {"step": "description of what happens", "timeframe": "e.g. Within 24 hours", "probability": 0.85},
    {"step": "next consequence", "timeframe": "e.g. Day 3-5", "probability": 0.6},
    {"step": "further consequence", "timeframe": "e.g. Day 7-14", "probability": 0.41}
  ],
  "readmission_probability_14d": 0.41,
  "estimated_cost": 18400,
  "confidence": 0.78,
  "clinical_basis": "One sentence explaining the clinical reasoning."
}`;

  const data = await callClaude({
    model: CLAUDE_MODEL,
    max_tokens: 800,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = data.content[0].text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Could not parse cascade response');
  return JSON.parse(jsonMatch[0]) as CascadeResult;
}

export async function getInterventionRecommendation(patient: Patient): Promise<InterventionRecommendation> {
  const prompt = `You are CONTINUUM's intervention recommendation engine. A care coordinator is reviewing a high-risk patient.

Patient profile:
- Condition: ${patient.condition_label}
- Risk score: ${patient.continuum_score}/100 (${patient.risk_tier})
- Primary signal: ${patient.primary_signal || 'none'}
- Signal description: ${patient.signal_label}
- Arrival probability: ${patient.arrival_probability}%
- Budget remaining: $${patient.budget_remaining}
- Next appointment: ${patient.next_appointment_label} (${patient.appointment_type})

Explain in 2-3 plain English sentences why this patient is at risk. Then provide 3 ranked intervention recommendations.

Respond ONLY with valid JSON:
{
  "explanation": "2-3 sentence plain English explanation of why this patient is at risk and what pattern you're detecting.",
  "interventions": [
    {"action": "Specific action to take", "predicted_lift": 0.18, "urgency": "immediate"},
    {"action": "Second action", "predicted_lift": 0.12, "urgency": "within_24h"},
    {"action": "Third action", "predicted_lift": 0.09, "urgency": "this_week"}
  ]
}`;

  const data = await callClaude({
    model: CLAUDE_MODEL,
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = data.content[0].text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Could not parse intervention response');
  return JSON.parse(jsonMatch[0]) as InterventionRecommendation;
}

export type RiskTier = 'stable' | 'watch' | 'at_risk' | 'critical';
export type SignalType = 'LEAD_TIME_COLLAPSE' | 'ADHERENCE_DECLINE' | 'CAREGIVER_DISCONNECT' | 'BUDGET_PROXIMITY_ANXIETY' | 'APPOINTMENT_AVOIDANCE' | null;
export type View = 'journey' | 'desert' | 'passport';

export interface RideHistory {
  date: string;
  outcome: 'completed' | 'no_show_patient' | 'no_show_driver' | 'cancelled_advance' | 'cancelled_late' | 'rescheduled';
  lead_time_hours: number;
}

export interface Patient {
  patient_id: string;
  initials: string;
  condition_type: string;
  condition_label: string;
  organization: string;
  next_appointment: string;
  next_appointment_label: string;
  appointment_type: string;
  acuity: 'low' | 'medium' | 'high';
  continuum_score: number;
  risk_tier: RiskTier;
  primary_signal: SignalType;
  signal_label: string;
  recommended_action: string;
  ride_limit_monthly: number;
  budget_remaining: number;
  ride_history: RideHistory[];
  arrival_probability: number;
  arrival_explanation: string;
  sparkline_lead_time: number[];
  sparkline_completion: number[];
  sparkline_caregiver: number[];
}

export interface CareDesertInsight {
  insight_id: string;
  type: 'CARE_DESERT_ALERT' | 'POPULATION_DRIFT_ALERT' | 'EMERGING_PATTERN';
  title: string;
  geography_label: string;
  lat: number;
  lng: number;
  affected_patient_count: number;
  completion_rate: number;
  platform_benchmark: number;
  driver_density_delta: number;
  driver_density_label: string;
  estimated_downstream_cost: number;
  confidence: number;
  hypothesized_cause: string;
  infrastructure_recommendation: string;
  action_label: string;
}

export interface HealthPassportRecord {
  record_id: string;
  patient_id: string;
  condition: string;
  signal_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  completion_rate_current: number;
  completion_rate_prior: number;
  predicted_readmission_risk_30d: number;
  predicted_readmission_risk_90d: number;
  recommended_sdoh_code: string;
  confidence: number;
  export_destinations: string[];
}

export interface CascadeResult {
  cascade_steps: Array<{ step: string; timeframe: string; probability: number }>;
  readmission_probability_14d: number;
  estimated_cost: number;
  confidence: number;
  clinical_basis: string;
}

export interface InterventionRecommendation {
  explanation: string;
  interventions: Array<{
    action: string;
    predicted_lift: number;
    urgency: 'immediate' | 'within_24h' | 'this_week';
  }>;
}

// ---------------------------------------------------------------------------
// Legacy types — retained for backward compatibility with existing components
// ---------------------------------------------------------------------------

export type FacilityType = 'dialysis' | 'oncology' | 'pt' | 'discharge' | 'behavioral' | 'infusion' | 'other';
export type Tier = 'optimized' | 'developing' | 'at_risk' | 'underutilizing';
export type Metric = 'rcr' | 'blt' | 'nsab' | 'sar' | 'flq';
export type TrendDirection = 'up' | 'down' | 'stable';
export type InteractionType = 'call' | 'email' | 'onsite' | 'platform_message';
export type ActivityOutcome = 'resolved' | 'pending' | 'escalated' | null;
export type InterventionType = 'ehr_integration' | 'staff_training' | 'outcome_reporting' | 'escalation';
export type Severity = 'critical' | 'high' | 'medium';

export interface Facility {
  facility_id: string;
  name: string;
  facility_type: FacilityType;
  city: string;
  state: string;
  account_manager_id: string;
  account_age_days: number;
  prs_score: number;
  tier: Tier;
  m1_rcr: number;
  m2_blt: number;
  m3_nsab: number;
  m4_sar: number;
  m5_flq: number;
  primary_drag_metric: Metric | null;
  score_trend: TrendDirection;
  score_delta: number;
  rides_last_30d: number;
  no_show_driver_pct: number;
  provisioned_staff: number;
  last_touch_date: string | null;
}

export interface Intervention {
  intervention_id: string;
  rule_id: string;
  type: InterventionType;
  title: string;
  description: string;
  action_steps: string[];
  escalation_path: string;
  trigger_metric: string;
  severity: Severity;
}

export interface StaffMember {
  account_id: string;
  facility_id: string;
  name: string;
  role: string;
  last_login_at: string | null;
  rides_booked_30d: number;
  outcomes_submitted_30d: number;
  is_active: boolean;
}

export interface ActivityLogEntry {
  activity_id: string;
  facility_id: string;
  account_manager_id: string;
  account_manager_name: string;
  activity_date: string;
  contact_name: string;
  interaction_type: InteractionType;
  notes: string;
  outcome: ActivityOutcome;
}

export interface PortfolioTrends {
  weekly_scores: WeeklyScore[];
  metric_benchmarks: MetricBenchmarks;
  intervention_outcomes: InterventionOutcome[];
}

export interface WeeklyScore {
  week: string;
  avg_prs: number;
  optimized_pct: number;
  developing_pct: number;
  at_risk_pct: number;
  underutilizing_pct: number;
}

export interface MetricBenchmarks {
  portfolio: Record<string, number>;
  global: Record<string, number>;
}

export interface InterventionOutcome {
  facility_name: string;
  intervention_type: string;
  date_initiated: string;
  prs_before: number;
  prs_after: number | null;
  status: 'in_progress' | 'resolved' | 'no_change' | 'escalated';
}

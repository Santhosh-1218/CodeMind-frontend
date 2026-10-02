export interface Finding {
  id: string;
  title: string;
  category: 'Security' | 'Bug' | 'Quality' | 'Performance' | 'Architecture';
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  file_path: string;
  line_number?: number;
  line_end?: number;
  snippet?: string;
  description: string;
  rationale?: string;
  fix_recommendation: string;
  confidence: number;
  evidence: string[];
  memory_influenced: boolean;
  hindsight_memory_text?: string;
}

export interface ReviewFile {
  id: string;
  path: string;
  language: string;
  content: string;
  size: number;
}

export interface ReviewReport {
  id: string;
  project_id: string;
  project_name: string;
  repo_url?: string;
  source_type: string;
  status: string;
  status_message: string;
  overall_score: number;
  quality_score: number;
  security_score: number;
  reliability_score: number;
  maintainability_score: number;
  summary?: string;
  languages: string[];
  file_count: number;
  critical_count: number;
  high_count: number;
  medium_count: number;
  low_count: number;
  info_count: number;
  hindsight_memories_recalled: number;
  hindsight_learnings_retained: number;
  created_at: string;
  completed_at?: string;
  findings: Finding[];
  files: ReviewFile[];
}

export interface ReviewStatus {
  id: string;
  status: string;
  status_message: string;
  quality_score: number;
  security_score: number;
  maintainability_score: number;
  file_count: number;
  completed_at?: string;
}

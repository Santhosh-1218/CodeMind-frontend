export interface MemoryItem {
  id: string;
  text: string;
  type: string;
  context?: string;
  created_at?: string;
}

export interface RecurringIssueItem {
  category: string;
  title: string;
  count: number;
  severity: string;
  description: string;
}

export interface LearnedPreferenceItem {
  category: string;
  preference: string;
  confidence: number;
  example: string;
}

export interface LearningTimelineItem {
  date: string;
  project_name: string;
  quality_score: number;
  security_score: number;
  memories_recalled: number;
  learnings_retained: number;
}

export interface LearningStatsResponse {
  total_memories: number;
  total_reviews_analyzed: number;
  recurring_issues: RecurringIssueItem[];
  learned_preferences: LearnedPreferenceItem[];
  timeline: LearningTimelineItem[];
  recent_memories: MemoryItem[];
}

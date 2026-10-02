export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  provider: string;
  reviews_count: number;
  projects_count: number;
  files_analyzed?: number;
  issues_detected?: number;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

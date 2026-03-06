export interface UseCase {
  function: string;
  use_case: string;
  description: string;
  companies_doing_it: string[];
  tools_used: string[];
  results: string;
  sources: string[];
}

export interface GeneralTool {
  category: string;
  name: string;
  url: string;
  description: string;
  supply_chain_relevance: string;
  pricing_model: string;
}

export interface Platform {
  name: string;
  url: string;
  founded: string;
  funding: string;
  description: string;
  function: string;
  key_customers: string[];
  ai_approach: string;
}

export interface LearningResource {
  type: string;
  name: string;
  url: string;
  description: string;
  cost: string;
  level: string;
}

export interface ContentOutline {
  title: string;
  slug: string;
  outline: string[];
}

export interface IndividualProject {
  id: string;
  project_name: string;
  creator: string;
  description: string;
  what_they_built?: string;
  tools_used: string[];
  link: string;
  secondary_links?: string[];
  category: string;
  why_inspiring?: string;
  sc_application?: string;
}

export interface InspirationData {
  metadata: {
    title: string;
    description: string;
    version: string;
    last_updated: string;
    total_type1_projects: number;
    total_type2_projects: number;
    research_sources: string;
  };
  type1_supply_chain_ai_projects: IndividualProject[];
  type2_general_ai_projects_for_sc: IndividualProject[];
  additional_resources: {
    kaggle_competitions: Array<{ name: string; url: string; description: string }>;
    open_source_sc_planning_tools: Array<{ name: string; url: string; description: string }>;
    key_learning_channels: Array<{ name: string; url: string; description: string }>;
    curated_reference_lists: Array<{ name: string; url: string; description: string }>;
  };
}

// Monetization types
export interface MonetizationFields {
  id: string;
  affiliate_url?: string | null;
  is_featured?: boolean;
  featured_priority?: number;
  sponsor_label?: string | null;
}

export interface AdPlacement {
  id: string;
  slot_name: string;
  title: string;
  image_url: string | null;
  destination_url: string;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  impressions: number;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export interface LinkClick {
  id: string;
  resource_type: 'tool' | 'platform';
  resource_id: string;
  resource_name: string | null;
  click_type: 'outbound' | 'affiliate';
  referrer_path: string | null;
  created_at: string;
}

export interface UserProfile {
  id: string;
  display_name: string | null;
  company: string | null;
  role: string | null;
  tier: 'free' | 'pro';
  saved_resources: string[];
  assessment_results: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ResourceData {
  metadata: {
    title: string;
    version: string;
    last_updated: string;
    total_resources: number;
    notes: string;
  };
  use_cases: UseCase[];
  general_tools: GeneralTool[];
  platforms: Platform[];
  learning_resources: LearningResource[];
  content_outlines: ContentOutline[];
}

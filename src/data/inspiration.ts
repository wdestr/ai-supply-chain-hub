import rawData from './individual_ai_projects.json';
import type { IndividualProject } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = rawData as any;

export const inspirationMetadata = data.metadata;
export const scProjects: IndividualProject[] = data.type1_supply_chain_ai_projects;
export const generalProjects: IndividualProject[] = data.type2_general_ai_projects_for_sc;
export const additionalResources = data.additional_resources as {
  kaggle_competitions: Array<{ name: string; url: string; description: string }>;
  open_source_sc_planning_tools: Array<{ name: string; url: string; description: string }>;
  key_learning_channels: Array<{ name: string; url: string; description: string }>;
  curated_reference_lists: Array<{ name: string; url: string; description: string }>;
};

export const allProjects: IndividualProject[] = [...scProjects, ...generalProjects];

export function getProjectsByCategory(): Record<string, IndividualProject[]> {
  return allProjects.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, IndividualProject[]>);
}

export function getProjectCategories(): string[] {
  return [...new Set(allProjects.map((p) => p.category))];
}

export function getInspirationStats() {
  return {
    totalProjects: allProjects.length,
    scProjects: scProjects.length,
    generalProjects: generalProjects.length,
    categories: getProjectCategories().length,
    kaggleCompetitions: additionalResources.kaggle_competitions?.length || 0,
    openSourceTools: additionalResources.open_source_sc_planning_tools?.length || 0,
  };
}

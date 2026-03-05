import rawData from './supply_chain_ai_resources.json';
import type { ResourceData, UseCase, GeneralTool, Platform, LearningResource } from '@/types';

const data = rawData as ResourceData;

export const metadata = data.metadata;
export const useCases = data.use_cases;
export const generalTools = data.general_tools;
export const platforms = data.platforms;
export const learningResources = data.learning_resources;
export const contentOutlines = data.content_outlines;

// Group use cases by function
export function getUseCasesByFunction(): Record<string, UseCase[]> {
  return useCases.reduce((acc, uc) => {
    if (!acc[uc.function]) acc[uc.function] = [];
    acc[uc.function].push(uc);
    return acc;
  }, {} as Record<string, UseCase[]>);
}

// Group tools by category
export function getToolsByCategory(): Record<string, GeneralTool[]> {
  return generalTools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, GeneralTool[]>);
}

// Group platforms by function
export function getPlatformsByFunction(): Record<string, Platform[]> {
  return platforms.reduce((acc, p) => {
    if (!acc[p.function]) acc[p.function] = [];
    acc[p.function].push(p);
    return acc;
  }, {} as Record<string, Platform[]>);
}

// Group learning resources by type
export function getLearningByType(): Record<string, LearningResource[]> {
  return learningResources.reduce((acc, r) => {
    if (!acc[r.type]) acc[r.type] = [];
    acc[r.type].push(r);
    return acc;
  }, {} as Record<string, LearningResource[]>);
}

// Get unique function categories
export function getUseCaseFunctions(): string[] {
  return [...new Set(useCases.map(uc => uc.function))];
}

// Get unique tool categories
export function getToolCategories(): string[] {
  return [...new Set(generalTools.map(t => t.category))];
}

// Get unique platform functions
export function getPlatformFunctions(): string[] {
  return [...new Set(platforms.map(p => p.function))];
}

// Get unique learning resource types
export function getLearningTypes(): string[] {
  return [...new Set(learningResources.map(r => r.type))];
}

// Stats
export function getStats() {
  return {
    totalResources: metadata.total_resources,
    useCaseCount: useCases.length,
    toolCount: generalTools.length,
    platformCount: platforms.length,
    learningCount: learningResources.length,
    functionCount: getUseCaseFunctions().length,
  };
}

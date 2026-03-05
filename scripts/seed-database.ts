/**
 * Seed script — migrates JSON data to Supabase
 *
 * Usage:
 *   npx tsx scripts/seed-database.ts
 *
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load env vars from .env.local
const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('your_')) {
  console.error('Error: Set your Supabase credentials in .env.local first');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Load JSON data
const mainData = JSON.parse(
  readFileSync(resolve(__dirname, '..', 'src/data/supply_chain_ai_resources.json'), 'utf-8')
);
const inspirationData = JSON.parse(
  readFileSync(resolve(__dirname, '..', 'src/data/individual_ai_projects.json'), 'utf-8')
);

async function seedUseCases() {
  const rows = mainData.use_cases.map((uc: any) => ({
    function_area: uc.function || uc.function_area || 'General',
    name: uc.use_case || uc.name || 'Untitled',
    description: uc.description || '',
    companies: uc.companies_doing_it || uc.companies || [],
    tools_used: uc.tools_used || [],
    results: uc.results || '',
    sources: uc.sources || [],
  }));

  const { error } = await supabase.from('use_cases').insert(rows);
  if (error) throw new Error(`use_cases: ${error.message}`);
  console.log(`  Inserted ${rows.length} use cases`);
}

async function seedTools() {
  const rows = mainData.general_tools.map((t: any) => ({
    category: t.category || 'General',
    name: t.name || 'Untitled',
    url: t.url || '',
    description: t.description || '',
    supply_chain_relevance: t.supply_chain_relevance || '',
    pricing_model: t.pricing_model || '',
  }));

  const { error } = await supabase.from('tools').insert(rows);
  if (error) throw new Error(`tools: ${error.message}`);
  console.log(`  Inserted ${rows.length} tools`);
}

async function seedPlatforms() {
  const rows = mainData.platforms.map((p: any) => ({
    name: p.name || 'Untitled',
    url: p.url || '',
    founded: p.founded || '',
    funding: p.funding || '',
    description: p.description || '',
    function_area: p.function || p.function_area || 'General',
    key_customers: p.key_customers || [],
    ai_approach: p.ai_approach || '',
  }));

  const { error } = await supabase.from('platforms').insert(rows);
  if (error) throw new Error(`platforms: ${error.message}`);
  console.log(`  Inserted ${rows.length} platforms`);
}

async function seedLearning() {
  const rows = mainData.learning_resources.map((lr: any) => ({
    type: lr.type || 'other',
    name: lr.name || 'Untitled',
    url: lr.url || '',
    description: lr.description || '',
    cost: lr.cost || '',
    level: lr.level || '',
  }));

  const { error } = await supabase.from('learning_resources').insert(rows);
  if (error) throw new Error(`learning_resources: ${error.message}`);
  console.log(`  Inserted ${rows.length} learning resources`);
}

async function seedInspiration() {
  const scProjects = (inspirationData.type1_supply_chain_ai_projects || []).map((p: any) => ({
    project_name: p.project_name || p.name || 'Untitled',
    creator: p.creator || '',
    description: p.description || '',
    what_they_built: p.what_they_built || null,
    tools_used: p.tools_used || [],
    link: p.link || '',
    secondary_links: p.secondary_links || [],
    category: p.category || '',
    why_inspiring: p.why_inspiring || null,
    sc_application: p.sc_application || null,
    project_type: 'supply_chain',
  }));

  const generalProjects = (inspirationData.type2_general_ai_projects_for_sc || []).map((p: any) => ({
    project_name: p.project_name || p.name || 'Untitled',
    creator: p.creator || '',
    description: p.description || '',
    what_they_built: p.what_they_built || null,
    tools_used: p.tools_used || [],
    link: p.link || '',
    secondary_links: p.secondary_links || [],
    category: p.category || '',
    why_inspiring: p.why_inspiring || null,
    sc_application: p.sc_application || null,
    project_type: 'general_ai',
  }));

  const allProjects = [...scProjects, ...generalProjects];
  const { error } = await supabase.from('inspiration_projects').insert(allProjects);
  if (error) throw new Error(`inspiration_projects: ${error.message}`);
  console.log(`  Inserted ${allProjects.length} inspiration projects`);
}

async function main() {
  console.log('Seeding database...\n');

  try {
    await seedUseCases();
    await seedTools();
    await seedPlatforms();
    await seedLearning();
    await seedInspiration();
    console.log('\nDone! All data seeded successfully.');
  } catch (err) {
    console.error('\nSeed failed:', err);
    process.exit(1);
  }
}

main();

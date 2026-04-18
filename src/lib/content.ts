import fm from 'front-matter';

// ============ Types ============

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  featured: boolean;
  order: number;
  body?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  featured: boolean;
  order: number;
}

export interface Division {
  name: string;
  id: string;
  icon: string;
  tagline: string;
  description: string;
  services: string[];
  number: string;
  order: number;
}

export interface ServiceItem {
  title: string;
  icon: string;
  description: string;
  problem: string;
  solution: string;
  deliverables: string[];
  number: string;
  order: number;
}

export interface ProcessStep {
  title: string;
  icon: string;
  description: string;
  number: string;
  order: number;
}

export interface OtherWork {
  title: string;
  category: string;
  count: string;
  order: number;
}

export interface ClientItem {
  name: string;
  logo: string;
  order: number;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  draft: boolean;
  order: number;
  body?: string;
}

export interface HeroSettings {
  eyebrow: string;
  headline_line1: string;
  headline_accent: string;
  headline_line3: string;
  description: string;
  cta_primary: string;
  cta_secondary: string;
  stats: { value: string; label: string }[];
}

export interface AboutSectionSettings {
  eyebrow: string;
  headline: string;
  description: string;
  secondary_text: string;
  cta_text: string;
  stats: { value: string; label: string }[];
}

export interface GeneralSettings {
  site_name: string;
  tagline: string;
  email: string;
  location: string;
  response_time: string;
  social: { name: string; url: string }[];
}

export interface AboutContent {
  hero_eyebrow: string;
  hero_headline: string;
  hero_description: string;
  story_headline: string;
  story_paragraphs: string[];
  values: { icon: string; title: string; description: string }[];
  timeline: { year: string; title: string; description: string }[];
}

export interface FounderInfo {
  photo: string;
  website?: string;
  sections: { title: string; text: string }[];
  social: { name: string; url: string }[];
}

// ============ Markdown loaders using import.meta.glob ============

const workFiles = import.meta.glob('/content/work/*.md', { eager: true, query: '?raw', import: 'default' });
const testimonialFiles = import.meta.glob('/content/testimonials/*.md', { eager: true, query: '?raw', import: 'default' });
const divisionFiles = import.meta.glob('/content/divisions/*.md', { eager: true, query: '?raw', import: 'default' });
const serviceFiles = import.meta.glob('/content/services/*.md', { eager: true, query: '?raw', import: 'default' });
const processFiles = import.meta.glob('/content/process/*.md', { eager: true, query: '?raw', import: 'default' });
const otherWorkFiles = import.meta.glob('/content/other-work/*.md', { eager: true, query: '?raw', import: 'default' });
const clientFiles = import.meta.glob('/content/clients/*.md', { eager: true, query: '?raw', import: 'default' });
const blogFiles = import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

// JSON settings
const settingsFiles = import.meta.glob('/content/settings/*.json', { eager: true, import: 'default' });
const aboutFiles = import.meta.glob('/content/about/*.json', { eager: true, import: 'default' });
const founderFiles = import.meta.glob('/content/founder/*.json', { eager: true, import: 'default' });

// ============ Parsers ============

function parseMdFiles<T>(files: Record<string, unknown>): T[] {
  return Object.values(files)
    .map((raw) => {
      const parsed = fm(raw as string);
      return { ...parsed.attributes as object, body: parsed.body?.trim() || undefined } as T;
    })
    .sort((a: any, b: any) => (a.order ?? 99) - (b.order ?? 99));
}

function getJsonFile<T>(files: Record<string, unknown>, name: string): T {
  const key = Object.keys(files).find((k) => k.includes(name));
  return (key ? files[key] : {}) as T;
}

// ============ Exported getters ============

export function getProjects(): Project[] {
  return parseMdFiles<Project>(workFiles);
}

export function getTestimonials(): Testimonial[] {
  return parseMdFiles<Testimonial>(testimonialFiles);
}

export function getDivisions(): Division[] {
  return parseMdFiles<Division>(divisionFiles);
}

export function getServices(): ServiceItem[] {
  return parseMdFiles<ServiceItem>(serviceFiles);
}

export function getProcessSteps(): ProcessStep[] {
  return parseMdFiles<ProcessStep>(processFiles);
}

export function getOtherWork(): OtherWork[] {
  return parseMdFiles<OtherWork>(otherWorkFiles);
}

export function getClients(): ClientItem[] {
  return parseMdFiles<ClientItem>(clientFiles);
}

export function getBlogPosts(): BlogPost[] {
  return parseMdFiles<BlogPost>(blogFiles)
    .filter((p) => !p.draft)
    .map((p) => ({
      ...p,
      readTime: p.readTime || `${Math.max(1, Math.ceil(((p.body || p.excerpt || "").split(/\s+/).length) / 200))} min`,
    }));
}

export function getHeroSettings(): HeroSettings {
  return getJsonFile<HeroSettings>(settingsFiles, 'hero');
}

export function getAboutSectionSettings(): AboutSectionSettings {
  return getJsonFile<AboutSectionSettings>(settingsFiles, 'about-section');
}

export function getGeneralSettings(): GeneralSettings {
  return getJsonFile<GeneralSettings>(settingsFiles, 'general');
}

export function getAboutContent(): AboutContent {
  return getJsonFile<AboutContent>(aboutFiles, 'main');
}

export function getFounderInfo(): FounderInfo {
  return getJsonFile<FounderInfo>(founderFiles, 'info');
}

// Helper to parse *accent* from headline strings
export function parseAccentText(text: string): { before: string; accent: string; after: string } {
  const match = text.match(/^(.*?)\*(.+?)\*(.*)$/);
  if (match) {
    return { before: match[1], accent: match[2], after: match[3] };
  }
  return { before: text, accent: '', after: '' };
}

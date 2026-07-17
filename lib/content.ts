import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { marked } from 'marked';

const contentDir = path.join(process.cwd(), 'content');

export interface Bericht {
  slug: string;
  title: string;
  date: string; // ISO (JJJJ-MM-TT)
  dateFormatted: string; // TT.MM.JJJJ
  teaser: string;
  image?: string;
  html: string;
}

export interface Seite {
  title: string;
  html: string;
}

export interface Termin {
  datum: string;
  uhrzeit?: string;
  titel: string;
  organisator?: string;
}

export interface Termine {
  jahr: number;
  termine: Termin[];
}

export interface GalerieBild {
  bild: string;
  beschreibung: string;
}

export interface VorstandPerson {
  name: string;
  rolle: string;
  foto: string;
  email?: string;
  telefon?: string;
}

export interface Mitglied {
  name: string;
  hund?: string;
  foto: string;
}

export interface MitgliederDaten {
  hundefuehrer: Mitglied[];
  mitglieder: Mitglied[];
}

export interface PruefungsErgebnis {
  hundefuehrer: string;
  hund: string;
  stufe: string;
  a: string;
  b: string;
  c: string;
  gesamt: string;
  note: string;
  ergebnis: string;
}

export interface Pruefung {
  titel: string;
  datum: string;
  richter: string;
  ergebnisse: PruefungsErgebnis[];
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

function renderMarkdown(md: string): string {
  return marked.parse(md) as string;
}

function loadYaml<T>(relPath: string): T {
  return yaml.load(fs.readFileSync(path.join(contentDir, relPath), 'utf-8')) as T;
}

export function getBerichtSlugs(): string[] {
  const dir = path.join(contentDir, 'berichte');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getBericht(slug: string): Bericht {
  const file = path.join(contentDir, 'berichte', `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'));
  const iso = toIsoDate(data.date);
  return {
    slug,
    title: String(data.title ?? slug),
    date: iso,
    dateFormatted: formatDate(iso),
    teaser: String(data.teaser ?? ''),
    image: data.image ? String(data.image) : undefined,
    html: renderMarkdown(content),
  };
}

export function getBerichte(): Bericht[] {
  return getBerichtSlugs()
    .map(getBericht)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getSeite(name: string): Seite {
  const file = path.join(contentDir, 'seiten', `${name}.md`);
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'));
  return {
    title: String(data.title ?? name),
    html: renderMarkdown(content),
  };
}

export function getTermine(): Termine {
  const data = loadYaml<Termine>('termine.yml');
  return { jahr: data.jahr, termine: data.termine ?? [] };
}

export function getGalerie(): GalerieBild[] {
  return loadYaml<{ bilder?: GalerieBild[] }>('galerie.yml').bilder ?? [];
}

export function getVorstand(): VorstandPerson[] {
  return loadYaml<{ personen?: VorstandPerson[] }>('vorstand.yml').personen ?? [];
}

export function getMitglieder(): MitgliederDaten {
  const data = loadYaml<Partial<MitgliederDaten>>('mitglieder.yml');
  return {
    hundefuehrer: data.hundefuehrer ?? [],
    mitglieder: data.mitglieder ?? [],
  };
}

export function getPruefungen(): Pruefung[] {
  return loadYaml<{ pruefungen?: Pruefung[] }>('pruefungen.yml').pruefungen ?? [];
}

#!/usr/bin/env node
// Injects all certificate slugs into package.json reactSnap.include list
// so react-snap prerenders each /certificate/:id route with per-candidate meta tags
// (WhatsApp/LinkedIn/etc. crawlers don't run JS).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const certsDir = path.join(root, 'content', 'certificates');
const pkgPath = path.join(root, 'package.json');

const baseIncludes = [
  '/', '/about', '/services', '/divisions', '/work', '/contact',
  '/careers', '/blog', '/privacy', '/terms', '/sitemap', '/verify',
];

let certRoutes = [];
if (fs.existsSync(certsDir)) {
  for (const file of fs.readdirSync(certsDir)) {
    if (!file.endsWith('.md')) continue;
    const src = fs.readFileSync(path.join(certsDir, file), 'utf8');
    const m = src.match(/^certificate_id:\s*["']?([^"'\r\n]+)["']?\s*$/m);
    if (m) certRoutes.push(`/certificate/${m[1].trim()}`);
  }
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.reactSnap = pkg.reactSnap || {};
pkg.reactSnap.include = [...new Set([...baseIncludes, ...certRoutes])];
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`Prerender include list updated: ${pkg.reactSnap.include.length} routes (${certRoutes.length} certificates).`);

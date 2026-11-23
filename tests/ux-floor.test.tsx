import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Home from '@/app/page';
import ServicesPage from '@/app/services/page';
import ServicePage from '@/app/services/[slug]/page';
import { LangText } from '@/components/lang-text';
import { pseoService } from '@/lib/pseo';
import type { AgencyStatus } from '@/lib/readiness';
import { site } from '@/lib/site';
import { socialImage } from '@/lib/site-config';

// 2026-11-18 review: Thai nav and an honest readiness next step; BOO-456 restores a public hub link sitewide.
describe('UX floor', () => {
  it('links to the public hub from navigation and shared footers while keeping the portfolio link in the home content', async () => {
    const home = renderToString(<Home />);
    const servicesIndex = renderToString(<ServicesPage />);
    const service = renderToString(await ServicePage({ params: Promise.resolve({ slug: pseoService.slug }) }));
    for (const html of [home, servicesIndex, service]) {
      const footer = html.slice(html.lastIndexOf('<footer'));
      expect(footer).toContain('href="https://bookchaowalit.com/">bookchaowalit.com</a>');
      expect(footer).toContain('href="https://bookchaowalit.com/privacy"');
      expect(footer).toContain('href="https://monitor.bookchaowalit.com/"');
      expect(footer).toContain('href="mailto:bookchaowalit.work@gmail.com"');
    }
    expect(home.match(/href="https:\/\/agency\.bookchaowalit\.com[^"]*"/g)).toHaveLength(1);
    expect(home).toContain('href="https://bookchaowalit.com/">bookchaowalit.com</a>');
    expect(service).not.toMatch(/href="https:\/\/agency\.bookchaowalit\.com/);
  });

  it('uses Thai nav labels that match the section headings', () => {
    const html = renderToString(<Home />);
    for (const label of ['ขอบเขต', 'สถานะ', 'บริการ']) expect(html).toContain(`>${label}</`);
    expect(html).toContain('href="https://bookchaowalit.com/">bookchaowalit.com</a>');
    expect(html).not.toMatch(/>Scope</);
  });

  it('provides hub contact without adding a lead form or email inquiry', () => {
    const html = renderToString(<Home />);
    expect(html).toContain('ดูทั้ง 14 กลุ่มงาน');
    expect(html).toContain('href="https://bookchaowalit.com/">ติดต่อหรือนัดคุยผ่าน bookchaowalit.com');
    // The readiness note must not invite an email inquiry; the only mailto is the footer feedback link, labelled as such.
    expect(html.match(/href="mailto:/g)).toHaveLength(1);
    expect(html).toContain('href="mailto:bookchaowalit.work@gmail.com">Site feedback</a>');
    expect(html).not.toContain('>Contact</a>');
    if ((site.status as AgencyStatus) === 'locked') expect(html).toContain('ยังไม่เปิดรับงาน');
    else expect(html).not.toContain('ยังไม่เปิดรับงาน');
  });

  it('shares the Open Graph image on service pages too', async () => {
    const { generateMetadata } = await import('@/app/services/[slug]/page');
    const meta = await generateMetadata({ params: Promise.resolve({ slug: pseoService.slug }) });
    // Whatever base URL this build uses (NEXT_PUBLIC_SITE_URL or the production fallback), the service page shares it.
    expect(JSON.stringify(meta.openGraph)).toContain(JSON.stringify(socialImage.url));
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('marks English runs in Thai copy with lang="en"', () => {
    expect(renderToString(<LangText text="ลดความเสี่ยงของ cyber-physical systems ด้วยหลักฐาน" />)).toContain('<span lang="en">cyber-physical systems</span>');
    expect(renderToString(<LangText text="ภาษาไทยล้วน" />)).toBe('ภาษาไทยล้วน');
  });

  it('uses focus and muted colors with accessible contrast on the page and panel backgrounds', () => {
    // Light :root tokens in cascade order: design-floor defaults, the site theme (if any), then globals.css.
    const tokens = new Map<string, string>();
    for (const file of ['design-floor/tokens.css', 'app-theme.css', 'globals.css']) {
      const path = join(process.cwd(), 'app', file);
      if (!existsSync(path)) continue;
      const root = readFileSync(path, 'utf8').match(/:root\s*\{([^}]*)\}/)?.[1] ?? '';
      for (const [, name, value] of root.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) tokens.set(name, value.trim());
    }
    const resolve = (name: string, depth = 0): string | undefined => {
      const value = tokens.get(name);
      const ref = value?.match(/^var\(--([a-z0-9-]+)\)$/);
      return ref && depth < 8 ? resolve(ref[1], depth + 1) : value;
    };
    const fallback = readFileSync(join(process.cwd(), 'app', 'ux-floor.css'), 'utf8').match(/:focus-visible, a:focus-visible \{[^}]*var\(--focus, var\(--([a-z-]+)\)\)/)![1];
    const ring = resolve('focus') ?? resolve(fallback)!;
    const bg = resolve('bg')!;
    const panel = resolve('panel')!;
    const muted = resolve('muted')!;
    expect(ring).toMatch(/^#[0-9a-f]{6}$/i);
    expect(bg).toMatch(/^#[0-9a-f]{6}$/i);
    expect(panel).toMatch(/^#[0-9a-f]{6}$/i);
    expect(muted).toMatch(/^#[0-9a-f]{6}$/i);
    const luminance = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (foreground: string, background: string) => {
      const [hi, lo] = [luminance(foreground), luminance(background)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    expect(contrast(ring, bg)).toBeGreaterThanOrEqual(3);
    expect(contrast(ring, panel)).toBeGreaterThanOrEqual(3);
    expect(muted).toBe('#4e6b76');
    expect(contrast(muted, bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(muted, panel)).toBeGreaterThanOrEqual(4.5);
  });
});

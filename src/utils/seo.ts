import { PageSEO, Article, Category, VehicleType } from '../types/article';

/**
 * Master Registry of SEO Keywords, Page Titles, and Meta Descriptions.
 * Adheres strictly to:
 * - Unique clean URLs (kebab-case, hierarchical, no parameters)
 * - 1 Main Keyword + 2 Related Keywords per page
 * - Title rules: 45-60 characters, front-loaded keyword, brand suffix
 * - Meta description rules: 125-155 characters, includes main + related keywords, engaging CTA
 */
export const STATIC_PAGE_SEO: Record<string, PageSEO> = {
  // Home Page
  home: {
    canonicalPath: '/',
    mainKeyword: 'automotive engineering journal',
    relatedKeywords: ['analog hypercars', 'classic supercar history'],
    pageTitle: 'Rev Talks | Automotive Engineering & Supercar Journal',
    metaDescription: 'Explore in-depth technical analyses of analog supercars, motorsport homologations, and historic superbikes. Read high-octane engineering at Rev Talks.',
  },

  // Category Pages
  'category-supercars': {
    canonicalPath: '/category/supercars',
    mainKeyword: 'analog supercars',
    relatedKeywords: ['naturally aspirated hypercars', 'lightweight supercar engineering'],
    pageTitle: 'Supercars & Hypercars Engineering Dispatches | Rev Talks',
    metaDescription: 'Discover technical analyses of iconic analog supercars and lightweight hypercars. Uncover powertrain telemetry, chassis innovations, and track heritage.',
  },

  'category-superbikes': {
    canonicalPath: '/category/superbikes',
    mainKeyword: 'superbike engineering',
    relatedKeywords: ['historic racing motorcycles', 'analog sportbikes'],
    pageTitle: 'Superbike History & High-Revving Motorcycle Reads | Rev Talks',
    metaDescription: 'Explore technical dispatches on legendary superbikes and two-stroke icons. From Ducati 916 to Kawasaki H2R, examine cutting-edge motorcycle dynamics.',
  },

  'category-motorsport': {
    canonicalPath: '/category/motorsport',
    mainKeyword: 'motorsport homologation',
    relatedKeywords: ['Le Mans racing history', 'Group A touring cars'],
    pageTitle: 'Motorsport Homologations & Historic Racing Cars | Rev Talks',
    metaDescription: 'Deep-dive into legendary motorsport homologations and Le Mans endurance champions. Explore quad-rotor prototypes, Group A icons, and racing aerodynamics.',
  },

  'category-engineering': {
    canonicalPath: '/category/engineering',
    mainKeyword: 'automotive powertrain engineering',
    relatedKeywords: ['carbon chassis dynamics', 'analog vehicle telemetry'],
    pageTitle: 'Automotive Powertrain & Chassis Engineering | Rev Talks',
    metaDescription: 'Examine the physics of performance engineering: carbon monocoques, high-revving naturally aspirated engines, and active aero telemetry at Rev Talks.',
  },

  'category-heritage': {
    canonicalPath: '/category/heritage',
    mainKeyword: 'classic sports car history',
    relatedKeywords: ['vintage air-cooled classics', 'golden era homologations'],
    pageTitle: 'Automotive Heritage & Classic Sports Car Legends | Rev Talks',
    metaDescription: 'Journey through the golden eras of automotive design. Read technical memoirs on air-cooled icons, two-stroke legends, and motorsport milestones.',
  },

  // Vehicle Class Pages
  'vehicles-cars': {
    canonicalPath: '/vehicles/cars',
    mainKeyword: 'supercar technical reviews',
    relatedKeywords: ['GT road cars', 'homologation sports cars'],
    pageTitle: 'Supercars & GT Road Cars: Technical Treatises | Rev Talks',
    metaDescription: 'Browse technical reviews of the world’s most revered supercars, GT machines, and homologation specials with chassis specs and telemetry on Rev Talks.',
  },

  'vehicles-motorcycles': {
    canonicalPath: '/vehicles/motorcycles',
    mainKeyword: 'superbike technical reviews',
    relatedKeywords: ['two-stroke sportbikes', 'high performance motorcycles'],
    pageTitle: 'Superbikes & Two-Stroke Motorcycles: In-Depth Reviews | Rev Talks',
    metaDescription: 'Read comprehensive technical analyses of high-performance superbikes, two-stroke pocket rockets, and supercharged motorcycle engineering at Rev Talks.',
  },

  // Contact Page
  contact: {
    canonicalPath: '/contact',
    mainKeyword: 'Rev Talks editorial inquiries',
    relatedKeywords: ['automotive journalism contact', 'technical article submissions'],
    pageTitle: 'Contact Technical Editors & Inquiries | Rev Talks',
    metaDescription: 'Contact the Rev Talks editorial desk for technical article submissions, historical corrections, or automotive press inquiries. Connect with our team today.',
  },
};

/**
 * Returns complete SEO metadata for an individual article.
 */
export function getArticleSEO(article: Article): PageSEO {
  if (article.seo) {
    return article.seo;
  }

  // Derive standardized clean SEO keywords and titles
  const cleanTitle = article.title.length > 44 
    ? article.title.slice(0, 42).trim() + '...' 
    : article.title;

  return {
    canonicalPath: `/article/${article.slug}`,
    mainKeyword: `${article.title.split(':')[0].trim()} technical review`,
    relatedKeywords: [
      `${article.category.toLowerCase()} powertrain specs`,
      `${article.vehicleType.toLowerCase()} chassis telemetry`,
    ],
    pageTitle: `${cleanTitle} | Rev Talks`,
    metaDescription: article.excerpt.length > 155
      ? article.excerpt.slice(0, 152).trim() + '...'
      : article.excerpt,
  };
}

/**
 * Dynamically updates document title, meta tags, OpenGraph, Twitter, canonical, and Schema.org JSON-LD.
 */
export function updatePageMetadata(seo: PageSEO, article?: Article) {
  // 1. Page Title
  document.title = seo.pageTitle;

  // Helper to upsert meta tags
  const setMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Meta Description & Keywords
  setMeta('name', 'description', seo.metaDescription);
  setMeta('name', 'keywords', `${seo.mainKeyword}, ${seo.relatedKeywords[0]}, ${seo.relatedKeywords[1]}, Rev Talks, automotive engineering`);

  // 3. OpenGraph Tags
  const cleanCanonicalPath = seo.canonicalPath.replace(/-7ov5/gi, '');
  const fullUrl = `${window.location.origin.replace(/-7ov5/gi, '')}${cleanCanonicalPath}`;
  setMeta('property', 'og:title', seo.pageTitle);
  setMeta('property', 'og:description', seo.metaDescription);
  setMeta('property', 'og:url', fullUrl);
  setMeta('property', 'og:type', article ? 'article' : 'website');
  setMeta('property', 'og:site_name', 'Rev Talks — The Automotive Journal');

  if (article?.heroImage) {
    setMeta('property', 'og:image', article.heroImage);
  }

  // 4. Twitter Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.pageTitle);
  setMeta('name', 'twitter:description', seo.metaDescription);
  if (article?.heroImage) {
    setMeta('name', 'twitter:image', article.heroImage);
  }

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullUrl);

  // 6. Schema.org JSON-LD Structured Data
  let schemaScript = document.querySelector('script#revtalks-jsonld') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'revtalks-jsonld';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  if (article) {
    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: article.title,
      description: seo.metaDescription,
      url: fullUrl,
      image: article.heroImage,
      datePublished: '2026-10-01',
      dateModified: '2026-10-07',
      mainEntityOfPage: fullUrl,
      keywords: `${seo.mainKeyword}, ${seo.relatedKeywords.join(', ')}`,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Rev Talks',
        url: window.location.origin,
      },
      about: {
        '@type': 'Vehicle',
        name: article.title,
        category: article.category,
      },
    });
  } else {
    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: seo.pageTitle,
      description: seo.metaDescription,
      url: fullUrl,
      publisher: {
        '@type': 'Organization',
        name: 'Rev Talks',
        url: window.location.origin,
      },
    });
  }
}

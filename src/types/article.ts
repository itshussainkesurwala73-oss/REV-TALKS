export type Category = 'Supercars' | 'Superbikes' | 'Motorsport' | 'Engineering' | 'Heritage';
export type VehicleType = 'Car' | 'Motorcycle';

export interface KeySpec {
  label: string;
  value: string;
  subtext?: string;
}

export interface ArticleSection {
  heading: string;
  content: string[];
  quote?: string;
  callout?: {
    title: string;
    text: string;
  };
}

export interface PageSEO {
  mainKeyword: string;
  relatedKeywords: [string, string];
  pageTitle: string;
  metaDescription: string;
  canonicalPath: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  vehicleType: VehicleType;
  author: {
    name: string;
    role: string;
  };
  publishedDate: string;
  readTimeMinutes: number;
  heroImage: string;
  imageAlt?: string;
  imageCaption: string;
  photographerCredit: string;
  keySpecs: KeySpec[];
  excerpt: string;
  sections: ArticleSection[];
  tags: string[];
  historicalEra: string;
  featured?: boolean;
  seo?: PageSEO;
}

export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'editorial' | 'correction' | 'submission' | 'general';
  topic: string;
  message: string;
}

// [START] Payload API
export interface PayloadApi<T = any> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
// [END] Payload API

// [START] Payload Fields
export interface PayloadFieldButtonLink {
  variant: 'outlined' | 'solid';
  size: 'sm' | 'md' | 'lg';
  icon?: ('arrowRight' | 'arrowUpRight' | 'instagram' | 'menu' | 'chevronDown' | 'tikTok' | 'x') | null;
  iconPosition: 'none' | 'left' | 'right' | 'center';
  link: PayloadFieldLink;
}

export interface PayloadFieldLink {
  text: string;
  type: 'internal' | 'external';
  relationship: {
    value: {
      slug: string;
      breadcrumbs: {
        url: string;
        label: string;
      }[];
    };
  };
  anchor?: string | null;
  url: string;
  rel: ('noreferrer' | 'nofollow')[];
  newTab: boolean;
  umamiEvent?: string | null;
  umamiEventId?: string | null;
}
// [END] Payload Fields

// [START] Payload Blocks
export interface PayloadBlockButtonLink extends PayloadFieldButtonLink {
  blockName?: string;
  blockType: 'buttonLink';
}

export interface PayloadBlockGallery {
  blockName?: string;
  blockType: 'gallery';
  images: PayloadMedia[];
}

export interface PayloadBlockHero {
  blockName?: string;
  blockType: 'hero';
  heading: string;
  description: string;
  images: PayloadMedia[];
  buttonLinks: PayloadFieldButtonLink[];
}

export interface PayloadBlockPortfolioCards {
  blockName?: string;
  blockType: 'portfolioCards';
  cards: {
    image: PayloadMedia;
    link: PayloadFieldLink;
  }[];
}

export interface PayloadBlockSection {
  blockName?: string;
  blockType: 'section';
  heading: string;
  columns: '1' | '2';
  content?: {
    root: {
      children?: { [k: string]: unknown }[];
    };
  } | null;
  contentColumnOne?: {
    root: {
      children?: { [k: string]: unknown }[];
    };
  } | null;
  contentColumnTwo: {
    root: {
      children?: { [k: string]: unknown }[];
    };
  } | null;
}
// [END] Payload Blocks

// [START] Payload Collections
export interface PayloadFaq {
  question: string;
  answer: {
    root: {
      children?: { [k: string]: unknown }[];
    };
  } | null;
}

export interface PayloadMedia {
  alt: string;
  hasLink?: boolean;
  link: PayloadFieldLink;
  dataUrl: string;
  url: string;
  mimeType: string;
  width: number;
  height: number;
  sizes: {
    preview: {
      url: string;
      width: number;
      height: number;
    };
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface PayloadPage {
  title: string;
  description: string;
  content?: {
    root: {
      children?: { [k: string]: unknown }[];
    };
  } | null;
  slug: string;
  parent?: {
    title: string;
    slug: string;
  } | null;
  breadcrumbs: {
    url: string;
    label: string;
  }[];
}
// [END] Payload Collections

// [START] Globals
export interface PayloadGlobals {
  Footer: PayloadFooter;
  Navigation: PayloadNavigation;
}

export interface PayloadFooter {
  faqs?: PayloadFaq[] | null;
  linkGroups: {
    heading: string;
    links: PayloadFieldLink[];
  }[];
  marquee?: string;
  copyright?: string;
}

export interface PayloadNavigation {
  callToAction: PayloadFieldButtonLink;
  links?: PayloadFieldLink[];
}
// [END] Globals

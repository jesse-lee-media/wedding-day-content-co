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
  link: PayloadFieldLink;
}

export interface PayloadFieldLink {
  text: string;
  icon?: string | null;
  iconPosition: 'center' | 'left' | 'right';
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
  blockType: 'buttonLink';
}

export interface PayloadBlockGallery {
  blockType: 'gallery';
  images: PayloadMedia[];
}

export interface PayloadBlockHero {
  blockType: 'hero';
  heading: string;
  description: string;
  images: PayloadMedia[];
  buttonLinks: PayloadFieldButtonLink[];
}

export interface PayloadBlockPortfolioCards {
  blockType: 'portfolioCards';
  cards: {
    image: PayloadMedia;
    link: PayloadFieldLink;
  }[];
}

export interface PayloadBlockSection {
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

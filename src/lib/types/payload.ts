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
  type: 'grid' | 'carousel';
}

export interface PayloadBlockHero {
  blockName?: string;
  blockType: 'hero';
  heading: string;
  description: string;
  images: PayloadMedia[];
  buttonLinks: PayloadFieldButtonLink[];
}

export interface PayloadBlockImageStack {
  blockName?: string;
  blockType: 'imageStack';
  images: PayloadMedia[];
}

export interface PayloadBlockMessagesMarquee {
  blockName?: string;
  blockType: 'messagesMarquee';
  messages: {
    content: string;
  }[];
}

export interface PayloadBlockPortfolioCards {
  blockName?: string;
  blockType: 'portfolioCards';
  cards: {
    image: PayloadMedia;
    link: PayloadFieldLink;
  }[];
}

export interface PayloadBlockQuotes {
  blockName?: string;
  blockType: 'quotes';
  quotes: {
    client: string;
    content: {
      root: {
        children?: { [k: string]: unknown }[];
      };
    };
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

export interface PayloadBlockStepper {
  blockName?: string;
  blockType: 'stepper';
  steps: {
    heading: string;
    content: {
      root: {
        children?: { [k: string]: unknown }[];
      };
    };
  }[];
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

export interface PayloadInquiry {
  first: string;
  last: string;
  email: string;
  phone: string;
  startDate: string;
  endDate?: string | null;
  budget: string;
  location: string;
  information: string;
  photographerNames?: string | null;
  openToOtherCreators: 'no' | 'yes';
}

export interface PayloadMedia {
  alt: string;
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
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      type: string;
      version: number;
    };
    [k: string]: unknown;
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

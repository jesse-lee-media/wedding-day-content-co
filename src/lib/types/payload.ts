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

// [START] Fields
export interface PayloadButtonLinkField {
  color: 'primary' | 'neutral';
  variant: 'outlined' | 'solid';
  size: 'sm' | 'md' | 'lg';
  link: PayloadLinkField;
}

export interface PayloadLinkField {
  text: string;
  icon?: string;
  iconPosition: 'none' | 'left' | 'right';
  newTab?: boolean;
  type: 'reference' | 'external';
  reference: {
    value: PayloadPage;
    relationTo: 'pages';
  };
  url: string;
}

export interface PayloadTagField {
  text: string;
  icon?: string;
}
// [END] Fields

// [START] Blocks
export interface PayloadButtonLinkBlock extends PayloadButtonLinkField {
  id?: string;
  blockName?: string;
  blockType: 'buttonLink';
}

export interface PayloadContentBlock {
  content: {
    [k: string]: unknown;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'content';
}

export interface PayloadFaqBlock {
  questions?: {
    question: string;
    answer: {
      [k: string]: unknown;
    }[];
    id?: string;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'faq';
}

export interface PayloadFeatureCardsBlock {
  maxWidth: 'full' | 'large' | 'medium';
  listType: 'unordered' | 'ordered';
  cards: {
    heading: string;
    icon: string;
    content: {
      [k: string]: unknown;
    }[];
    id?: string;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'featureCards';
}

export interface PayloadHeroBlock {
  maxWidth: 'full' | 'large' | 'medium';
  heading: string;
  description: string;
  tags: PayloadTagField[];
  buttonLinks: PayloadButtonLinkField[];
  id?: string;
  blockName?: string;
  blockType: 'hero';
}

export interface PayloadHeroPageBlock {
  maxWidth: 'full' | 'large' | 'medium';
  heading: string;
  description: string;
  ctaButton?: boolean;
  buttonLink?: PayloadButtonLinkField;
  id?: string;
  blockName?: string;
  blockType: 'heroPage';
}

export interface PayloadHeroSectionBlock {
  maxWidth: 'full' | 'large' | 'medium';
  heading: string;
  sectionId?: string;
  layout?: (PayloadContentBlock | PayloadFaqBlock | PayloadButtonLinkBlock)[];
  id?: string;
  blockName?: string;
  blockType: 'heroSection';
}

export interface PayloadPackageCardsBlock {
  packages: {
    emphasize?: boolean;
    heading: string;
    icon: string;
    description?: {
      [k: string]: unknown;
    }[];
    itemGroups: {
      heading: string;
      icon: string;
      items: {
        text: string;
        superscript?: string;
        id?: string;
      }[];
      id?: string;
    }[];
    pricing: {
      price: number;
      description?: string;
      buttonLink: PayloadButtonLinkField;
      footnote?: string;
    };
    id?: string;
  }[];
  footnotes?: {
    superscript: string;
    text: string;
    id?: string;
  }[];
  showCustomPackage?: boolean;
  customPackage?: {
    heading: string;
    description: {
      [k: string]: unknown;
    }[];
    buttonLink: PayloadButtonLinkField;
  };
  id?: string;
  blockName?: string;
  blockType: 'packageCards';
}

export interface PayloadSectionBlock {
  sectionId: string;
  maxWidth: 'full' | 'large' | 'medium';
  layout?: (PayloadContentBlock | PayloadButtonLinkBlock | PayloadFaqBlock | PayloadFeatureCardsBlock)[];
  id?: string;
  blockName?: string;
  blockType: 'section';
}
// [END] Blocks

// [START] Collections
export interface PayloadPage {
  id: string;
  name: string;
  slug?: string;
  meta: {
    title: string;
    description: string;
  };
  content: {
    layout?: (PayloadHeroBlock | PayloadHeroSectionBlock | PayloadHeroPageBlock | PayloadSectionBlock)[];
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
// [END] Collections

// [START] Globals
export interface PayloadFooter {
  id?: string;
  socialLinks?: PayloadLinkField[];
  updatedAt?: string;
  createdAt?: string;
}

export interface PayloadNavigation {
  id: string;
  links?: PayloadLinkField[];
  updatedAt?: string;
  createdAt?: string;
}
// [END] Globals

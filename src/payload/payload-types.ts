/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadUserRolesField".
 */
export type PayloadUserRolesField = ('admin' | 'editor' | 'public')[];
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadRelField".
 */
export type PayloadRelField = ('noopener' | 'noreferrer' | 'nofollow')[] | null;
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadLinkArrayField".
 */
export type PayloadLinkArrayField = {
  text: string;
  type: 'internal' | 'external';
  relationship?: (string | null) | PayloadPagesCollection;
  anchor?: string | null;
  url?: string | null;
  rel?: PayloadRelField;
  newTab?: boolean | null;
  umamiEvent?: string | null;
  umamiEventId?: string | null;
  id?: string | null;
}[];
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadButtonVariantField".
 */
export type PayloadButtonVariantField = 'primary' | 'secondary';
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadButtonSizeField".
 */
export type PayloadButtonSizeField = 'sm' | 'md' | 'lg';
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadIconField".
 */
export type PayloadIconField =
  | ('arrowRight' | 'arrowUpRight' | 'instagram' | 'menu' | 'chevronDown' | 'tikTok' | 'x')
  | null;
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadButtonIconPositionField".
 */
export type PayloadButtonIconPositionField = ('none' | 'left' | 'right' | 'center') | null;
/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadButtonLinkArrayField".
 */
export type PayloadButtonLinkArrayField = {
  variant: PayloadButtonVariantField;
  size: PayloadButtonSizeField;
  icon?: PayloadIconField;
  iconPosition?: PayloadButtonIconPositionField;
  link: PayloadLinkGroupField;
  id?: string | null;
}[];
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadBackgroundField".
 */
export type PayloadBackgroundField = 'default' | 'dark';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    pages: PayloadPagesCollection;
    media: PayloadMediaCollection;
    faqs: PayloadFaqsCollection;
    forms: PayloadFormsCollection;
    'form-submissions': PayloadFormSubmissionsCollection;
    users: PayloadUsersCollection;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    faqs: FaqsSelect<false> | FaqsSelect<true>;
    forms: FormsSelect<false> | FormsSelect<true>;
    'form-submissions': FormSubmissionsSelect<false> | FormSubmissionsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    navigation: PayloadNavigationGlobal;
    footer: PayloadFooterGlobal;
  };
  globalsSelect: {
    navigation: NavigationSelect<false> | NavigationSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
  };
  locale: null;
  user: PayloadUsersCollection & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface PayloadPagesCollection {
  id: string;
  title: string;
  description: string;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  slug?: string | null;
  parent?: (string | null) | PayloadPagesCollection;
  breadcrumbs?:
    | {
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface PayloadMediaCollection {
  id: string;
  alt: string;
  displayOriginal: boolean;
  dataUrl?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    preview?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "faqs".
 */
export interface PayloadFaqsCollection {
  id: string;
  question: string;
  answer?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms".
 */
export interface PayloadFormsCollection {
  id: string;
  title: string;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  submitButtonLabel: string;
  confirmationMessage: string;
  fields: (
    | PayloadTextBlock
    | PayloadTextareaBlock
    | PayloadDateBlock
    | PayloadSelectBlock
    | PayloadRadioBlock
    | PayloadEmailBlock
    | PayloadPhoneNumberBlock
  )[];
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadTextBlock".
 */
export interface PayloadTextBlock {
  name: string;
  label: string;
  placeholder?: string | null;
  width: 'half' | 'full';
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  defaultValue?: string | null;
  required: boolean;
  id?: string | null;
  blockName?: string | null;
  blockType: 'text';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadTextareaBlock".
 */
export interface PayloadTextareaBlock {
  name: string;
  label: string;
  placeholder?: string | null;
  width: 'half' | 'full';
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  defaultValue?: string | null;
  required: boolean;
  id?: string | null;
  blockName?: string | null;
  blockType: 'textarea';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadDateBlock".
 */
export interface PayloadDateBlock {
  name: string;
  label: string;
  placeholder?: string | null;
  width: 'half' | 'full';
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  mode: 'single' | 'multiple' | 'range';
  allowedDates: 'any' | 'previous' | 'future';
  defaultDateValue?: string | null;
  defaultDateValues?:
    | {
        value?: string | null;
        id?: string | null;
      }[]
    | null;
  defaultDateFromValue?: string | null;
  defaultDateToValue?: string | null;
  required: boolean;
  id?: string | null;
  blockName?: string | null;
  blockType: 'date';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadSelectBlock".
 */
export interface PayloadSelectBlock {
  name: string;
  label: string;
  placeholder?: string | null;
  width: 'half' | 'full';
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  options: {
    label: string;
    value: string;
    id?: string | null;
  }[];
  defaultValue?: string | null;
  required: boolean;
  id?: string | null;
  blockName?: string | null;
  blockType: 'select';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadRadioBlock".
 */
export interface PayloadRadioBlock {
  name: string;
  label: string;
  placeholder?: string | null;
  width: 'half' | 'full';
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  options: {
    label: string;
    value: string;
    id?: string | null;
  }[];
  defaultValue?: string | null;
  required: boolean;
  id?: string | null;
  blockName?: string | null;
  blockType: 'radio';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadEmailBlock".
 */
export interface PayloadEmailBlock {
  name: string;
  label: string;
  placeholder?: string | null;
  width: 'half' | 'full';
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  defaultValue?: string | null;
  required: boolean;
  id?: string | null;
  blockName?: string | null;
  blockType: 'email';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadPhoneNumberBlock".
 */
export interface PayloadPhoneNumberBlock {
  name: string;
  label: string;
  placeholder?: string | null;
  width: 'half' | 'full';
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  defaultValue?: string | null;
  required: boolean;
  id?: string | null;
  blockName?: string | null;
  blockType: 'phoneNumber';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions".
 */
export interface PayloadFormSubmissionsCollection {
  id: string;
  form: string | PayloadFormsCollection;
  data: {
    label: string;
    name: string;
    value: string;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface PayloadUsersCollection {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  roles: PayloadUserRolesField;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'pages';
        value: string | PayloadPagesCollection;
      } | null)
    | ({
        relationTo: 'media';
        value: string | PayloadMediaCollection;
      } | null)
    | ({
        relationTo: 'faqs';
        value: string | PayloadFaqsCollection;
      } | null)
    | ({
        relationTo: 'forms';
        value: string | PayloadFormsCollection;
      } | null)
    | ({
        relationTo: 'form-submissions';
        value: string | PayloadFormSubmissionsCollection;
      } | null)
    | ({
        relationTo: 'users';
        value: string | PayloadUsersCollection;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | PayloadUsersCollection;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | PayloadUsersCollection;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  content?: T;
  slug?: T;
  parent?: T;
  breadcrumbs?:
    | T
    | {
        url?: T;
        label?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  displayOriginal?: T;
  dataUrl?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        preview?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "faqs_select".
 */
export interface FaqsSelect<T extends boolean = true> {
  question?: T;
  answer?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms_select".
 */
export interface FormsSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  submitButtonLabel?: T;
  confirmationMessage?: T;
  fields?:
    | T
    | {
        text?: T | PayloadTextBlockSelect<T>;
        textarea?: T | PayloadTextareaBlockSelect<T>;
        date?: T | PayloadDateBlockSelect<T>;
        select?: T | PayloadSelectBlockSelect<T>;
        radio?: T | PayloadRadioBlockSelect<T>;
        email?: T | PayloadEmailBlockSelect<T>;
        phoneNumber?: T | PayloadPhoneNumberBlockSelect<T>;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadTextBlock_select".
 */
export interface PayloadTextBlockSelect<T extends boolean = true> {
  name?: T;
  label?: T;
  placeholder?: T;
  width?: T;
  description?: T;
  defaultValue?: T;
  required?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadTextareaBlock_select".
 */
export interface PayloadTextareaBlockSelect<T extends boolean = true> {
  name?: T;
  label?: T;
  placeholder?: T;
  width?: T;
  description?: T;
  defaultValue?: T;
  required?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadDateBlock_select".
 */
export interface PayloadDateBlockSelect<T extends boolean = true> {
  name?: T;
  label?: T;
  placeholder?: T;
  width?: T;
  description?: T;
  mode?: T;
  allowedDates?: T;
  defaultDateValue?: T;
  defaultDateValues?:
    | T
    | {
        value?: T;
        id?: T;
      };
  defaultDateFromValue?: T;
  defaultDateToValue?: T;
  required?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadSelectBlock_select".
 */
export interface PayloadSelectBlockSelect<T extends boolean = true> {
  name?: T;
  label?: T;
  placeholder?: T;
  width?: T;
  description?: T;
  options?:
    | T
    | {
        label?: T;
        value?: T;
        id?: T;
      };
  defaultValue?: T;
  required?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadRadioBlock_select".
 */
export interface PayloadRadioBlockSelect<T extends boolean = true> {
  name?: T;
  label?: T;
  placeholder?: T;
  width?: T;
  description?: T;
  options?:
    | T
    | {
        label?: T;
        value?: T;
        id?: T;
      };
  defaultValue?: T;
  required?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadEmailBlock_select".
 */
export interface PayloadEmailBlockSelect<T extends boolean = true> {
  name?: T;
  label?: T;
  placeholder?: T;
  width?: T;
  description?: T;
  defaultValue?: T;
  required?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadPhoneNumberBlock_select".
 */
export interface PayloadPhoneNumberBlockSelect<T extends boolean = true> {
  name?: T;
  label?: T;
  placeholder?: T;
  width?: T;
  description?: T;
  defaultValue?: T;
  required?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions_select".
 */
export interface FormSubmissionsSelect<T extends boolean = true> {
  form?: T;
  data?:
    | T
    | {
        label?: T;
        name?: T;
        value?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  firstName?: T;
  lastName?: T;
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation".
 */
export interface PayloadNavigationGlobal {
  id: string;
  links?: PayloadLinkArrayField;
  callToAction: PayloadButtonLinkGroupField;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadButtonLinkGroupField".
 */
export interface PayloadButtonLinkGroupField {
  variant: PayloadButtonVariantField;
  size: PayloadButtonSizeField;
  icon?: PayloadIconField;
  iconPosition?: PayloadButtonIconPositionField;
  link: PayloadLinkGroupField;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadLinkGroupField".
 */
export interface PayloadLinkGroupField {
  text: string;
  type: 'internal' | 'external';
  relationship?: (string | null) | PayloadPagesCollection;
  anchor?: string | null;
  url?: string | null;
  rel?: PayloadRelField;
  newTab?: boolean | null;
  umamiEvent?: string | null;
  umamiEventId?: string | null;
  id?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface PayloadFooterGlobal {
  id: string;
  contact?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  faqs?: (string | PayloadFaqsCollection)[] | null;
  linkGroups?:
    | {
        heading: string;
        links: PayloadLinkArrayField;
        id?: string | null;
      }[]
    | null;
  marquee: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation_select".
 */
export interface NavigationSelect<T extends boolean = true> {
  links?: T | PayloadLinkArrayFieldSelect<T>;
  callToAction?: T | PayloadButtonLinkGroupFieldSelect<T>;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadLinkArrayField_select".
 */
export interface PayloadLinkArrayFieldSelect<T extends boolean = true> {
  text?: T;
  type?: T;
  relationship?: T;
  anchor?: T;
  url?: T;
  rel?: T;
  newTab?: T;
  umamiEvent?: T;
  umamiEventId?: T;
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadButtonLinkGroupField_select".
 */
export interface PayloadButtonLinkGroupFieldSelect<T extends boolean = true> {
  variant?: T;
  size?: T;
  icon?: T;
  iconPosition?: T;
  link?: T | PayloadLinkGroupFieldSelect<T>;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadLinkGroupField_select".
 */
export interface PayloadLinkGroupFieldSelect<T extends boolean = true> {
  text?: T;
  type?: T;
  relationship?: T;
  anchor?: T;
  url?: T;
  rel?: T;
  newTab?: T;
  umamiEvent?: T;
  umamiEventId?: T;
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  contact?: T;
  faqs?: T;
  linkGroups?:
    | T
    | {
        heading?: T;
        links?: T | PayloadLinkArrayFieldSelect<T>;
        id?: T;
      };
  marquee?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadHeroBlock".
 */
export interface PayloadHeroBlock {
  heading: string;
  description: string;
  images: (string | PayloadMediaCollection)[];
  buttonLinks: PayloadButtonLinkArrayField;
  id?: string | null;
  blockName?: string | null;
  blockType: 'hero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadButtonLinkBlock".
 */
export interface PayloadButtonLinkBlock {
  variant: PayloadButtonVariantField;
  size: PayloadButtonSizeField;
  icon?: PayloadIconField;
  iconPosition?: PayloadButtonIconPositionField;
  link: PayloadLinkGroupField;
  id?: string | null;
  blockName?: string | null;
  blockType: 'buttonLink';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadGalleryBlock".
 */
export interface PayloadGalleryBlock {
  type?: ('grid' | 'carousel') | null;
  images: (string | PayloadMediaCollection)[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'gallery';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadImageStackBlock".
 */
export interface PayloadImageStackBlock {
  images: (string | PayloadMediaCollection)[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'imageStack';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadMessagesMarqueeBlock".
 */
export interface PayloadMessagesMarqueeBlock {
  messages?:
    | {
        content: string;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'messagesMarquee';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadQuotesBlock".
 */
export interface PayloadQuotesBlock {
  quotes?:
    | {
        client: string;
        content?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'quotes';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadStepperBlock".
 */
export interface PayloadStepperBlock {
  steps?:
    | {
        heading: string;
        content?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'stepper';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadSectionBlock".
 */
export interface PayloadSectionBlock {
  heading: string;
  columns: '1' | '2';
  background: PayloadBackgroundField;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  contentColumnOne?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  contentColumnTwo?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'section';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadImageLinksBlock".
 */
export interface PayloadImageLinksBlock {
  cards: {
    image: string | PayloadMediaCollection;
    link: PayloadLinkGroupField;
    id?: string | null;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'imageLinks';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PayloadFormBlock".
 */
export interface PayloadFormBlock {
  form: string | PayloadFormsCollection;
  id?: string | null;
  blockName?: string | null;
  blockType: 'formBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
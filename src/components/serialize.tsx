import { Fragment } from 'react';

import Link from 'next/link';

import { PayloadFieldLink } from '@/lib/types/payload';
import { cn, linkProps, slugify } from '@/lib/utils';

import { Blocks } from './blocks';

export type SerializeProps = {
  nodes: any[];
};

const renderText = (node: any) => {
  switch (node.format) {
    case 1: // bold
      return <strong>{node.text}</strong>;
    case 1 << 1: // italic
      return <em>{node.text}</em>;
    case 1 << 2: // strikethrough
      return <span className="line-through">{node.text}</span>;
    case 1 << 3: // underline
      return <span className="underline underline-offset-4">{node.text}</span>;
    case 1 << 4: // code
      return <code>{node.text}</code>;
    case 1 << 5: // subscript
      return <sub>{node.text}</sub>;
    case 1 << 6: // superscript
      return <sup>{node.text}</sup>;
    default:
      return node.text;
  }
};

export default function Serialize({ nodes }: SerializeProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  const headingClasses = {
    h1: 'mt-10 mb-8 text-4xl xs:text-5xl',
    h2: 'mt-8 mb-6 text-3xl xs:text-4xl',
    h3: 'mt-6 mb-4 text-2xl xs:text-3xl',
  };
  const indentClasses = {
    0: '',
    1: 'indent-4',
    2: 'indent-8',
    3: 'indent-12',
    4: 'indent-16',
  };

  return !nodes || nodes.length === 0 ? null : (
    <Fragment>
      {nodes.map((node, i) => {
        // @ts-expect-error – valid keys
        const alignClass = alignClasses[node.format ?? 'left'];
        // @ts-expect-error – valid keys
        const indentClass = indentClasses[node.indent && node.indent < 5 ? node.indent : 0];

        switch (node.type) {
          case 'heading':
            return (
              <node.tag
                key={i}
                id={slugify(node.children?.map((v: any) => v.text).join(' '))}
                className={cn(
                  'first:mt-0 last:mb-0',
                  alignClass,
                  indentClass,
                  // @ts-expect-error – valid keys
                  headingClasses[node.tag],
                )}
              >
                <Serialize nodes={node.children} />
              </node.tag>
            );
          case 'paragraph':
            return node.children?.length > 0 ? (
              <p key={i} className={cn('my-3 text-lg first:mt-0 last:mb-0', alignClass, indentClass)}>
                <Serialize nodes={node.children} />
              </p>
            ) : null;
          case 'link': {
            const { fields } = node;
            const link: PayloadFieldLink = {
              text: '',
              type: fields.linkType === 'custom' ? 'external' : 'internal',
              relationship: fields.doc,
              ...(fields.anchor ? { anchor: fields.anchor } : {}),
              url: fields.url,
              rel: fields.rel,
              newTab: fields.newTab,
              ...(fields.umamiEvent ? { umamiEvent: fields.umamiEvent } : {}),
              ...(fields.umamiEventId ? { umamiEventId: fields.umamiEventId } : {}),
            };

            return (
              <Link
                key={i}
                {...linkProps(link)}
                className={cn(
                  'underline underline-offset-2 hover:text-pink-700 hover:dark:text-pink-200',
                  alignClass,
                  indentClass,
                )}
              >
                <Serialize nodes={node.children} />
              </Link>
            );
          }
          case 'list':
            return (
              <node.tag
                key={i}
                className={cn(
                  node.listType === 'bullet' ? 'list-disc' : 'list-decimal',
                  'my-3 flex flex-col gap-2 pl-8',
                  alignClass,
                  indentClass,
                )}
              >
                <Serialize nodes={node.children} />
              </node.tag>
            );
          case 'listitem':
            return (
              <li key={i} className={cn(alignClass, indentClass)}>
                <Serialize nodes={node.children} />
              </li>
            );
          case 'block':
            return <Blocks key={i} {...node.fields} />;
          default:
            return <Fragment key={i}>{renderText(node)}</Fragment>;
        }
      })}
    </Fragment>
  );
}

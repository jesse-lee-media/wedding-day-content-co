import { Fragment } from 'react';

import { cn, slugify } from '@/lib/utils';

import { Blocks } from './Blocks';

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
    h1: 'my-8 text-4xl xs:text-5xl',
    h2: 'my-6 text-3xl xs:text-4xl',
    h3: 'my-4 text-2xl xs:text-3xl',
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
        switch (node.type) {
          case 'heading':
            return (
              <node.tag
                key={i}
                id={slugify(node.children?.map((v: any) => v.text).join(' '))}
                className={cn(
                  'first:mt-0 last:mb-0',
                  // @ts-expect-error – valid keys
                  headingClasses[node.tag],
                )}
              >
                <Serialize nodes={node.children} />
              </node.tag>
            );
          case 'paragraph':
            return node.children?.length > 0 ? (
              <p
                key={i}
                className={cn(
                  'my-3 text-lg first:mt-0 last:mb-0',
                  // @ts-expect-error – valid keys
                  alignClasses[node.format ?? 'left'],
                  // @ts-expect-error – valid keys
                  indentClasses[node.indent && node.indent < 5 ? node.indent : 0],
                )}
              >
                <Serialize nodes={node.children} />
              </p>
            ) : null;
          case 'block':
            return <Blocks key={i} {...node.fields.data} />;
          default:
            return <Fragment key={i}>{renderText(node)}</Fragment>;
        }
      })}
    </Fragment>
  );
}

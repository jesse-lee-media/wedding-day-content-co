import { Fragment } from 'react';

import { Text } from 'slate';

import { classes } from '@/lib/utils/classes';

interface Node {
  type: string;
  value?: {
    url: string;
    alt: string;
  };
  children?: Node[];
  url?: string;
  [key: string]: unknown;
}

interface SerializeProps {
  nodes: Node[] | undefined;
  pMarginClass?: string;
}

export default function Serialize({ nodes, pMarginClass = 'my-2' }: SerializeProps) {
  return !nodes ? null : (
    <Fragment>
      {nodes.map((node, i) => {
        if (Text.isText(node)) {
          let text: any = node.text;

          if (node.bold) {
            text = <strong>{text}</strong>;
          }

          if (node.italic) {
            text = <em>{text}</em>;
          }

          if (node.underline) {
            text = <span className="underline underline-offset-4">{text}</span>;
          }

          if (node.strikethrough) {
            text = <s>{text}</s>;
          }

          if (node.code) {
            text = <code>{text}</code>;
          }

          return <Fragment key={i}>{text}</Fragment>;
        }

        switch (node.type) {
          case 'h1':
            return (
              <h1 key={i} className="mb-8 mt-10 text-5xl first:mt-0 last:mb-0 sm:text-6xl">
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </h1>
            );
          case 'h2':
            return (
              <h2 key={i} className="mb-6 mt-8 text-4xl first:mt-0 last:mb-0 sm:text-5xl">
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="my-4 text-3xl first:mt-0 last:mb-0">
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </h3>
            );
          case 'h4':
            return (
              <h4 key={i} className="my-4 text-2xl first:mt-0 last:mb-0">
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </h4>
            );
          case 'h5':
            return (
              <h5 key={i} className="my-4 text-xl first:mt-0 last:mb-0">
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </h5>
            );
          case 'h6':
            return (
              <h6 key={i} className="my-4 text-lg first:mt-0 last:mb-0">
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </h6>
            );
          case 'ul':
            return (
              <ul key={i} className="my-4 list-disc space-y-1 pl-8 first:mt-0 last:mb-0">
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="my-4 list-decimal space-y-1 pl-8 first:mt-0 last:mb-0">
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </ol>
            );
          case 'li':
            return (
              <li key={i}>
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </li>
            );
          default:
            return (
              <p key={i} className={classes(pMarginClass, 'first:mt-0 last:mb-0')}>
                <Serialize nodes={node.children} pMarginClass={pMarginClass} />
              </p>
            );
        }
      })}
    </Fragment>
  );
}

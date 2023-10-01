import Icon from '@/lib/components/Icon';
import { PayloadFeatureCardsBlock } from '@/lib/types/payload';
import { classes } from '@/lib/utils/classes';

import Serialize from '../Serialize';

export default function FeatureCardsBlock(props: PayloadFeatureCardsBlock) {
  const { cards, listType } = props;

  const ListComponent = listType === 'ordered' ? 'ol' : 'ul';

  return (
    <ListComponent
      className={classes('my-6 gap-4', listType === 'ordered' ? 'flex flex-col' : 'grid grid-cols-1 sm:grid-cols-2')}
    >
      {cards.map(({ content, heading, icon }, i) => (
        <li
          key={i}
          className="grid grid-cols-1 gap-4 rounded-2xl border-2 border-orange-200/80 bg-gradient-to-br from-orange-100/25 to-orange-50 p-4 xs:grid-cols-[2.25rem_1fr]"
        >
          <Icon name={icon} className="text-4xl text-pink-800" />
          <div>
            <h1 className="mb-2 font-sans text-xl font-bold normal-case text-pink-800">{heading}</h1>
            <Serialize nodes={content as any} />
          </div>
        </li>
      ))}
    </ListComponent>
  );
}

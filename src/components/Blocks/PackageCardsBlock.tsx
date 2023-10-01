import Serialize from '@/components/Serialize';
import { PayloadButtonLink } from '@/lib/components/Buttons';
import Icon from '@/lib/components/Icon';
import { PayloadPackageCardsBlock } from '@/lib/types/payload';
import { classes } from '@/lib/utils/classes';

const List = ({ heading, icon, items }: PayloadPackageCardsBlock['packages'][0]['itemGroups'][0]) => {
  const insertSuperscript = (text: string, superscript: string) => {
    const textArr = text.split(' ');

    return (
      <>
        {textArr.slice(0, textArr.length - 1).join(' ')}{' '}
        <span className="whitespace-nowrap">
          {textArr.slice(textArr.length - 1)} <sup>{superscript}</sup>
        </span>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h4 className="font-sans text-sm font-semibold normal-case">{heading}</h4>
        <div className="h-[2px] flex-auto bg-orange-200/80"></div>
      </div>
      <ul className="flex flex-col gap-2 text-sm">
        {items.map(({ text, superscript }, i) => (
          <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-2">
            <span className="flex h-5 w-5 items-center justify-center">
              <Icon name={icon} className="text-base text-pink-800" />
            </span>
            <span>{superscript ? insertSuperscript(text, superscript) : text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PackageCard = (props: PayloadPackageCardsBlock['packages'][0]) => {
  const { description, emphasize, heading, icon, itemGroups, pricing } = props;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <li
      className={classes(
        emphasize ? 'border-pink-700' : 'border-orange-200',
        'flex flex-col overflow-clip rounded-2xl border-2 border-opacity-80',
      )}
    >
      <div className="flex flex-1 flex-col gap-4 bg-gradient-to-br from-orange-100/25 to-orange-50 p-4">
        <div>
          <div className="grid grid-cols-1 items-baseline gap-2 sm:grid-cols-[1.875rem_1fr]">
            <Icon name={icon} className="text-2xl font-bold text-pink-800" />
            <h3 className="font-sans text-2xl font-bold normal-case">{heading}</h3>
          </div>
          {description && (
            <div className="mt-2">
              <Serialize nodes={description as any} />
            </div>
          )}
        </div>
        {itemGroups.map((item, i) => (
          <List key={i} {...item} />
        ))}
      </div>
      <div
        className={classes(
          emphasize ? 'bg-gradient-to-tl' : 'bg-gradient-to-br',
          'flex flex-col items-center gap-6 border-t-2 border-t-orange-200 border-opacity-80 from-orange-100/80 to-orange-100/30 p-4 text-center',
        )}
      >
        <p className="flex items-baseline justify-center gap-1">
          <span className="text-xl font-semibold">{formatCurrency(pricing.price)}</span>
          {pricing.description && <span className="text-sm">{pricing.description}</span>}
        </p>
        <div className="flex w-full flex-col items-center gap-2">
          <PayloadButtonLink {...pricing.buttonLink} className="w-full max-w-[15rem]" />
          {pricing.footnote && (
            <p className="text-neutral-500">
              <small className="text-xs">{pricing.footnote}</small>
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

type CustomPackageCardProps = PayloadPackageCardsBlock['customPackage'] & {
  className?: string;
};

const CustomPackageCard = (props: CustomPackageCardProps) => {
  const { className, description, heading, buttonLink } = props;

  return (
    <li
      className={classes(
        className,
        'flex flex-col items-center justify-center gap-8 rounded-2xl border-2 border-orange-200 border-opacity-80 bg-gradient-to-br from-orange-100/80 to-orange-100/30 p-8',
      )}
    >
      <div className="text-center">
        <h2 className="mb-4 text-2xl sm:text-3xl">{heading}</h2>
        <Serialize nodes={description as any} pMarginClass="mx-auto max-w-lg my-2" />
      </div>
      <PayloadButtonLink {...buttonLink} />
    </li>
  );
};

export default function PackageCardsBlock(props: PayloadPackageCardsBlock) {
  const { customPackage, footnotes, packages, showCustomPackage } = props;

  const colSpanClass = (length: number) => {
    if (length === 1) {
      return 'md-lg:col-span-2';
    }

    let smClass = '';
    let mdLgClass = '';

    switch (length % 2) {
      case 0:
        smClass = 'sm:col-span-2';
        break;
      case 1:
        smClass = 'sm:col-span-1';
        break;
      default:
        smClass = '';
    }

    switch (length % 3) {
      case 0:
        mdLgClass = 'md-lg:col-span-3';
        break;
      case 1:
        mdLgClass = 'md-lg:col-span-2';
        break;
      case 2:
        mdLgClass = 'md-lg:col-span-1';
        break;
      default:
        mdLgClass = '';
    }

    return `${smClass} ${mdLgClass}`;
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md-lg:grid-cols-3">
        {packages.map((item, i) => (
          <PackageCard key={i} {...item} />
        ))}
        {showCustomPackage && <CustomPackageCard {...customPackage!} className={colSpanClass(packages.length)} />}
      </ul>
      {footnotes && footnotes.length > 0 && (
        <ul className="mt-8 flex flex-col gap-2 px-4">
          {footnotes.map(({ text, superscript }, i) => (
            <li key={i}>
              <p className="flex flex-row items-baseline gap-1 text-xs text-neutral-500">
                <sup>{superscript}</sup>
                <small className="text-xs">{text}</small>
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

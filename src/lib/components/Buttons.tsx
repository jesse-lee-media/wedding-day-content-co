import React from 'react';

import Link, { LinkProps } from 'next/link';

import Icon from './Icon';
import { PayloadButtonLinkField } from '../types/payload';
import { classes } from '../utils/classes';

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
  color?: 'neutral' | 'primary';
  icon?: string;
  iconPosition?: 'left' | 'right' | 'none';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'solid';
};
type ButtonWrapperProps = BaseButtonProps & {
  Component: React.ElementType;
};
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & BaseButtonProps;
export type ButtonLinkProps = LinkProps &
  BaseButtonProps & {
    rel?: string;
    target?: string;
  };
export type PayloadButtonLinkProps = PayloadButtonLinkField & {
  className?: string;
};

function BaseButton({
  Component,
  children,
  className,
  color = 'neutral',
  icon,
  iconPosition = 'none',
  size = 'md',
  variant = 'outlined',
  ...rest
}: ButtonWrapperProps) {
  const iconClass = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };
  const iconPositionClass = {
    left: 'flex-row',
    right: 'flex-row-reverse',
    none: 'flex-row',
  };
  const paddingClass = {
    left: {
      sm: 'pl-2 pr-3',
      md: 'pr-4 pl-3',
      lg: 'pr-5 pl-4',
    },
    right: {
      sm: 'pr-2 pl-3',
      md: 'pl-4 pr-3',
      lg: 'pl-5 pr-4',
    },
    none: {
      sm: 'px-3',
      md: 'px-4',
      lg: 'px-5',
    },
  };
  const sizeClass = {
    sm: 'h-7 text-xs gap-1',
    md: 'h-9 text-sm gap-1',
    lg: 'h-11 text-base gap-[0.375rem]',
  };
  const themeClass = {
    neutral: {
      outlined:
        'border-2 border-neutral-600 text-neutral-700 hover:border-neutral-600 hover:bg-neutral-600 hover:text-orange-50 focus:ring-neutral-500/75 [&:not(:hover)]:focus:bg-neutral-600/10',
      solid:
        'border-neutral-600 bg-neutral-600 text-neutral-50 hover:border-neutral-800 hover:bg-neutral-800 hover:text-orange-50 focus:ring-neutral-500/75 [&:not(:hover)]:focus:bg-neutral-800',
    },
    primary: {
      outlined:
        'border-2 border-pink-800 text-orange-800 hover:border-pink-900 hover:bg-pink-900 hover:text-orange-50 focus:ring-pink-500/75 [&:not(:hover)]:focus:bg-pink-800/10',
      solid:
        'border-pink-800 bg-pink-800 text-orange-50 hover:border-pink-900 hover:bg-pink-900 hover:text-orange-50 focus:ring-pink-500/75 [&:not(:hover)]:focus:bg-pink-900',
    },
  };

  return (
    <Component
      {...rest}
      className={classes(
        className,
        iconPositionClass[iconPosition],
        paddingClass[iconPosition][size],
        sizeClass[size],
        themeClass[color][variant],
        'flex w-fit items-center justify-center rounded-lg font-semibold no-underline shadow-neutral-900 transition-all hover:no-underline hover:shadow-lg focus:outline-none focus:ring-2',
      )}
    >
      {icon && <Icon name={icon!} className={iconClass[size]} />}
      {children}
    </Component>
  );
}

export const Button = (props: ButtonProps) => <BaseButton Component="button" {...props} />;

export const ButtonLink = (props: ButtonLinkProps) => <BaseButton Component={Link} {...props} />;

export const PayloadButtonLink = (props: PayloadButtonLinkProps) => {
  const { className, color, link, size, variant } = props;

  return (
    <ButtonLink
      href={link.type === 'external' ? link.url : `/${link.reference.value.slug}`}
      target={link.newTab ? '_blank' : undefined}
      rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
      icon={link.icon}
      iconPosition={link.iconPosition ?? 'none'}
      size={size}
      color={color}
      variant={variant}
      className={classes(className)}
    >
      {link.text}
    </ButtonLink>
  );
};

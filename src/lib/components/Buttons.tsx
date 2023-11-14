import React from 'react';

import Link, { LinkProps } from 'next/link';

import Icons from './Icons';
import { PayloadFieldButtonLink } from '../types/payload';
import { cn, linkProps } from '../utils';

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
  icon?: string | null;
  iconPosition?: 'left' | 'right' | 'center';
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

export type PayloadButtonLinkProps = PayloadFieldButtonLink & {
  className?: string;
};

function BaseButton({
  Component,
  children,
  className,
  icon,
  iconPosition = 'center',
  size = 'md',
  variant = 'outlined',
  ...rest
}: ButtonWrapperProps) {
  const iconClass = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  const iconPositionClass = {
    left: 'flex-row',
    right: 'flex-row-reverse',
    center: 'flex-row',
  };
  const paddingClass = {
    left: {
      sm: 'px-4 xs:pr-4 xs:pl-3',
      md: 'px-6 xs:pr-6 xs:pl-5',
      lg: 'px-8 xs:pr-8 xs:pl-7 ',
    },
    right: {
      sm: 'px-4 xs:pl-4 xs:pr-3',
      md: 'px-6 xs:pl-6 xs:pr-5',
      lg: 'px-8 xs:pl-8 xs:pr-7 ',
    },
    center: {
      sm: 'px-0',
      md: 'px-0',
      lg: 'px-0',
    },
  };
  const sizeClass = {
    sm: 'h-10 text-sm gap-1.5',
    md: 'h-12 text-base gap-2',
    lg: 'h-14 text-lg gap-2.5',
  };
  const iconSizeClass = {
    sm: 'xs:!w-10',
    md: 'xs:!w-12',
    lg: 'xs:!w-14',
  };
  const themeClass = {
    outlined: 'bg-white text-black border border-black dark:bg-black dark:text-white dark:border-white',
    solid: 'bg-black text-white border border-black dark:bg-white dark:text-black dark:border-white',
  };

  return (
    <Component
      {...rest}
      className={cn(
        'flex w-full items-center justify-center rounded-xl border-opacity-75 font-medium !no-underline transition-all hover:border-opacity-100 hover:bg-pink-100 hover:text-black hover:!no-underline hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black/75 dark:hover:bg-pink-200 dark:hover:text-black dark:focus:ring-white/75 xs:w-fit',
        iconPositionClass[iconPosition],
        icon && iconPosition === 'center' && iconSizeClass[size],
        paddingClass[iconPosition][size],
        sizeClass[size],
        themeClass[variant],
        className,
      )}
    >
      {icon && <Icons name={icon} className={iconClass[size]} />}
      {children}
    </Component>
  );
}

export const Button = (props: ButtonProps) => <BaseButton Component="button" {...props} />;

export const ButtonLink = (props: ButtonLinkProps) => <BaseButton Component={Link} {...props} />;

export const PayloadButtonLink = (props: PayloadButtonLinkProps) => {
  const { className, link, size, variant } = props;

  return (
    <ButtonLink
      {...linkProps(link)}
      icon={link.icon}
      iconPosition={link.iconPosition ?? 'center'}
      size={size}
      variant={variant}
      className={className}
    >
      {link.icon && link.iconPosition === 'center' ? null : link.text}
    </ButtonLink>
  );
};

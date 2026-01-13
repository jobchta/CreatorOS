import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

type ButtonVariant = 'coral' | 'teal' | 'amber' | 'rainbow' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  coral: 'bg-gradient-to-br from-coral to-rose-500 text-white shadow-lg shadow-coral/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-coral/40',
  teal: 'bg-gradient-to-br from-teal to-emerald text-bg shadow-lg shadow-teal/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal/40',
  amber: 'bg-gradient-to-br from-amber to-orange text-bg shadow-lg shadow-amber/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber/40',
  rainbow: 'bg-gradient-to-br from-coral via-amber via-teal to-cyan bg-[length:300%_300%] animate-[rainbow-shift_4s_ease_infinite] text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:shadow-black/30',
  ghost: 'bg-white/5 border border-white/10 text-white/80 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:text-white hover:-translate-y-0.5',
  glass: 'bg-glass border border-white/10 text-white shadow-lg backdrop-blur-xl hover:border-white/20 hover:-translate-y-0.5'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-2 rounded-lg',
  md: 'px-6 py-3 text-base gap-3 rounded-xl',
  lg: 'px-8 py-4 text-lg gap-4 rounded-2xl'
};

export const Button = ({
  children,
  variant = 'coral',
  size = 'md',
  href,
  className,
  icon,
  ...props
}: ButtonProps) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';
  const classes = twMerge(baseClasses, variants[variant], sizes[size], className);

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};

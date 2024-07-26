import React from "react";
import "@/index.css";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/utils";
import { LoadingSpinner } from "@/icons";

const buttonVariants = cva(
  `
    inline-flex
    items-center
    justify-center
    whitespace-nowrap
    rounded-md
    text-sm
    font-medium
    ring-offset-background
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-ring
    focus-visible:ring-offset-2
    disabled:pointer-events-none
    disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-primary
          text-primary-foreground
          hover:bg-primary/90
        `,
        secondary: `
          bg-secondary
          text-secondary-foreground
          hover:bg-secondary/80
        `,
        ghost: `
          hover:bg-accent
          hover:text-accent-foreground
        `,
      },
      size: {
        default: `
          h-10
          px-4
          py-2
        `,
        sm: `
          h-9
          rounded-md
          px-3
        `,
        lg: `
          h-11
          rounded-md
          px-8
        `,
        icon: `
          h-10
          w-10
        `,
      },
    },
    defaultVariants: {
      variant: `primary`,
      size: `default`,
    },
  },
);

type ExtraButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
};

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ExtraButtonProps {
  isLoading?: boolean;
  loadingVariant?: `icon` | `bar`;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      children,
      isLoading = false,
      loadingVariant = `icon`,
      size,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && loadingVariant === `icon` ? <LoadingSpinner /> : children}
      </button>
    );
  },
);
Button.displayName = `Button`;

export { Button, buttonVariants };

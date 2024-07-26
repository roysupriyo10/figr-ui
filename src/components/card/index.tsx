import React from "react";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";

type CardHeaderRequirementType = { title: string; description: string };

function assertType<T>(obj: any, func: (obj: any) => boolean): obj is T {
  if (func) {
    const result = func(obj);

    return result;
  }
  return false;
}

const cardVariants = cva(
  `
    rounded-lg
    border
    bg-card
    text-card-foreground
  `,
  {
    variants: {
      variant: {
        elevated: `
          shadow-elevated-card
          hover:shadow-elevated-card-hover
          transition
          duration-200
        `,
        flat: ``,
      },
    },
    defaultVariants: {
      variant: "flat",
    },
  },
);

type CardVariant = "elevated" | "flat";

type CardProps = {
  cardHeader?: CardHeaderRequirementType | ReactNode;
  cardContent?: ReactNode;
  cardFooter?: ReactNode;
  variant?: CardVariant;
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      cardHeader = "",
      cardContent = "",
      cardFooter = "",
      variant = "flat",
      children,
      ...props
    },
    ref,
  ) => {
    const isCardHeaderCustom = assertType<CardHeaderRequirementType>(
      cardHeader,
      function (cardHeader) {
        return (
          typeof cardHeader === "object" &&
          cardHeader !== null &&
          "title" in cardHeader &&
          typeof cardHeader.title === "string" &&
          (typeof cardHeader.description === "undefined" ||
            typeof cardHeader.description === "string")
        );
      },
    );
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      >
        {!isCardHeaderCustom ? (
          cardHeader
        ) : (
          <CardHeader>
            <CardTitle>{cardHeader.title}</CardTitle>
            {cardHeader.description && (
              <CardDescription>{cardHeader.description}</CardDescription>
            )}
          </CardHeader>
        )}
        {cardContent && <CardContent>{cardContent}</CardContent>}
        {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
      </div>
    );
  },
);
Card.displayName = "Card";

type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {children}
    </div>
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

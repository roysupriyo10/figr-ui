import React from "react";
import '@/index.css';

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import * as ModalPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/utils";
import { ImgCloseIcon, ImgMovableIcon } from "@/icons";
import { buttonVariants } from "../button";

const ModalOverlay = forwardRef<
  ElementRef<typeof ModalPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    ref={ref}
    className={cn(
      `
        fixed
        inset-0
        z-50
        bg-black/80
        data-[state=open]:animate-in
        data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0
      `,
      className,
    )}
    {...props}
  />
));
ModalOverlay.displayName = ModalPrimitive.Overlay.displayName;

const ModalHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex
        flex-col
        space-y-1.5
        text-center
        sm:text-left
      `,
      className,
    )}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

const ModalFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex
        flex-col-reverse
        sm:flex-row
        sm:justify-end
        sm:space-x-2
      `,
      className,
    )}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = forwardRef<
  ElementRef<typeof ModalPrimitive.Title>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Title
    ref={ref}
    className={cn(
      `
        text-lg
        font-semibold
        leading-none
        tracking-tight
      `,
      className,
    )}
    {...props}
  />
));
ModalTitle.displayName = ModalPrimitive.Title.displayName;

const ModalDescription = forwardRef<
  ElementRef<typeof ModalPrimitive.Description>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = ModalPrimitive.Description.displayName;

const ModalCloseButton = forwardRef<
  ElementRef<typeof ModalPrimitive.Close>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Close>
>(({ ...props }, ref) => (
  <ModalPrimitive.Close
    ref={ref}
    className="
      absolute
      right-4
      top-4
      rounded-sm
      ring-offset-background
      transition-opacity
      focus:outline-none
      focus:ring-2
      focus:ring-ring
      focus:ring-offset-2
      disabled:pointer-events-none
      data-[state=open]:bg-accent
      data-[state=open]:text-muted-foreground
    "
    {...props}
  >
    <ImgCloseIcon
      className="
        h-4
        w-4
        stroke-gray-800/80
        transition
        duration-200
        ease-in-out
        hover:stroke-black
      "
    />
    <span className="sr-only">Close</span>
  </ModalPrimitive.Close>
));

const ModalMove = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div
    ref={ref}
    className="
      absolute
      top-0
      cursor-move
      left-1/2
      -translate-x-1/2
    "
    {...props}
  >
    <ImgMovableIcon />
  </div>
));

const ModalTrigger = forwardRef<
  ElementRef<typeof ModalPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Trigger> & {
    trigger: ReactNode;
  }
>(({ trigger, className, ...props }, ref) => (
  <ModalPrimitive.Trigger
    className={
      typeof trigger === "string"
        ? cn(
            buttonVariants({
              variant: "primary",
            }),
            className,
          )
        : className
    }
    ref={ref}
    {...props}
  >
    {trigger}
  </ModalPrimitive.Trigger>
));

export {
  ModalTrigger,
  ModalOverlay,
  ModalCloseButton,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalMove,
};

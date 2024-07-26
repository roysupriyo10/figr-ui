import React from "react";

import * as ModalPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/utils";
import { FC, ReactNode, useRef } from "react";
import {
  ModalCloseButton,
  ModalMove,
  ModalOverlay,
  ModalTrigger,
} from "./modal-components";
// import { useDrag } from "@/hooks";

type ModalProps = {
  isDraggable?: boolean;
  children?: ReactNode;
  trigger: ReactNode;
  className?: string;
  hasCloseButton?: boolean;
  xOffset?: number;
  yOffset?: number;
};

const Modal: FC<ModalProps> = ({
  className = "",
  isDraggable = false,
  hasCloseButton = true,
  children,
  trigger,
}) => {
  isDraggable = false;
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // const { onMouseUp, onMouseDown, onMouseMove } = useDrag({
  //   draggerSelector: `[data-dragger]`,
  //   targetSelector: `[role="dialog"].draggable-modal`,
  // });

  return (
    <ModalPrimitive.Root modal={!isDraggable}>
      <ModalTrigger trigger={trigger} />

      <ModalPrimitive.Portal>
        {!isDraggable && <ModalOverlay />}
        <ModalPrimitive.Content
          ref={contentRef}
          onEscapeKeyDown={
            !isDraggable ? () => {} : (event) => event.preventDefault()
          }
          onPointerDownOutside={
            !isDraggable ? () => {} : (event) => event.preventDefault()
          }
          onInteractOutside={
            !isDraggable ? () => {} : (event) => event.preventDefault()
          }
          onOpenAutoFocus={
            !isDraggable ? () => {} : (event) => event.preventDefault()
          }
          onCloseAutoFocus={
            !isDraggable ? () => {} : (event) => event.preventDefault()
          }
          className={cn(
            `
              fixed
              z-50
              grid
              w-full
              max-w-lg
              gap-4
              border
              bg-background
              shadow-lg
              sm:rounded-lg
            `,
            {
              [`duration-200`]: !isDraggable,
              [`translate-x-[-50%]`]: !isDraggable,
              [`translate-y-[-50%]`]: !isDraggable,
              [`left-[50%]`]: !isDraggable,
              [`top-[50%]`]: !isDraggable,
              [`data-[state=open]:animate-in`]: !isDraggable,
              [`data-[state=closed]:animate-out`]: !isDraggable,
              [`data-[state=closed]:fade-out-0`]: !isDraggable,
              [`data-[state=open]:fade-in-0`]: !isDraggable,
              [`data-[state=closed]:zoom-out-95`]: !isDraggable,
              [`data-[state=open]:zoom-in-95`]: !isDraggable,
              [`data-[state=closed]:slide-out-to-left-1/2`]: !isDraggable,
              [`data-[state=closed]:slide-out-to-top-[48%]`]: !isDraggable,
              [`data-[state=open]:slide-in-from-left-1/2`]: !isDraggable,
              [`data-[state=open]:slide-in-from-top-[48%]`]: !isDraggable,
              [`draggable-modal`]: isDraggable,
            },
            className,
          )}
        >
          <div
            className="
              relative
              p-6
            "
          >
            {isDraggable && <ModalMove ref={triggerRef} />}
            {children}
          </div>
          {hasCloseButton && <ModalCloseButton />}
        </ModalPrimitive.Content>
      </ModalPrimitive.Portal>
    </ModalPrimitive.Root>
  );
};

export { Modal };

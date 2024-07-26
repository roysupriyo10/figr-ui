import React from "react";

import { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./modal-components";

type ModalProps = {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  className?: string;
  isDraggable?: boolean;
  hasCloseButton?: boolean;
  trigger: ReactNode;
};

const Modal: FC<ModalProps> = ({
  className = "",
  // isDraggable = false,
  hasCloseButton = true,
  children,
  trigger,
  footer,
  description,
  title,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        {trigger}
      </DialogTrigger>
      <DialogContent className={className} hasCloseButton={hasCloseButton}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export { Modal };

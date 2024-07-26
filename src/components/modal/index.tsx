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
import DraggableModal from "./draggable-modal";

export type ModalProps = {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  className?: string;
  isDraggable?: boolean;
  modalBackdrop?: boolean;
  hasCloseButton?: boolean;
  onClose?: () => void;
  trigger: ReactNode;
};

const Modal: FC<ModalProps> = ({
  className = "",
  isDraggable = false,
  hasCloseButton = true,
  children,
  onClose,
  modalBackdrop = false,
  trigger,
  footer,
  description,
  title,
}) => {
  return isDraggable ? (
    <DraggableModal
      className={className}
      isDraggable={isDraggable}
      modalBackdrop={modalBackdrop}
      hasCloseButton={hasCloseButton}
      children={children}
      onClose={onClose}
      trigger={trigger}
      footer={footer}
      description={description}
      title={title}
    />
  ) : (
    <Dialog
      onOpenChange={(open) => {
        if (!open && onClose) onClose();
      }}
    >
      <DialogTrigger>{trigger}</DialogTrigger>
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

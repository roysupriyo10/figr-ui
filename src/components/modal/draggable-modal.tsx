import React from "react";
import { FC, useEffect, useRef, useState } from "react";
import { ModalProps } from ".";
import { ImgCloseIcon } from "@/icons";
import { ModalMove } from "./modal-dragger";
import { cn } from "@/utils";
import { DialogFooter, DialogHeader } from "./modal-components";

const DraggableModal: FC<ModalProps> = ({
  className = "",
  hasCloseButton = true,
  onClose,
  modalBackdrop,
  children,
  trigger,
  footer,
  description,
  title,
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const isDragging = useRef<boolean>(false);

  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!modalRef.current || !triggerRef.current) return;

    const modal = modalRef.current;
    const trigger = triggerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      console.log("start dragging", e);
      isDragging.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      console.log("end dragging", e);
      isDragging.current = false;
      coords.current.lastX = modal.offsetLeft;
      coords.current.lastY = modal.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      console.log("continue dragging", e);
      if (!isDragging.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      modal.style.top = `${nextY}px`;
      modal.style.left = `${nextX}px`;
    };

    trigger.addEventListener("mousedown", onMouseDown);
    trigger.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      trigger.removeEventListener("mousedown", onMouseDown);
      trigger.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, []);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (modalBackdrop) {
      // index css file contains css declarations for this attribute state
      document.body.dataset["scrollLocked"] = isModalOpen ? "1" : undefined;
    }
    setIsModalOpen(isModalOpen);
  }, [isModalOpen, modalBackdrop]);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isModalOpen) {
      if (modalBackdrop) {
        modalRef.current.showModal();
      } else {
        modalRef.current.show();
      }
    } else {
      modalRef.current.close();
    }
  }, [isModalOpen, modalBackdrop]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (!modalRef.current) return;

    modalRef.current.addEventListener("keydown", handleKeyDown);

    return () => {
      if (!modalRef.current) return;

      modalRef.current.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleCloseModal = function () {
    if (onClose) onClose();

    document.body.style.overflow = "auto";

    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={cn(
          typeof children === "string"
            ? `
              bg-primary
              focus-visible:outline-none
              transition-colors
              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
              disabled:pointer-events-none
              disabled:opacity-50
              text-primary-foreground
              rounded-md
              h-10
              hover:bg-primary/90
              px-4
              py-2
            `
            : false,
          className,
        )}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {trigger}
      </button>
      <dialog
        ref={modalRef}
        data-state={isModalOpen ? "open" : "closed"}
        className="
          draggable-modal
          rounded-xl
        "
      >
        <section
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            className,
          )}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <ModalMove ref={triggerRef} />
          {hasCloseButton && (
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={handleCloseModal}
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
            </button>
          )}
          {(title || description) && (
            <DialogHeader>
              {title && (
                <div
                  className={cn(
                    "text-lg font-semibold leading-none tracking-tight",
                  )}
                >
                  {title}
                </div>
              )}
              {description && (
                <div className={cn("text-sm text-muted-foreground")}>
                  {description}
                </div>
              )}
            </DialogHeader>
          )}
          {children}
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </section>
      </dialog>
    </>
  );
};

export default DraggableModal;

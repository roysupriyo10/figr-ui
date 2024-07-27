import React from "react";
import { FC, useEffect, useRef, useState } from "react";
import { ModalProps } from ".";
import { ImgCloseIcon } from "@/icons";
import { ModalMove } from "./modal-dragger";
import { assertIsNode, cn } from "@/utils";
import { DialogFooter, DialogHeader } from "./modal-components";

const DraggableModal: FC<ModalProps> = ({
  className = "",
  hasCloseButton = true,
  onClose,
  modalBackdrop,
  style,
  children,
  trigger,
  footer,
  description,
  title,
}) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const moveTriggerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const isDraggingRef = useRef<boolean>(false);

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

  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    if (!sectionRef.current || !moveTriggerRef.current || !modalRef.current)
      return;

    const modal = sectionRef.current;
    const trigger = moveTriggerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      coords.current.lastX = modal.offsetLeft;
      coords.current.lastY = modal.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      modal.style.top = `${nextY}px`;
      modal.style.left = `${nextX}px`;
    };

    trigger.addEventListener("mousedown", onMouseDown);
    trigger.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseUp);
    document.body.addEventListener("mouseup", onMouseUp);

    const cleanup = () => {
      trigger.removeEventListener("mousedown", onMouseDown);
      trigger.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, []);

  useEffect(() => {
    if (modalBackdrop) return;
    const closeOnClickOutside = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      assertIsNode(e.target);
      if (!sectionRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnClickOutside);

    const cleanup = () => {
      document.removeEventListener("mousedown", closeOnClickOutside);
    };

    return cleanup;
  }, [modalBackdrop]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (modalBackdrop && document.body.scrollHeight > window.innerHeight) {
      // index css file contains css declarations for this attribute state
      document.body.dataset["scrollLocked"] = isModalOpen ? "1" : undefined;
    }
    setIsModalOpen(isModalOpen);
  }, [isModalOpen, modalBackdrop]);

  useEffect(() => {
    if (!modalRef.current) return;
    if (!sectionRef.current) return;
    if (!triggerRef.current) return;

    if (isModalOpen) {
      if (modalBackdrop) {
        modalRef.current.showModal();

        sectionRef.current.style.top = "50%";
        sectionRef.current.style.left = "50%";
        sectionRef.current.style.transform = "translate(-50%, -50%)";

        const sectionRect = sectionRef.current.getBoundingClientRect();

        coords.current.startX = window.innerWidth / 2;
        coords.current.startY = (window.innerHeight - sectionRect.height) / 2;
        coords.current.lastX = window.innerWidth / 2;
        coords.current.lastY =
          (window.innerHeight - sectionRect.height) / 2 +
          sectionRect.height / 2;
      } else {
        modalRef.current.show();
        const triggerRect = triggerRef.current.getBoundingClientRect();

        // make the modal appear right below the trigger in case of non-modal
        sectionRef.current.style.top =
          triggerRect.y + triggerRect.height + 4 + "px";
        sectionRef.current.style.left = triggerRect.x + "px";

        // set the default coordinates to be below the trigger
        coords.current.startX = triggerRect.x;
        coords.current.startY = triggerRect.y + triggerRect.height;
        coords.current.lastX = triggerRect.x;
        coords.current.lastY = triggerRect.y + triggerRect.height + 4;
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
        ref={triggerRef}
        className={cn(
          typeof trigger === "string"
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
        onClick={() => {
          if (modalBackdrop) {
            if (onClose) onClose();
            setIsModalOpen(false);
          }
        }}
        ref={modalRef}
        data-state={isModalOpen ? "open" : "closed"}
        className="
          draggable-modal
          rounded-xl
        "
      >
        <section
          ref={sectionRef}
          style={style}
          className={cn(
            {
              "duration-200": !isDragging,
              "top-1/2": modalBackdrop,
              "left-1/2": modalBackdrop,
              "-translate-y-1/2": modalBackdrop,
              "-translate-x-1/2": modalBackdrop,
            },
            `
              z-50
              fixed
              grid
              w-full
              max-w-lg
              gap-4
              border
              bg-background
              p-6
              text-secondary-foreground
              shadow-lg
              data-[state=open]:animate-in
              data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0
              data-[state=open]:fade-in-0
              data-[state=closed]:zoom-out-95
              data-[state=open]:zoom-in-95
              data-[state=closed]:slide-out-to-left-1/2
              data-[state=closed]:slide-out-to-top-[48%]
              data-[state=open]:slide-in-from-left-1/2
              data-[state=open]:slide-in-from-top-[48%]
              sm:rounded-lg
            `,
            className,
          )}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <ModalMove ref={moveTriggerRef} />
          {hasCloseButton && (
            <button
              className="
                absolute
                right-4
                top-4
                rounded-sm
                opacity-70
                ring-offset-background
                transition-opacity
                hover:opacity-100
                focus:outline-none
                focus:ring-2
                focus:ring-ring
                focus:ring-offset-2
                disabled:pointer-events-none
                data-[state=open]:bg-accent
                data-[state=open]:text-muted-foreground
              "
              onClick={handleCloseModal}
            >
              <ImgCloseIcon
                className="
                  h-4
                  w-4
                  stroke-primary/80
                  transition
                  duration-200
                  ease-in-out
                  hover:stroke-primary
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
                    `
                      text-lg
                      font-semibold
                      leading-none
                      tracking-tight
                      text-secondary-foreground
                    `,
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

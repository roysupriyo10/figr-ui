import { ImgMovableIcon } from "@/icons";
import React, { ComponentPropsWithoutRef } from "react";

import { ElementRef, forwardRef } from "react";

export const ModalMove = forwardRef<
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
    <ImgMovableIcon
      className="
        w-8
        h-4
        stroke-secondary-foreground
      "
    />
  </div>
));

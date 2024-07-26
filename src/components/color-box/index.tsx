import React from "react";

import { HslColorPicker } from "react-colorful";
import { assertIsNode, hslToHex } from "@/utils";
import { FC, useEffect, useRef, useState } from "react";

export enum ColorPropertyNames {
  PRIMARY = "--primary",
  SECONDARY = "--secondary",
  PRIMARY_FOREGROUND = "--primary-foreground",
  SECONDARY_FOREGROUND = "--secondary-foreground",
}

type ColorBoxProps = {
  label: string;
  propertyName: ColorPropertyNames;
};

export const ColorBox: FC<ColorBoxProps> = ({ propertyName, label }) => {
  const [color, setColor] = useState<string>("");
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  const openerRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!isPickerOpen) return;
    const listener = (event: MouseEvent) => {
      if (!openerRef.current) return;
      if (!spanRef.current) return;
      assertIsNode(event.target);

      if (spanRef.current.contains(event.target)) return;

      console.log("clicked", openerRef.current.contains(event.target));

      assertIsNode(event.target);
      if (
        openerRef.current.contains(event.target) &&
        !spanRef.current.contains(event.target)
      )
        return;

      setIsPickerOpen(false);
    };
    document.addEventListener("click", listener);

    const cleanup = () => {
      document.removeEventListener("click", listener);
    };

    return cleanup;
  }, [isPickerOpen]);

  useEffect(() => {
    const root = document.documentElement;

    const rootStyles = getComputedStyle(root);

    const color = rootStyles.getPropertyValue(propertyName).trim();

    console.log(color.split(" "));

    setColor(color);
  }, []);

  return (
    <div
      className="
        flex
        flex-col
        h-full
        gap-y-8
        items-start
        min-w-[160px]
      "
    >
      <span>{label}</span>
      <div
        className="
          w-full
          flex
          items-center
          gap-x-2
        "
      >
        <span
          ref={spanRef}
          className="
            w-8
            h-8
            rounded-full
            border
            border-black
            relative
          "
          style={{
            backgroundColor: `hsl(${color})`,
          }}
          onClick={() => {
            setIsPickerOpen(!isPickerOpen);
          }}
        >
          {isPickerOpen && (
            <div
              ref={openerRef}
              onClick={(event) => event.stopPropagation()}
              className="
                z-50
                absolute
                top-[calc(100%_+_10px)]
                left-[calc(100%_+_10px)]
              "
            >
              <HslColorPicker
                color={{
                  h: Number(color.split(" ")[0]),
                  s: Number(color.split(" ")[1]?.replace("%", "")),
                  l: Number(color.split(" ")[2]?.replace("%", "")),
                }}
                onChange={(newColor) => {
                  const color = `${newColor.h} ${newColor.s}% ${newColor.l}%`;
                  setColor(color);
                  // const cssText = ``
                  document.documentElement.style.setProperty(
                    propertyName,
                    color,
                  );
                }}
              />
            </div>
          )}
        </span>
        <span>
          <code
            className="
              rounded-sm
              bg-gray-200
              p-1
            "
          >
            {hslToHex(
              Number(color.split(" ")[0]),
              Number(color.split(" ")[1]?.replace("%", "")) / 100,
              Number(color.split(" ")[2]?.replace("%", "")) / 100,
            )}
          </code>
        </span>
      </div>
    </div>
  );
};

import React from "react";

import { HslColorPicker } from "react-colorful";
import { hslToHex } from "@/utils";
import { FC, useEffect, useState } from "react";
import { Modal } from "../modal";

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

  useEffect(() => {
    const root = document.documentElement;

    const rootStyles = getComputedStyle(root);

    const color = rootStyles.getPropertyValue(propertyName).trim();

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
      "
    >
      <span>{label}</span>
      <Modal
        className="
          max-w-max
        "
        title={`Color picker`}
        description="Pick a color and see it in the preview"
        isDraggable
        modalBackdrop={false}
        trigger={
          <span
            className="
              min-w-8
              min-h-8
              w-8
              h-8
              rounded-full
              border
              border-black
              block
              relative
            "
            style={{
              backgroundColor: `hsl(${color})`,
            }}
          ></span>
        }
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
            document.documentElement.style.setProperty(propertyName, color);
          }}
        />
        <span>
          {label}{" "}
          <code
            className="
              rounded-sm
              bg-primary
              text-primary-foreground
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
      </Modal>
    </div>
  );
};

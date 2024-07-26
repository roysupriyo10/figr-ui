import React from "react";

import { FC, useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { HslColorPicker } from "react-colorful";
import { assertIsNode, hslToHex } from "@/utils";

type ColorBoxProps = {
  label: string;
  propertyName: string;
};

const ColorBox: FC<ColorBoxProps> = ({ propertyName, label }) => {
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

const ThemePalette: FC = () => {
  return (
    <div
      className="
        flex
        flex-col
        gap-y-7
        p-12
        border-2
        shadow-elevated-card
        rounded-lg
        min-w-[500px]
      "
    >
      <div
        className="
          flex
          flex-col
          h-full
          gap-y-8
        "
      >
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Theme color
        </h2>
        <div
          className="
            flex
            h-full
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              min-h-full
              gap-x-5
            "
          >
            <ColorBox propertyName="--primary" label="Primary" />
            <ColorBox
              propertyName="--primary-foreground"
              label="Primary Foreground"
            />
          </div>
          <div
            className="
              bg-gray-200
              flex
              items-center
              justify-center
              min-w-[160px]
              rounded-sm
              px-6
              py-10
            "
          >
            <Button variant={"primary"}>Submit</Button>
          </div>
        </div>
        <div
          className="
            flex
            h-full
            justify-between
            gap-x-20
          "
        >
          <div
            className="
              flex
              items-center
              gap-x-5
              min-h-full
            "
          >
            <ColorBox propertyName="--secondary" label="Secondary" />
            <ColorBox
              propertyName="--secondary-foreground"
              label="Secondary Foreground"
            />
          </div>
          <div
            className="
              bg-gray-200
              flex
              items-center
              justify-center
              rounded-sm
              min-w-[160px]
              px-6
              py-10
            "
          >
            <Button variant={"secondary"}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ThemePalette.displayName = "ThemePalette";

export { ThemePalette };

import React from "react";

import { FC } from "react";
import { Button } from "../button";
import { DarkModeToggle } from "../dark-mode-toggle";
import { ColorBox, ColorPropertyNames } from "../color-box";

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
      <DarkModeToggle />
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
            <ColorBox
              propertyName={ColorPropertyNames.PRIMARY}
              label="Primary"
            />
            <ColorBox
              propertyName={ColorPropertyNames.PRIMARY_FOREGROUND}
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
            <ColorBox
              propertyName={ColorPropertyNames.SECONDARY}
              label="Secondary"
            />
            <ColorBox
              propertyName={ColorPropertyNames.SECONDARY_FOREGROUND}
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

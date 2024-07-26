import React from "react";

import { FC, useEffect, useState } from "react";
import { Switch } from "../switch";
import { Theme } from "../theme-provider";
import { Checkbox } from "../checkbox";

type DarkModeToggleProps = {
  defaultTheme?: Theme;
};

const DarkModeToggle: FC<DarkModeToggleProps> = ({
  defaultTheme = "light",
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (theme === "system") {
      document.body.dataset.theme = undefined;
    } else {
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  return (
    <div
      className="
        bg-background
        text-foreground
        rounded-full
        border
        border-primary
        w-max
        flex
        gap-x-4
        py-2
        px-4
      "
    >
      <span>Light</span>
      <Switch
        disabled={theme === "system"}
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
      />
      <span>Dark</span>
      <label
        className="
          flex
          items-center
          gap-x-2
        "
      >
        <Checkbox
          checked={theme === "system"}
          onCheckedChange={(checked) => {
            setTheme(checked ? "system" : "dark");
          }}
        />
        <span>System</span>
      </label>
    </div>
  );
};
DarkModeToggle.displayName = "DarkModeToggle";

export { DarkModeToggle };

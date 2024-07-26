import React from "react";

import { FC, useEffect, useState } from "react";
import { Switch } from "../switch";
import { Theme } from "../theme-provider";
import { Checkbox } from "../checkbox";

type DarkModeToggleProps = {
  defaultTheme?: Theme;
  storageKey?: string;
};

const DarkModeToggle: FC<DarkModeToggleProps> = ({
  defaultTheme,
  storageKey = "dark-mode-state",
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme === undefined ? "light" : defaultTheme);

  useEffect(() => {
    if (defaultTheme) return;
    const themeState = localStorage.getItem(storageKey) as Theme;
    document.body.dataset.theme = themeState;
    setTheme(themeState);
  }, []);

  useEffect(() => {
    if (theme === "system") {
      document.body.dataset.theme = undefined;
    } else {
      document.body.dataset.theme = theme;
    }

    localStorage.setItem(storageKey, theme);
  }, [theme]);

  return (
    <div
      className="
        bg-background
        text-foreground
        rounded-full
        shadow-elevated-card
        hover:shadow-elevated-card-hover
        transition
        duration-200
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

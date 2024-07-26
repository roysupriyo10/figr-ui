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
  // const { setTheme, theme } = useTheme();
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // useEffect(() => {
  //   const root = window.document.documentElement;
  //
  //   root.classList.remove("light", "dark");
  //
  //   if (defaultTheme === "system") {
  //     const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  //       .matches
  //       ? "dark"
  //       : "light";
  //
  //     document.body.dataset.theme = systemTheme;
  //     root.classList.add(systemTheme);
  //     return;
  //   }
  //
  //   // root.classList.add(theme);
  //   // if (theme !== defaultTheme) {
  //   //   setTheme(defaultTheme);
  //   // }
  // }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div
      className="
        bg-background
        text-foreground
        rounded-full
        flex
        gap-x-4
        shadow-elevated-card
        py-2
        px-4
      "
    >
      <span>Light</span>
      <Switch
        disabled={theme === "system"}
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          console.log(checked);
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

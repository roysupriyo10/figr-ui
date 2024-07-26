import type { Meta, StoryObj } from "@storybook/react";

import { ThemePalette } from "./index";

const meta: Meta<typeof ThemePalette> = {
  title: "Components/CustomThemePalette",
  component: ThemePalette,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSystemTheme: Story = {
  args: {
    defaultTheme: "system",
  },
};

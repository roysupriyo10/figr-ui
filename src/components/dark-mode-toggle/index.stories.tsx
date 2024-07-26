import type { Meta, StoryObj } from "@storybook/react";

import { DarkModeToggle } from "./index";

const meta: Meta<typeof DarkModeToggle> = {
  title: "Utilities/DarkModeToggle",
  component: DarkModeToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    storageKey: {
      type: "string",
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NoDefault: Story = {
  args: {},
};

export const WithSystemTheme: Story = {
  args: {
    defaultTheme: "system",
  },
};

export const DarkDefault: Story = {
  args: {
    defaultTheme: "dark",
  },
};

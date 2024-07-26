import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/CustomButton",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    isLoading: false,
    variant: "primary",
    className: "min-w-[120px]",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    isLoading: false,
    variant: "secondary",
    className: "min-w-[120px]",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    isLoading: false,
    variant: "ghost",
    className: "min-w-[120px]",
  },
};

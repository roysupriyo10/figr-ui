import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./index";

const meta: Meta<typeof Modal> = {
  title: "Components/CustomModal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isDraggable: {
      type: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasCloseButton: true,
    children: "Nice",
    trigger: "Open Modal",
  },
};

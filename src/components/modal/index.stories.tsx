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
    modalBackdrop: true,
    title: "Are you sure?",
    description: "This is a confirmation for your following action.",
    footer: "Footer",
  },
};

export const DraggableWithoutBackdrop: Story = {
  args: {
    hasCloseButton: true,
    children: "Nice",
    trigger: "Open Modal",
    modalBackdrop: false,
    title: "Are you sure?",
    description: "This is a confirmation for your following action.",
    footer: "Footer",
    isDraggable: true,
  },
};

export const DraggableWithBackdrop: Story = {
  args: {
    hasCloseButton: true,
    children: "Nice",
    trigger: "Open Modal",
    modalBackdrop: true,
    title: "Are you sure?",
    description: "This is a confirmation for your following action.",
    footer: "Footer",
    isDraggable: true,
  },
};

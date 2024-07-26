import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./index";
import { Switch } from "../switch";

const meta: Meta<typeof Card> = {
  title: "Components/CustomCard",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["elevated", "flat"],
      control: {
        type: "select",
      },
      mapping: {
        elevated: "elevated",
        flat: "flat",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Flat: Story = {
  args: {
    className: "min-w-[350px]",
    cardFooter: "Footer for card",
    cardHeader: {
      title: "Card title",
      description: "Card description",
    },
    cardContent: "Content for card",
    variant: "flat",
  },
};

export const Elevated: Story = {
  args: {
    className: "min-w-[350px]",
    cardFooter: "Footer for card",
    cardHeader: {
      title: "Card title",
      description: "Card description",
    },
    cardContent: "Content for card",
    variant: "elevated",
  },
};

export const CustomHeader: Story = {
  args: {
    className: "min-w-[350px]",
    cardFooter: "Footer for card",
    cardHeader: (
      <div
        className="
          p-6
        "
      >
        <h2
          className="
            font-bold
            text-lg
          "
        >
          This is a custom header for the card using ReactNode
        </h2>
        <div
          className="
            flex
            items-center
            justify-between
            font-light
            text-sm
          "
        >
          <span>Some info</span>
          <span>Some info</span>
        </div>
      </div>
    ),
    // children: (
    //   <div>
    //     <label
    //       className="
    //         flex
    //         flex-col
    //       "
    //     >
    //     <span></span>
    //     <Switch />
    //     </label>
    //   </div>
    // )
  },
};

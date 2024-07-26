import type { Meta, StoryObj } from "@storybook/react";

import { ColorBox, ColorPropertyNames } from "./index";

const meta: Meta<typeof ColorBox> = {
  title: "Utilities/ColorBox",
  component: ColorBox,
  parameters: {
    layout: "centered",
    docs: {
      story: {
        inline: false,
        iframeHeight: "300px",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSystemTheme: Story = {
  args: {
    propertyName: ColorPropertyNames.PRIMARY,
  },
};

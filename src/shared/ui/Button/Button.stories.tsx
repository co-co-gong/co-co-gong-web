import Button from "./Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    buttonType: {
      options: ["primary", "secondary", "outlined", "text"],
      control: { type: "select" },
    },
  },
  args: {
    buttonType: "primary",
    children: "BUTTON",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    buttonType: "primary",
  },
};

export const Secondary: Story = {
  args: {
    buttonType: "secondary",
  },
};

export const Outlined: Story = {
  args: {
    buttonType: "outlined",
  },
};

export const Text: Story = {
  args: {
    buttonType: "text",
  },
};

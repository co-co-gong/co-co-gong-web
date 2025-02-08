import Button from "./Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    buttonType: {
      name: "ButtonType",
      description: "button 형태",
      type: {
        name: "enum",
        value: ["primary", "secondary", "outlined", "text"],
        required: true,
      },
      control: { type: "select" },
    },
    children: {
      name: "Children",
      description: "버튼 내용",
      control: { type: "text" },
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

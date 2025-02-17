import BaseEditor from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BaseEditor> = {
  component: BaseEditor,
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof BaseEditor>;

export const Base: Story = {};

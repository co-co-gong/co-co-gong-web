import { EDITOR_THEMES } from "@/shared/constants/editor";

import BaseEditor from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BaseEditor> = {
  component: BaseEditor,
  argTypes: {
    fileName: {
      name: "fileName",
    },
    theme: {
      control: { type: "select" },
      type: {
        name: "enum",
        value: EDITOR_THEMES as unknown as string[],
      },
    },
  },
  args: {
    fileName: "test.py",
  },
};

export default meta;

type Story = StoryObj<typeof BaseEditor>;

export const Base: Story = {};

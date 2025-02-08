import { getAllCSSVariables } from "@/shared/lib/styles";

import Interaction from "./Interaction";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Interaction> = {
  component: Interaction,
  argTypes: {
    variant: {
      description: "Interaction의 강도를 나타냄.",
      control: "select",
      type: {
        name: "enum",
        value: ["light", "normal", "strong"],
        required: true,
      },
    },
    backgroundColor: {
      description: "Interaction의 색상을 나타냄.<br/>CSS 변수를 사용하여 색상을 지정함.",
      type: {
        name: "enum",
        value: Object.keys(getAllCSSVariables()),
        required: true,
      },
    },
    disabled: {
      description: "true로 설정할 경우, Interaction이 비활성화됨.",
      type: "boolean",
    },
  },
  decorators: [
    (story) => (
      <>
        <div style={{ display: "flex", gap: 10, margin: "12px 0", alignItems: "center" }}>
          <p>Interaction이 이루어지는 영역의 배경색을 선택하세요: </p>
          <input
            type="color"
            onChange={(e) => {
              const colorPicker = document.querySelector(".story-wrapper") as HTMLDivElement;
              colorPicker.style.backgroundColor = e.target.value;
            }}
          />
        </div>
        <div
          className="story-wrapper"
          style={{ cursor: "pointer", width: 200, height: 200, backgroundColor: "black", position: "relative" }}
        >
          {story()}
        </div>
      </>
    ),
  ],
  args: {
    backgroundColor: "--c-ui-white",
    variant: "normal",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Interaction>;

export const Default: Story = {
  args: {},
};

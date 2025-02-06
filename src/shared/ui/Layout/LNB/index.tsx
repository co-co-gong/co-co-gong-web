"use client";

import cx from "clsx";

import { useLayoutStore } from "@/shared/models";
import { Interaction } from "@/shared/ui/Interaction";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import Item from "./Item";
import { IconChevronLeft } from "public/icons/chevron";
import { IconChat, IconFriends, IconHome, IconSession, IconWorkspace } from "public/icons/layout";

import styles from "./LNB.module.scss";

const LNB: React.FC = () => {
  const { isFolded, toggleFold } = useLayoutStore();

  return (
    <DvhHeightLayout dvh={100} heightType="height" className={cx(styles.wrapper, { [styles.isFolded]: isFolded })}>
      <aside className={styles.lnb}>
        <Item icon={<IconHome />} href="/">
          Home
        </Item>
        <Item icon={<IconWorkspace />} href="/work-spaces">
          Workspace
        </Item>
        <Item icon={<IconSession />} href="/sessions">
          Session
        </Item>
        <Item icon={<IconFriends />} href="/friends">
          Friends
        </Item>
        <Item icon={<IconChat />} href="/chats">
          Chat
        </Item>
      </aside>
      <button
        type="button"
        className={cx(styles.toggleButton, { [styles.isFolded]: isFolded })}
        aria-label="LNB toggle button"
        onClick={toggleFold}
      >
        <IconChevronLeft />
        <Interaction variant="normal" backgroundColor="--c-ui-gray-75" />
      </button>
    </DvhHeightLayout>
  );
};

export default LNB;

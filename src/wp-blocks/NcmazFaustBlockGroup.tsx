import { NcmazFaustBlockGroupFragmentFragment } from "@/__generated__/graphql";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import MyWordPressBlockViewer from "@/components/MyWordPressBlockViewer";
import classNames from "@/utils/classNames";
import { gql } from "@apollo/client";
// ИСПРАВЛЕНИЕ 1: Полностью удаляем getBlockStyles из импорта.
import { WordPressBlock } from '@faustwp/blocks';
import React from "react";

const NcmazFaustBlockGroup: WordPressBlock<
  NcmazFaustBlockGroupFragmentFragment
> = (props) => {
  // ИСПРАВЛЕНИЕ 2: Удаляем вызов getBlockStyles.
  // const style = getBlockStyles(props);

  // ИСПРАВЛЕНИЕ 3: Получаем style напрямую из props, как и attributes.
  const { attributes, style } = props || {};
  const { className, hasBackground, variation } = attributes || {};

  return (
    <div className={`relative not-prose ${className || ""}`} style={style}>
      {hasBackground && (
        <BackgroundSection
          className={classNames(
            variation === "style2"
              ? "bg-yellow-100/70 dark:bg-black/20"
              : undefined,
            variation === "style3"
              ? "bg-green-100/70 dark:bg-black/20"
              : undefined,
            variation !== "style2" && variation !== "style3"
              ? "bg-neutral-100/70 dark:bg-black/20"
              : undefined
          )}
        />
      )}
      {/* @ts-ignore */}
      <MyWordPressBlockViewer blocks={props.children} />
    </div>
  );
};

export const NcmazFaustBlockGroupFragments = {
  entry: gql`
    fragment NcmazFaustBlockGroupFragment on NcmazFaustBlockGroup {
      attributes {
        style
        variation
        hasBackground
        className
      }
    }
  `,
  key: `NcmazFaustBlockGroupFragment`,
};

NcmazFaustBlockGroup.displayName = "NcmazFaustBlockGroup";
export default NcmazFaustBlockGroup;

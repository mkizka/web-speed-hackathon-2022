import React from "react";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const w = width.toString();
  const url = src
    .replace(".jpg", ".webp")
    .replace("races", `races/${w}`)
    .replace("players", `players/${w}`);
  return <img src={url} height={height} width={width} loading="lazy" />;
};

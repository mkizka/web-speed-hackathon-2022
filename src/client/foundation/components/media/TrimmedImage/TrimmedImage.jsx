import React from "react";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const url = src.endsWith(".jpg") ? src.replace(".jpg", ".webp") : src;
  return (
    <img
      width={width}
      height={height}
      src={url}
      loading="lazy"
      style={{ objectFit: "cover" }}
    />
  );
};

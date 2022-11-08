import React from "react";
import { useDocumentBodyWidth } from "../../../utils/useDocumentBodyWidth";

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

export const TrimmedHeroImage = ({ height, src, width }) => {
  const documentBodyWidth = useDocumentBodyWidth();
  const w = width.toString();
  const url = src
    .replace(".jpg", ".webp")
    .replace("races", `races/${w}`)
    .replace("players", `players/${w}`);
  const imageWidth =
    documentBodyWidth <= width + 32 ? documentBodyWidth - 32 : width;
  const imageHeight = (imageWidth * height) / width;
  return (
    <img src={url} height={imageHeight} width={imageWidth} loading="lazy" />
  );
};

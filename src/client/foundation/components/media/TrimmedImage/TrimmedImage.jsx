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
  const documentBodyWidth = useDocumentBodyWidth();
  const w = width.toString();
  const url = src
    .replace(".jpg", ".webp")
    .replace("races", `races/${w}`)
    .replace("players", `players/${w}`);
  const imageWidth =
    documentBodyWidth <= 400 + 32 ? documentBodyWidth - 32 : 400;
  const imageHeight = (imageWidth * height) / width;
  return (
    <img src={url} height={imageHeight} width={imageWidth} loading="lazy" />
  );
};

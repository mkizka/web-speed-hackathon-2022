import React from "react";
import styled from "styled-components";

import { useDocumentBodyWidth } from "../../../../utils/useDocumentBodyWidth";

const Image = styled.img`
  display: block;
  margin: 0 auto;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  const documentBodyWidth = useDocumentBodyWidth();
  const width = documentBodyWidth <= 1024 + 32 ? documentBodyWidth - 32 : 1024;
  return <Image alt="" width={width} src={url} />;
};

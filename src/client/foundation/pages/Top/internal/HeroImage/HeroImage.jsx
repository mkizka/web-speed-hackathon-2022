import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
`;

function useDocumentBodyWidth() {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    function handleResize() {
      setWidth(document.body.clientWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

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

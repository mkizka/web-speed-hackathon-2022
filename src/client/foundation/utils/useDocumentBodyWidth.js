import { useState, useEffect } from "react";

export function useDocumentBodyWidth() {
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

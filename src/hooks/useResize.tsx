import { useLayoutEffect, useState } from "react";

const sizes = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};
export default function useWindowSize() {
  const [size, setSize] = useState("sm");
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth >= sizes.xxl) {
        setSize("xxl");
      } else if (window.innerWidth >= sizes.xl) {
        setSize("xl");
      } else if (window.innerWidth >= sizes.lg) {
        setSize("lg");
      } else if (window.innerWidth >= sizes.md) {
        setSize("md");
      } else if (window.innerWidth >= sizes.sm) {
        setSize("sm");
      } else {
        setSize("xs");
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

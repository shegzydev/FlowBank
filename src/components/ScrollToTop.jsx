import { useContext, useEffect } from "react";
import SectionContext from "../context/SectionContext";

function ScrollToTop() {
  const { selectedSectionIndex } = useContext(SectionContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [selectedSectionIndex]);

  return null;
}

export default ScrollToTop;

import { useEffect, useState } from "react";

const useScrollPosition = () => {
  const [scrollPos, setScrollPos] = useState<number>(
    typeof window !== "undefined" ? window.pageYOffset : 0
  );

  const onScroll = () => {
    setScrollPos(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return scrollPos;
};

export default useScrollPosition;

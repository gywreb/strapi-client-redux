import { useEffect, useState } from "react";
import useScrollPosition from "../../hooks/useScrollPosition";
import Animator from "../Animator/Animator";
import ConditionalAnimator from "../ConditionalAnimator/ConditionalAnimator";
import LayoutHeader from "../LayoutHeader/LayoutHeader";

const AppHeader = () => {
  const scrollPos = useScrollPosition();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (scrollPos > 64) setVisible(true);
    else setVisible(false);
  }, [scrollPos]);

  return (
    <Animator motion="fadeIn">
      <Animator motion="fadeIn">
        <LayoutHeader />
      </Animator>
      <ConditionalAnimator motion="fadeIn" visible={visible}>
        <LayoutHeader fixed />
      </ConditionalAnimator>
    </Animator>
  );
};

export default AppHeader;

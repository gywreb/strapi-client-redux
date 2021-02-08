import { motion, Variants } from "framer-motion";

type MotionName = "fadeIn";
// | "fadeOut"
// | "slideLeftIn"
// | "slideRightIn"
// | "slideDownIn"
// | "slideUpIn";
//   | "slideLeftOut"
//   | "slideRightOut"
//   | "scaleIn";

interface AnimationControlProps {
  motion: MotionName;
  visible?: boolean;
  duration?: number;
}

type AnimationVariants = {
  [key in MotionName]: Variants;
};

const ConditionalAnimator: React.FC<AnimationControlProps> = (props) => {
  const { duration, visible } = props;
  const defaultSetting = {
    duration: 0.3,
    visible:
      typeof visible === "undefined"
        ? "inactive"
        : visible
        ? "active"
        : "inactive",
  };
  const animations: AnimationVariants = {
    fadeIn: {
      active: {
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      inactive: {
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
        display: "none",
      },
    },
  };

  return (
    <motion.div
      animate={defaultSetting.visible}
      variants={animations[props.motion]}
    >
      {props.children}
    </motion.div>
  );
};

export default ConditionalAnimator;

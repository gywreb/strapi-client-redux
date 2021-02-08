import { motion, Variants } from "framer-motion";

type MotionName =
  | "fadeIn"
  | "fadeOut"
  | "slideLeftIn"
  | "slideRightIn"
  | "slideDownIn"
  | "slideUpIn";
//   | "slideLeftOut"
//   | "slideRightOut"
//   | "scaleIn";

interface AnimationControlProps {
  motion: MotionName;
  visible?: boolean;
  scollPos?: number;
  duration?: number;
}

type AnimationVariants = {
  [key in MotionName]: Variants;
};

const Animator: React.FC<AnimationControlProps> = (props) => {
  const { duration } = props;
  const defaultSetting = {
    duration: 0.3,
  };
  const animations: AnimationVariants = {
    fadeIn: {
      enter: {
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    fadeOut: {
      enter: {
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    slideLeftIn: {
      enter: {
        x: 0,
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        x: -150,
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    slideRightIn: {
      enter: {
        x: 0,
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        x: 150,
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    slideDownIn: {
      enter: {
        y: 0,
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        y: -150,
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    slideUpIn: {
      enter: {
        y: 0,
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        y: 150,
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
  };

  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      variants={animations[props.motion]}
    >
      {props.children}
    </motion.div>
  );
};

export default Animator;

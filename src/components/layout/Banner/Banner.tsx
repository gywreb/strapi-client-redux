import { Typography } from "antd";
import React from "react";
import { LayoutBanner } from "../../../store/types";
import styles from "./Banner.module.scss";

interface LayoutBannerProps {
  banner: LayoutBanner;
}

const Banner: React.FC<LayoutBannerProps> = ({ banner }) => {
  return (
    <>
      <img
        src={`${process.env.NEXT_PUBLIC_API_BASEURL}${banner.image.url}`}
        alt=""
        style={{ width: "100%" }}
      />
      <div className={styles.banner_content}>
        <div className="container">
          <Typography.Title className={styles.banner_content__title}>
            {banner.title}
          </Typography.Title>
          <Typography.Text className={styles.banner_content__text}>
            {banner.description}
          </Typography.Text>
        </div>
      </div>
    </>
  );
};

export default Banner;

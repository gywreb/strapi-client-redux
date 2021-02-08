import { CheckSquareTwoTone } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { CourseOverview, OverviewPage } from "../../../../store/types";
import styles from "./CourseOverview.module.scss";

interface CourseOverviewProps {
  page: OverviewPage;
  section: CourseOverview;
}

const CourseOverviewBlock: React.FC<CourseOverviewProps> = ({
  section,
  page,
}) => {
  return (
    <div className={styles["section"]}>
      <Typography.Title className={styles["section-title"]}>
        {section.course.title}
      </Typography.Title>
      <Typography.Title level={3} className={styles["section_textblock-title"]}>
        {section.course.description}
      </Typography.Title>
      <Typography.Text className={styles["section_textblock-text"]}>
        {section.course.content}
      </Typography.Text>

      <Row className={styles["section_thumbnail"]}>
        {section.course.thumbnails.length
          ? section.course.thumbnails.map((thumbnail) => (
              <Link
                href={
                  thumbnail.class
                    ? `/${page.path}/${section.course.path}/${thumbnail.class.path}`
                    : "/"
                }
              >
                <Col span={4} className={styles["section_thumbnail__body"]}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASEURL}${thumbnail.image.url}`}
                    alt=""
                  />
                  <Typography.Title
                    level={5}
                    className={styles["section_thumbnail__body-title"]}
                  >
                    {thumbnail.caption}
                  </Typography.Title>
                </Col>
              </Link>
            ))
          : null}
      </Row>
      <Row className={styles["learnList"]}>
        {section.course.learnList.length
          ? section.course.learnList.map((item) => (
              <Col
                span={12}
                className={clsx(styles["learnList_item"], "d-flex a-center")}
              >
                <CheckSquareTwoTone
                  twoToneColor="cyan"
                  className={styles["learnList_item__icon"]}
                />
                <Typography.Text className={styles["learnList_item__text"]}>
                  {item.content}
                </Typography.Text>
              </Col>
            ))
          : null}
      </Row>
    </div>
  );
};

export default CourseOverviewBlock;

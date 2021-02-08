import { CheckCircleTwoTone } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { ICourse } from "../../../../store/types";
import styles from "./CourseInfo.module.scss";

interface CourseInfoProps {
  course: ICourse;
  currentPage: string;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ course, currentPage }) => {
  return (
    <div className={styles["courseInfo"]}>
      <Typography.Text className={styles["courseInfo_textblock"]}>
        {course.content}
      </Typography.Text>
      <Row className={styles["courseInfo_thumbnail"]}>
        {course.thumbnails.length
          ? course.thumbnails.map((thumbnail) => (
              <Link
                href={
                  thumbnail.class
                    ? `/${currentPage}/${course.path}/${thumbnail.class.path}`
                    : "/"
                }
              >
                <Col span={4} className={styles["courseInfo_thumbnail__body"]}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASEURL}${thumbnail.image.url}`}
                    alt=""
                  />
                  <Typography.Title
                    level={5}
                    className={styles["courseInfo_thumbnail__body-title"]}
                  >
                    {thumbnail.caption}
                  </Typography.Title>
                </Col>
              </Link>
            ))
          : null}
      </Row>
      <Row className={styles["learnList"]}>
        {course.learnList.length
          ? course.learnList.map((item) => (
              <Col
                span={12}
                className={clsx(styles["learnList_item"], "d-flex a-center")}
              >
                <CheckCircleTwoTone
                  twoToneColor="gray"
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

export default CourseInfo;

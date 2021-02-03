import { CheckCircleTwoTone } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Animator from "../../../src/components/Animator/Animator";
import LoadingIndicator from "../../../src/components/LoadingIndicator/LoadingIndicator";
import Page404 from "../../../src/components/Page404/Page404";
import { coursePageAction } from "../../../src/store/action";
import { CoursePageState, RootState } from "../../../src/store/types";

const CoursePage = () => {
  const dispatch = useDispatch();
  const { loading, error, page } = useSelector<RootState, CoursePageState>(
    (state) => state.coursePage
  );

  const router = useRouter();

  useEffect(() => {
    if (router.query.currentCourse)
      dispatch(coursePageAction.getPage(router.query.currentCourse as string));
  }, [router, dispatch]);

  if (error) return <Page404 />;
  if (!loading && page) {
    return (
      <Animator motion="fadeIn" duration={0.6}>
        <Head>
          <title>{page.title}</title>
        </Head>
        <div className="banner">
          {page.banner ? (
            <>
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASEURL}${page.banner.image.url}`}
                alt=""
                style={{ width: "100%" }}
              />
              <div className="banner_content">
                <div className="container">
                  <Typography.Title className="banner_content__title">
                    {page.banner.title}
                  </Typography.Title>
                  <Typography.Text className="banner_content__text">
                    {page.banner.description}
                  </Typography.Text>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="container">
          {page.courseInfo ? (
            <div className="courseInfo">
              <Typography.Text className="courseInfo_textblock">
                {page.courseInfo.course.content}
              </Typography.Text>
              <Row className="courseInfo_thumbnail">
                {page.courseInfo.course.thumbnails.length
                  ? page.courseInfo.course.thumbnails.map((thumbnail) => (
                      <Link
                        href={
                          thumbnail.class
                            ? `/${router.query.currentPage}/${page.courseInfo.course.path}/${thumbnail.class.path}`
                            : "/"
                        }
                      >
                        <Col span={4} className="courseInfo_thumbnail__body">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_BASEURL}${thumbnail.image.url}`}
                            alt=""
                          />
                          <Typography.Title
                            level={5}
                            className="courseInfo_thumbnail__body-title"
                          >
                            {thumbnail.caption}
                          </Typography.Title>
                        </Col>
                      </Link>
                    ))
                  : null}
              </Row>
              <Row className="learnList">
                {page.courseInfo.course.learnList.length
                  ? page.courseInfo.course.learnList.map((item) => (
                      <Col span={12} className="learnList_item d-flex a-center">
                        <CheckCircleTwoTone
                          twoToneColor="gray"
                          className="learnList_item__icon"
                        />
                        <Typography.Text className="learnList_item__text">
                          {item.content}
                        </Typography.Text>
                      </Col>
                    ))
                  : null}
              </Row>
            </div>
          ) : null}
          <div className="relatedContent">
            <Typography.Title level={3}>Related Content</Typography.Title>
            <Row className="relatedContent_thumbnail">
              {page.relatedContent.length
                ? page.relatedContent.map((thumbnail) => (
                    <Link
                      href={`/${router.query.currentPage}/${thumbnail.course.path}`}
                    >
                      <Col span={4} className="relatedContent_thumbnail__body">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_BASEURL}${thumbnail.image.url}`}
                          alt=""
                        />
                        <Typography.Title
                          level={5}
                          className="relatedContent_thumbnail__body-title"
                        >
                          {thumbnail.course.title}
                        </Typography.Title>
                      </Col>
                    </Link>
                  ))
                : null}
            </Row>
          </div>
        </div>
      </Animator>
    );
  } else return <LoadingIndicator />;
};

export default CoursePage;

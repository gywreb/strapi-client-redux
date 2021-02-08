import { Col, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../../src/components/layout/Banner/Banner";
import LoadingIndicator from "../../../src/components/layout/LoadingIndicator/LoadingIndicator";
import CourseInfo from "../../../src/components/pages/CoursePage/CourseInfo/CourseInfo";
import Page404 from "../../../src/components/pages/Page404/Page404";
import Animator from "../../../src/components/utils/Animator/Animator";
import { coursePageAction } from "../../../src/store/action";
import { CoursePageState, RootState } from "../../../src/store/types";

const CoursePage = () => {
  const dispatch = useDispatch();
  const { loading, error, page, relatedContent } = useSelector<
    RootState,
    CoursePageState
  >((state) => state.coursePage);

  const router = useRouter();

  useEffect(() => {
    if (router.query.currentCourse)
      dispatch(coursePageAction.getPage(router.query.currentCourse as string));
  }, [router, dispatch]);

  useEffect(() => {
    if (page && router.query.currentPage) {
      dispatch(
        coursePageAction.getRelatedContent(router.query.currentPage as string)
      );
    }
  }, [page, router, dispatch]);

  console.log(relatedContent);

  if (error) return <Page404 />;
  if (!loading && page) {
    return (
      <Animator motion="fadeIn" duration={0.6}>
        <Head>
          <title>{page.title}</title>
        </Head>
        <div className="banner">
          {page.banner ? <Banner banner={page.banner} /> : null}
        </div>
        <div className="container">
          {page.courseInfo ? (
            <CourseInfo
              course={page.courseInfo.course}
              currentPage={router.query.currentPage as string}
            />
          ) : null}
          <div className="relatedContent">
            <Typography.Title level={3}>Related Content</Typography.Title>
            <Row className="relatedContent_thumbnail">
              {relatedContent
                ? relatedContent.map((thumbnail) => (
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

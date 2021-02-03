import { CheckSquareTwoTone } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Animator from "../../src/components/Animator/Animator";
import LoadingIndicator from "../../src/components/LoadingIndicator/LoadingIndicator";
import Page404 from "../../src/components/Page404/Page404";
import { overviewPageAction } from "../../src/store/action";
import { RootState } from "../../src/store/types";
import { OverviewPageState } from "../../src/store/types/overviewPage.type";

const OverviewPage = () => {
  const dispatch = useDispatch();
  const { loading, error, page } = useSelector<RootState, OverviewPageState>(
    (state) => state.overviewPage
  );

  const router = useRouter();

  useEffect(() => {
    if (router.query.currentPage)
      dispatch(overviewPageAction.getPage(router.query.currentPage as string));
  }, [router, dispatch]);

  if (error) return <Page404 />;
  if (!loading && page) {
    return (
      <Animator motion="fadeIn" duration={0.6}>
        <Head>
          <title>{page.title}</title>
        </Head>
        <div className="banner">
          {page.body.banner
            ? page.body.banner.map((banner) => (
                <>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASEURL}${banner.image.url}`}
                    alt=""
                    style={{ width: "100%" }}
                  />
                  <div className="banner_content">
                    <div className="container">
                      <Typography.Title className="banner_content__title">
                        {banner.title}
                      </Typography.Title>
                      <Typography.Text className="banner_content__text">
                        {banner.description}
                      </Typography.Text>
                    </div>
                  </div>
                </>
              ))
            : null}
        </div>
        <div className="container">
          {page.body["course-overview"]
            ? page.body["course-overview"].map((section) => (
                <div className="section">
                  <Typography.Title className="section-title">
                    {section.course.title}
                  </Typography.Title>
                  <Typography.Title
                    level={3}
                    className="section_textblock-title"
                  >
                    {section.course.description}
                  </Typography.Title>
                  <Typography.Text className="section_textblock-text">
                    {section.course.content}
                  </Typography.Text>

                  <Row className="section_thumbnail">
                    {section.course.thumbnails.length
                      ? section.course.thumbnails.map((thumbnail) => (
                          <Link
                            href={
                              thumbnail.class
                                ? `/${page.path}/${section.course.path}/${thumbnail.class.path}`
                                : "/"
                            }
                          >
                            <Col span={4} className="section_thumbnail__body">
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_BASEURL}${thumbnail.image.url}`}
                                alt=""
                              />
                              <Typography.Title
                                level={5}
                                className="section_thumbnail__body-title"
                              >
                                {thumbnail.caption}
                              </Typography.Title>
                            </Col>
                          </Link>
                        ))
                      : null}
                  </Row>
                  <Row className="learnList">
                    {section.course.learnList.length
                      ? section.course.learnList.map((item) => (
                          <Col
                            span={12}
                            className="learnList_item d-flex a-center"
                          >
                            <CheckSquareTwoTone
                              twoToneColor="cyan"
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
              ))
            : null}
        </div>
      </Animator>
    );
  } else return <LoadingIndicator />;
};

export default OverviewPage;

import { Col, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../src/components/LoadingIndicator/LoadingIndicator";
import { pageAction } from "../src/store/action";
import { RootState } from "../src/store/types";
import { PageState } from "../src/store/types/page.type";

const AdvancedPhotographyPage = () => {
  const dispatch = useDispatch();
  const { loading, error, page } = useSelector<RootState, PageState>(
    (state) => state.page
  );

  const router = useRouter();

  useEffect(() => {
    dispatch(pageAction.getPage(router.pathname));
  }, []);

  if (loading) return <LoadingIndicator />;
  if (error) return <h1>Error getting page</h1>;
  if (page) {
    return (
      <>
        <Head>
          <title>{page.title}</title>
        </Head>
        <div className="banner">
          {page.body.banner
            ? page.body.banner.map((banner) => (
                <>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASEURL}${banner.thumbnail.picture.image.url}`}
                    alt=""
                    style={{ width: "100%" }}
                  />
                  <div className="banner_content">
                    <Typography.Title className="banner_content__title">
                      {banner.title}
                    </Typography.Title>
                    <Typography.Text className="banner_content__text">
                      {banner.thumbnail.caption}
                    </Typography.Text>
                  </div>
                </>
              ))
            : null}
        </div>
        <div className="container">
          {page.body.section
            ? page.body.section.map((section) => (
                <div className="section">
                  <Typography.Title className="section-title">
                    {section.title}
                  </Typography.Title>
                  {section.textblocks
                    ? section.textblocks.map((textblock) => (
                        <>
                          <Typography.Title
                            level={3}
                            className="section_textblock-title"
                          >
                            {textblock.title}
                          </Typography.Title>
                          <Typography.Text className="section_textblock-text">
                            {textblock.content}
                          </Typography.Text>
                        </>
                      ))
                    : null}
                  <Row className="section_thumbnail">
                    {section.thumbnails
                      ? section.thumbnails.map((thumbnail) => (
                          <Link href="/">
                            <Col span={4} className="section_thumbnail__body">
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_BASEURL}${thumbnail.picture.image.url}`}
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
                </div>
              ))
            : null}
        </div>
      </>
    );
  } else return <h1>No page found!</h1>;
};

export default AdvancedPhotographyPage;

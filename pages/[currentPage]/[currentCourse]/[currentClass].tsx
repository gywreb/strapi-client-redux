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
import PromoOverlay from "../../../src/components/PromoOverlay/PromoOverlay";
import { classPageAction } from "../../../src/store/action";
import { ClassPageState, RootState } from "../../../src/store/types";

const ClassPage = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    page,
    thisClassCourse,
    prevClass,
    nextClass,
  } = useSelector<RootState, ClassPageState>((state) => state.classPage);
  const router = useRouter();

  useEffect(() => {
    if (router.query.currentClass)
      dispatch(classPageAction.getPage(router.query.currentClass as string));
  }, [router, dispatch]);

  useEffect(() => {
    if (router.query.currentCourse) {
      dispatch(
        classPageAction.getPrevAndNextClass(
          router.query.currentCourse as string
        )
      );
      dispatch(
        classPageAction.getThisClassCourse(router.query.currentCourse as string)
      );
    }
  }, [page]);

  if (error) return <Page404 />;
  if (!loading && page) {
    const { title, promoPic, classInfo, gallery } = page;
    return (
      <Animator motion="fadeIn" duration={0.6}>
        <Head>
          <title>{title}</title>
        </Head>
        <Row className="promoSection">
          <Col span={17} className="promoSection_imageContainer">
            <Link href="/">
              <div style={{ cursor: "pointer" }}>
                <div className="promoSection_image d-flex">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASEURL}${promoPic.url}`}
                    alt=""
                  />
                </div>
                <div className="promoSection_playBtn centerize">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 65.49 40"
                    enable-background="new 0 0 65.49 40"
                  >
                    <g>
                      <path
                        fill="#1D1D1B"
                        fill-opacity="0.79"
                        d="M58.37,0H7.12C3.19,0,0,3.19,0,7.12v25.77C0,36.81,3.19,40,7.12,40h51.26
                c3.93,0,7.12-3.19,7.12-7.12V7.12C65.49,3.19,62.3,0,58.37,0z M25.49,29.4V8.74L45.4,19.16L25.49,29.4z"
                      ></path>
                      <polygon
                        fill="#FFFFFF"
                        points="25.49,29.4 45.4,19.16 25.49,8.74 	"
                      ></polygon>
                    </g>
                  </svg>
                </div>
                <div className="promoSection_login-bar centerize">
                  <Link href="/">Login to start watching</Link>
                </div>
              </div>
            </Link>
          </Col>
          <Col span={7}>
            <PromoOverlay />
          </Col>
        </Row>
        <div className="container">
          <Row className="classSection">
            <Col span={18} className="classSection_main">
              <Typography.Title level={2} className="classSection_title">
                {classInfo.class.title}
              </Typography.Title>
              {classInfo.class.content.split("<br />").map((text) => (
                <div className="classSection_content">
                  <Typography.Text>{text}</Typography.Text>
                  <br />
                </div>
              ))}
              <Typography.Title level={4}>
                In this {thisClassCourse?.title.toLowerCase()} class we cover
                the following:
              </Typography.Title>
              <div className="classSection_coverList">
                {classInfo.class.classCoverList.map((item) => (
                  <div className="classSection_coverList-item d-flex a-center">
                    <CheckCircleTwoTone
                      twoToneColor="gray"
                      className="classSection_coverList-icon"
                    />
                    <Typography.Text>{item.content}</Typography.Text>
                  </div>
                ))}
              </div>
              {gallery.map((item) => (
                <div className="classSection_galleryContainer">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASEURL}${item.image.url}`}
                    alt=""
                  />
                </div>
              ))}
            </Col>
            <Col span={6} className="classSection_extra">
              <div className="classSection_extra__coursePath">
                <Typography.Title
                  level={2}
                  className="classSection_extra__coursePath-title"
                >
                  This class is part of
                </Typography.Title>
                <Link
                  href={`/${router.query.currentPage}/${thisClassCourse?.path}`}
                >
                  <a>{thisClassCourse?.title}</a>
                </Link>
              </div>
              <div className="classSection_extra__prefClass">
                <Typography.Title
                  level={5}
                  className="classSection_extra__prefClass-title"
                >
                  Next & Prev Class
                </Typography.Title>
                <Row className="classSection_extra__prefClass-nextprevBlock-body">
                  {prevClass ? (
                    <Col
                      span={12}
                      className="classSection_extra__prefClass-nextprevBlock"
                    >
                      <Link
                        href={`/${router.query.currentPage}/${router.query.currentCourse}/${prevClass.class.path}`}
                      >
                        <a className="classSection_extra__prefClass-nextprevBlock-img">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_BASEURL}${prevClass.image.url}`}
                            alt="photo"
                          />
                        </a>
                      </Link>
                      <Typography.Text className="classSection_extra__prefClass-nextprevBlock-link">
                        <Link
                          href={`/${router.query.currentPage}/${router.query.currentCourse}/${prevClass.class.path}`}
                        >
                          <a>
                            {`<<`} {prevClass.class.title}
                          </a>
                        </Link>
                      </Typography.Text>
                    </Col>
                  ) : null}
                  {nextClass ? (
                    <Col
                      span={12}
                      className="classSection_extra__prefClass-nextprevBlock"
                    >
                      <Link
                        href={`/${router.query.currentPage}/${router.query.currentCourse}/${nextClass.class.path}`}
                      >
                        <a className="classSection_extra__prefClass-nextprevBlock-img">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_BASEURL}${nextClass.image.url}`}
                            alt="photo"
                          />
                        </a>
                      </Link>
                      <Typography.Text className="classSection_extra__prefClass-nextprevBlock-link">
                        <Link
                          href={`/${router.query.currentPage}/${router.query.currentCourse}/${nextClass.class.path}`}
                        >
                          <a>
                            {nextClass.class.title} {`>>`}
                          </a>
                        </Link>
                      </Typography.Text>
                    </Col>
                  ) : null}
                </Row>
              </div>
              <div className="classSection_extra__equipment">
                <Typography.Title
                  level={5}
                  className="classSection_extra__equipment-title"
                >
                  Equipment List
                </Typography.Title>
                <img
                  src="/image/file-icon.webp"
                  alt=""
                  style={{
                    maxWidth: "60%",
                    paddingTop: "20px",
                    opacity: "0.5",
                  }}
                />
                <Link href="/">
                  <a>The equipment list is avaliable for members only.</a>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Animator>
    );
  } else return <LoadingIndicator />;
};

export default ClassPage;

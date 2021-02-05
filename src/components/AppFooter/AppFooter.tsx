import { createFromIconfontCN } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { footerAction } from "../../store/action";
import { RootState } from "../../store/types";
import { FooterState } from "../../store/types/footer.type";
import Animator from "../Animator/Animator";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import styles from "./AppFooter.module.scss";

const scriptUrl = process.env.NEXT_PUBLIC_ICONFONT_URL;

const IconFont = createFromIconfontCN({
  scriptUrl,
});

const AppFooter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, footer } = useSelector<RootState, FooterState>(
    (state) => state.footer
  );

  useEffect(() => {
    dispatch(footerAction.getFooter());
  }, [dispatch, router]);

  if (error) return <h1>Error getting footer</h1>;
  if (!loading && footer) {
    return (
      <Animator motion="fadeIn" duration={0.6}>
        <div className={styles.footer}>
          <div className={styles.footer_section}>
            <div className="container">
              <Row gutter={[32, 32]}>
                {footer.footerSection.length
                  ? footer.footerSection.map((section) => (
                      <Col span={8}>
                        <Typography.Title
                          level={5}
                          className={styles.footer_section__title}
                        >
                          {section.title}
                        </Typography.Title>
                        {section.items.length
                          ? section.items.map((item) => (
                              <div>
                                <Link href="/">
                                  <a>{item.content}</a>
                                </Link>
                              </div>
                            ))
                          : null}
                      </Col>
                    ))
                  : null}
              </Row>
            </div>
          </div>
          <div className={styles.footer_extra}>
            <div className="container">
              <Row className="a-center j-center">
                <Col span={12}>
                  {footer.contacts.map((contact) => (
                    <div className={styles.footer_extra__contact}>
                      <Typography.Text>{contact.content}</Typography.Text>
                    </div>
                  ))}
                  <div className={styles.footer_extra__right}>
                    <Typography.Text>
                      All website content © Copyright Karl Taylor Photography
                    </Typography.Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    className={clsx(
                      styles.footer_extra__iconList,
                      "d-flex a-center"
                    )}
                  >
                    {footer.socialMedia.map((icon) => (
                      <a
                        href={icon.path ? `${icon.path}` : "/"}
                        target="_blank"
                      >
                        <span className={styles.footer_extra__iconList_icon}>
                          <IconFont type={icon.name} />
                        </span>
                      </a>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Animator>
    );
  } else return <LoadingIndicator />;
};

export default AppFooter;

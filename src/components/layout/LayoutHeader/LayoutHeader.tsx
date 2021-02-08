import { Button, Col, Layout, Row, Typography } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../store/action";
import { IUserInfo, RootState } from "../../../store/types";
import NavigationBarREST from "../../layout/NavigationBar/NavigationBarREST";

interface LayoutHeaderProps {
  fixed?: boolean;
}

const LayoutHeader: NextPage<LayoutHeaderProps> = ({ fixed }) => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, IUserInfo | null>(
    (state) => state.login.loggedUser
  );
  const router = useRouter();

  return (
    <>
      {router.pathname === "/login" ||
      router.pathname === "/register" ||
      router.pathname === "/register/success" ? null : (
        <div className={fixed ? "app-header fixed" : "app-header"}>
          <Layout.Header className="app-header__body">
            <Row className="jc-between container">
              <Col className="centerize">
                <Link href="/">
                  <Typography.Title
                    level={2}
                    style={{ cursor: "pointer", margin: 0 }}
                  >
                    HOME
                  </Typography.Title>
                </Link>
              </Col>
              <Col>
                {user ? (
                  <>
                    <Typography.Text>
                      Welcome back {user.username}
                    </Typography.Text>
                    <Button
                      className="ml-2"
                      onClick={() => dispatch(loginAction.logout())}
                    >
                      SIGN OUT
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/register">
                      <Button>SIGN UP</Button>
                    </Link>
                    <Link href="/login">
                      <Button>SIGN IN</Button>
                    </Link>
                  </>
                )}
              </Col>
            </Row>
          </Layout.Header>
          <NavigationBarREST />
        </div>
      )}
    </>
  );
};

export default LayoutHeader;

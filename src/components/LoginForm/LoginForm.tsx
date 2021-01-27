import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, registerAction } from "../../store/action";
import { ILoginUser, LoginValidationError, RootState } from "../../store/types";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector<RootState, boolean>(
    (state) => state.login.loading
  );
  const error = useSelector<RootState, LoginValidationError | string | null>(
    (state) => state.login.error
  );
  const accessToken = useSelector<RootState, string | null>(
    (state) => state.login.accessToken
  );

  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: registerAction.REGISTER_RESET });
  }, []);

  useEffect(() => {
    if (error) {
      if (!(typeof error === "string")) {
        let formErrors = [];
        for (let err in error) {
          formErrors.push({ name: err, errors: [error[err]] });
        }
        form.setFields(formErrors);
      }
      dispatch({ type: loginAction.LOGIN_RESET });
    }
  }, [dispatch, form, error]);

  useEffect(() => {
    if (!error && !!accessToken) router.replace("/");
  }, [error, accessToken]);

  const onFinish = (values: ILoginUser) => {
    if (values) {
      const user = { ...values };
      dispatch(loginAction.login(user));
    }
  };

  return (
    <Row className="centerize full-view-height">
      <Col xs={23} md={12} xl={7}>
        <Card className="card-shadow br-5">
          <Typography.Title
            level={2}
            className="centerize pt-2 text-primary letter-spacing"
          >
            WELCOME BACK!
          </Typography.Title>
          <Form
            form={form}
            name="login"
            scrollToFirstError
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              name="identifier"
              label="Email"
              rules={[
                { type: "email", message: "Invalid email" },
                { required: true, message: "Please input your email" },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                className="br-4"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                className="br-4"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item className="pt-2">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="full-width letter-spacing br-4"
                loading={loading ? true : false}
              >
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
          <Typography.Text className="centerize">
            Not a member ?
            <span className="pl-1">
              <Link href="/register">Join now</Link>
            </span>
          </Typography.Text>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;

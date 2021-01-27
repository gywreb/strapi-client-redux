import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../store/action";
import { RegisterValidationError, RootState } from "../../store/types";

interface FormValues {
  name: string;
  email: string;
  password: string;
  gender: string;
}

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector<RootState, boolean>(
    (state) => state.register.loading
  );
  const error = useSelector<RootState, string | RegisterValidationError | null>(
    (state) => state.register.error
  );
  const isSuccess = useSelector<RootState, boolean>(
    (state) => state.register.isSuccess
  );
  const [form] = Form.useForm();
  const router = useRouter();
  useEffect(() => {
    if (error) {
      if (!(typeof error === "string")) {
        let formErrors = [];
        for (let err in error) {
          formErrors.push({ name: err, errors: [error[err]] });
        }
        form.setFields(formErrors);
        dispatch({ type: registerAction.REGISTER_RESET });
      }
    }
  }, [form, error]);

  useEffect(() => {
    if (!error && isSuccess) {
      router.push("/register/success");
      dispatch({ type: registerAction.REGISTER_SUCCESS_CONFIRM });
    }
  }, [error, isSuccess]);

  const onFinish = (values: FormValues) => {
    if (values) {
      const newUser = { ...values };
      dispatch(registerAction.register(newUser));
    }
  };

  return (
    <Row className="centerize pt-6 pb-6">
      <Col xs={23} md={12} xl={7}>
        <Card className="card-shadow br-5">
          <Typography.Title
            level={2}
            className="centerize pt-2 text-primary letter-spacing"
          >
            JOIN US NOW!
          </Typography.Title>
          <Typography.Text className="centerize pb-1">
            Already a member ?
            <span className="pl-1">
              <Link href="/login">Sign in</Link>
            </span>
          </Typography.Text>
          <Form
            form={form}
            name="register"
            scrollToFirstError
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input your user name" },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                className="br-4"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="email"
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
                { min: 6, message: "Password must be at least 6 characters" },
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
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please type in your password again",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two password that you entered do not match!"
                    );
                  },
                }),
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

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please choose your gender" }]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Select
                size="large"
                placeholder="Choose your gender"
                className="br-4"
              >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className="pt-2">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="full-width letter-spacing br-4"
                loading={loading ? true : false}
              >
                SIGN UP
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;

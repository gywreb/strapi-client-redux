import { Button, Card, Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/types";

const RegisterSuccess = () => {
  const dispatch = useDispatch();

  const isConfirmed = useSelector<RootState, boolean>(
    (state) => state.register.isConfirmed
  );

  const router = useRouter();

  const handleConfirm = () => {
    router.push("/login");
  };

  return (
    <Row className="centerize full-view-height">
      <Col xs={23} lg={12}>
        <Card className="card-shadow br-5">
          <Typography.Title
            level={2}
            className="centerize pt-2 text-primary letter-spacing"
          >
            CONGRATULATION
          </Typography.Title>
          <Typography.Title level={4} className="centerize pt-1">
            Enjoy your shopping!
          </Typography.Title>
          <div className="centerize pt-3 pb-2">
            <Button
              onClick={handleConfirm}
              size="large"
              type="primary"
              className="letter-spacing br-4"
            >
              GO TO LOGIN PAGE
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterSuccess;

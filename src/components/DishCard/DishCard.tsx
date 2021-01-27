import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
} from "reactstrap";
import { IDish } from "../../store/types/restaurant.type";

interface DishCardProps {
  dish: IDish;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  return (
    <Col sm="12" md="4" style={{ padding: 0 }} key={dish.id}>
      <Card style={{ margin: "0 10px" }}>
        <CardImg
          top={true}
          style={{ height: 250 }}
          src={`${process.env.NEXT_PUBLIC_API_BASEURL}${dish.image.url}`}
        />
        <CardBody style={{ minHeight: 400 }}>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
          <CardText>
            <strong>${dish.price}</strong>
          </CardText>
        </CardBody>
        <div className="card-footer">
          <Button outline color="primary">
            + Add To Cart
          </Button>

          <style jsx>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              .container-fluid {
                margin-bottom: 30px;
              }
              .btn-outline-primary {
                color: #007bff !important;
              }
              a:hover {
                color: white !important;
              }
            `}
          </style>
        </div>
      </Card>
    </Col>
  );
};

export default DishCard;

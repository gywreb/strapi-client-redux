import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { restaurantAction } from "../../store/action";
import { RootState } from "../../store/types";
import {
  IRestaurant,
  RestaurantState,
} from "../../store/types/restaurant.type";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

interface IRestaurantProps {
  search: string;
}

const RestaurantList: React.FC<IRestaurantProps> = (props) => {
  const dispatch = useDispatch();
  const { loading, error, restaurants } = useSelector<
    RootState,
    RestaurantState
  >((state) => state.restaurant);

  const [searchList, setSearchList] = useState<IRestaurant[]>([]);

  useEffect(() => {
    dispatch(restaurantAction.getAllRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (restaurants) {
      if (props.search.trim().length) {
        setSearchList(
          restaurants.filter((query) =>
            query.name.toLowerCase().includes(props.search.trim())
          )
        );
      } else setSearchList(restaurants);
    } else setSearchList([]);
  }, [restaurants, props.search]);

  if (error) return <h1>Error loading restaurants</h1>;
  if (loading) return <LoadingIndicator />;
  if (searchList.length)
    return (
      <Row>
        {searchList.map((res) => (
          <Col sm="12" md="4" key={res.id}>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg
                top={true}
                style={{ height: 250 }}
                src={`${process.env.NEXT_PUBLIC_API_BASEURL}${res.image.url}`}
              />
              <CardBody style={{ minHeight: 400 }}>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Link href={`/restaurant/${res.id}`}>
                  <a className="btn btn-primary">View</a>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
        <style jsx global>
          {`
            a {
              color: white;
            }
            a:link {
              text-decoration: none;
              color: white;
            }
            a:hover {
              color: white;
            }
            .card-columns {
              column-count: 3;
            }
          `}
        </style>
      </Row>
    );
  else return <h1>No Restaurants Found</h1>;
};

export default RestaurantList;

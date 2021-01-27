import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "reactstrap";
import DishCard from "../../src/components/DishCard/DishCard";
import LoadingIndicator from "../../src/components/LoadingIndicator/LoadingIndicator";
import { restaurantAction } from "../../src/store/action";
import { RootState } from "../../src/store/types";
import { RestaurantState } from "../../src/store/types/restaurant.type";

export interface IDish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
  };
}

const RestaurantMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, menu } = useSelector<RootState, RestaurantState>(
    (state) => state.restaurant
  );
  useEffect(() => {
    const { id } = router.query;
    if (id) dispatch(restaurantAction.getRestaurantById(id as string));
  }, [dispatch]);

  if (error) return <h1>Error showing menu</h1>;
  if (loading) return <LoadingIndicator />;
  if (menu) {
    if (menu.dishes.length)
      return (
        <div className="container-fluid">
          <h1>{menu.name}</h1>
          <Row>
            {menu.dishes.map((dish) => (
              <DishCard dish={dish} />
            ))}
          </Row>
        </div>
      );
  } else return <h1>This restaurant is not exist</h1>;
};

export default RestaurantMenu;

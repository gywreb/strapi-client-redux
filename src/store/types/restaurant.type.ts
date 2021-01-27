import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
import { restaurantAction } from "../action";

export interface IDish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
  };
}

export interface IRestaurant {
  id: string;
  name: string;
  description: string;
  image: {
    url: string;
  };
  dishes: IDish[];
}

export interface RestaurantState {
  restaurants: IRestaurant[] | null;
  menu: IRestaurant | null;
  error: null | string;
  loading: boolean;
}

export interface RestaurantAction {
  type:
    | typeof restaurantAction.GET_ALL_RESTAURANTS
    | typeof restaurantAction.RESTAURANT_API_REQUEST
    | typeof restaurantAction.RESTAURANT_API_FAILED
    | typeof restaurantAction.GET_RESTAURANT;
  payload?: IRestaurant[] | string | IRestaurant;
}

export type RestaurantThunk = ThunkAction<
  void,
  RootState,
  null,
  RestaurantAction
>;

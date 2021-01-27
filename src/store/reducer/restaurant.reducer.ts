import { restaurantAction } from "../action";
import {
  IRestaurant,
  RestaurantAction,
  RestaurantState,
} from "./../types/restaurant.type";

const initialState: RestaurantState = {
  restaurants: null,
  menu: null,
  error: null,
  loading: false,
};

export default function restaurantReducer(
  state = initialState,
  action: RestaurantAction
): RestaurantState {
  switch (action.type) {
    case restaurantAction.RESTAURANT_API_REQUEST: {
      return { ...state, loading: true };
    }
    case restaurantAction.RESTAURANT_API_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload as string,
        restaurants: null,
        menu: null,
      };
    }
    case restaurantAction.GET_ALL_RESTAURANTS: {
      return {
        ...state,
        loading: false,
        error: null,
        restaurants: action.payload as IRestaurant[],
      };
    }
    case restaurantAction.GET_RESTAURANT: {
      return {
        ...state,
        loading: false,
        error: null,
        menu: action.payload as IRestaurant,
      };
    }
    default: {
      return { ...state };
    }
  }
}

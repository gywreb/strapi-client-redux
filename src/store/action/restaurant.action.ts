import axios from "axios";
import { RestaurantThunk } from "../types/restaurant.type";

export const RESTAURANT_API_REQUEST = "[RESTAURANT] RESTAURANT API REQUEST";
export const RESTAURANT_API_FAILED = "[RESTAURANT] RESTAURANT API FAILED";
export const GET_ALL_RESTAURANTS = "[RESTAURANT] GET ALL RESTAURANTS";
export const GET_RESTAURANT = "[RESTAURANT] GET RESTAURANT'S MENU";

const baseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export const getRestaurantById = (id: string): RestaurantThunk => async (
  dispatch
) => {
  dispatch({ type: RESTAURANT_API_REQUEST });
  try {
    const { data } = await axios({
      method: "GET",
      url: baseUrl + "/restaurants",
      params: { id },
    });
    console.log(data);
    dispatch({ type: GET_RESTAURANT, payload: data[0] });
  } catch (error) {
    dispatch({
      type: RESTAURANT_API_FAILED,
      payload:
        error.response.data.message[0].messages[0].message ||
        "Server is currently not working",
    });
  }
};

export const getAllRestaurants = (): RestaurantThunk => async (dispatch) => {
  dispatch({ type: RESTAURANT_API_REQUEST });
  try {
    const { data } = await axios({
      method: "GET",
      url: baseUrl + "/restaurants",
    });
    console.log(data);
    dispatch({ type: GET_ALL_RESTAURANTS, payload: data });
  } catch (error) {
    dispatch({
      type: RESTAURANT_API_FAILED,
      payload:
        error.response.data.message[0].messages[0].message ||
        "Server is currently not working",
    });
  }
};

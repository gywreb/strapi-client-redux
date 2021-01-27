import axios, { AxiosResponse } from "axios";
import {
  NavigationBarBody,
  NavigationBarThunk,
} from "./../types/navigation.type";
export const GET_NAVIGATION_BAR = "[NAVIGATION] GET NAVIGATION BAR";
export const GET_NAVIGATION_REQUEST = "[NAVIGATION] REQUEST NAVIGATION";
export const GET_NAVIGATION_FAILURE = "[NAVIGATION] REQUEST NAVIGATION FAILURE";
export const SET_ACTIVE_NAV = "[NAVIGATION] SET ACTIVE NAV";

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

export const getNavigationBar = (path: string): NavigationBarThunk => async (
  dispatch
) => {
  dispatch({ type: GET_NAVIGATION_REQUEST });
  try {
    const { data }: AxiosResponse<NavigationBarBody> = await axios({
      baseURL,
      url: "/navigation-bar",
      method: "GET",
    });
    dispatch({ type: GET_NAVIGATION_BAR, payload: data });
    if (path) {
      const currentActiveNav = data.body.find((item) => {
        if (item.page_name) return path.includes(item.page_name);
      });
      if (currentActiveNav)
        dispatch({
          type: SET_ACTIVE_NAV,
          payload: currentActiveNav.label,
        });
    }
  } catch (error) {
    dispatch({ type: GET_NAVIGATION_FAILURE, payload: "Error" });
  }
};

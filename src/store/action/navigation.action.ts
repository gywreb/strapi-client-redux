import axios, { AxiosResponse } from "axios";
import {
  NavigationBarBody,
  NavigationBarThunk,
  NavigationRouterQuery,
} from "./../types/navigation.type";
export const GET_NAVIGATION_BAR = "[NAVIGATION] GET NAVIGATION BAR";
export const GET_NAVIGATION_REQUEST = "[NAVIGATION] REQUEST NAVIGATION";
export const GET_NAVIGATION_FAILURE = "[NAVIGATION] REQUEST NAVIGATION FAILURE";
export const SET_ACTIVE_NAV = "[NAVIGATION] SET ACTIVE NAV";
export const SET_ACTIVE_MENU = "[NAVIGATION] SET ACTIVE MENU";

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

export const getActive = (
  path: NavigationRouterQuery
): NavigationBarThunk => async (dispatch, getState) => {
  const { navigationBar } = getState().navigation;
  if (navigationBar !== null) {
    if (path) {
      {
        const currentActiveNav = navigationBar.body.find((item) => {
          if (item.path) return path.currentPage?.includes(item.path);
        });
        if (currentActiveNav) {
          dispatch({
            type: SET_ACTIVE_NAV,
            payload: currentActiveNav.label,
          });
          const currentActiveMenu = currentActiveNav.menu.links.find((link) => {
            if (link.path) return path.currentCourse?.includes(link.path);
          });
          if (currentActiveMenu)
            dispatch({
              type: SET_ACTIVE_MENU,
              payload: currentActiveMenu.path,
            });
        }
      }
    }
  }
};
export const getNavigationBar = (): NavigationBarThunk => async (dispatch) => {
  dispatch({ type: GET_NAVIGATION_REQUEST });
  try {
    const { data }: AxiosResponse<NavigationBarBody> = await axios({
      baseURL,
      url: "/navigation-bar",
      method: "GET",
    });
    dispatch({ type: GET_NAVIGATION_BAR, payload: data });
  } catch (error) {
    dispatch({ type: GET_NAVIGATION_FAILURE, payload: "Error" });
  }
};

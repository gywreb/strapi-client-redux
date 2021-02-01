import { navigationAction } from "../action";
import {
  NavigationBarAction,
  NavigationBarBody,
  NavigationBarState,
} from "./../types/navigation.type";

const initialState: NavigationBarState = {
  loading: false,
  error: null,
  navigationBar: null,
  activeNav: null,
  activeMenu: null,
};

export default function navigationBarReducer(
  state = initialState,
  action: NavigationBarAction
): NavigationBarState {
  switch (action.type) {
    case navigationAction.GET_NAVIGATION_REQUEST: {
      return { ...state, loading: true };
    }
    case navigationAction.GET_NAVIGATION_BAR: {
      return {
        ...state,
        loading: false,
        navigationBar: action.payload as NavigationBarBody,
        error: null,
      };
    }
    case navigationAction.GET_NAVIGATION_FAILURE: {
      return {
        ...state,
        loading: false,
        navigationBar: null,
        error: action.payload as string,
      };
    }
    case navigationAction.SET_ACTIVE_NAV: {
      return {
        ...state,
        activeNav: action.payload as string,
        activeMenu: null,
      };
    }
    case navigationAction.SET_ACTIVE_MENU: {
      return { ...state, activeMenu: action.payload as string };
    }
    default: {
      return { ...state };
    }
  }
}

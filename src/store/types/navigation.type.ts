import { ThunkAction } from "redux-thunk";
import { navigationAction } from "../action";
import { RootState } from "./index";

export interface NavigationRouterQuery {
  currentPage?: string;
  currentCourse?: string;
  currentClass?: string;
}

export interface NavigationLink {
  label: string;
  path: string;
}

export interface NavigationMenu {
  label: string;
  links: NavigationLink[];
}

export interface NavigationDropdown {
  label: string;
  path: string;
  menu: NavigationMenu;
}

export interface NavigationBarBody {
  body: NavigationDropdown[];
}

export interface NavigationBarState {
  loading: boolean;
  error: string | null;
  navigationBar: NavigationBarBody | null;
  activeNav: string | null;
  activeMenu: string | null;
}

export interface NavigationBarAction {
  type:
    | typeof navigationAction.GET_NAVIGATION_BAR
    | typeof navigationAction.GET_NAVIGATION_REQUEST
    | typeof navigationAction.GET_NAVIGATION_FAILURE
    | typeof navigationAction.SET_ACTIVE_NAV
    | typeof navigationAction.SET_ACTIVE_MENU;
  payload?: NavigationBarBody | string;
}

export type NavigationBarThunk = ThunkAction<
  void,
  RootState,
  null,
  NavigationBarAction
>;

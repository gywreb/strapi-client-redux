import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
import { overviewPageAction } from "../action";
import { ICourse } from "./course.type";
import { LayoutBanner } from "./layout.type";

export interface CourseOverview {
  __component: string;
  course: ICourse;
}

export type PageBodyProperty = "banner" | "course-overview";

export interface OverviewPageBody {
  banner?: LayoutBanner[];
  "course-overview"?: CourseOverview[];
}

export interface OverviewPage {
  title: string;
  path: string;
  body: OverviewPageBody;
}

export interface OverviewPageState {
  loading: boolean;
  error: string | null;
  page: OverviewPage | null;
}

export interface OverviewPageAction {
  type:
    | typeof overviewPageAction.GET_OVERVIEWPAGE
    | typeof overviewPageAction.GET_OVERVIEWPAGEPAGE_FAILURE
    | typeof overviewPageAction.GET_OVERVIEWPAGEPAGE_REQUEST;
  payload?: OverviewPage | string;
}

export type OverviewPageThunk = ThunkAction<
  void,
  RootState,
  null,
  OverviewPageAction
>;

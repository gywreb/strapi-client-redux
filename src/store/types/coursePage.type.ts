import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
import { coursePageAction } from "../action";
import { ICourse } from "./course.type";
import { LayoutBanner } from "./layout.type";

export interface CourseInfo {
  course: ICourse;
}

export interface RelatedContent {
  course: ICourse;
  image: {
    url: string;
  };
}

export interface CoursePage {
  title: string;
  path: string;
  banner: LayoutBanner;
  courseInfo: CourseInfo;
  relatedContent: RelatedContent[];
}

export interface CoursePageState {
  loading: boolean;
  error: null | string;
  page: CoursePage | null;
  relatedContent: RelatedContent[] | null;
}

export interface CoursePageAction {
  type:
    | typeof coursePageAction.GET_COURSEPAGE
    | typeof coursePageAction.GET_COURSEPAGE_REQUEST
    | typeof coursePageAction.GET_COURSEPAGE_FAILURE
    | typeof coursePageAction.SET_COURSEPAGE_RELATED_CONTENT;
  payload?: CoursePage | RelatedContent[] | string | null;
}

export type CoursePageThunk = ThunkAction<
  void,
  RootState,
  null,
  CoursePageAction
>;

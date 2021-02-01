import { coursePageAction } from "../action";
import {
  CoursePage,
  CoursePageAction,
  CoursePageState,
} from "./../types/coursePage.type";

const initialState: CoursePageState = {
  loading: false,
  error: null,
  page: null,
};

export default function pageReducer(
  state = initialState,
  action: CoursePageAction
): CoursePageState {
  switch (action.type) {
    case coursePageAction.GET_COURSEPAGE_REQUEST: {
      return { ...state, loading: true };
    }
    case coursePageAction.GET_COURSEPAGE: {
      return {
        ...state,
        loading: false,
        error: null,
        page: action.payload as CoursePage,
      };
    }
    case coursePageAction.GET_COURSEPAGE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload as string,
        page: null,
      };
    }
    default: {
      return { ...state };
    }
  }
}

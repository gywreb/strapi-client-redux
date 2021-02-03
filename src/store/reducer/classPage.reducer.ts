import { classPageAction } from "../action";
import { ICourse } from "../types";
import {
  ClassPage,
  ClassPageAction,
  ClassPageState,
  SetNextPrevClassPayload,
} from "./../types/classPage.type";

const initialState: ClassPageState = {
  loading: false,
  error: null,
  page: null,
  thisClassCourse: null,
  prevClass: null,
  nextClass: null,
};

export default function pageReducer(
  state = initialState,
  action: ClassPageAction
): ClassPageState {
  switch (action.type) {
    case classPageAction.GET_CLASSPAGE_REQUEST: {
      return { ...state, loading: true };
    }
    case classPageAction.GET_CLASSPAGE: {
      return {
        ...state,
        loading: false,
        error: null,
        page: action.payload as ClassPage,
      };
    }
    case classPageAction.GET_CLASSPAGE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload as string,
        page: null,
      };
    }

    case classPageAction.SET_PREV_NEXT_CLASS: {
      const {
        prevClass,
        nextClass,
      } = action.payload as SetNextPrevClassPayload;
      return {
        ...state,
        prevClass,
        nextClass,
      };
    }

    case classPageAction.SET_THISCLASS_COURSE: {
      return { ...state, thisClassCourse: action.payload as ICourse | null };
    }
    default: {
      return { ...state };
    }
  }
}

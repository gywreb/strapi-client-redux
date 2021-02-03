import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
import { classPageAction } from "../action";
import { IClass } from "./class.type";
import { ClassThumbnail, ICourse } from "./course.type";

export interface ClassInfo {
  class: IClass;
}

export interface ClassPageGallery {
  image: {
    url: string;
  };
}

export interface ClassPage {
  title: string;
  path: string;
  promoPic: {
    url: string;
  };
  classInfo: ClassInfo;
  gallery: ClassPageGallery[];
}

export interface ClassPageState {
  loading: boolean;
  error: string | null;
  page: ClassPage | null;
  thisClassCourse: ICourse | null;
  prevClass: ClassThumbnail | null;
  nextClass: ClassThumbnail | null;
}

export interface SetNextPrevClassPayload {
  prevClass: ClassThumbnail | null;
  nextClass: ClassThumbnail | null;
}

export interface ClassPageAction {
  type:
    | typeof classPageAction.GET_CLASSPAGE
    | typeof classPageAction.GET_CLASSPAGE_REQUEST
    | typeof classPageAction.GET_CLASSPAGE_FAILURE
    | typeof classPageAction.SET_PREV_NEXT_CLASS
    | typeof classPageAction.SET_THISCLASS_COURSE;
  payload?: ClassPage | SetNextPrevClassPayload | ICourse | null | string;
}

export type ClassPageThunk = ThunkAction<
  void,
  RootState,
  null,
  ClassPageAction
>;

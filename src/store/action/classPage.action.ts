import axios, { AxiosResponse } from "axios";
import {
  ClassInfo,
  ClassPage,
  ClassPageGallery,
  ClassPageThunk,
} from "./../types/classPage.type";
import { ICourse } from "./../types/course.type";
export const GET_CLASSPAGE = "[CLASS PAGE] GET CLASS PAGE";
export const GET_CLASSPAGE_REQUEST = "[CLASS PAGE] GET CLASS PAGE REQUEST";
export const GET_CLASSPAGE_FAILURE = "[CLASS PAGE] GET CLASS PAGE FAILURE";
export const SET_PREV_NEXT_CLASS = "[CLASS PAGE] SET NEXT AND PREVIOUS CLASS";
export const SET_THISCLASS_COURSE = "[CLASS PAGE] SET CLASS PAGE COURSE";

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

export const getPrevAndNextClass = (path: string): ClassPageThunk => async (
  dispatch,
  getState
) => {
  if (getState().classPage.page) {
    try {
      const { data }: AxiosResponse<ICourse[]> = await axios({
        baseURL,
        url: `/courses?path=${path}`,
        method: "GET",
      });

      const currentClass = data[0].thumbnails.find(
        (thumbnail) => thumbnail.class.path === getState().classPage.page?.path
      );

      if (currentClass) {
        const index = data[0].thumbnails.indexOf(currentClass);
        const nextClass = data[0].thumbnails[index + 1];
        const prevClass = data[0].thumbnails[index - 1];
        if (index === 0) {
          dispatch({
            type: SET_PREV_NEXT_CLASS,
            payload: { prevClass: null, nextClass },
          });
        } else if (index === data[0].thumbnails.length - 1) {
          dispatch({
            type: SET_PREV_NEXT_CLASS,
            payload: { prevClass, nextClass: null },
          });
        } else {
          dispatch({
            type: SET_PREV_NEXT_CLASS,
            payload: { prevClass, nextClass },
          });
        }
      }
    } catch (error) {
      dispatch({
        type: SET_PREV_NEXT_CLASS,
        payload: { prevClass: null, nextClass: null },
      });
    }
  }
};

export const getThisClassCourse = (path: string): ClassPageThunk => async (
  dispatch,
  getState
) => {
  if (getState().classPage.page) {
    try {
      const { data } = await axios({
        baseURL,
        url: `/courses?path=${path}`,
        method: "GET",
      });
      dispatch({ type: SET_THISCLASS_COURSE, payload: data[0] });
    } catch (error) {
      dispatch({ type: SET_THISCLASS_COURSE, payload: null });
    }
  }
};

export const getPage = (path: string): ClassPageThunk => async (dispatch) => {
  dispatch({ type: GET_CLASSPAGE_REQUEST });
  console.log(path);
  try {
    const { data } = await axios({
      baseURL,
      url: `/class-pages?path=${path}`,
      method: "GET",
    });

    const page: ClassPage = {
      title: data[0].title as string,
      path: data[0].path as string,
      promoPic: {
        url: data[0].promoPic.url as string,
      },
      classInfo: data[0].classInfo as ClassInfo,
      gallery: data[0].gallery as ClassPageGallery[],
    };

    dispatch({ type: GET_CLASSPAGE, payload: page });
  } catch (error) {
    dispatch({ type: GET_CLASSPAGE_FAILURE, payload: "error" });
  }
};

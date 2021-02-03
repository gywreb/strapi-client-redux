import axios from "axios";
import { LayoutBanner } from "../types";
import {
  CourseInfo,
  CoursePage,
  CoursePageThunk,
  RelatedContent,
} from "./../types/coursePage.type";
export const GET_COURSEPAGE = "[COURSE PAGE] GET COURSE PAGE";
export const GET_COURSEPAGE_REQUEST = "[COURSE PAGE] GET COURSE PAGE REQUEST";
export const GET_COURSEPAGE_FAILURE = "[COURSE PAGE] GET COURSE PAGE FAILURE";

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

export const getPage = (path: string): CoursePageThunk => async (dispatch) => {
  dispatch({ type: GET_COURSEPAGE_REQUEST });
  try {
    const { data } = await axios({
      baseURL,
      url: `/course-pages?path=${path}`,
      method: "GET",
    });

    const page: CoursePage = {
      title: data[0].title as string,
      path: data[0].path as string,
      banner: data[0].banner as LayoutBanner,
      courseInfo: data[0].courseInfo as CourseInfo,
      relatedContent: data[0].relatedContent as RelatedContent[],
    };

    dispatch({ type: GET_COURSEPAGE, payload: page });
  } catch (error) {
    dispatch({ type: GET_COURSEPAGE_FAILURE, payload: "error" });
  }
};

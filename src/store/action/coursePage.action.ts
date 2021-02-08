import axios, { AxiosResponse } from "axios";
import { LayoutBanner } from "../types";
import { ICourse } from "./../types/course.type";
import {
  CourseInfo,
  CoursePage,
  CoursePageThunk,
  RelatedContent,
} from "./../types/coursePage.type";
export const GET_COURSEPAGE = "[COURSE PAGE] GET COURSE PAGE";
export const GET_COURSEPAGE_REQUEST = "[COURSE PAGE] GET COURSE PAGE REQUEST";
export const GET_COURSEPAGE_FAILURE = "[COURSE PAGE] GET COURSE PAGE FAILURE";
export const SET_COURSEPAGE_RELATED_CONTENT =
  "[COURSE PAGE] SET COURSE PAGE RELATED CONTENT";

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

export const getRelatedContent = (path: string): CoursePageThunk => async (
  dispatch,
  getState
) => {
  try {
    const { data }: AxiosResponse<ICourse[]> = await axios({
      baseURL,
      url: `courses?category.name=${path}`,
      method: "GET",
    });
    const relatedContentList = data.filter(
      (course) => course.path !== getState().coursePage.page?.path
    );

    console.log(relatedContentList);
    const relatedContent = relatedContentList.map((content) => ({
      course: content,
      image: {
        url: content.relatedPic ? content.relatedPic.url : "",
      },
    }));
    dispatch({
      type: SET_COURSEPAGE_RELATED_CONTENT,
      payload: relatedContent as RelatedContent[],
    });
  } catch (error) {
    dispatch({
      type: SET_COURSEPAGE_RELATED_CONTENT,
      payload: null,
    });
  }
};

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

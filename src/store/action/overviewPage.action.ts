import axios from "axios";
import { LayoutBanner } from "./../types/layout.type";
import {
  CourseOverview,
  OverviewPage,
  OverviewPageThunk,
  PageBodyProperty,
} from "./../types/overviewPage.type";
export const GET_OVERVIEWPAGE = "[OVERVIEW PAGE] GET OVERVIEW PAGE";
export const GET_OVERVIEWPAGEPAGE_REQUEST =
  "[OVERVIEW PAGE] GET OVERVIEW PAGE REQUEST";
export const GET_OVERVIEWPAGEPAGE_FAILURE =
  "[OVERVIEW PAGE] GET OVERVIEW PAGE FAILURE";

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

export const getPage = (path: string): OverviewPageThunk => async (
  dispatch
) => {
  dispatch({ type: GET_OVERVIEWPAGEPAGE_REQUEST });
  try {
    const { data } = await axios({
      baseURL,
      url: `/overview-pages?path=${path}`,
      method: "GET",
    });
    const page: OverviewPage = {
      title: data[0].title as string,
      path: data[0].path as string,
      body: {},
    };
    data[0].body.map((item: LayoutBanner & CourseOverview) => {
      let property = item.__component.split(".")[1];
      if (!(property in page.body)) {
        page.body[property as PageBodyProperty] = [item];
      } else page.body[property as PageBodyProperty]?.push(item);
    });
    dispatch({ type: GET_OVERVIEWPAGE, payload: page });
  } catch (error) {
    dispatch({ type: GET_OVERVIEWPAGEPAGE_FAILURE, payload: "error" });
  }
};

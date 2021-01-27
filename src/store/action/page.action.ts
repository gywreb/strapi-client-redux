import axios from "axios";
import {
  IPage,
  PageBanner,
  PageBodyProperty,
  PageSection,
  PageThunk,
} from "./../types/page.type";
export const GET_PAGE = "[PAGE] GET PAGE";
export const GET_PAGE_REQUEST = "[PAGE] GET PAGE REQUEST";
export const GET_PAGE_FAILURE = "[PAGE] GET PAGE FAILURE";

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

export const getPage = (path: string): PageThunk => async (dispatch) => {
  dispatch({ type: GET_PAGE_REQUEST });
  try {
    const { data } = await axios({
      baseURL,
      url: path,
      method: "GET",
    });
    const page: IPage = {
      title: data.title as string,
      body: {},
    };
    data.body.map((item: PageBanner & PageSection) => {
      let property = item.__component.split(".")[1];
      if (!(property in page.body)) {
        page.body[property as PageBodyProperty] = [item];
      } else page.body[property as PageBodyProperty]?.push(item);
    });
    dispatch({ type: GET_PAGE, payload: page });
  } catch (error) {
    dispatch({ type: GET_PAGE_FAILURE, payload: "error" });
  }
};

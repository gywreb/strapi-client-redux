import axios from "axios";
import { FooterThunk } from "../types/footer.type";

export const GET_FOOTER = "[FOOTER] GET FOOTER";
export const GET_FOOTER_REQUEST = "[FOOTER] GET FOOTER REQUEST";
export const GET_FOOTER_FAILURE = "[FOOTER] GET FOOTER FAILURE";

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

export const getFooter = (): FooterThunk => async (dispatch) => {
  dispatch({ type: GET_FOOTER_REQUEST });
  try {
    const { data } = await axios({
      baseURL,
      url: "/footer",
      method: "GET",
    });
    dispatch({ type: GET_FOOTER, payload: data });
  } catch (error) {
    console.log("error");
  }
};

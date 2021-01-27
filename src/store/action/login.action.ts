import axios from "axios";
import Cookies from "js-cookie";
import { ILoginUser } from "../types";
import { LoginThunk } from "./../types/login.type";
export const LOGIN_REQUEST = "[AUTH] LOGIN REQUEST";
export const LOGIN_SUCCESS = "[AUTH] LOGIN SUCCESS";
export const LOGIN_FAILURE = "[AUTH] LOGIN FAILURE";
export const LOGIN_RESET = "[AUTH] LOGIN RESET";
export const GET_CURRENT_USER = "[AUTH] GET CURRENT USER";
export const GET_CURRENT_USER_REQUEST = "[AUTH] GET CURRENT USER REQUEST";
export const LOGOUT = "[AUTH] LOG OUT";

const baseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
const url = baseUrl + "/auth/local";

export const login = (user: ILoginUser): LoginThunk => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios({
      url,
      method: "POST",
      data: user,
    });
    if (data) {
      Cookies.set("token", data.jwt, {
        expires: 7,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
      const payload = { token: data.jwt, user: data.user };
      dispatch({ type: LOGIN_SUCCESS, payload });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: {
        identifier:
          error.response.data.message[0].messages[0].message ||
          "Server is currently not working",
      },
    });
  }
};

export const getCurrentUser = (): LoginThunk => async (dispatch) => {
  dispatch({ type: GET_CURRENT_USER_REQUEST });
  try {
    const { data } = await axios({
      url: baseUrl + "/users/me",
      method: "GET",
    });
    dispatch({ type: GET_CURRENT_USER, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_RESET });
  }
};

export const logout = (): LoginThunk => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

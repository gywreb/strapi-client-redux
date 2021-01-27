import axios from "axios";
import { IRegisterUser, RegisterThunk } from "../types";

export const REGISTER_REQUEST = "[AUTH] REGISTER REQUEST";
export const REGISTER_SUCCESS = "[AUTH] REGISTER SUCCESS";
export const REGISTER_FAILURE = "[AUTH] REGISTER FAILURE";
export const REGISTER_RESET = "[AUTH] REGISTER RESET";
export const REGISTER_SUCCESS_CONFIRM = "[AUTH] REGISTER SUCCESS CONFIRM";

const baseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
const url = baseUrl + "/auth/local/register";

export const register = (user: IRegisterUser): RegisterThunk => async (
  dispatch
) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios({
      url,
      method: "POST",
      data: user,
    });
    if (data) dispatch({ type: REGISTER_SUCCESS });
  } catch (error) {
    let err: { [key: string]: string } = {};
    error.response.data.message[0].messages.map(
      (error: { id: string; message: string }) =>
        (err[error.id.split(".")[3]] = error.message)
    );
    dispatch({
      type: REGISTER_FAILURE,
      payload: Object.keys(err).length ? err : "Server down",
    });
  }
};

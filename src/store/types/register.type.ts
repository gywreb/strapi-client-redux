import { ThunkAction } from "redux-thunk";
import { registerAction } from "../action";
import { RootState } from "./index";
import { IRegisterUser } from "./user.type";

export type RegisterValidationError = {
  [key: string]: string;
};

export interface RegisterState {
  loading: boolean;
  error: string | RegisterValidationError | null;
  isSuccess: boolean;
  isConfirmed: boolean;
}

export interface RegisterAction {
  type:
    | typeof registerAction.REGISTER_REQUEST
    | typeof registerAction.REGISTER_SUCCESS
    | typeof registerAction.REGISTER_FAILURE
    | typeof registerAction.REGISTER_RESET
    | typeof registerAction.REGISTER_SUCCESS_CONFIRM;
  payload?: IRegisterUser | RegisterValidationError | string;
}

export type RegisterThunk = ThunkAction<void, RootState, null, RegisterAction>;

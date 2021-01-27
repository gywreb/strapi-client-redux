import AuthService from "../../services/auth.service";
import { loginAction } from "../action";
import {
  IUserInfo,
  LoginAction,
  LoginResponseData,
  LoginState,
  LoginValidationError,
} from "../types";

const authService = new AuthService();

authService.getAuth();

const initialState: LoginState = {
  loading: false,
  pendingUser: false,
  error: null,
  loggedUser: null,
  accessToken: authService.token,
};

export default function loginReducer(
  state = initialState,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case loginAction.LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case loginAction.LOGIN_SUCCESS: {
      const { user, token } = action.payload as LoginResponseData;
      return {
        ...state,
        loading: false,
        loggedUser: user,
        accessToken: token,
      };
    }
    case loginAction.LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload as LoginValidationError | string,
      };
    }
    case loginAction.GET_CURRENT_USER_REQUEST: {
      return {
        ...state,
        pendingUser: true,
      };
    }
    case loginAction.GET_CURRENT_USER: {
      return {
        ...state,
        pendingUser: false,
        loggedUser: action.payload as IUserInfo,
      };
    }
    case loginAction.LOGIN_RESET: {
      return {
        ...initialState,
      };
    }
    case loginAction.LOGOUT: {
      authService.deleteAuth();
      return {
        ...initialState,
        accessToken: null,
      };
    }
    default: {
      return state;
    }
  }
}

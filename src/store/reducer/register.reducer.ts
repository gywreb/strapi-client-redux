import { registerAction } from "../action";
import {
  RegisterAction,
  RegisterState,
  RegisterValidationError,
} from "../types";

const initialState: RegisterState = {
  loading: false,
  error: null,
  isSuccess: false,
  isConfirmed: false,
};

export default function registerReducer(
  state = initialState,
  action: RegisterAction
): RegisterState {
  switch (action.type) {
    case registerAction.REGISTER_REQUEST: {
      return { ...state, loading: true };
    }
    case registerAction.REGISTER_SUCCESS: {
      return { ...state, isSuccess: true, loading: false };
    }
    case registerAction.REGISTER_FAILURE: {
      return {
        ...state,
        error: action.payload as string | RegisterValidationError,
        loading: false,
      };
    }
    case registerAction.REGISTER_SUCCESS_CONFIRM: {
      return { ...state, isConfirmed: true };
    }
    case registerAction.REGISTER_RESET: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}

import { footerAction } from "../action";
import { Footer, FooterAction, FooterState } from "./../types/footer.type";
const initialState: FooterState = {
  loading: false,
  error: null,
  footer: null,
};

export default function footerReducer(
  state = initialState,
  action: FooterAction
): FooterState {
  switch (action.type) {
    case footerAction.GET_FOOTER_REQUEST: {
      return { ...state, loading: true };
    }
    case footerAction.GET_FOOTER: {
      return {
        ...state,
        loading: false,
        footer: action.payload as Footer,
        error: null,
      };
    }
    case footerAction.GET_FOOTER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload as string,
        footer: null,
      };
    }
    default: {
      return { ...state };
    }
  }
}

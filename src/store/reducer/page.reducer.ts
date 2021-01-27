import { pageAction } from "../action";
import { IPage, PageAction, PageState } from "./../types/page.type";

const initialState: PageState = {
  loading: false,
  error: null,
  page: null,
};

export default function pageReducer(
  state = initialState,
  action: PageAction
): PageState {
  switch (action.type) {
    case pageAction.GET_PAGE_REQUEST: {
      return { ...state, loading: true };
    }
    case pageAction.GET_PAGE: {
      return {
        ...state,
        loading: false,
        error: null,
        page: action.payload as IPage,
      };
    }
    case pageAction.GET_PAGE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload as string,
        page: null,
      };
    }
    default: {
      return { ...state };
    }
  }
}

import { overviewPageAction } from "../action";
import {
  OverviewPage,
  OverviewPageAction,
  OverviewPageState,
} from "../types/overviewPage.type";

const initialState: OverviewPageState = {
  loading: false,
  error: null,
  page: null,
};

export default function pageReducer(
  state = initialState,
  action: OverviewPageAction
): OverviewPageState {
  switch (action.type) {
    case overviewPageAction.GET_OVERVIEWPAGEPAGE_REQUEST: {
      return { ...state, loading: true };
    }
    case overviewPageAction.GET_OVERVIEWPAGE: {
      return {
        ...state,
        loading: false,
        error: null,
        page: action.payload as OverviewPage,
      };
    }
    case overviewPageAction.GET_OVERVIEWPAGEPAGE_FAILURE: {
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

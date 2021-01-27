import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
import { pageAction } from "../action";

export interface ThumbnailPicture {
  name: string;
  image: {
    url: string;
  };
}

export interface PageTextBlock {
  title: string;
  content: string;
}

export interface PageThumbnail {
  caption: string;
  picture: ThumbnailPicture;
}

export interface PageBanner {
  __component: string;
  title: string;
  thumbnail: PageThumbnail;
}

export interface PageSection {
  __component: string;
  title: string;
  textblocks?: PageTextBlock[];
  thumbnails?: PageThumbnail[];
}

export type PageBodyProperty = "banner" | "section";

export interface PageBody {
  banner?: PageBanner[];
  section?: PageSection[];
}

export interface IPage {
  title: string;
  body: PageBody;
}

export interface PageState {
  loading: boolean;
  error: string | null;
  page: IPage | null;
}

export interface PageAction {
  type:
    | typeof pageAction.GET_PAGE
    | typeof pageAction.GET_PAGE_FAILURE
    | typeof pageAction.GET_PAGE_REQUEST;
  payload?: IPage | string;
}

export type PageThunk = ThunkAction<void, RootState, null, PageAction>;

import { ThunkAction } from "redux-thunk";
import { footerAction } from "../action";
import { RootState } from "./index";

export interface SocialMediaIcon {
  name: string;
  path: string;
}

export interface FooterSectionItem {
  content: string;
  path: string;
}

export interface FooterSection {
  title: string;
  items: FooterSectionItem[];
}

export interface FooterContact {
  content: string;
}

export interface Footer {
  footerSection: FooterSection[];
  socialMedia: SocialMediaIcon[];
  contacts: FooterContact[];
}

export interface FooterState {
  loading: boolean;
  error: string | null;
  footer: Footer | null;
}

export interface FooterAction {
  type:
    | typeof footerAction.GET_FOOTER
    | typeof footerAction.GET_FOOTER_REQUEST
    | typeof footerAction.GET_FOOTER_FAILURE;
  payload?: Footer | null | string;
}

export type FooterThunk = ThunkAction<void, RootState, null, FooterAction>;

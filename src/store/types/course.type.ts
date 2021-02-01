import { LayoutThumbnail } from "./layout.type";

export interface LearnList {
  content: string;
}

export interface ICourse {
  title: string;
  description: string;
  content: string;
  path: string;
  thumbnails: LayoutThumbnail[];
  learnList: LearnList[];
}

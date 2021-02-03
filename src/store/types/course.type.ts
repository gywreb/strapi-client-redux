import { IClass } from "./class.type";

export interface ClassThumbnail {
  caption: string;
  class: IClass;
  image: {
    url: string;
  };
}

export interface LearnList {
  content: string;
}

export interface ICourse {
  title: string;
  description: string;
  content: string;
  path: string;
  thumbnails: ClassThumbnail[];
  learnList: LearnList[];
}

import { ICourse } from "./course.type";

export interface ClassCover {
  content: string;
}

export interface IClass {
  title: string;
  path: string;
  content: string;
  classCoverList: ClassCover[];
  course: ICourse;
}

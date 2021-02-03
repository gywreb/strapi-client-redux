import reducer from "../reducer";
export * from "./class.type";
export * from "./classPage.type";
export * from "./course.type";
export * from "./coursePage.type";
export * from "./layout.type";
export * from "./login.type";
export * from "./navigation.type";
export * from "./overviewPage.type";
export * from "./register.type";
export * from "./user.type";

export type RootState = ReturnType<typeof reducer>;

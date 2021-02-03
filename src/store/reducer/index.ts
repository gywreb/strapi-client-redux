import { combineReducers } from "redux";
import classPage from "./classPage.reducer";
import coursePage from "./coursePage.reducer";
import login from "./login.reducer";
import navigation from "./navigation.reducer";
import overviewPage from "./overviewPage.reducer";
import register from "./register.reducer";

const reducer = combineReducers({
  register,
  login,
  navigation,
  coursePage,
  overviewPage,
  classPage,
});

export default reducer;

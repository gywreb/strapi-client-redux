import { combineReducers } from "redux";
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
});

export default reducer;

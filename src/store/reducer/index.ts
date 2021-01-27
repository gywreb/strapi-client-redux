import { combineReducers } from "redux";
import login from "./login.reducer";
import navigation from "./navigation.reducer";
import page from "./page.reducer";
import register from "./register.reducer";
import restaurant from "./restaurant.reducer";

const reducer = combineReducers({
  register,
  login,
  restaurant,
  navigation,
  page,
});

export default reducer;

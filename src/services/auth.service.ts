import axios from "axios";
import Cookies from "js-cookie";

class AuthService {
  token: string | null;

  constructor() {
    this.token = null;
  }

  getAuth() {
    this.token = Cookies.get("token") || null;
    if (this.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  deleteAuth() {
    this.token = null;
    Cookies.remove("token");
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default AuthService;

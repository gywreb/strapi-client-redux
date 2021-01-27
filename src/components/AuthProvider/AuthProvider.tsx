import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/action/login.action";
import { RootState } from "../../store/types";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const AuthProvider: React.FC = (props) => {
  const dispatch = useDispatch();
  const pendingUser = useSelector<RootState, boolean>(
    (state) => state.login.pendingUser
  );
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (pendingUser) return <LoadingIndicator />;
  else return <>{props.children}</>;
};

export default AuthProvider;

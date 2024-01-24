/** React Router */
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuardAuth({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/administration/login" />;
  }
  return children;
}

GuardAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

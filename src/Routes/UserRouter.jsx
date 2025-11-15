import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const UserRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const ADMIN_UID = "ZURaoFUsdSaY4oaqr4P9GEv7wM53";

    // if (!user) return <Navigate to='/' />; // not logged in
    if (user?.uid === ADMIN_UID) return <Navigate to='/admin' />;
    return children; // logged in user can access
};
export default UserRoute;

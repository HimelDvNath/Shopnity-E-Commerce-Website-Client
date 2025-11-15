import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const ADMIN_UID = "ZURaoFUsdSaY4oaqr4P9GEv7wM53";

    if (user?.uid !== ADMIN_UID) return <Navigate to='/' />; // not admin
    return children;
};

export default AdminRoute;

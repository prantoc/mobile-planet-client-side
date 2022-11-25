import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useAdmin } from '../../hooks/useAdmin';
import Loading from '../../Pages/Shared/Loading/Loading';
import { errorToast, successToast } from '../../toast/Toaster';


const AdminRoute = ({ children }) => {
    const { user, loading, logoutUser } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return children;
    }
    logoutUser()
        .then(() => {
            successToast(' Sign-out successful');
            return <Navigate to="/login" state={{ from: location }} replace></Navigate>
        }).catch((e) => {
            errorToast(e);
        });


};

export default AdminRoute;
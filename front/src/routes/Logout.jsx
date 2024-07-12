import { useEffect } from "react";
import { logout as logoutSlice } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../services/auth";

const Logout = ({ updateNavBar }) =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => 
    {
        const logout_ = async () => 
        {
            logout();
            dispatch(logoutSlice());
            //updateNavBar();
            navigate("/");
        };

        logout_();
    }, []);

    return (<></>);
}

export default Logout;
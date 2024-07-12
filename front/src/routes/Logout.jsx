import { useEffect } from "react";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Logout = ({ updateNavBar }) =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => 
    {
        dispatch(logout());
        updateNavBar();
        navigate("/");
    }, []);

    return (<></>);
}

export default Logout;
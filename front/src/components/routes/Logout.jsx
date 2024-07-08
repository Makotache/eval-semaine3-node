import { useEffect, useMemo } from "react";
import { useLogoutMutation } from "../redux/slices/authApiSlice";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) =>
{
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    const _logout = useMemo(() => async () =>
    {
        await logout();
        navigate("/");
        setUser(null);
    })

    useEffect(() => { _logout(); }, []);

    return (<></>);
}

export default Logout;
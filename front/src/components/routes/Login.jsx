import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/slices/authApiSlice";
import "../styles/login.scss"

const Login = ({ setUser }) =>
{
    const navigate = useNavigate();
    const [form, setFrom] = useState({
        password: ""
    });
    const [login] = useLoginMutation();

    const onChangeHandler = (e) => 
    {
        setFrom({ ...form, [e.target.id]: e.target.value });
    }

    const onSumbitHandler = async (e) => 
    {
        e.preventDefault();
        const log = await login(form);

        if (log.data == undefined)
        { console.log("error", log); }
        else
        {
            navigate("/");
            setUser(log.data);
        }
    }

    return (
        <>
            <form className="login-container">
                <label htmlFor="">Mot de passe</label>
                <input name="password" id="password" type="text" value={form.password} onChange={onChangeHandler} />

                <button type="button" onClick={onSumbitHandler}>OK</button>
            </form>
        </>
    );
}

export default Login;
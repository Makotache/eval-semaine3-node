import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = ({ updateNavBar }) =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const onChangeHandler = (e) => 
    {
        setPassword(e.target.value);
    }

    const onSumbitHandler = async (e) => 
    {
        e.preventDefault();

        if (password == import.meta.env.VITE_PASSWORD)
        {
            dispatch(login());
            updateNavBar();
            navigate("/");
        }
        else
        { setError(true); }
    }

    return (
        <>
            <form className="login-container" onSubmit={onSumbitHandler}>
                {error && <span className="error">Une erreur dans le mot de passe</span>}
                <label htmlFor="password">Mot de passe</label>
                <input name="password" id="password" type="text" value={password} onChange={onChangeHandler} />

                <button type="button" onClick={onSumbitHandler}>OK</button>
            </form>
        </>
    );
}

export default Login;
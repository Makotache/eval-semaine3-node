import { Route } from "react-router-dom";

const MiddlewareRoute = ({ element, userLogged, path }) =>
{
    if (userLogged == undefined)
    { userLogged = false; }

    return (
        <Route path={path} element={(userLogged ? element : <NotAuthorize />)} />
    );
}

export default MiddlewareRoute;
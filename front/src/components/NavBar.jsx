import { NavLink } from "react-router-dom";
import "../../styles/nav.scss"

const NavBar = ({ user }) =>
{
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Accueil</NavLink>
                </li>
                {user == null &&
                    <li>
                        <NavLink to="/login">Connexion</NavLink>
                    </li>}
                {user != null &&
                    <li>
                        <NavLink to="/logout">Déconnexion</NavLink>
                    </li>}
                <li>
                    <NavLink to="/contact">Contacte</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
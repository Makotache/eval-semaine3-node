import { useSelector } from "react-redux";
import "../styles/nav.scss"

const NavBar = () =>
{
    const isLogged = useSelector(store => store.auth.isLogging);

    const setActive = (path) =>
    {
        return path == window.location.pathname ? "active" : ""
    }

    return (
        <nav>
            <ul>
                <li>
                    <a className={setActive("/")} href="/">Liste des produits</a>
                </li>
                <li>
                    <a className={setActive("/list-suppliers")} href="/list-suppliers">Liste des fournisseurs</a>
                </li>
                <li>
                    <a className={setActive("/list-materials")} href="/list-materials">Liste des matériaux</a>
                </li>
                {isLogged != undefined && isLogged ?
                    (<>
                        <li>
                            <a className={setActive("/dashboard")} href="/dashboard">Tableau de bord</a>
                        </li>
                        <li>
                            <a href="/logout">Déconnexion</a>
                        </li>
                    </>)
                    :
                    (<li>
                        <a className={setActive("/login")} href="/login">Connexion</a>
                    </li>)
                }
            </ul>
        </nav>
    );
}

export default NavBar;
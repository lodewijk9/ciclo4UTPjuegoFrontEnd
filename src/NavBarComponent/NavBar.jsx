import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (  
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <img src="https://cdn-icons.flaticon.com/png/512/3401/premium/3401289.png?token=exp=1638238817~hmac=db79e34a28b0d5289520c34b6eafb511" width="30" height="30" className="d-inline-block align-top" alt=""/>
                <a className="navbar-brand" href="/">AHORCADOS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/nueva-palabra">AGREGAR PALABRA</a>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>    

    );
}
 
export default NavBar;
import "./Navbar.css";

function Navbar() {

    return (
        <nav className="nav_container">
            <div className="nav_esq">
                <img src="../src/img/logotipo_FAPG_azul.svg" alt="Logo FAPG" />
            </div>

            <div className="nav_dir">
                <h2>Portal da Transparência</h2>
            </div>
        </nav>
    );
}

export default Navbar;

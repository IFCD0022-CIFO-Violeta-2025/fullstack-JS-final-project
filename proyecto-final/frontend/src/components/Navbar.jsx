import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import viteLogo from "/vite.svg";
import Boton from "./Boton";
import Sidebar from "./SideBar"

const Navbar = () => {
    const { toggleTheme, theme, isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <nav
                className="navbar navbar-expand-lg fixed-top"
                style={{
                    backgroundColor: theme.navbarColor,
                    borderBottom: theme.navbarBorder,
                }}
            >
                <div className="container-fluid">
                    <a
                        className="navbar-brand d-flex align-items-center ms-5"
                        href="/"
                        style={{ color: theme.textColor }}
                    >
                        <img
                            src={viteLogo}
                            alt="Vite logo"
                            width="40"
                            height="40"
                            className="d-inline-block align-text-top me-2"
                        />
                    </a>

                    {/* Botón para abrir Sidebar en móvil */}
                    <div className="d-lg-none">
                        <Boton onClick={() => setSidebarOpen(true)}>Sidebar</Boton>
                    </div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex gap-2 me-auto">
                            <Boton onClick={() => navigate("/ruta1")}>Home</Boton>
                            <Boton onClick={() => navigate("/ruta2")}>Ruta 2</Boton>
                            <Boton onClick={() => navigate("/ruta3")}>FAQ</Boton>
                            <Boton onClick={() => navigate("/ruta4")}>Ruta 4</Boton>
                        </div>

                        <div className="d-flex gap-2">
                            <Boton>Login</Boton>
                            <Boton onClick={toggleTheme}>
                                {isDarkMode ? "Claro" : "Oscuro"}
                            </Boton>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar controlado por estado */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
    );
};

export default Navbar;
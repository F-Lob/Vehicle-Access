import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/auth.service.js';
import '../styles/NavbarGuard.css';

const NavbarGuard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = getCurrentUser();
    const userRole = storedUser?.roles?.[0]; // Ajusta según la estructura de tu objeto de usuario

    const logoutSubmit = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    if (userRole !== 'operator') {
        return null;
    }

    return (
        <nav className="navbar-guard">
            <ul>
                <li className={location.pathname === "/access-control" ? "active" : ""}>
                    <NavLink to="/access-control">Registrar ingreso</NavLink>
                </li>
                <li className={location.pathname === "/access-records/active" ? "active" : ""}>
                    <NavLink to="/access-records/active">Movimientos activos</NavLink>
                </li>
                <li className={location.pathname === "/access-history" ? "active" : ""}>
                    <NavLink to="/access-history">Historial</NavLink>
                </li>
                <li className={location.pathname === "/" ? "active" : ""}>
                    <NavLink to="/" onClick={logoutSubmit}>Cerrar Sesión</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarGuard;

import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <div className="header-container">
      <div className="Header">
        <div className="rocket rocket-tl">🚀</div>
        <div className="rocket rocket-tr">🚀</div>
        <h1>Mi Aplicación de Tareas</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/objetivo">Objetivo</Link>
        </nav>
        <div className="rocket rocket-bl">🚀</div>
        <div className="rocket rocket-br">🚀</div>
      </div>
    </div>
  );
}

export default Header;
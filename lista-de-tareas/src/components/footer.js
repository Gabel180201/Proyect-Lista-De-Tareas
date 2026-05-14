import React from 'react';
import './footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="Footer">
        <div className="rocket rocket-left">🚀</div>
        <p>&copy; 2026 TodoApp Solutions Inc. Todos los derechos reservados.</p>
        <nav>
          <a href="/privacy">Privacidad</a>
          <a href="/terms">Términos</a>
        </nav>
        <div className="rocket rocket-right">🚀</div>
      </div>
    </div>
  );
}

export default Footer;

import React from 'react'
import { useLocation } from 'react-router-dom';

const Footer = () => {

  const basePath = useLocation().pathname.split('/').slice(0, 2).join('/');

  if (basePath === "/chat" || basePath === "/drawingApp") return null;

  if (basePath === "/"){
    return (
      <footer className="py-5 border-top border-secondary">
          <h2 className="font-grand text-secondary font-bold text-center h4">© 2024 Stocotoon. Todos os direitos reservados.</h2>
      </footer>
    )
  }

  return (
    <footer className="py-5 border-top border-secondary footer-mt">
        <h2 className="font-grand text-secondary font-bold text-center h4">© 2024 Stocotoon. Todos os direitos reservados.</h2>
    </footer>
  )
}

export default Footer
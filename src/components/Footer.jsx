import React from 'react'
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const basePath = useLocation().pathname.split('/').slice(0, 2).join('/');
  if (basePath === "/chat") return null;

  return (
    <footer className="py-5 border-top border-secondary">
        <h2 className="font-grand text-secondary font-bold text-center my-5 h4">© 2024 Stocotoon. Todos os direitos reservados.</h2>
    </footer>
  )
}

export default Footer
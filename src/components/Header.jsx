import React from "react";
import Logo from "../assets/img/logo.png";
import Form from 'react-bootstrap/Form';

const Header = ({setSearch}) => {
  return (
    <div className="container">
      <img className="logo" src={Logo} alt="logo-estudio-ghibli" />

      <div className="searchInput">
        <Form.Control
          type="text"
          id="searchInput"
          placeholder="Ingrese su busqueda de Titulo"
          onChange={e => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;

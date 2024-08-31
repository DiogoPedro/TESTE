import React from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Tema
import "primereact/resources/primereact.min.css"; // Estilos principais

const PrimeReactConfig = ({ children }) => {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
};

export default PrimeReactConfig;

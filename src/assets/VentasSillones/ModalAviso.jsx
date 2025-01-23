import * as React from "react";
import "../Estilos/EstiloCompra.css";

export default function ModalAviso({ texto }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content2">
        <p>{texto}</p>
      </div>
    </div>
  );
}

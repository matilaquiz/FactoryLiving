import React, { useContext } from "react";
import { Button } from "@mui/material";
import { ComprasContext } from "../Context/ComprasContext";
import axios from "axios";

export function ModalCambioEstado({ texto, id, actualizarCompras }) {
  const { abrirModalEstado, setAbrirModalEstado } = useContext(ComprasContext);
  const cancelar = () => {
    setAbrirModalEstado({ abrir: false, estado: "", id: null });
  };

  const confirmarCompra = async (id) => {
    try {
      const resp = await axios.put(
        `http://localhost:3000/confirmarCompra/${id}`
      );
      console.log(resp.status);

      const resp2 = await axios.get(
        `http://localhost:3000/traerComprasConDetalle/${id}`
      );
      console.log(resp2.status);
      actualizarCompras();
      cancelar();
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <div>
      <div className="modal-overlay">
        <div className="confirmacion">
          <h3>Cambio de Estado</h3>
          <p>{texto}</p>
          <div className="botones">
            <Button
              variant="contained"
              onClick={() => confirmarCompra(id)}
              sx={{ width: "fit-content" }}
            >
              SI
            </Button>
            <Button
              variant="contained"
              onClick={cancelar}
              sx={{ width: "fit-content" }}
            >
              NO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

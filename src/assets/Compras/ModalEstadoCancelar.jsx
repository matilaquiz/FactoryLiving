import React, { useContext } from "react";
import { Button } from "@mui/material";
import { ComprasContext } from "../Context/ComprasContext";
import axios from "axios";

export function ModalEstadoCancelar({ texto, id, actualizarCompras }) {
  const { abrirModalEstado, setAbrirModalEstado } = useContext(ComprasContext);
  const cancelar = () => {
    setAbrirModalEstado({ abrir: false, estado: "", id: null });
  };

  const cancelarCompra = async (id) => {
    try {
      const resp = await axios.put(
        `http://localhost:3000/cancelarCompra/${id}`
      );
      console.log(resp.data);
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
              onClick={() => cancelarCompra(id)}
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

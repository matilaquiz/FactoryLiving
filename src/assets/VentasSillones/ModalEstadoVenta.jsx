import React, { useContext } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VentasContext } from "../Context/VentasContext";

export default function ModalEstadoVenta({
  id,
  texto,
  estado,
  cerrarModal,
  actualizarVenta,
}) {
  const confirmarVenta = async (id, estado) => {
    const res = await axios.put(
      `http://localhost:3000/confirmarVenta/${id}/${estado}`
    );

    if (res.status === 200) {
      const lista = await axios.get(
        `http://localhost:3000/getMaterialesVentas/${id}`
      );
      const resp = await axios.put(
        `http://localhost:3000/actualizarStock/`,
        lista.data
      );
      console.log(resp);
    }

    actualizarVenta();
    cerrarModal();
  };
  const cancelarVenta = async (id, estado) => {
    const res = await axios.put(
      `http://localhost:3000/confirmarVenta/${id}/${estado}`
    );

    actualizarVenta();
    cerrarModal();
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
              onClick={() =>
                estado === "completado"
                  ? confirmarVenta(id, estado)
                  : estado === "cancelado"
                    ? cancelarVenta(id, estado)
                    : ""
              }
              sx={{ width: "fit-content" }}
            >
              SI
            </Button>
            <Button
              variant="contained"
              onClick={cerrarModal}
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

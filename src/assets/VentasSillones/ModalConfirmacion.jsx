import React from "react";
import { Button } from "@mui/material";

export function ModalConfirmacion({ cerrar, okCargarVenta }) {
  return (
    <div>
      <div className="modal-overlay">
        <div className="confirmacion">
          <h3>Confirmación de Venta</h3>
          <p>¿Desea realizar la venta?</p>
          <div className="botones">
            <Button
              variant="contained"
              onClick={okCargarVenta}
              sx={{ width: "fit-content" }}
            >
              SI
            </Button>
            <Button
              variant="contained"
              onClick={cerrar}
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

import React from "react";

const Modal = ({ id, title, body, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(); // Llama a la función de confirmación si es necesario
    onClose(); // Cierra el modal después de confirmar
  };

  return (
    <div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden = "true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {body}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleConfirm}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;


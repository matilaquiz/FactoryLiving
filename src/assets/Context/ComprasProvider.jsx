import { useState } from "react";
import { ComprasContext } from "./ComprasContext";

export const ComprasProvider = ({ children }) => {
  const [estadoCompras, setEstadoCompras] = useState(false);
  const[abrirModal,setAbrirModal]=useState(false)
  const[modalDetalle,setModalDetalle]=useState({id:"",estado:false})
  const [mailEnviado,setMailEnviado]=useState(false)
  const [modalOK,setModalOK]=useState(false)
  const [abrirModalEstado,setAbrirModalEstado]=useState({abrir:false,estado:"",id:null})



  return (
        <ComprasContext.Provider value={{estadoCompras,setEstadoCompras,setAbrirModal,abrirModal,modalDetalle,setModalDetalle,mailEnviado,setMailEnviado,modalOK,setModalOK,abrirModalEstado,setAbrirModalEstado }} >
                {children}
        </ComprasContext.Provider>
  );
};
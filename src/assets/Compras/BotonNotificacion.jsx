import * as React from 'react';
import { useContext } from 'react';
import "../Estilos/EstiloCompra.css"
import CancelIcon from '@mui/icons-material/Cancel';
import { ComprasContext } from '../Context/ComprasContext';



export default function BotonNotificacion({texto}) {
  const {setMailEnviado}=useContext(ComprasContext)
  const{setModalOK}=useContext(ComprasContext)
  const recargar=()=>{
    if(texto=="Guarado con exito"){
      setModalOK(false)
  }else{
    setMailEnviado(false)
    window.location.reload()
  }
  }


  return (
    <div className='modal-overlay'>
        <div className='modal-content2'>
            <p>{texto}</p>
           
            <CancelIcon onClick={recargar} sx={{position:"absolute", right:"5px", top:"0px"}}></CancelIcon>
           
        </div>
      
        
    </div>
  );
}
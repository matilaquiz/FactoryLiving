
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import '../Estilos/EstiloCompra.css'
import { useContext, useState } from 'react';
import { FormularioPresupuesto2 } from './FormularioPresupuesto2';
import { FormularioPresupuesto1 } from './FormularioPresupuesto1';
import { ModalCompras } from './ModalCompras';
import { ComprasContext } from '../Context/ComprasContext';

export function FormularioPresupuesto() {
  const{abrirModal,setAbrirModal}=useContext(ComprasContext)
  const [estadoCompra, setEstadoCompra] = useState("presupuesto");
  

  const cambiarFormPresupuesto = () => {
    setEstadoCompra("presupuesto")
  }

  const cambiarOrdenCompra = () => {
    setEstadoCompra("pedido")
  }

  const abrirCompras=()=>{
    setAbrirModal(true)
  }

  return (
    <>
      <div className="botonera">
        <Box  sx={{ '& button': { m: 1 }, background: '#bea88f',borderRadius:"10px" ,marginRight:"10px" ,boxShadow:"gray 5px 5px",":hover":{boxShadow:"0px 0px"},transition:"1s"}}>
          <div>
            <Button size="large" onClick={() => cambiarFormPresupuesto()} sx={{color:"rgb(80,80,80)" , fontWeight:"bold"}}>Formulario para Presupuesto</Button>
          </div>
        </Box>

        <Box sx={{ '& button': { m: 1 }, background: '#bea88f' ,borderRadius:"10px",marginRight:"10px",boxShadow:"gray 5px 5px",":hover":{boxShadow:"0px 0px"},transition:"1s"}}>
          <div>
            <Button size="large" onClick={() => cambiarOrdenCompra()} sx={{color:"rgb(80,80,80)" , fontWeight:"bold"}}>Formulario Orden de Compra</Button>
          </div>
        </Box>

        <Box sx={{ '& button': { m: 1 }, background: '#bea88f',borderRadius:"10px" ,boxShadow:"gray 5px 5px",":hover":{boxShadow:"0px 0px"},transition:"1s"}}>
          <div>
            <Button size="large" onClick={() => abrirCompras()} sx={{color:"rgb(80,80,80)" , fontWeight:"bold"}}>Consultar Compras</Button>
          </div>
        </Box>
      </div>

      {estadoCompra == "presupuesto" ? <FormularioPresupuesto2 /> : <FormularioPresupuesto1 />}

      {abrirModal && (<ModalCompras></ModalCompras>)
      
      }






    </>



  )
}



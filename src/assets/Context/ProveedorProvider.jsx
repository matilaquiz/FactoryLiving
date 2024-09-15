import React, { useState } from 'react'
import {ProveedorContext} from './ProveedorContext.jsx'


export const ProveedorProvider = ({children}) => {
const[idProveedor,setIdProveedor]=useState({id:null,modificar:false})


  return (
    <ProveedorContext.Provider value={{idProveedor , setIdProveedor}}>
        {children}
    </ProveedorContext.Provider>
  )
}



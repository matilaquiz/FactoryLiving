import React, { useState } from 'react'
import {ProductoContext} from './ProductoContext.jsx'


export const ProductoProvider = ({children}) => {
const[idProducto,setIdProducto]=useState({id:null,modificar:false})


  return (
    <ProductoContext.Provider value={{idProducto , setIdProducto}}>
        {children}
    </ProductoContext.Provider>
  )
}
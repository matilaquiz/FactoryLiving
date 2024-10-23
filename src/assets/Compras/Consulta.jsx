import React, { useEffect, useState } from 'react'

export  function Consulta() {
    const [lista,setLista]=useState([])


    useEffect(()=>{
        const traerGraficos=async()=>{
            try{
                const resp=await axios.get("http://localhost:/buscarDate")
                setLista(resp.data)
            }catch(e){
                console.warn(e)
            }
        }
        traerGraficos()
    },[])

  return (
    <div>
      
    </div>
  )
}

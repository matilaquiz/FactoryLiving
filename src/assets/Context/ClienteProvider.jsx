import { useState } from "react";
import { ClienteContext } from "./ClienteContext";
//import axios from "axios"

export const ClienteProvider = ({ children }) => {
  const [idCliente, setIdCliente] = useState({ id: null, modificar: false });
  //const[cliente,setCliente]=useState({})

  // useEffect(() => {
  //     const fetchCliente = async (idCliente) => {
  //         try{
  //             const response=await axios.get(`http://localhost:3000/traer/${idCliente}`)
  //             setCliente(response.data)
  //         }catch(error){
  //             console.error(error)
  //         }
  //     }
  //     fetchCliente()
  // }, [idCliente])

  return (
    <ClienteContext.Provider value={{ idCliente, setIdCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};

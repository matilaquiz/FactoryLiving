
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../Estilos/Carta.css";
import { useContext } from 'react';
import { ProductosContext } from '../Context/ProductosContext';


export default function CardsProductos({ id, nombre , precio, descripcion}) {
  const {setProductoElegido}=useContext(ProductosContext)

  
  const handleProducto=()=>{
    setProductoElegido({id,nombre,precio,descripcion})
    
 }
 

  return (
    <Card sx={{ width: 0.4 , minWidth: 0.3}} className='carta'  onClick={handleProducto} >
      <CardActionArea>
        <CardMedia className='carta-media'
          component="img"
          height="140"
          image="/public/images/juego-de-sillones.jpg"
          alt={id}
          sx={{ objectFit: 'contain', width: '100%', height: '120px' }}
          
        />
        <CardContent className='titulo-componente'>
          <Typography  gutterBottom variant="h5" component="div" >
            <div className=''>{nombre}</div>
            <div>$ {precio}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
    
  );
}

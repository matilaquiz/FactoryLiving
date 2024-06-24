import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../Estilos/Carta.css";
import { blue, blueGrey } from '@mui/material/colors';  

export default function CartasEntrada({ titulo = "", url = "", image = "", alt = "" }) {
  return (
    <Card sx={{ maxWidth: 300 }} className='carta'>
      <CardActionArea href={url}>
        <CardMedia className='carta-media'
          component="img"
          height="140"
          image={image}
          alt={alt}
          sx={{ objectFit: 'contain', width: '100%', height: '100px' }}
          
        />
        <CardContent className='titulo-componente'>
          <Typography  gutterBottom variant="h5" component="div">
            {titulo}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


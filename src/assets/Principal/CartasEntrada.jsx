import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../Estilos/Carta.css"

export default function CartasEntrada({titulo="",url=""}) {

  return (
    <Card  sx={{ maxWidth: 400 }} class='carta'>
      <CardActionArea href={url}>
        <CardMedia
          component="img"
          height="140"
          image=""
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            {titulo}
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

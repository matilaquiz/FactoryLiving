import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../Estilos/Carta.css";
import { useContext } from "react";
import { ProductosContext } from "../Context/ProductosContext";

export default function CardsProductos({
  id,
  nombre,
  precio,
  descripcion,
  img,
}) {
  const { setProductoElegido } = useContext(ProductosContext);

  const handleProducto = () => {
    setProductoElegido((productoElegido) => [
      ...productoElegido.filter((producto) => id !== producto.id),
      { id, nombre, precio, descripcion, cantidad: 1 },
    ]);
  };

  let imag = `/public/images/${img}`;

  return (
    <Card
      sx={{
        width: 0.8,
        minWidth: 0.4,
        maxWidth: 0.4,
        borderRadius: "20px",
        boxShadow: "5px 5px 10px",
        transition: "all 0.3s ease-in-out", // Transición suave
        "&:hover": {
          boxShadow: "none", // Elimina el box-shadow al hacer hover
          filter: "brightness(1.15)", // Incrementa el brillo
        },
      }}
      className="carta"
      onClick={handleProducto}
    >
      <CardActionArea>
        <CardMedia
          className="carta-media"
          component="img"
          height="140"
          image={imag}
          alt={id}
          sx={{ objectFit: "contain", width: "100%", height: "120px" }}
        />
        <CardContent className="titulo-componente">
          <Typography gutterBottom variant="h6" component="div">
            <div className="nombreProducto">{nombre}</div>
            <div className="precioProducto">$ {precio}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

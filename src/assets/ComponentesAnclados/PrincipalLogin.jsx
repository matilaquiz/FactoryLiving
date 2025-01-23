import { Button, TextField } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import "../Estilos/EstiloLoguin.css";
import { Password } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";

export function PrincipalLogin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [listadoUsuario, setListadoUsuario] = useState([]);
  const { abrir, setAbrir } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/buscarUsuario`);
        const listado = res.data;
        setListadoUsuario(listado);
      } catch (err) {
        console.log(err);
      }
    };

    buscarUsuario();
  }, []);

  const loginUsuario = (e) => {
    e.preventDefault();

    const redirigir = () => {
      if (abrir) {
        navigate("/Principal");
      }
    };

    if (listadoUsuario.length > 0) {
      const usuarioEncontrado = listadoUsuario.some(
        (u) =>
          String(u.nombreUsuario) === String(usuario) &&
          String(u.password) === String(password)
      );

      setAbrir(usuarioEncontrado);
      redirigir();
      sessionStorage.setItem(
        "temporal",
        JSON.stringify({ usuario: usuario, password: password })
      );
    }
  };

  return (
    <div className="pantallaCompleta">
      <div className="loginEstructura">
        <div className="botones">
          <Button
            sx={{
              width: "40%",
              background: "gray",
              height: "50px",
              color: "white",
            }}
          >
            Sigin in
          </Button>
          <Button
            sx={{
              width: "40%",
              background: "gray",
              height: "50px",
              color: "white",
            }}
          >
            Sigin up
          </Button>
        </div>
        <form action="" onSubmit={loginUsuario}>
          <h2>Bienvenido</h2>
          <TextField
            id="filled-basic"
            label="Usuario"
            variant="outlined"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            sx={{ background: "withe", marginTop: "20px" }}
          />
          <TextField
            id="filled-basic"
            label="Contraseña"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ background: "withe", marginTop: "20px" }}
          />

          <Button
            type="submit"
            sx={{
              background: "gray",
              height: "50px",
              color: "white",
              marginTop: "20px",
            }}
          >
            LOGIN
          </Button>

          {abrir == false ? (
            <h4 style={{ color: "red" }}>usuario o contraseña incorrecto</h4>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}

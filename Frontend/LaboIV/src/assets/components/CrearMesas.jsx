import { useState } from "react";

export default function CrearMesas() {
  const [textName, setTextName] = useState("");
  const [fecha, setFecha] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const MostrarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  function handleTextName(e) {
    setTextName(e.target.value);
  }

  function handleFecha(e) {
    setFecha(e.target.value);
  }

  function handleClickForm(e) {
    e.preventDefault();

    fetch("http://localhost:8000/api/mesa", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        nombre: textName,
        fecha: fecha,
      }),
    })
      .then(() => {
        // Realiza acciones después de que la solicitud sea exitosa
        setTextName("");
        setFecha("");
        console.log("mesa cargada");
      })
      .catch((error) => {
        // Manejar errores si la solicitud falla
        console.error("Error en la solicitud:", error);
      });
  }

  return (
    <div>
      <button onClick={MostrarFormulario}> cargar mesas</button>

      {mostrarFormulario && (
        <form action="">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            onChange={handleTextName}
            value={textName}
          />
          <label htmlFor="fecha">Fecha</label>
          <input type="date" id="fecha" onChange={handleFecha} value={fecha} />
          <input
            type="submit"
            value="Crear Mesa"
            onClick={(e) => {
              handleClickForm(e);
              MostrarFormulario();
            }}
          />
        </form>
      )}
    </div>
  );
}

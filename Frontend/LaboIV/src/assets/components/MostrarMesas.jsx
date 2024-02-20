import { useEffect, useState } from 'react';

export default function MostrarMesas() {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/mesas')
      .then(res => res.json())
      .then(res => setMesas(res))
      .catch(error => console.error('Error fetching mesas:', error));
  }, []);

  function handleBorrarMesa(mesaId) {
    
    fetch(`http://localhost:8000/api/eliminarMesa/{idMesa=int}?idMesa=${mesaId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(response => {
        if (response.ok) {
          console.log(`Mesa con ID ${mesaId} eliminada correctamente`);
          // Actualizar la lista de mesas después de eliminar
          setMesas(prevMesas => prevMesas.filter(mesa => mesa.idMesa !== mesaId));
        } else {
          console.error(`Error al intentar eliminar la mesa con ID ${mesaId} - Código: ${response.status}`);
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error.message);
      });
  }

  return (
    <>
      {mesas.map(mesa => (
        <article key={mesa.idMesa}>
          <h3>{mesa.nombre} - {mesa.fecha} </h3>
          <input type="submit" value="Eliminar Mesa" onClick={() => handleBorrarMesa(mesa.idMesa)} />
        </article>
      ))}
    </>
  );
}

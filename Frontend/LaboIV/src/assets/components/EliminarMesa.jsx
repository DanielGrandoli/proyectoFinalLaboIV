import { useEffect,useState } from "react";


    export default function EliminarMesa() {
    const[mesas,setMesas] = useState([])
    const [errorMio,setErrorMio] = useState("");

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
              setMesas(prevMesas => prevMesas.filter(mesa => mesa.idMesa !== mesaId));
            } else {
              console.error(`Error al intentar eliminar la mesa con ID ${mesaId} - Código: ${response.status}`);
              setErrorMio("No se puede eliminar hay alumnos inscriptos")
            }
            
          })
          .catch(error => {
            console.error("Error en la solicitud:", error.message);
            setErrorMio("No se puede eliminar hay alumnos inscriptos")
          });
      }

      return(
    <>
    <h3 className="mb-5 ColorTextoVioleta">Eliminar mesas</h3>
      {mesas.length > 0 && mesas
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
        .map(mesa => (
          <article key={mesa.idMesa}>
            <h3 className="datos ColorTextoVioleta">{mesa.nombre} - {mesa.fecha} </h3>
            <input className="inputboton eliminar" type="submit" value="Eliminar mesa" onClick={() => handleBorrarMesa(mesa.idMesa)}/>
          </article>
        ))}
        <div className="error-mensaje">{errorMio}</div>
    </>
      )
    }
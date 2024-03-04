import { useState,useEffect } from "react";


export default function InscriptosEnMesa(){

    const[inscriptos,setInscriptos] = useState([]);
    const [mesas, setMesas] = useState([]);
    const[mostrar,setMostrar]=useState(false);
    const[nombreMesa,setNombreMesa]=useState("");
    const[idMesaSelec,setIdMesaSelec]=useState("");


    useEffect(() => {
        fetch('http://localhost:8000/api/mesas')
          .then(res => res.json())
          .then(res => setMesas(res))
          .catch(error => console.error('Error fetching mesas:', error));
      }, []);

    function handleMostrarInscriptos(idMesa){
        
        fetch(`http://localhost:8000/api/alumnosInscriptosPorMesa/{idMesa=int}?idMesa=${idMesa}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error al obtener la mesa - Código: ${response.status}`);
        }
      })
      .then(data => {
        console.log("Datos de la mesa:", data);
        setInscriptos(data);
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
        setInscriptos([])
      });
      }
    

      function Mostrar(){
        setMostrar(!mostrar);
      }

      function DatosMesa(nombre,idMesa){
        setNombreMesa(nombre);
        setIdMesaSelec(idMesa)
      }

      function handleBorrarAlumnoEnMesa(alumnoId,idMesa) {

        fetch(`http://localhost:8000/api/eliminarAlumnosEnMesa/{idMesa=int,dni=int}?idMesa=${idMesa}&dni=${alumnoId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(response => {
        if (response.ok) {
          console.log(`Alumno con ID ${alumnoId} eliminado correctamente`);
          setInscriptos(prevAlumnos => prevAlumnos.filter(alumnos => alumnos.dni !== alumnoId));
          
        } else {
          console.error(`Error al intentar eliminar el alumno con ID ${alumnoId} - Código: ${response.status}`);
          setInscriptos(prevAlumnos => prevAlumnos.filter(alumnos => alumnos.dni !== alumnoId));
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error.message);
      });
      }





      return (
        <>
          {!mostrar && (
            <>
              {mesas.length > 0 && (
                <>
                  <h3 className="mb-5 ColorTextoVioleta">Inscriptos en la mesa</h3>
                  {mesas
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map(mesa => (
                      <article key={mesa.idMesa}>
                        <h3 className="h3inscriptos ColorTextoVioleta">{mesa.nombre} - {mesa.fecha} </h3>
                        <input className="inputboton" type="submit" value="Inscriptos a Mesa" onClick={() => { handleMostrarInscriptos(mesa.idMesa); Mostrar(); DatosMesa(mesa.nombre,mesa.idMesa) }} />
                      </article>
                    ))}
                </>
              )}
            </>
          )}
      
          {mostrar && (
            <>
              {inscriptos.length > 0 ? (
                <>
                  <h3 className="ColorTextoVioleta">Inscriptos en la mesa de {nombreMesa}</h3>
                  {inscriptos
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map(alumno => (
                      <article key={alumno.idalumno}>
                        <h3 className="datos ColorTextoVioleta">{alumno.nombre} - {alumno.apellido} - {alumno.dni} </h3>
                        <input className="inputboton " type="submit" value="Eliminar alumno en mesa" onClick={() => handleBorrarAlumnoEnMesa(alumno.dni,idMesaSelec)}/>
                      </article>
                    ))}
                  <button className="mt-5 inputboton" onClick={Mostrar}>volver</button>
                </>
              ) : (
                <>
                  <h3 className="ColorTextoVioleta">No hay alumnos en la mesa de {nombreMesa}</h3>
                  <button className="mt-5 inputboton" onClick={Mostrar}>volver</button>
                </>
              )}
            </>
          )}
        </>
      );
              }      
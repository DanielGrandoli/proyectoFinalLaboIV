import { useEffect,useState } from "react";


    export default function EliminarAlumno() {
        const [alumnos, setAlumnos] = useState([]);
    


    useEffect(() => {
        fetch('http://localhost:8000/api/alumnos')
          .then(res => res.json())
          .then(res => setAlumnos(res))
          .catch(error => console.error('Error fetching mesas:', error));
      }, []);
   
   
   
   
   
    function handleBorrarAlumno(alumnoId) {

        fetch(`http://localhost:8000/api/eliminarAlumno/{dni=int}?dni=${alumnoId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(response => {
        if (response.ok) {
          console.log(`Mesa con ID ${alumnoId} eliminada correctamente`);
          setAlumnos(prevAlumnos => prevAlumnos.filter(alumnos => alumnos.dni !== alumnoId));
          
        } else {
          console.error(`Error al intentar eliminar el alumno con ID ${alumnoId} - Código: ${response.status}`);
          setAlumnos(prevAlumnos => prevAlumnos.filter(alumnos => alumnos.dni !== alumnoId));
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error.message);
      });
      }

      return(
    <>
      <h3 className="mb-5 ColorTextoVioleta">Eliminar Alumnos</h3>
      {alumnos.length > 0 && alumnos
        .sort((a, b) =>  a.nombre.localeCompare(b.nombre))
        .map(alumno => (
          <article key={alumno.id}>
            <h3  className="datos ColorTextoVioleta">{alumno.nombre} - {alumno.apellido} - {alumno.dni} </h3>
            <input className="inputboton " type="submit" value="Eliminar alumno" onClick={() => handleBorrarAlumno(alumno.dni)}/>
          </article>
        ))}
    </>
      )
    }
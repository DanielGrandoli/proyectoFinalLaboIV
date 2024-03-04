import { useEffect,useState } from "react";

export default function AgregarAlumnoAMesa(){

    const[mesas,setMesas]=useState([]);
    const [alumnosNOinscriptos,setAlumnosNOinscriptos] = useState([]);
    const[mostrar,setMostrar]=useState(false);
    const[nombreSelec,setNombreSelec]=useState("");
    const[fechaSelec,setFechaSelec]=useState("");

    useEffect(()=>{
        fetch('http://localhost:8000/api/mesas')
        .then(res => res.json())
        .then(res => setMesas(res))
        .catch(error => console.error('Error fetching mesas:', error));
    }, []);


    

    function handleAgregarAMesa(nombre,dni){
        fetch(`http://localhost:8000/api/alumno/{idMesa=int,dni=int}?nombre=${nombre}&dni=${dni}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
           
          }),
        })
          .then(() => {
            console.log("alumno agregado a mesa");

          })
          .catch((error) => {
            console.error("Error en la solicitud:", error);
          });
          
      }

      function Mostrar(){
        setMostrar(!mostrar);
      }

      function handleAlumnosNOinscriptosEnMesa(idMesa){
        fetch(`http://localhost:8000/api/alumnosNOinscriptosPorMesa/{idMesa=int}?idMesa=${idMesa}`)
        .then(res => res.json())
        .then(res => setAlumnosNOinscriptos(res))
        .catch(error => console.error('Error fetching mesas:', error));
    }





      
      function datosSeleccionMesa(nombre,fecha){
        setFechaSelec(fecha)
        setNombreSelec(nombre)
      }

      function actualizarMesa(alumnoDni){
        setAlumnosNOinscriptos(prevAlumnos => prevAlumnos.filter(alumnos => alumnos.dni !== alumnoDni));
      }



      
      

      return (
        <>
          {mostrar && (
            
            <> <h3 className="mb-5 ColorTextoVioleta">Agregar alumnos a la mesa de {nombreSelec}, de la fecha {fechaSelec} </h3>
              {alumnosNOinscriptos.length > 0 &&
                alumnosNOinscriptos
                  .sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((alumno) => (
                    <article key={alumno.id}>
                      <h3 className="datos ColorTextoVioleta">
                        {alumno.nombre} - {alumno.apellido} - {alumno.dni}
                      </h3>
                      <input className="inputboton" type="submit" value="Inscribir a alumno" onClick={()=> {handleAgregarAMesa(nombreSelec,alumno.dni);actualizarMesa(alumno.dni)}}/>
                    </article>
                  ))}
              <div className="Violeta">
                <button className="mt-5 inputboton" onClick={Mostrar}>Volver</button>
              </div>
            </>
          ) }
          {!mostrar && (
            <>
           <h3 className="mb-5 ColorTextoVioleta">Agregar alumnos a la mesa</h3>
                  {mesas.length > 0 &&
                    mesas
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((mesa) => (
                        <article key={mesa.idMesa}>
                          <h3 className="datos ColorTextoVioleta">
                            {mesa.nombre} - {mesa.fecha}
                          </h3>
                          <input className="inputboton" type="submit" value="Seleccionar mesa" onClick={()=> {datosSeleccionMesa(mesa.nombre,mesa.fecha);Mostrar();handleAlumnosNOinscriptosEnMesa(mesa.idMesa)}}/>
                        </article>
                      ))}
          
            </>
          )

          }
        </>
      )}


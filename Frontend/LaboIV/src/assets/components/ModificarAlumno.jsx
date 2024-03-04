import { useState,useEffect } from "react";

export default function ModificarAlumno(){
    const [textName, setTextName] = useState("");
    const [textApellido, setTextApellido] = useState("");
    const [textDni,setTextDni] = useState("");
    const[alumnos,setAlumnos] = useState([]);
    const[mostrarForm,setMostrarForm]=useState(false);
    const [nombreSelect,setNombreSelect]=useState("");
    const[apellidoSelect,setApellidoSelect]=useState("");
    const[dniSelect,setdniSelect]=useState("");
    const [errorMio,setErrorMio] = useState("");

    useEffect(() => {
        fetch('http://localhost:8000/api/alumnos')
          .then(res => res.json())
          .then(res => setAlumnos(res))
          .catch(error => console.error('Error fetching mesas:', error));
      }, []);

      function handleTextName(e) {
        setTextName(e.target.value);
      }
    
      function handleTextApellido(e) {
        setTextApellido(e.target.value);
      }
      
      function handleTextDni(e){
        setTextDni(e.target.value)
      }

      


      function handleModificarAlumno(alumnoId){
    
        fetch(`http://localhost:8000/api/alumno/{dni=int}?dni=${alumnoId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            nombre: textName,
            apellido: textApellido,
            dni:textDni
          }),
        })
          .then((response) => {
            if(response.ok){
            setTextName("");
            setTextApellido("");
            setTextDni("")
            console.log("alumno editado");
            window.location.reload();
            }
           else{
            setErrorMio("Alumno no modificado, falto cargar algun dato o el alumno ya existe")
            setTextName("");
            setTextApellido("");
            setTextDni("")
            throw new Error("Error en la solicitud.");
        }
          })
          .catch((error) => {
            console.error("Error en la solicitud:", error.message);
            setTextName("");
            setTextApellido("");
            setTextDni("")
            setErrorMio("Alumno no modificado, falto cargar algun dato o el alumno ya existe o el alumno esta inscripto en una mesa")
          
            
          });
      }

      function mostrarFormulario(){
        setMostrarForm(!mostrarForm)
      }

      function datosSeleccion(nombre,apellido,dni){
        setNombreSelect(nombre)
        setApellidoSelect(apellido)
        setdniSelect(dni)
      }

      return(
        <>
        {!mostrarForm && (
          <>
        {alumnos.length > 0 && (
        <>
        <h3 className="mb-5 ColorTextoVioleta">Modificar alumno</h3>
        {alumnos
        .sort((a, b) =>  a.nombre.localeCompare(b.nombre))
        .map(alumno => (
          <article key={alumno.id}>
            <h3 className="datos ColorTextoVioleta">{alumno.nombre} - {alumno.apellido} - {alumno.dni} </h3>
            <input className="Color inputboton"type="submit" value="Modificar alumno" onClick={(e) => {datosSeleccion(alumno.nombre,alumno.apellido,alumno.dni); mostrarFormulario(e);setErrorMio("")}}/>
          </article>
        ))}
        </>
        )}
      </>
      )}
        
        { mostrarForm &&(
            <div className="Violeta">
            <h3 className="ColorTextoVioleta">Alumno seleccionado es {apellidoSelect}, {nombreSelect} con DNI: {dniSelect}</h3>
            <form className="mt-5"action="">
            <label className="ColorTextoVioleta" htmlFor="nombre">Nombre :    </label>
            <input className="inputtext" type="text" id="nombre" onChange={handleTextName} value={textName} />
            <label className="ColorTextoVioleta" htmlFor="apellido">Apellido :</label>
            <input className="inputtext" type="text" id="apellido" onChange={handleTextApellido} value={textApellido} />
            
            <label className="ColorTextoVioleta" htmlFor="dni">Dni :</label>
            <input className="inputtext" type="numeric" id="dni" onChange={handleTextDni} value={textDni} />
            <input className="Color inputboton"type="submit" value="Modificar alumno" onClick={(e) => {handleModificarAlumno(dniSelect); mostrarFormulario(e);}}/>
            </form>
            <button className="mt-5 inputboton" onClick={mostrarFormulario}>volver</button>
            </div>


            
        )  
        }
       
        
            
        <div className="error-mensaje">{errorMio}</div>
        
        </>
      );
}
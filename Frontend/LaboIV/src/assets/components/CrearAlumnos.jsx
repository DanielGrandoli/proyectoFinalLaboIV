import { useState } from "react";

export default function CrearAlumnos(){
    
    const [textName, setTextName] = useState("");
    const [textApellido, setTextApellido] = useState("");
    const [textDni,setTextDni] = useState("")
    const [errorMio,setErrorMio] = useState("");
   

   

      function handleTextName(e) {
        setTextName(e.target.value);
      }
    
      function handleApellido(e) {
        setTextApellido(e.target.value);
      }

      function handleDni(e){
        setTextDni(e.target.value);
      }

      function Crear(e) {
        e.preventDefault();
        
    if(textName != '' && textApellido != '' && textDni != "")
    {
      fetch("http://localhost:8000/api/alumno", {
      method: "POST",
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
        console.log("alumno cargado");
        window.location.reload();
        }
        else{
          setErrorMio("Error alumno existente o ingreso valor equivocado")
          setTextName("");
          setTextApellido("");
          setTextDni("");
          throw new Error("Error en la solicitud.");
      }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error.message);
          setTextName("");
          setTextApellido("");
          setTextDni("");
          setErrorMio("Error alumno existente o ingreso valor equivocado")
        
          
        });
    }
    else{
      setErrorMio("Falta algun dato")
    }
    
    }

      return(
        <>
        <h3 className="pb-5 ColorTextoVioleta" >Crear Alumnos</h3>
        {
        <form action="">
          <label className="ColorTextoVioleta" htmlFor="nombre">Nombre:</label>
          <input className="inputtext" type="text" id="nombre" onChange={handleTextName} value={textName} />
          <label className="ColorTextoVioleta" htmlFor="apellido">Apellido:</label>
          <input className="inputtext" type="text" id="apellido" onChange={handleApellido} value={textApellido} />
          <label className="ColorTextoVioleta" htmlFor="dni">Dni:</label>
          <input className="inputtext" type="numeric" id="dni" onChange={handleDni} value={textDni} />
          <input className="inputboton " type="submit" value="Crear alumno" onClick={Crear}/>
          </form>
          
        }
       
        
            
       <div className="error-mensaje">{errorMio}</div>
        
        </>
      );
}
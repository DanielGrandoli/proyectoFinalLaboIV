import { useState,useEffect } from "react";

export default function CrearMesas(){
    
    const [textName, setTextName] = useState('');
    const [textFecha, setTextFecha] = useState((new Date));
    const [errorMio,setErrorMio] = useState('');
    const [fechaActual, setFechaActual] = useState('');
    

    useEffect(() => {
      const FechaHoy = new Date();
      const FormatoFecha = FechaHoy.toISOString().split('T')[0];
      setFechaActual(FormatoFecha);
    }, []);
   

    const DiaLaboral = (fecha) => {
      const diaSemana = new Date(fecha).getDay();
      return diaSemana !== 5 && diaSemana !== 6;
    };

      function handleTextName(e) {
        setTextName(e.target.value);
      }
    
      function handleFecha(e) {
        setTextFecha(e.target.value);
        setErrorMio("");
      }


      function Crear(e) {
        e.preventDefault();
      if(textName != '' & textFecha != ''){
          fetch("http://localhost:8000/api/mesa", {
        method: "POST",
        headers: {
        "Content-type": "application/json",
        },
        body: JSON.stringify({
        nombre: textName,
        fecha: textFecha,
        }),
      })
     .then((response) => {
        if(response.ok){
        setTextName("");
        setTextFecha("");
        console.log("alumno cargado");
        window.location.reload();
        }
        else{
          setErrorMio("Falto algun dato")
          setTextName("");
          setTextFecha("");
          throw new Error("Error en la solicitud.");
      }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error.message);
          setTextName("");
          setTextFecha("");
          setErrorMio("Falto algun dato")
        
          
        });
        }
        else{
          setErrorMio("Falta algun dato")
        }
        
    }






      return(
        <>
        <h3 className="pb-5 ColorTextoVioleta" >Crear mesas</h3>
        {
        <form action="">
          <label htmlFor="nombre">Nombre:</label>
          <input className="inputtext" type="text" id="nombre" onChange={handleTextName} value={textName}/>
          <label htmlFor="fecha">Fecha</label>
          <input className="inputtext" min={fechaActual} type="date" id="fecha" onChange={(e)=>{            
            if (!DiaLaboral(e.target.value)) {
            setErrorMio("Selecciono un dia no laboral")
            }
            else{
            handleFecha(e)
            }
            }} value={textFecha} />
          <input className="inputboton" type="submit" value="Crear Mesa" onClick={Crear}/>
          </form>
           
        }
       <div className="error-mensaje">{errorMio}</div>
        
            
        
        
        </>
      );
}


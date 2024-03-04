import { useState,useEffect } from "react";

export default function ModificarMesa(){
    const [textName, setTextName] = useState("");
    const [fecha, setFecha] = useState("");
    const[mesas,setMesas] = useState([]);
    const[mostrarForm,setMostrarForm]=useState(false);
    const [numMesa,setNumMesa]=useState("");
    const[nombre,setNombre]=useState("");
    const[fechaSelec,setFechaSelec]=useState("");
    const [errorMio,setErrorMio] = useState("");
    const [fechaActual, setFechaActual] = useState('');
    const host='http://localhost:8000';

    useEffect(() => {
        fetch('http://localhost:8000/api/mesas')
          .then(res => res.json())
          .then(res => setMesas(res))
          .catch(error => console.error('Error fetching mesas:', error));
      }, []);

      
    

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
        setFecha(e.target.value);
        setErrorMio("");
      }

      function handleModificarMesa(MesaId){
        if(textName != '' & fecha != ''){
        fetch(host+`/api/mesa/{idMesa=int}?idMesa=${MesaId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            nombre: textName,
            fecha: fecha
          }),
        })
          .then((response) => {
            if(response.ok){
            setTextName("");
            setFecha("");
            console.log("alumno editado");
            window.location.reload();
            }
            else{
              setErrorMio("Mesa no modificada, falto cargar algun dato")
              setTextName("");
              setFecha("");
              throw new Error("Error en la solicitud.");
          }
            })
            .catch((error) => {
              console.error("Error en la solicitud:", error.message);
              setTextName("");
              setFecha("");
              setErrorMio("Mesa no modificada, falto cargar algun dato")
            
              
            });
          }
          else{
            setErrorMio("Mesa no modificada, falto cargar algun dato")
          }
        }

      function mostrarFormulario(){
        setMostrarForm(!mostrarForm)
      }

      function datosSeleccion(numMesa,nombre,fecha){
        setNumMesa(numMesa)
        setFechaSelec(fecha)
        setNombre(nombre)
      }

      return(
        <>
        {!mostrarForm &&(
          <>
          {mesas.length > 0 && (
            <>
            <h3 className="mb-5 ColorTextoVioleta">Modificar mesa</h3>
            {mesas
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map(mesa => (
              <article key={mesa.idMesa}>
                <h3 className="datos ColorTextoVioleta">{mesa.nombre} - {mesa.fecha} </h3>
                <input className="Color inputboton"type="submit" value="Modificar mesa" onClick={(e) => {datosSeleccion(mesa.idMesa,mesa.nombre,mesa.fecha); mostrarFormulario(e);setErrorMio("");}}/>
              </article>
            ))}
            </>
        )}
        </>
        )}
        { mostrarForm &&(
            <div className="Violeta">
            <h3 className="ColorTextoVioleta" >Mesa seleccionada {nombre} con fecha: {fechaSelec}</h3>
            <form className="mt-5" action="">
            <label className="ColorTextoVioleta" htmlFor="nombre">Nombre :    </label>
            <input className="inputtext" type="text" id="nombre" onChange={handleTextName} value={textName} />
            <label className="ColorTextoVioleta" htmlFor="fecha">Fecha</label>
            <input className="inputtext" min={fechaActual} type="date" id="fecha" onChange={(e)=>{ 
              if (!DiaLaboral(e.target.value)) {
              setErrorMio("Selecciono un dia no laboral")
              }
              else{handleFecha(e)}}} value={fecha} />
            <input className="inputboton" type="submit" value="Modificar Mesa" onClick={(e) => {handleModificarMesa(numMesa); mostrarFormulario(e);}}/>
            </form>
            <button className="mt-5 inputboton" onClick={mostrarFormulario}>volver</button>
            </div>
            
        )  
        }
       
        
       <div className="error-mensaje">{errorMio}</div>
        
        
        </>
      );
}
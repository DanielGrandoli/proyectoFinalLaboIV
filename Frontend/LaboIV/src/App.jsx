import Dropdown from 'react-bootstrap/Dropdown';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes,Route} from "react-router-dom";
import CrearMesas from './assets/components/CrearMesas';
import EliminarMesa from './assets/components/EliminarMesa'
import ModificarMesa from './assets/components/ModificarMesa';
import CrearAlumnos from './assets/components/CrearAlumnos';
import EliminarAlumnos from './assets/components/EliminarAlumnos';
import ModificarAlumno from './assets/components/ModificarAlumno';
import AgregarAlumnos from './assets/components/AgregarAlumnos';
import AlumnosEnMesa from './assets/components/AlumnosEnMesa';



function App() {
  document.title="Final de laboratorio IV"
  return (
    <>
      <body>
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="p-1 col-12">
              <div className="caja AzulOscuro">
                <h3 className="ColorTextoAzulOscuro">Inscripcion a examenes</h3>
              </div>
            </div>
<div className="p-1 col-xs-12 col-sm-3">
              <div className="caja AzulClaro custom-div">
                <Dropdown>
                  <Dropdown.Toggle className='botonDropdown'>
                    Menu mesas
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/CrearMesas">Crear mesas</Dropdown.Item>
                    <Dropdown.Item href="/EliminarMesa">
                      Eliminar Mesa
                    </Dropdown.Item>
                    <Dropdown.Item href="/ModificarMesa">
                      Modificar Mesa
                    </Dropdown.Item>
                    <Dropdown.Item href="/AgregarAlumnos">
                      Agregar alumnos
                    </Dropdown.Item>
                    <Dropdown.Item href="/AlumnosEnMesa">
                      Mostrar alumnos
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                ;
                <Dropdown>
                  <Dropdown.Toggle className='botonDropdown'>
                    Menu Alumnos
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/CrearAlumnos">Crear alumnos</Dropdown.Item>
                    <Dropdown.Item href="/EliminarAlumnos">
                      Eliminar alumnos
                    </Dropdown.Item>
                    <Dropdown.Item href="/ModificarAlumno">
                      Modificar alumnos
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                ;
              </div>
            </div>
            <div className="p-1 col-xs-12 col-sm-9">
              <div className="caja Violeta custom-div">
              
                <BrowserRouter>
              <Routes>
                <Route className="" path='/CrearMesas' element={(<CrearMesas/>)}></Route>
                <Route className="" path='/EliminarMesa' element={(<EliminarMesa/>)}></Route>
                <Route className="" path='/ModificarMesa' element={(<ModificarMesa/>)}></Route>
                <Route className="" path='/CrearAlumnos' element={(<CrearAlumnos/>)}></Route>
                <Route className="" path='/EliminarAlumnos' element={(<EliminarAlumnos/>)}></Route>
                <Route className="" path='/ModificarAlumno' element={(<ModificarAlumno/>)}></Route>
                <Route className="" path='/AgregarAlumnos' element={(<AgregarAlumnos/>)}></Route>
                <Route className="" path='/AlumnosEnMesa' element={(<AlumnosEnMesa/>)}></Route>

              </Routes>
              </BrowserRouter>
              
             
              </div>
            </div>
            <div className="p-1 col-12">
              <div className="caja AzulOscuro"><p className='ColorTextoAzulOscuro pieDePagina'>Final Laboratorio IV</p></div>
            </div>
          </div>
        </div>
            
      </body>
    </>
  );
}

export default App;

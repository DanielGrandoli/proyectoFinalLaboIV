#se ejecuta el backend de fastAPI es lo que aparece en el puerto/docs ejemplo mi pc http://127.0.0.1:8000/docs#/

from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.orm import Session
import crud
from database import engine,localSession
from schemas import MesaData,MesaID,AlumnoData,IncriptosMesaData
from models import Base
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

def get_db():
    db = localSession()
    try:
        yield db
    finally:
        db.close()

app=FastAPI()  

origins=[
    'http://localhost:5173',
    
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.get('/')
def root():
    return 'Hola desde fastAPI'



# esta clase ejecuta los metodos de la clase crud.py



#Mesa

@app.get('/api/mesas' ,response_model=list[MesaID])
def get_mesas(db:Session= Depends(get_db)):    
        mesas= crud.get_mesas(db=db)                                # ejecuta el metodo que retorna una lista de mesas  
        if mesas:
          return mesas
        raise HTTPException(status_code=404,detail='No hay mesas cargadas')                       

@app.post('/api/mesa',response_model=MesaData)
def crear_mesa(mesa:MesaData,db: Session= Depends(get_db)):
    mesas= crud.crear_mesa(db=db,mesa=mesa)
    if mesas:
        return mesas 
    raise HTTPException(status_code=404,detail='Mesa no creada datos incorrectos')                                #ejecuta el metodo para crear una mesa

@app.put('/api/mesa/{idMesa=int}', response_model=MesaData)
def modificar_mesa(mesa:MesaData,idMesa:int,db: Session= Depends(get_db)):
    modificarMesa = crud.modificar_mesa(db=db,idMesa=idMesa,mesa=mesa)               #ejecuta el metodo para modificar mesa
    if modificarMesa:
        return modificarMesa
    raise HTTPException(status_code=404,detail='Mesa no encontrado') 
    
@app.delete('/api/eliminarMesa/{idMesa=int}',response_model=MesaID)
def borrar_mesa(idMesa:int,db:Session=Depends(get_db)):
    eliminarMesa = crud.eliminar_mesa(db=db,idMesa=idMesa)                          #  #ejecuta el metodo para eliminar mesa
    if eliminarMesa:
        return eliminarMesa
    raise HTTPException(status_code=404,detail='No se puede eliminar mesa, contiene alumnos incriptos') 





#Alumno

@app.get('/api/alumnos',response_model=list[AlumnoData])
def get_alumnos(db:Session=Depends(get_db)):
    alumnos= crud.get_alumnos(db=db)
    if alumnos:
        return alumnos
    raise HTTPException(status_code=404,detail='no hay alumnos cargados')

@app.post('/api/alumno',response_model=AlumnoData)
def crear_alumno(alumno:AlumnoData,db: Session= Depends(get_db)):
    alumnos = crud.crear_alumno(db=db,alumno=alumno)
    if alumnos:    
        return alumnos                                #ejecuta el metodo para crear un alumno
    raise HTTPException(status_code=404,detail='Alumno ya existente')


@app.put('/api/alumno/{dni=int}', response_model=AlumnoData)
def modificar_alumno(alumno:AlumnoData,dni:int,db: Session= Depends(get_db)):
    modificarAlumno = crud.modificar_alumno(db=db,dni=dni,alumno=alumno)                   #ejecuta metodo para modificar alumno
    if modificarAlumno:
        return modificarAlumno
    raise HTTPException(status_code=404,detail='Alumno no encontrado') 

@app.delete('/api/eliminarAlumno/{dni=int}',response_model=AlumnoData)
def borrar_alumno(dni:int,db:Session=Depends(get_db)):
    eliminarAlumno= crud.eliminar_alumno(db=db,dni=dni)                              #ejecuta metodo para eliminar alumno
    if eliminarAlumno:
        return eliminarAlumno
    raise HTTPException(status_code=404,detail='Alumno no encontrado') 
  

@app.put('/api/alumno/{idMesa=int,dni=int}', response_model=IncriptosMesaData)
def agregarAlumnoMesa(nombre:str,dni:int,db: Session= Depends(get_db)):
    agregarAlumno=crud.agregarAlumnoMesa(db=db,dni=dni,nombre=nombre)              #ejecuta metodo para agregar alumno a mesa
    if agregarAlumno:
        return agregarAlumno
    raise HTTPException(status_code=404,detail='Alumno o mesa no encontrada')    


@app.get('/api/alumnosInscriptosPorMesa/{idMesa=int}',response_model=list[AlumnoData])
def get_alumnos_inscriptos_porMesa(idMesa:int,db:Session=Depends(get_db)):
     alumnosEnMesa= crud.get_alumnos_inscriptos_porMesa(db=db,idMesa=idMesa)
     if alumnosEnMesa:
        return alumnosEnMesa
     raise HTTPException(status_code=404,detail='no hay alumnos en la mesa')
 
@app.get('/api/alumnosNOinscriptosPorMesa/{idMesa=int}',response_model=list[AlumnoData])
def get_alumnos_NO_inscriptos_porMesa(idMesa:int,db:Session=Depends(get_db)):
     alumnosNoinscrptos= crud.get_alumnos_NO_inscriptos_porMesa(db=db,idMesa=idMesa)
     if alumnosNoinscrptos:
         return alumnosNoinscrptos
     raise HTTPException(status_code=404,detail='no hay alumnos en la mesa')

@app.delete('/api/eliminarAlumnosEnMesa/{idMesa=int,dni=int}',response_model=IncriptosMesaData)
def eliminarAlumnosEnMesa(idMesa:int,dni:int,db:Session=Depends(get_db)):
    eliminarAlumnoMesa=crud.eliminarAlumnoMesa(db=db,idMesa=idMesa,dni=dni)
    if eliminarAlumnoMesa:
        return eliminarAlumnoMesa
    raise HTTPException(status_code=404,detail='alumno no encontrado')
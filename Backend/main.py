#se ejecuta el backend de fastAPI es lo que aparece en el puerto/docs ejemplo mi pc http://127.0.0.1:8000/docs#/

from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.orm import Session
import crud
from database import engine,localSession
from schemas import MesaData,MesaID,AlumnoData
from models import Base

Base.metadata.create_all(bind=engine)


def get_db():
    db = localSession()
    try:
        yield db
    finally:
        db.close()

app=FastAPI()  

@app.get('/')
def root():
    return 'Hola desde fastAPI'



# esta clase ejecuta los metodos de la clase crud.py





@app.get('/api/mesas' ,response_model=list[MesaData])
def get_mesas(db:Session= Depends(get_db)):    
        return crud.get_mesas(db=db)                                # ejecuta el metodo que retorna una lista de mesas  
                                                             

@app.post('/api/mesa',response_model=MesaData)
def crear_mesa(mesa:MesaData,db: Session= Depends(get_db)):
    return crud.crear_mesa(db=db,mesa=mesa)                                #ejecuta el metodo para crear una mesa

@app.put('/api/mesa/{idMesa=int}', response_model=MesaData)
def modificar_mesa(mesa:MesaData,idMesa:int,db: Session= Depends(get_db)):
    return crud.modificar_mesa(db=db,idMesa=idMesa,mesa=mesa)               #ejecuta el metodo para modificar mesa

@app.delete('/api/eliminarMesa/{idMesa=int}',response_model=MesaData)
def borrar_mesa(idMesa:int,db:Session=Depends(get_db)):
    return crud.eliminar_mesa(db=db,idMesa=idMesa)                          #  #ejecuta el metodo para eliminar mesa


@app.post('/api/alumno',response_model=AlumnoData)
def crear_alumno(alumno:AlumnoData,db: Session= Depends(get_db)):
    return crud.crear_alumno(db=db,alumno=alumno)                                #ejecuta el metodo para crear un alumno


@app.put('/api/alumno/{dni=int}', response_model=AlumnoData)
def modificar_alumno(alumno:AlumnoData,dni:int,db: Session= Depends(get_db)):
    return crud.modificar_alumno(db=db,dni=dni,alumno=alumno)                   #ejecuta metodo para modificar alumno

@app.delete('/api/eliminarAlumno/{dni=int}',response_model=AlumnoData)
def borrar_alumno(dni:int,db:Session=Depends(get_db)):
    return crud.eliminar_alumno(db=db,dni=dni)                              #ejecuta metodo para eliminar alumno


@app.put('/api/alumno/{idMesa=int}', response_model=AlumnoData)
def agregarAlumnoMesa(alumno:AlumnoData,dni:int,db: Session= Depends(get_db)):
    return crud.agregarAlumnoMesa(db=db,dni=dni,alumno=alumno)              #ejecuta metodo para agregar alumno a mesa

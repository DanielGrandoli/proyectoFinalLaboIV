#schema de datos para FastAPI y tambien para efectuar acciones dentro de la base de datos con SQLALCHEMY
from typing import Optional
from pydantic import BaseModel
from datetime import date

class MesaData(BaseModel):
    nombre:str
    fecha:date
    

class AlumnoData(BaseModel):
    nombre:str
    apellido:str
    dni:int

class MesaID(MesaData):
    idMesa:int
    

class IncriptosMesaData(BaseModel):
    id:int
    
        

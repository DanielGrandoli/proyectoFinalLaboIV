#schema de datos para FastAPI y tambien para efectuar acciones dentro de la base de datos con SQLALCHEMY

from pydantic import BaseModel
from datetime import date

""" 
class UserData(BaseModel):
    name:str
    password:str
    
    
matricula
email
direccion
fecha_alta
fecha_Baja
cat_social
grupo_sanguineo
sancion
dni este va en la clase persona

class UserID(UserData):
    id:int 
"""

class MesaData(BaseModel):
    nombre:str
    fecha:date
    

class AlumnoData(BaseModel):
    nombre:str
    apellido:str
    dni:int
    idMesa:int

class MesaID(MesaData):
    idMesa:int
    
    
#class AlumnoID(AlumnoData):
 #   id:int    

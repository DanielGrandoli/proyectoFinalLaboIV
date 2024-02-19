#modelo de las tablas de la base de datos

from sqlalchemy import Column,String,Integer,ForeignKey,Date,Numeric,Date
from sqlalchemy.orm import relationship


from database import Base

class Mesa(Base):
    __tablename__='mesa'
    idMesa=Column(Integer,primary_key=True,unique=True,autoincrement=True)
    nombre=Column(String(50))
    fecha=Column(Date)
    alumno=relationship('Alumno',backref='mesa',lazy='dynamic', cascade="all, delete-orphan")
    
    
    
class Alumno(Base):
    __tablename__='alumno'
    dni=Column(Integer,primary_key=True,unique=True)
    nombre=Column(String(30))
    apellido=Column(String(30))
    idMesa=Column(Integer, ForeignKey(Mesa.idMesa),nullable=True)


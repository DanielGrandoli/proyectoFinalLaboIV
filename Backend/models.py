#modelo de las tablas de la base de datos
from sqlalchemy import Column,String,Integer,ForeignKey,Date,Numeric,Date
from sqlalchemy.orm import relationship
from database import Base

class Mesa(Base):
    __tablename__='mesa'
    idMesa=Column(Integer,primary_key=True,unique=True,autoincrement=True)
    nombre=Column(String(50))
    fecha=Column(Date)
    inscriptosMesa=relationship('InscriptosMesa',backref='mesa',lazy='dynamic', cascade="all, delete-orphan")

class Alumno(Base):
    __tablename__='alumno'
    dni=Column(Integer,primary_key=True,unique=True)
    nombre=Column(String(30))
    apellido=Column(String(30))
    inscriptosMesa=relationship('InscriptosMesa',backref='alumno',lazy='dynamic', cascade="all, delete-orphan")

class InscriptosMesa(Base):
    __tablename__='inscriptosMesa'
    id=Column(Integer,primary_key=True,unique=True,autoincrement=True)
    idMesa=Column(Integer, ForeignKey(Mesa.idMesa),primary_key=True,nullable=True)
    dni=Column(Integer,ForeignKey(Alumno.dni),primary_key=True,nullable=True)
    



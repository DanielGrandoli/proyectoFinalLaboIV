#funciones para crear acciones dentro de la base de datos

from sqlalchemy.orm import Session
from models import Mesa,Alumno,InscriptosMesa
from schemas import MesaData,AlumnoData,MesaID,IncriptosMesaData

    
#Mesas


    
def get_mesas(db: Session):
    return db.query(Mesa).all()    #lista de mesas
    
    
def crear_mesa(db:Session,mesa:MesaData):
    nueva_mesa=Mesa(nombre=mesa.nombre,fecha=mesa.fecha)
    if nueva_mesa:
        db.add(nueva_mesa)
        db.commit()
        db.flush(nueva_mesa)
    return nueva_mesa                       

def modificar_mesa(db:Session,idMesa:int,mesa:MesaData):
    buscado=db.query(Mesa).filter(Mesa.idMesa==idMesa).first()
    
    if buscado:
        buscado.nombre=mesa.nombre
        buscado.fecha=mesa.fecha
        db.commit()
        db.refresh(buscado)
    return buscado                              #consultar si se puede modificar si tiene alumnos inscriptos
    

def eliminar_mesa(db:Session,idMesa:int):
    buscado=db.query(Mesa).filter(Mesa.idMesa==idMesa).first()
    if buscado:
        if not buscado.inscriptosMesa.all():
            db.delete(buscado)
            db.commit()
            return buscado
        else: return False
    else: return False



#Alumnos

def get_alumnos(db:Session):
    return db.query(Alumno).all()   #lista de alumnos

def crear_alumno(db:Session,alumno:AlumnoData):
    nuevo_alumno=Alumno(nombre=alumno.nombre,apellido=alumno.apellido,dni=alumno.dni)
    if nuevo_alumno:
        db.add(nuevo_alumno)
        db.commit()
        db.flush(nuevo_alumno)
    return nuevo_alumno                        #Alta alumno

def agregarAlumnoMesa(db:Session,nombre:str,dni:int):
    aluBuscado = db.query(Alumno).filter(Alumno.dni == dni).first()
    mesaBuscada=db.query(Mesa).filter(Mesa.nombre.ilike(nombre)).first()
    if aluBuscado and mesaBuscada:
        idMesa=mesaBuscada.idMesa
        nuevo_inscripto=InscriptosMesa(dni=dni,idMesa=idMesa)
        db.add(nuevo_inscripto)
        db.commit()
        db.refresh(nuevo_inscripto)
        return nuevo_inscripto                                                          #agregar alumno a mesa
    else: return False 
    
def eliminarAlumnoMesa(db:Session,idMesa:int,dni:int):
    inscriptoBuscado = db.query(InscriptosMesa).filter((InscriptosMesa.idMesa == idMesa) & (InscriptosMesa.dni == dni)).first()                                                         
    if inscriptoBuscado:
        db.delete(inscriptoBuscado)
        db.commit()
        return inscriptoBuscado
    else: return False
 

    
def modificar_alumno(db:Session,dni:int,alumno:AlumnoData):
    buscado=db.query(Alumno).filter(Alumno.dni==dni).first()
    
    if buscado:
        buscado.dni=alumno.dni
        buscado.apellido=alumno.apellido
        buscado.nombre=alumno.nombre
        db.commit()
        db.refresh(buscado)
        return buscado                           #modificar alumno
          


def eliminar_alumno(db:Session,dni:int):
    buscado=db.query(Alumno).filter(Alumno.dni==dni).first()
    if buscado:
        db.delete(buscado)
        db.commit()
        return None         #eliminar alumno
    

def get_alumnos_inscriptos_porMesa(db:Session,idMesa:int):
   return db.query(Alumno).join(InscriptosMesa, Alumno.dni == InscriptosMesa.dni).filter(InscriptosMesa.idMesa == idMesa).all()

def get_alumnos_NO_inscriptos_porMesa(db:Session,idMesa:int):
    return db.query(Alumno).outerjoin(InscriptosMesa,(Alumno.dni == InscriptosMesa.dni) & (InscriptosMesa.idMesa == idMesa)).filter(InscriptosMesa.idMesa.is_(None) | (InscriptosMesa.idMesa != idMesa)).all()
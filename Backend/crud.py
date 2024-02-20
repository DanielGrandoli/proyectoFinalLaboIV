#funciones para crear acciones dentro de la base de datos

from sqlalchemy.orm import Session
from models import Mesa,Alumno
from schemas import MesaData,AlumnoData,MesaID

"""
def get_users(db: Session):
    return db.query(User).all()



def get_user_name(db: Session, name:str):
    return db.query(User).filter(User.name==name).first()

def create_user(db: Session, familiar:UserData):
    fake_password=familiar.password+'#Fake'
    new_user=User(name=familiar.name,password=fake_password)
    db.add(new_user)
    db.commit()
    db.flush(new_user)
    return new_user
 
    """
    
#Mesas
    
def get_mesas(db: Session):
    return db.query(Mesa).all()    #lista de mesas
    
    
def crear_mesa(db:Session,mesa:MesaData):
    nueva_mesa=Mesa(nombre=mesa.nombre,fecha=mesa.fecha)
    db.add(nueva_mesa)
    db.commit()
    db.flush(nueva_mesa)
    return nueva_mesa                       #Alta exameno

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
        if not buscado.alumno.all():
            db.delete(buscado)
            db.commit()
            return buscado
        else: return False
    else: return False



#Alumnos

def get_alumnos(db:Session):
    return db.query(Alumno).all()   #lista de alumnos

def crear_alumno(db:Session,alumno:AlumnoData):
    nuevo_alumno=Alumno(nombre=alumno.nombre,apellido=alumno.apellido,dni=alumno.dni,idMesa=None)
    db.add(nuevo_alumno)
    db.commit()
    db.flush(nuevo_alumno)
    return nuevo_alumno                        #Alta alumno

def agregarAlumnoMesa(db:Session,dni:int,idMesa:int):
    buscado = db.query(Alumno).filter(Alumno.dni == dni).first()
    if buscado:
        buscado.idMesa=idMesa
        db.commit()
        db.refresh(buscado)
        return buscado                                                          #agregar alumno a mesa
                                                                                   


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
    
    
def get_alumnos_mesas(db:Session,idMesa:int):
    return db.query(Alumno).filter(Alumno.idMesa==idMesa).all()                 #alumnos inscriptos en mesa
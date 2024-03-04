#conexiones y config para la base de datos

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2


    
     

URL_CONNECTION = ('postgresql+psycopg2://postgres:6673@localhost/mesas')

engine = create_engine(URL_CONNECTION)

localSession = sessionmaker(autoflush=False,autocommit=False,bind=engine)

Base = declarative_base()






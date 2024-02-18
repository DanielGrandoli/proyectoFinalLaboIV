#conexiones y config para la base de datos

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2

    
     
#= 'postgre+psycopg2://postgres:6673@localhost:5432/db'
URL_CONNECTION = ('postgresql+psycopg2://postgres:6673@localhost/mesas')

engine = create_engine(URL_CONNECTION)

localSession = sessionmaker(autoflush=False,autocommit=False,bind=engine)

Base = declarative_base()



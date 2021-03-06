# coding=utf-8

from datetime import datetime

from marshmallow import Schema, fields
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_url = "localhost:5432"
db_name = "online-exam"
db_user = "postgres"
db_password = "0NLIN3-ex4m"
engine = create_engine(f"postgresql://{db_user}:{db_password}@{db_url}/{db_name}")
Session = sessionmaker(bind=engine)

Base = declarative_base()


class Entity:
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_updated_by = Column(String)

    def __init__(self, created_by):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.last_updated_by = created_by


class Exam(Entity, Base):
    __tablename__ = "exams"

    title = Column(String)
    description = Column(String)
    long_description = Column(String)

    def __init__(self, title, description, long_description, created_by):
        Entity.__init__(self, created_by)
        self.title = title
        self.description = description
        self.long_description = long_description


class ExamSchema(Schema):
    id = fields.Number()
    title = fields.Str()
    description = fields.Str()
    long_description = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()

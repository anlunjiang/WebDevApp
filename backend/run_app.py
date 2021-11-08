# coding=utf-8

from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.schemas.internal import (
    Session,
    engine,
    Base,
    Exam,
    ExamSchema,
)

from backend.auth import AuthError, requires_auth, requires_role

# creating the Flask application
app = Flask(__name__)
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)


@app.route("/")
def home():
    return "Hi"


@app.route("/exams")
def get_exams():
    # fetching from the database
    session = Session()
    exam_objects = session.query(Exam).all()

    # transforming into JSON-serializable objects
    schema = ExamSchema(many=True)
    exams = schema.dump(exam_objects)

    # serializing as JSON
    session.close()
    return jsonify(exams)


@app.route("/exams", methods=["POST"])
@requires_auth
def add_exam():
    # mount exam
    posted_exam = ExamSchema(only=("title", "description", "long_description")).load(request.get_json())
    print(posted_exam)
    exam = Exam(**posted_exam, created_by="HTTP post request")

    # persist exam
    session = Session()
    session.add(exam)
    session.commit()

    # return created exam
    new_exam = ExamSchema().dump(exam)
    session.close()
    return jsonify(new_exam), 201


@app.errorhandler(AuthError)
def handle_auth_error(err):
    response = jsonify(err.error)
    response.status_code = err.status_code
    return response


@app.route("/exams/<examId>", methods=["DELETE"])
@requires_role("admin")
def delete_exam(examId):
    session = Session()
    exam = session.query(Exam).filter_by(id=examId).first()
    session.delete(exam)
    session.commit()
    session.close()
    return "", 201

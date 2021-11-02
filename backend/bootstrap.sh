#!/bin/bash
export PYTHONPATH=.
export FLASK_APP=./backend/run_app.py
# shellcheck disable=SC1090
source ~/.venvs/webapp/Scripts/activate
flask run -h localhost
#!/bin/bash
export FLASK_APP=./backend/run.py
# shellcheck disable=SC1090
source ~/.venvs/webdev/Scripts/activate
flask run -h localhost
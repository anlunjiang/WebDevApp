# WebDevApp

# Installation

Install NVM - Node Version Manager
* `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`   
* Make sure the following is in your bash_rc of bash_profile:  
```bash  
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
* `nvm install node` This will also install npm - node package manager
  * `nvm ls` for installed versions
* `npm install -g @angular/cli` to install angular.js framework

# Docker setup

```bash
docker run --name online-exam-db \
    -p 5432:5432 \
    -e POSTGRES_DB=online-exam \
    -e POSTGRES_PASSWORD=0NLIN3-ex4m \
    -d postgres
```

# Running and setting POST requests


```bash
# Setup and run the flask server 
sh ./backend/bootstrap.sh
# Post request to add info using POST
curl -X POST -H 'Content-Type: application/json' -d '{
  "title": "TypeScript Advanced Exam",
  "description": "Tricky questions about TypeScript."
}' http://localhost:5000/exams
# Get results from server using exams endpoint
curl http://localhost:5000/exams # can also browse to this in a web browser
```

# CORS Cross Origin Resource Sharing

Without any further configuration, flask-cors allows CORS for all domains on all routes


# Useful Links
* https://auth0.com/blog/using-python-flask-and-angular-to-build-modern-apps-part-1/
* https://auth0.com/blog/using-python-flask-and-angular-to-build-modern-web-apps-part-2/
* https://auth0.com/blog/using-python-flask-and-angular-to-build-modern-web-apps-part-3/

* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
* https://flask-cors.readthedocs.io/en/latest/#resource-specific-cors

* https://owasp.org/www-community/attacks/csrf
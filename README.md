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

# Bootstrapping Angular Application

Angular CLI installed a tool call `ng`

* `ng new frontend` this will create the basic structure of the angular app in the folder 
  * main.ts - entry point and will instantiate ./app/app.module
  * app.module.ts - shows the ngmodule, the declarations, imports and providers. It will then run the bootstrap AppComponent
  * app.component.ts - Component with html and css templates. on init and destroy it will run the functions 
    * getExams - is triggered and conducts a GET request to the Flask backend
  * app.component.html - html that will be run on browser - and display list of exams
  * app.component.css - will show css code
* `export NODE_OPTIONS=--openssl-legacy-provider` - before serve
* `ng serve` - will compile and run the frontend server

# Managing using Auth0
Provides a reliable service for authorising users - and integrates with social media 
providors (facebook, google etc) as well a multifactor authorisation

Note that once you secure an endpoint you wont be able to curl that endpoint unless you add some auth headers

```bash
$ curl -X POST -H 'Content-Type: application/json' -d '{
>   "title": "TypeScript Advanced Exam",
>   "description": "Tricky questions about TypeScript."
> }' http://localhost:5000/exams
{"code":"authorization_header_missing","description":"Authorization header is expected."}
```

You now need an API key to test the secured endpoint - go to your auth0 api page and run the curl command to get your
access token. The cliend id and secret are the ones from the test application for your api

```bash
curl --request POST \
  --url https://dev-uwupyck2.us.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"","client_secret":"","audience":"","grant_type":"client_credentials"}'
  
JWT=""  
  
curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer '$JWT -d '{
  "title": "TypeScript Advanced Exam",
  "description": "Tricky questions about TypeScript."
}' http://localhost:5000/exams

```

# Useful Links
* https://auth0.com/blog/using-python-flask-and-angular-to-build-modern-apps-part-1/
* https://auth0.com/blog/using-python-flask-and-angular-to-build-modern-web-apps-part-2/
* https://auth0.com/blog/using-python-flask-and-angular-to-build-modern-web-apps-part-3/

* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
* https://flask-cors.readthedocs.io/en/latest/#resource-specific-cors

* https://owasp.org/www-community/attacks/csrf
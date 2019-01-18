# hica-home


## Architecture
##### backend:

generated from express-generator

https://github.com/expressjs/generator

##### frontend:

generated from create-react-app

https://github.com/facebook/create-react-app


## Run
Please run `npm install` for both `hica-home-ui` and `hica-home-backend` module to install dependencies.

##### dev:

Both frontend and backend server need to be started, so that React UI can hot reload.

To start React UI server on port 3000, go to `hica-home-ui`, and run:

	npm start

To start Express server on port 80, go to `hica-home-backend`, and run:

	npm start

##### prod:

Only backend server need to be started, UI content should be compiled and hosted by backend server.

To compile React, go to `hica-home-ui` and run:

	npm run build

Minified files will be generated under `hica-home-ui/build`. Please copy the entire folder to `hica-home-backend/public`, and then start Express server by going to `hica-home-backend`, and run:

	npm start
	
To run server as a daemon process, please install `forever`. Then under `hica-home-backend`, run:

	sudo forever start bin/www


## Roadmap
##### Stage I
- QR code and contacts
- Form validation
- Events intro page
- Departments intro page
- Tests

##### Stage II
- Add BBS (NodeBB)


# Reference
- https://daveceddia.com/create-react-app-express-backend/
- https://expressjs.com/en/starter/generator.html
- https://daveceddia.com/deploy-react-express-app-heroku/
- https://github.com/reduxjs/redux/blob/master/docs/advanced/UsageWithReactRouter.md
- https://redux.js.org/advanced/middleware#the-final-approach
- https://stackoverflow.com/questions/48992972/react-router-4-default-route-content-displays-on-all-other-components
- https://tylermcginnis.com/react-router-nested-routes/
- https://hashnode.com/post/10-best-reactjs-ui-frameworks-for-rapid-prototyping-cit49tqx414z89c53equ4zc5k
- https://redux.js.org/basics/exampletodolist
- https://daveceddia.com/context-api-vs-redux/


## Issues
- https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/5207690/

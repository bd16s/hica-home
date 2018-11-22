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

To start React UI server, go to `hica-home-ui`, and run:

	npm start


To start Express server, go to `hica-home-backend`, and run:

	npm start


##### prod:

Only backend server need to be started, UI content should be compiled and hosted by backend server.

To compile React, go to `hica-home-ui` and run:

	npm run build

Minified files will be generated under `hica-home-ui/build`. Please make sure express hosts static files from this folder.

	app.use(express.static('.../hica-home-ui/build'));

Then start Express server, go to `hica-home-backend`, and run:

	npm start

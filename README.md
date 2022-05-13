# Sample BAPIG Backend Server 

[BAPIG Documentation](https://www.npmjs.com/package/bapig)

### Requirements 

1. [Node.JS >= v12](https://nodejs.org/en/)

2. [MongoDB](https://www.mongodb.com/try/download/community)

3. [GIT](https://git-scm.com/downloads)

4. [TypeScript](https://www.typescriptlang.org/download)

After installing **Node.JS** you can install `TypeScript` and `nodemon` by running this command on your terminal.

`npm install -g typescript nodemon`

After installing **GIT** you can simply run this command to get the project. 

`git clone https://github.com/hekima-dev/sample-bapig-backend-server.git`

Then open the project with your favorite editor, if you're using [Visual Studio Code](https://code.visualstudio.com/download) run the following command to open the project.

`code sample-bapig-backend-server`

### Installing  Dependencies
To install dependencies used on the project please run the following command on your terminal.

`npm install`

### Installing Dev Dependencies 
To install dev dependencies used on the project please run the following command  on your terminal.

`npm install -D`

### Starting Development Server (Uses TypeScript Codes)
To start development server run the following command on your terminal. 

`npm run dev`

The server will start (running) on: 

`http://localhost:1000`

### Bulding (Compiling) Backend Server
To compile backend server please run the following command on your terminal.

`npm run build`

It will compile all the `TypeScript` code and produces `JavaScript` code in `dist` directory.

### Starting Production Server (Uses JavaScript Codes)
To start your production run the following command on your terminal. NOTE: **After building (compiling) backend server** 

`npm run prod`

The production server will start (running) on: 

`http://localhost:1000`
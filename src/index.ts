// dependencies
import cors from "cors";
import { Socket } from "socket.io"
import express, { Application } from "express"
import { io, router, helpers, startServer } from "bapig"


// initializing express
const application: Application = express();

// express middleware
application.disable("x-powered-by");
application.use(cors({ origin: "*" }));
application.use(express.json({ limit: "100mb" }));
application.use(express.static(helpers.staticFilesDirectory));

// API routes
application.use("/api", router);

// starting server
startServer(application);

// socket io
io.on("connection", (socket: Socket) => {
    socket.on("message", (message: any) => {
        console.log(message);
    });
});

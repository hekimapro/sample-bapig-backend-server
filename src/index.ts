// dependencies
import cors from "cors";
import express, { Application } from "express";
import * as bapig from "bapig";
import { Socket } from "socket.io";

// initializing express
const application: any = express();

// express middleware
application.disable("x-powered-by");
application.use(cors({ origin: "*" }));
application.use(express.json({ limit: "100mb" }));
application.use(express.static(bapig.helpers.staticFilesDirectory));

// API routes
application.use("/api", bapig.router);

// starting server
bapig.startServer(application);

// socket io
bapig.io.on("connection", (socket: Socket) => {
    socket.on("message", (message: any) => {
        console.log(message);
    });
});


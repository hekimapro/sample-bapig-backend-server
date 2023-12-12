// Importing dependencies
import cors from "cors"
import cluster from "cluster"
import express, { Application } from "express"
import { router, helpers, useClustering, mongoose } from "bapig"

// Initializing the Express application
const application: Application = express()

// Security-related middleware
application.disable("x-powered-by") // Disable the X-Powered-By header for security
application.use(cors({ origin: "*" })) // Enable Cross-Origin Resource Sharing (CORS)

// Parsing middleware
application.use(express.json({ limit: "100mb" })) // Parse JSON requests with a limit of 100mb

// Serving static files middleware
application.use(express.static(helpers.staticFilesDirectory)) // Serve static files

// File upload middleware
application.use(require("express-fileupload")()) // Enable file uploads

// ---------- End of Middleware Arrangement ----------

// API Endpoints
application.use("/api", router) // Mount API routes

// Database Connection Event
// Listening for the "connected" event on the Mongoose connection
mongoose.connection.on("connected", () => {

    // Requiring all database models once the connection is established
    require("./database/collection")

    // Running specific tasks on the first worker
    const { worker } = cluster
    if (worker && worker.id === 1) {

        // Running specific tasks on the first worker only

    }

})

// Server Starting and Clustering
useClustering(application) // Utilize clustering for better performance and resilience

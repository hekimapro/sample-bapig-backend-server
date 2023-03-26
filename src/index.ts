/* require dependencies */
import http from "http"
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { router, helpers } from "bapig"
import fileUpload from "express-fileupload"
import express, { Application } from 'express'

/* express initalization */
const application: Application = express()

/* express middleware */
application.use(cors())
application.use(helmet())
application.use(express.json())
application.use(morgan('dev'))
application.use(fileUpload())
application.use('/api', router)

/* serving static files */
application.use(express.static(helpers.staticFilesDirectory))

/* application information */
const port: number = 1000

// backend server
const server: http.Server = http.createServer(application)

// socket io connection
const io = require('socket.io')(server, {
    cors: { origin: "*" }
})

// listening for connection
io.on("connection", (socket: any) => {

    // when a user connectes
    console.log("Socket: A user has connected")

    // when a user disconnect
    socket.on('disconnect', () => {
        console.log("A user has disconnected")
    })

})

/* database connection with retry every 5 seconds*/
async function connectWithRetry(): Promise<void> {
    try {
        const databaseName: string = 'bapig_test'
        const databaseConnectionString: string = `mongodb://127.0.0.1:27017/${databaseName}`
        const databaseConnected = await mongoose.connect(databaseConnectionString)

        /* verify database connection */
        if (databaseConnected) {
            /* start application when database has been connected */
            server.listen(port, () => console.log(`${databaseName} database has been connected and development application is running on http://localhost:${port}`))
        }
        else {
            console.log(`Database connection failed`)
            setInterval(connectWithRetry, 5000)
        }

    } catch (error) {
        console.error((error as Error).message)
        setInterval(connectWithRetry, 5000)
    }
}

/* try to connect the database */
connectWithRetry()

export default io
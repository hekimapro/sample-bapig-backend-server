/* require dependencies */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { router } from "bapig"
import mongoose from 'mongoose'
import path from 'path'
import morgan from 'morgan'
import http from "http"
import fileUpload from "express-fileupload"

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
application.use(express.static(path.join(__dirname, '../public')))

/* application information */
const port: number = 1000

/* backend home page handling */
application.get('/', (_request: Request, response: Response) => {
    try {
        response.send(`<h1>Sample BAPIG Backend application</h1>`)
    } catch (error) {
        response.send(`<h1> Error: ${error.message}</h1>`)
    }
})

const server = http.createServer(application)

const io = require('socket.io')(server, {
    cors: { origin: "*" }
})

io.on("connection", (socket: any) => {
    console.log("Socket: user has connected");
    socket.on('disconnect', () => {
        console.log("a user has disconnected")
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
        else
            setInterval(connectWithRetry, 5000)

    } catch (error) {
        if (error instanceof Error)
            console.error(error.message)
        else
            console.error(error)
        setInterval(connectWithRetry, 5000)
    }
}

/* try to connect the database */
connectWithRetry()

export default io



/* require dependencies */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { router } from 'bapig'
import mongoose from 'mongoose'
import path from 'path'
import morgan from 'morgan'

/* express initalization */
const server: Application = express()

/* express middleware */
server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(morgan('dev'))

/* serving static files */
server.use(express.static(path.join(__dirname, '../public')))

/* server information */
const port: number = 1000

/* backend home page handling */
server.get('/', (request: Request, response: Response) => {
    try {
        response.send(`<h1>Sample BAPIG Backend Server</h1>`)
    } catch (error) {
        response.send(`<h1> Error: ${error.message}</h1>`)
    }
})

/* database connection with retry every 5 seconds*/
async function connectWithRetry(): Promise<void> {
    try {
        /* database information */
        const databaseOptions: object = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        const databaseName: string = 'bapig_test'
        const databaseConnectionString: string = `mongodb://localhost:27017/${databaseName}`
        const databaseConnected = await mongoose.connect(databaseConnectionString, databaseOptions)

        /* verify database connection */
        if (databaseConnected) {
            /* start server when database has been connected */
            server.listen(port, () => console.log(`${databaseName} database has been connected and development server is running on http://localhost:${port}`))
        }
        else
            setTimeout(connectWithRetry, 5000)

    } catch (error) {
        if (error instanceof Error)
            console.error(error.message)
        else
            console.error(error)
        setTimeout(connectWithRetry, 5000)
    }
}

/* try to connect the database */
connectWithRetry()

// application programming interfcae (API's) with bapig
server.use('', router)

/* Your other Routes */

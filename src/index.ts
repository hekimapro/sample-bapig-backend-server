/* require dependencies */
import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bapig from 'bapig'
import mongoose from 'mongoose'
import path from 'path'

/* express initalization */
const server: Application = express()

/* express middleware */
server.use(cors())
server.use(helmet())
server.use(express.json())

/* serving static files */
server.use(express.static(path.join(__dirname, '../public')))

/* server information */
const port: number = 1000

/* database information */
const databaseOptions: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
const databaseName: string = 'demo'
const databaseConnectionString: string = `mongodb://localhost:27017/${databaseName}`


/* database connection */
mongoose
    .connect(databaseConnectionString, databaseOptions)
    .then((databaseConnected) => {
        if (databaseConnected) 
            /* start server when database has been connected */
            server.listen(port, () => console.log(`${databaseName} database has been connected and development server is running on http://localhost:${port}`))
        
        else 
            console.log('Database failed to connect')
        
        // create database collections
        require('./configurations')
    })
    .catch((error: Error) => console.log(`Database connection error: ${error.message}`))

// application programming interfcae (API's) with bapig
server.use('', bapig)

/* Your other Routes */

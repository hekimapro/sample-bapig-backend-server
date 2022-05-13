/* require mongoose dependencies */
import { Schema, Document} from 'mongoose'

/* creating mongoose user interface */
export interface user extends Document {
    username: string
    phone_number: string
}

/* creating mongoose device interface */
export interface device extends Document {
    name: string 
    user: Schema.Types.ObjectId
}
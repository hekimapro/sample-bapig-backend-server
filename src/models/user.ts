import { Schema, model } from 'mongoose'
import { user } from '../interface'

/* user schema design */
const schema = new Schema<user>({
    
    username: {
        type: String,
        index: true,
        required: true,
    },

    phone_number: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        default: null
    }

}, {
    timestamps: true
})

/* schema timestamp indexing */
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })

/* user schema */
const user = model<user>('user', schema)

/* export user model for global accessibility */
export default user
import { Schema, model } from 'mongoose'
import { user } from '../interface'

/* creating user collection schema */
const schema = new Schema<user>({
    username: {
        type: String,
        required: true,
    },

    phone_number: {
        type: String,
        required: true,
        unique: true
    }

}, {
    timestamps: true
})

/* user schema indexing, boost query performance */
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })
schema.index({ username: -1 }, { background: true })

/* creating user  model */
const user = model<user>('user', schema)

export default user
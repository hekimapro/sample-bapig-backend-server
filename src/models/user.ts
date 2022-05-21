import { Schema, model } from 'mongoose'
import { user } from '../interface'

/* user schema design */
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

/* user schema indexing, improves query performance ** applied to fields that are not unique */
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })
schema.index({ username: -1 }, { background: true })

/* user schema */
const user = model<user>('user', schema)

/* export user model for global accessibility */
export default user
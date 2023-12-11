import { user } from '../interface'
import { mongoose } from "bapig"

const { Schema, model } = mongoose

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
    },

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
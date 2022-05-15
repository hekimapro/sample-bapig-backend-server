import { Schema, model } from 'mongoose'
import { device } from '../interface'

/* creating device collection schema */
const schema = new Schema<device>({
    name: {
        type: String,
        required: true
    },
    /* relatated to user collection */
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: { maxDepth: 1 }
    }
}, {
    timestamps: true
})

/* device schema indexing, boost query performance */
schema.index({ name: -1 }, { background: true })
schema.index({ user: -1 }, { background: true })
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })

/* schema plugin, automatic population when quering related data */
schema.plugin(require('mongoose-autopopulate'))

/* device model */
const device = model<device>('device', schema)

// export device model for global accessibility
export default device
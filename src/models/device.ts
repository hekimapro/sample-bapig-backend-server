import { Schema, model } from 'mongoose'
import { device } from '../interface'

/* device schema design */
const schema = new Schema<device>({
    name: {
        type: String,
        required: true
    },

    /* user foreign key */
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: { maxDepth: 1 }
    }

}, {
    timestamps: true
})

/* device schema indexing, improves query performance ** applied to field that are not unique */
schema.index({ name: -1 }, { background: true })
schema.index({ user: -1 }, { background: true })
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })

/* device schema plugin, helps automatic population (retreiving) on foreign keys*/
schema.plugin(require('mongoose-autopopulate'))

/* device model */
const device = model<device>('device', schema)

// export device model for global accessibility
export default device
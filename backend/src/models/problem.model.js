import mongoose, { Schema } from "mongoose"

const problemSchema = new Schema({
  contestId: {
    type: String,
  },
  name: {
    type: String,
  },
  rating: {
    type: Number,
  },
  tags: {
    type: Array,
  },
  type: {
    type: String,
  },
  submitTime: {
    type: Number
  },
  handle: {
    type: String
  }
}, {
  timestamps: true})

problemSchema.index({ handle: 1, contestId: 1 }, { unique: true })

const Problem = mongoose.model("Problem", problemSchema)

export default Problem
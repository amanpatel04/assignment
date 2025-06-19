import mongoose, { Schema } from "mongoose"

const contestSchema = new Schema({
  contestId: {
    type: Number,
  },
  contestName: {
    type: String
  },
  handle: {
    type: String
  },
  newRating: {
    type: Number
  },
  oldRating: {
    type: Number
  },
  rank: {
    type: Number
  },
  ratingUpdateTimeSeconds: {
    type: Number
  }
}, {
  timestamps: true
})

contestSchema.index({ handle: 1, contestId: 1 }, { unique: true })

const Contest = mongoose.model("Contest", contestSchema)

export default Contest
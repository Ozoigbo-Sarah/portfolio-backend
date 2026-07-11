import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'AI and Machine Learning', 'Tools'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Skill = mongoose.model('Skill', skillSchema)

export default Skill
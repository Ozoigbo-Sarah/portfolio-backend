import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

const Testimonial = mongoose.model('Testimonial', testimonialSchema)

export default Testimonial
import mongoose from "mongoose";

const repoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    proprietario: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Repository', repoSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      typeof: String,
      required: true,
    },
    email: {
      typeof: String,
      required: true,
    },
    password: {
      typeof: String,
      required: true,
    },
    role: {
      typeof: Number,
      default: 0,
    },
    cart: {
      typeof: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Users',userSchema)

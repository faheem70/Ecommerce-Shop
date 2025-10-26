const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
    unique: true,
    trim: true
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      required: [true, "Please provide a category image"],
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Category", categorySchema);

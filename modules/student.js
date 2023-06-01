const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  exam1: {
    type: Number,
    required: true,
  },
  exam2: {
    type: Number,
    required: true,
  },
  exam3: {
    type: Number,
    required: true,
  },

 
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
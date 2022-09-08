const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true, //* Baştaki ve sondaki gereksiz boşlukları kaldırıyor.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;

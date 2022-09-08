const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

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
  slug : {
    type: String,
    unique: true,
  }
});

CourseSchema.pre('validate', function(next) {
  this.slug = slugify(this.name, {
    lower:true,
    strict:true
  })
  next();

})

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;

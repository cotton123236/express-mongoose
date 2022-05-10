const mongoose = require('mongoose')
const { Schema, model } = mongoose


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'field "name" is required.']
  },
  email: {
    type: String,
    required: [true, 'field "email" is required.'],
    unique: true,
    lowercase: true,
    select: false
  },
  image: {
    type: String,
    default: ''
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post'
    }
  ],
  tracks: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  versionKey: false
})

const User = model('User', userSchema)


module.exports = User
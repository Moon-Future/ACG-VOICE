const mongoose = require('mongoose')
const Schema = mongoose.Schema
const curTime = new Date().getTime()

const imgaeSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  src: {
    type: String
  },
  size: {
    type: String
  },
  type: {
    type: String
  },
  lastUpd: {
    type: Number,
    default: curTime
  },
  bucket: {
    type: String,
    default: 'acg-Image'
  },
  recommend: {
    type: Number,
    default: 0
  },
  hot: {
    type: Number,
    default: 0
  }
})

module.exports = {
  Image: mongoose.model('Image', imgaeSchema, 'image')
}

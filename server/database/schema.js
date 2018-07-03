const mongoose = require('mongoose')
const Schema = mongoose.Schema
const curTime = new Date().getTime()

const characterSchema = new Schema({
  name: { type: String, unique: true },
  nickName: { type: String },
  from: { type: String },
  sex: { type: Number, default: 1 }, // 男 1, 女 0
  age: { type: Number, default: 18 }
})

const imgaeSchema = new Schema({
  character: { type: String },
  name: { type: String, unique: true },
  src: { type: String },
  size: { type: String },
  type: { type: String, default: 'image/jpeg' },
  lastUpd: { type: Number, default: curTime },
  bucket: { type: String, default: 'acg-Image' },
  recommend: { type: Number, default: 0 },
  hot: { type: Number, default: 0 },
  position: { type: String, default: '' } // head, cover, skin
})

module.exports = {
  Character: mongoose.model('Character', characterSchema, 'character'),
  Image: mongoose.model('Image', imgaeSchema, 'image')
}

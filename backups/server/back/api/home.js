const { Character, Image } = require('../database/schema')
const { getRandom } = require('./base')

var homeAPI = {
  getSwiper() {
    return new Promise((resolve, reject) => {
      Image.find({position: 'skin'}, (err, res) => {
        let length = res.length
        let indexs = getRandom(0, length, 4)
        let result = []
        for (let i = 0, len = indexs.length; i < len; i++) {
          let tmp = res[indexs[i]]
          let obj = {
            character: tmp.character,
            form: tmp.from,
            key: tmp.key,
            src: tmp.src === '#' ? tmp.srcOfficial : tmp.src
          }
          result.push(obj)
        }
        resolve(result)
      })
    })
  },
  getHomeHot() {
    return new Promise((resolve, reject) => {
      Image.find({position: 'skin'}, (err, res) => {
        let length = res.length
        let indexs = getRandom(0, length, 6)
        let result = []
        for (let i = 0, len = indexs.length; i < len; i++) {
          let tmp = res[indexs[i]]
          let obj = {
            character: tmp.character,
            form: tmp.from,
            key: tmp.key,
            src: tmp.src === '#' ? tmp.srcOfficial : tmp.src
          }
          result.push(obj)
        }
        resolve(result)
      })
    })
  }
}

module.exports = homeAPI
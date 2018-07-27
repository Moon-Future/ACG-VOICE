const { Character, Image } = require('../database/schema')

const characterAPI = {
  getCharacterList() {
    return new Promise((resolve, reject) => {
      Character.find({}, (err, res) => {
        if (err) {
          throw new Error()
          return false
        }
        let result = []
        res.forEach((ele) => {
          result.push({
            name: ele.name,
            nickName: ele.nickName,
            from: ele.from,
            avatar: ele.avatar,
            avatarOfficial: ele.avatarOfficial,
            firstLetter: ele.spell.substr(0, 1).toLocaleUpperCase(),
            findKey: ele.findKey
          })
        })
        resolve(result)
      })
    })
  },
  getCharacterSkin(params) {
    let findKey = params.findKey
    return new Promise((resolve, reject) => {
      Image.find({findKey: findKey}, (err, res) => {
        if (err) {
          throw new Error()
          return false
        }
        resolve(res)
      })
    })
  },
  getCharacterAvatar(params) {
    let findKey = params.findKey
    return new Promise((resolve, reject) => {
      Character.find({findKey: findKey}, (err, res) => {
        if (err) {
          throw new Error()
          return false
        }
        resolve(res)
      })
    })
  },
}

module.exports = characterAPI
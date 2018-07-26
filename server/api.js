const fs = require('fs')
const path = require('path')
const connect = require('./database/init')
const { Character, Image } = require('./database/schema')
connect()

function getRandom(start, end, size) {
  let allRandms = []
  size = size ? (size > end - start ? end - start : size) : 1
  for (let i = start; i <= end; i++) {
    allRandms.push(i)
  }
  allRandms.sort(() => {
    return 0.5 - Math.random()
  })
  return allRandms.slice(0, size)
}

const api = {
  getRecommend() {
    return new Promise((resolve, reject) => {
      Image.find({position: 'skin'}, (err, res) => {
        let length = res.length
        let indexs = getRandom(0, length, 4)
        let result = []
        for (let i = 0, len = indexs.length; i < len; i++) {
          result.push(res[indexs[i]])
        }
        resolve(result)
      })
    })
  },
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
            firstLetter: ele.spell.substr(0, 1).toLocaleUpperCase()
          })
        })
        resolve(result)
      })
    })
  }
}

module.exports = api

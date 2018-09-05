const { Character, Image } = require('../database/schema')
const { getRandom } = require('./base')
const request = require('request')

const wyyUrl = 'https://api.imjad.cn/cloudmusic/?type=search'
const limit = 20
const searchType = [
  { type: 1, name: '单曲' },
  { type: 10, name: '专辑' },
  { type: 100, name: '歌手' },
  { type: 1000, name: '歌单' }
]

function ajax(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        throw new Error(err)
      }
      console.log('url', url)
      console.log('body', body)
      resolve(JSON.parse(body))
    })
  })
}

function formatDataWYY(data) {
  let formatData = {}
  
}

const searchAPI = {
  searchByWYY(params) {
    const value = encodeURIComponent(params.value);
    const url = `${wyyUrl}&s=${value}&search_type=${searchType[0].type}`
    return new Promise((resolve, reject) => {
      ajax(url).then(res => {
        resolve(res)
      })
    })
  },
  search(params) {
    return searchAPI.searchByWYY(params)
  }
}

module.exports = searchAPI
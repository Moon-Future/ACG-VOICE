/*
  网易云音乐（Cloudmusic）
  URL https://api.imjad.cn/cloudmusic.md
  GET https://api.imjad.cn/cloudmusic/
*/

const request = require('request')
const path = require('path')
const fs = require('fs')
const api = 'https://api.imjad.cn/cloudmusic/'

function ajax(url) {
  return new Promise((resolve, reject) => {
    console.log('正在请求: ', url)
    request(url, (err, res, body) => {
      if (err) {
        throw new Error(err)
      }
      resolve(JSON.parse(body))
    })
  })
}

function getMusic(type, id) {
  return new Promise((resolve, reject) => {
    const url = `${api}?type=${type}&id=${id}`
    ajax(url).then((data) => {
      // console.log('data', data)
      resolve(data)
    })
  })
}

function search(search_type, s) {
  return new Promise((resolve, reject) => {
    const url = `${api}?type=search&search_type=${search_type}&s=${s}`
    ajax(url).then((data) => {
      // console.log('data', data)
      resolve(data)
    })
  })
}

// search(1000, '抖音')

// getMusic('song', 461846471)

var songList = []

console.log('start...')

getMusic('playlist', 892177597).then(async (data) => {
  const playlist = data.playlist.tracks
  const len = playlist.length

  for (let i = 0; i < len; i++) {
    const id = playlist[i].id
    const name = playlist[i].name
    const song = await getMusic('song', id)
    console.log(`共 ${len}, 当前 ${i}`)
    const data = song.data
    data.forEach(ele => {
      songList.push({
        id: ele.id,
        name,
        url: ele.url
      })
    })
  }
  fs.writeFileSync(path.join(__dirname, './songlist.json'), JSON.stringify(songList), 'utf-8')
  console.log('end...')
})

const request = require('request')

function ajax(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        throw new Error(err)
      }
      resolve(JSON.parse(body))
    })
  })
}

function getRandom(start, end, size) {
  let allRandms = []
  size = size ? (size > end - start ? end - start : size) : 1
  for (let i = start; i <= end; i++) {
    allRandms.push(i)
  }
  allRandms.sort(() => {
    return 0.5 - Math.random()
  })
  return size == 1 ? allRandms[0] : allRandms.slice(0, size)
}

function formatDataSong(data, params) {
  const result = {
    id: data[params.id] || '',
    name: data[params.name] || '',
    src: data[params.src] || '',
    character: data[params.character] || '',
    characterID: data[params.characterID] || '',
    bgimg: data[params.bgimg] || '',
    coverimg: data[params.coverimg] || ''
  }
  return result
}

module.exports = {
  ajax,
  getRandom,
  formatDataSong
}
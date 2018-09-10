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

function formatDataSong(data, params) {
  const result = {
    id: data[params.id] || '',
    name: data[params.name] || '',
    src: data[params.url] || '',
    character: data[params.character] || '',
    bgimg: data[params.bgimg] || '',
    coverimg: data[params.coverimg] || ''
  }
  return result
}

module.exports = {
  getRandom,
  formatDataSong
}
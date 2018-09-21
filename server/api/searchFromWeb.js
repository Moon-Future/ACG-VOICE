const { ajax } = require('./base')

function wyySearch() {
  this.baseUrl = 'https://api.imjad.cn/cloudmusic/'
  this.type = {song: 'song', album: 'album', artist: 'artist', playlist: 'playlist', lyric: 'lyric', search: 'search'}
  this.searchType = {song: 1, album: 10, artist: 100, playlist: 1000}
  this.limit = 20
}

wyySearch.prototype = {
  async search(value) {
    const url = `${this.baseUrl}?type=${this.type.search}&search_type=${this.searchType.song}&s=${value}`
    const result = await ajax(url)
    return result
  }
}

function qqSearch() {

}

function coolDogSearch() {

}

module.exports = {
  wyySearch: new wyySearch()
}
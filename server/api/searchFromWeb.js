const { ajax } = require('./base')

function wyySearch() {
  // https://api.imjad.cn/cloudmusic.md
  this.baseUrl = 'https://api.imjad.cn/cloudmusic/'
  this.type = {song: 'song', album: 'album', artist: 'artist', playlist: 'playlist', lyric: 'lyric', search: 'search'}
  this.searchType = {song: 1, album: 10, artist: 100, playlist: 1000}
  this.limit = 20
}

wyySearch.prototype = {
  async search(value) {
    const urlSong = `${this.baseUrl}?type=${this.type.search}&search_type=${this.searchType.song}&s=${value}`
    const urlArtist = `${this.baseUrl}?type=${this.type.search}&search_type=${this.searchType.artist}&s=${value}`
    const resultSong = await ajax(urlSong)
    const resultArtist = await ajax(urlArtist)
    let result = {
      voice: {},
      character: {}
    }
    // 歌曲数据
    if (resultSong.code === 200) {
      result.voice.count = resultSong.result.songCount
      result.voice.data = []
      resultSong.result.songs.forEach(element => {
        let obj = {
          id: element.id,
          name: element.name,
          ar: {
            id: element.ar[0].id,
            name: element.ar[0].name
          },
          al: {
            id: element.al.id,
            name: element.al.name,
            coverimg: element.al.picUrl
          },
          platform: 'wyy'
        }
        result.voice.data.push(obj)
      });
    }
    // 歌手数据
    if (resultArtist.code === 200 && resultArtist.result.artistCount > 0) {
      const firstData = resultArtist.result.artists[0]
      result.character = {
        id: firstData.id,
        name: firstData.name,
        alias: firstData.alias,
        avatar: firstData.picUrl || firstData.img1v1Url,
        platform: 'wyy'
      }
    }
    return result
  },
  async getSongById(params) {
    const urlSong = `${this.baseUrl}?type=${this.type.song}&id=${params.id}`
    const urlLyric = `${this.baseUrl}?type=${this.type.lyric}&id=${params.id}`
    const resultSong = await ajax(urlSong)
    const resultLyric = await ajax(urlLyric)
    let result = {}
    if (resultSong.code === 200) {
      const data = resultSong.data[0]
      result = {
        src: data.url,
        type: data.type,
        size: data.size,
        id: data.id,
        name: params.name,
        characterName: params.arName,
        characterId: params.arId,
        coverimg: params.coverimg,
        lyric: resultLyric.lrc.lyric,
        platform: 'wyy'
      }
    }
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
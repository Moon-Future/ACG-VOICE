export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2,
  one: 3
}

export const modeIconClass = {
  [playMode.sequence]: {
    icon: 'icon-acg-sequence',
    txt: '顺序播放'
  },
  [playMode.loop]: {
    icon: 'icon-acg-listloop',
    txt: '列表循环'
  },
  [playMode.random]: {
    icon: 'icon-acg-random',
    txt: '随机播放'
  },
  [playMode.one]: {
    icon: 'icon-acg-oneloop',
    txt: '单曲循环'
  }
}

export const playModeList = [
  playMode.sequence,
  playMode.loop,
  playMode.random,
  playMode.one
]

export const code = {
  success: 200
}

export const toastMessage = {
  noCopyright: '没有版权'
}
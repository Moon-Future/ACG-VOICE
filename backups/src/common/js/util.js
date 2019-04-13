export function getRandomInt(min, max, index) {
  index = index || min - 1
  let result = Math.floor(Math.random() * (max - min + 1) + min)
  while(result === index) {
    result = Math.floor(Math.random() * (max - min + 1) + min)
  }
  return result
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0, len = _arr.length; i < len; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function getHtmlFontSize() {
  let htmlwidth = document.documentElement.clientWidth || document.body.clientWidth ;
  let htmlDom = document.getElementsByTagName('html')[0];
  if (htmlwidth > 750) {
    htmlwidth = 750
  }
  return htmlwidth/20
}

export const htmlFontSize = getHtmlFontSize()
const fs = require('fs');
const path = require('path');
const rootPath = path.join(__dirname, '../../static/spider/images/LOL');
const nameObj = {}

let fileList = fs.readdirSync(rootPath);
for (let i = 0, len = fileList.length; i < len; i++) {
  let file = fileList[i];
  if (file.indexOf('head') !== -1) {
    let names = file.split('(head)')[0].split('-');
    let nickName = names[0];
    let name = names[1];
    nameObj[nickName] ? false : nameObj[nickName] = name;
  }
}

for (let i = 0, len = fileList.length; i < len; i++) {
  let file = fileList[i];
  if (file.indexOf('skin') !== -1) {
    let nickName = file.split('-')[0];
    let skin = file.match(/\(.*\)/)[0];
    let name = nameObj[nickName] || nickName;
    let oldPath = path.join(rootPath, file);
    let newPath = path.join(rootPath, nickName + '-' + name + skin + '.jpg');
    fs.renameSync(oldPath, newPath);
  }
}


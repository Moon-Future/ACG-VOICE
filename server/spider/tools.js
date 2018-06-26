const fs = require('fs');
const path = require('path');
const rootPath = path.join(__dirname, 'files/images/LOL');
let fileList = fs.readdirSync(rootPath);

function removeFile(type = 'cover') {
  for (let i = 0, len = fileList.length; i < len; i++) {
    let file = fileList[i];
    if (file.indexOf(type) === -1) {
      fs.unlinkSync(path.join(rootPath, file));
    }
  }
}

function findFile() {
  let nameObj = {};
  for (let i = 0, len = fileList.length; i < len; i++) {
    let file = fileList[i];
    let names = file.split('(')[0].split('-');
    let nickName = names[0];
    let name = names[1];
    if (file.indexOf('head') !== -1) {
      nameObj[nickName] ? false : nameObj[nickName] = name;
    }
  }
  
  for (let i = 0, len = fileList.length; i < len; i++) {
    let file = fileList[i];
    let names = file.split('(')[0].split('-');
    let nickName = names[0];
    let name = names[1];
    if (file.indexOf('cover') !== -1) {
      if (nameObj[nickName]) {
        delete nameObj[nickName]
      }
    }
  }
  console.log(nameObj);
}

function counterFile(type = 'cover') {
  let index = 0, obj = {};
  for (let i = 0, len = fileList.length; i < len; i++) {
    let file = fileList[i];
    let names = file.split('(')[0].split('-');
    let nickName = names[0];
    let name = names[1];
    if (file.indexOf(type) !== -1) {
      index += 1;
    }
  }
  console.log(index);
}

counterFile('head');

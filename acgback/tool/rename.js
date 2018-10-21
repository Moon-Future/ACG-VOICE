const fs = require('fs');
const path = require('path');
const rootPath = path.join(__dirname, './files/images/LOL');
const nameObj = {}

let fileList = fs.readdirSync(rootPath);

for (let i = 0, len = fileList.length; i < len; i++) {
  let file = fileList[i];
  let oldPath = path.join(rootPath, file);
  let newPath = path.join(rootPath, `LOL-${file}`);
  fs.renameSync(oldPath, newPath);
}
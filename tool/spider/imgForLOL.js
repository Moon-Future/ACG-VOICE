const fs = require('fs');
const path = require('path');
const request = require('request');
const pinyin = require('../pinyin/pinyinUtil')
const pinyinUtil = global.pinyinUtil
const superagent = require('superagent');
const cheerio = require('cheerio');
const phantom = require('phantom');
const imagePath = path.join(__dirname, 'files/images/LOL');
const spiderUrl = 'http://lol.178.com/champion/';
const baseUrl = 'http://lol.qq.com/web201310/info-heros.shtml';

// function getHerosHead() {
//   superagent.get(spiderUrl).end((err, res) => {
//     if (err) {
//       throw Error(err);
//     }
//     let $ = cheerio.load(res.text);
//     let herosLink = $('.tabbed-contents .tabbed').filter('.cur').find('a');
//     let imgUrl, nickName, name, fileName;
//     let length = herosLink.length;
//     herosLink.each((index, ele) => {
//       imgUrl = $(ele).find('img').attr('src');
//       nickName = $(ele).find('strong').text();
//       name = $(ele).find('span').text();
//       fileName = nickName + '-' + name + '(head).jpg';
//       console.log('共' + length + '张图片，正在下载第' + (index + 1) + '张，' + fileName);
//       download(imgUrl, path.join(imagePath, fileName));
//     })
//   })
// }

async function getHerosHead(flag) {
  const jsonDataPath = path.join(__dirname, 'File/LOL/Data');
  const imagePath = path.join(__dirname, 'File/LOL/Image/Head');
  const content = []
  let $ = await openPage(baseUrl);
  let herosLink = $('.imgtextlist').find('li');
  let length = herosLink.length;
  let from = '英雄联盟(LOL)'
  for (let i = 0; i < length; i++) {
    let ele = herosLink[i];
    let title = $(ele).find('a').attr('title');
    let nickName = title.split(' ')[0];
    let name = title.split(' ')[1];
    let imgUrl = $(ele).find('img').attr('src');
    let fileName = nickName + '-' + name + '(head).jpg';
    let nameEn = imgUrl.split('/')[imgUrl.split('/').length - 1].split('.')[0];
    let spell = pinyinUtil.getFirstLetter(name)
    let obj = {
      name,
      nameEn,
      nickName,
      spell,
      from,
      sex: '1', // 男 1, 女 0
      age: 18,
      avatar: '#',
      avatarOfficial: imgUrl,
      findKey: `${name}-${from}`
    }
    content.push(obj);
    console.log('共' + length + '张图片，正在下载第' + (i + 1) + '张，' + fileName);
    flag ? download(imgUrl, path.join(imagePath, fileName)) : false;
  }
  fs.writeFileSync(path.join(jsonDataPath, 'avatar.json'), JSON.stringify(content) ,'utf-8')
}

function getHerosCover() {
  superagent.get(spiderUrl).end((err, res) => {
    if (err) {
      throw Error(err);
    }
    let $ = cheerio.load(res.text);
    let herosLink = $('.tabbed-contents .tabbed').filter('.cur').find('a');
    let length = herosLink.length;
    for (let i = 0; i < length; i++) {
      let ele = herosLink[i];
      let infoUrl = $(ele).attr('href');
      let nickName = $(ele).find('strong').text();
      let name = $(ele).find('span').text();
      if (infoUrl.indexOf('champion') !== -1) {
        superagent.get(infoUrl).end((err, res) => {
          if (err) {
            throw Error(err);
          }
          let $ = cheerio.load(res.text);
          let imgCoverUrl = $('.hero-info-img').find('a img').attr('src');
          let fileName = nickName + '-' + name + '(cover).jpg';
          console.log('共' + length + '张图片，正在下载第' + (i + 1) + '张，' + fileName);
          download(imgCoverUrl, path.join(imagePath, fileName));
        })
      }
    }
  })
}

async function getHerosSkin(flag) {
  const jsonDataPath = path.join(__dirname, 'File/LOL/Data');
  const imagePath = path.join(__dirname, 'File/LOL/Image/Skin');
  const content = []
  let $ = await openPage(baseUrl);
  let herosLink = $('.imgtextlist').find('li');
  let length = herosLink.length;
  let from = '英雄联盟(LOL)'
  for (let i = 0; i < length; i++) {
    let ele = herosLink[i];
    let infoUrl = $(ele).find('a').attr('href');
    let title = $(ele).find('a').attr('title');
    let nickName = title.split(' ')[0];
    let name = title.split(' ')[1];
    let $2 = await openPage('http://lol.qq.com/web201310/' + infoUrl);
    let imgLis = $2('.defail-skin-nav ul li'), imgSkinUrl, fileName;
    for (let j = 0, len = imgLis.length; j < len; j++) {
      imgSkinUrl = $2(imgLis[j]).find('a img').attr('src');
      imgSkinUrl = imgSkinUrl.replace('small', 'big');
      fileName = nickName + '-' + name + '(skin' + ( j + 1) + ').jpg';
      let obj = {
        character: name,
        name: `英雄联盟/cl8023/LOL-${nickName}-${name}(skin${j+1}).jpg`,
        type: 'image/jpeg',
        position: 'skin',
        from,
        src: '#',
        size: '#',
        lastUpd: 0,
        bucket: 'acg-Image',
        recommend: 0,
        hot: 0,
        skinOfficial: imgSkinUrl,
        findKey: `${name}-${from}`
      }
      content.push(obj);
      console.log('共'+length+'英雄，正在下载第'+(i+1)+'个英雄:'+name+'，当前英雄共'+len+'张皮肤，正在下载第'+(j+1)+'张皮肤');
      fs.writeFileSync(path.join(jsonDataPath, 'skin.json'), JSON.stringify(content) ,'utf-8')
      flag ? download(imgSkinUrl, path.join(imagePath, fileName)) : false;
    }
  }
  fs.writeFileSync(path.join(jsonDataPath, 'skin.json'), JSON.stringify(content) ,'utf-8')
}

function delay(second) {
  return new Promise((resolve) => {
      setTimeout(resolve, second * 1000);
  });
}

async function openPage(url) {
  delay(1);
  const instance = await phantom.create();
  const page = await instance.createPage();
  const headers = {};
  page.property({
    customHeaders: headers,
    settings: {
      javascriptEnabled: true,
      userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36',
    },
    viewportSize: {
      width: 1024,
      height: 768
    },
  })
  await page.on('onResourceRequested', function(requestData) {
    // console.info('Requesting', requestData.url);
  });
  
  const status = await page.open(url);
  await page.property('scrollPosition', {
    left: 0,
    top: 1000
  })
  await delay(1);
  const content = await page.property('content');
  await instance.exit();
  return cheerio.load(content);
};

function download(url, filePath) {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(filePath));
  })
}

// getHerosHead();
// getHerosSkin();

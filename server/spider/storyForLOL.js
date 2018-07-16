const fs = require('fs');
const path = require('path');
const request = require('request');
const superagent = require('superagent');
const cheerio = require('cheerio');
const phantom = require('phantom');
const baseUrl = 'http://yz.lol.qq.com/zh_CN/explore/short-stories/newest/';


async function getUrlList() {
  // let $ = await openPage(baseUrl);
  let divList = $('.ReactVirtualized__Grid__innerScrollContainer').find('>div');
  console.log('length', divList.length);
  for (let i = 0, len = divList.length; i < len; i++) {
    let a = $(divList[i]).find('a');
    let href = a.attr('href');
    let name = a.find('.labels__2hI h4').text();
    let title = a.find('.labels__2hI h3').text();
    let text = a.find('.descWrapper__3Kn p').text();
    console.log('href', href, name, title, text);
  }
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
      width: 1920,
      height: 1080
    },
  })
  await page.on('onResourceRequested', function(requestData) {
    // console.info('Requesting', requestData.url);
  });
  
  const status = await page.open(url);
  // await page.property('scrollPosition', {
  //   left: 0,
  //   top: 2000
  // })
  // await delay(1);
  // const content = await page.property('content');
  // await instance.exit();
  // return cheerio.load(content);
  let $;
  async function pageScroll(k) {
    await delay(1)
    await page.property('scrollPosition', {
        left: 0,
        top: 1000 * k
    })
    let content = await page.property('content')
    $ = cheerio.load(content)
    console.log('www', k, $('.CardWrapper__3s9').length);

    let divList = $('.ReactVirtualized__Grid__innerScrollContainer').find('>div');
    console.log('length', divList.length);
    for (let i = 0, len = divList.length; i < len; i++) {
      let a = $(divList[i]).find('a');
      let href = a.attr('href');
      let name = a.find('.labels__2hI h4').text();
      let title = a.find('.labels__2hI h3').text();
      let text = a.find('.descWrapper__3Kn p').text();
      console.log('href', href, name, title, text);
    }


    if($('.CardWrapper__3s9').length < 11) {
        await pageScroll(++k)
    }
  }
  await pageScroll(0)
  return $
};

openPage(baseUrl)

// getUrlList();
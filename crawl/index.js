const cheerio = require("cheerio");
const axios = require("axios");
const { fsWrite } = require("../utils");
const fs = require("fs");
const path = require("path");
//延时执行
function timedelay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}



// 获取总页数
async function getPageNum(){
    const pageUrl = "https://www.doutula.com/article/list/?page=1";
    const res = await axios.get(pageUrl);
    let $ = cheerio.load(res.data);
    const num = $('.pagination li:nth-last-child(2) a').text();
    return num;
}

//爬取所有的
async function spider(){
    const pageNum = await getPageNum();
    console.log(pageNum)
    for(let i=1;i<=pageNum;i++){
        await timedelay(100 * i);
        await getCateUrl(i)
    }
}
spider()
var total =0;
// 获取每一页，每一类图标类别连接
async function getCateUrl(page) {
  const pageUrl = "https://www.doutula.com/article/list/?page=";
  const cateUrl = `${pageUrl}${page}`;
  const res = await axios.get(cateUrl);
  // 页面html赋值$对象
  let $ = cheerio.load(res.data);

  $(".center-wrap .random_list").each(async (i, element) => {
    let url = $(element).attr("href");
    let title = $(element).find(".random_title").text();
    title = title.slice(0, title.length - 10);
     // 去掉转义字符
    title = title.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
     // 去掉特殊字符
    title = title.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/g,'');
    if (url) {
      fs.mkdir("./img/" + title, function (err) {
        total++;
        if (err) {
          console.log(err);
        } else {
          console.log(`第${total}个目录创建成功！\n`);
        }
      });
     // await pageDetail(url, title);
    }
  });
}

// 获取每种类型，每张图片地址
async function pageDetail(url, title) {
  let res = await axios.get(url);
  let $ = cheerio.load(res.data);
  console.log("----图片系列----------" + title + "------------\n");
  $(".pic-content td img").each(async (i, element) => {
    let imgUrl = $(element).attr("src");
    await timedelay(400 * i);
    await downImg(imgUrl, title, i);
  });
}

async function downImg(url, title, i) {
  // 定义图片名称,获取img后缀名
  let extName = path.extname(url);
  let imgName = `./img/${title}/img-${i}${extName}`;
  // 创建写入流
  let ws = fs.createWriteStream(imgName, { flag: "w" });
  // 请求的事流体文件 responseType:'stream'
  let res = await axios.get(url, { responseType: "stream" });
  res.data.pipe(ws);
  console.log("----图片img-" + i + "下载完毕-------------\n");
  //监听全部下载完关闭流
  res.data.on("close", function () {
    ws.end();
  });
}

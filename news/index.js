const {querydb,DB } = require('../_db')
const cheerio = require('cheerio')
async function getNum(){
  const data = await querydb('select count(*) as count from jisu_news where is_edit= 1')
  console.log(data[0]['count'])
  return data[0]['count']
}
getNum()
async function run(){
  let i= 0
  let size = 5
  let num = await getNum()
  let page = Math.ceil(num/size)
  console.log(page)
  while(i<page){
    let sql1 = `select title, id,content,pic from jisu_news where is_edit = 1 limit ?,?`
    let list = await querydb(sql1,[i*size,size])
    if(list.length){
      await upDate(list, i)
    }else{
      console.log(list)
    }
    i++
  }
  console.log('执行完毕！')
}
// 更新
 async function upDate(data,n){
  let j = 0
//  console.log(n)
  while(j<data.length){
    const covers = getimgsrc(data[j].content, data[j].pic)
    const des = getdes(data[j].content)
    const sql = `update jisu_news set covers = ?,des = ?,is_edit = '0' where id = ?`
    await querydb(sql, [covers, des, data[j].id])
     console.log(`第${n * 5 + j+1}个---${data[j].title}更新完毕`)
    j++
  }
 }
// 获取所有图片地址
 function getimgsrc(htmlstr,pic) {
  var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
  let imgsrcArr = [];
  let defaults = 'https://n.sinaimg.cn/default/2fb77759/20151125/320X320.png';
  defaults = defaults != pic ? pic :[];
  while (tem = reg.exec(htmlstr)) {
    imgsrcArr.push(tem[2]);
  }
  imgsrcArr = [defaults,...imgsrcArr];
  imgsrcArr =[...new Set(imgsrcArr)]
  if(imgsrcArr.length>6){
    imgsrcArr = imgsrcArr.slice(0,5)
  }
  const urls = imgsrcArr.length ? imgsrcArr.join(',') :''
  return urls;
}
// 获取文章描述
function getdes(htmlStr){
  const html = `<div id="text">${htmlStr}</div>`;
  const $ = cheerio.load(html)
  let des = $('#text').text()
  des = des.replace(/\s+/g, '').substring(0, 150)
  return des
}
run()
//querydb('update jisu_news set is_edit = 0');
//querydb('update jisu_news set url = "",weburl=""');
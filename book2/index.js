const axios = require('axios')
const cheerio = require('cheerio')
const { DB, querydb } = require('../_db')
const { timedelay } = require("../utils")
const qs = require('qs')

getbookIds()
async function getbookIds(){
  const sql = "select bid,oldbookurl from book where ctdownurl is null and lqurl is null";
  const ids = await querydb(sql,[])
  let i =0;
  while(i<ids.length){
    await getBookdownUrl(ids[i].oldbookurl,ids[i].bid);
    i++
    console.log(`保存完第${i}条`)
  }
}

//getBookdownUrl('https://sobooks.cc/books/17122.html')
async function getBookdownUrl(url,bid) {
  const query = { 'e_secret_key': 584880 }
  const option = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Referer': url,
      'Origin': 'https://sobooks.cc',
    }
  }
  try{
    const res = await axios.post(url, qs.stringify(query), option);
    const $ = cheerio.load(res.data, { decodeEntities: false });
    let lqurl = $('body > section > div.content-wrap > div > article > div.e-secret > b > a:nth-child(3)').attr('href')
    if (lqurl) {
      lqurl = lqurl.split('?url=')[1];
      const arr = [lqurl, bid]
      const sqlStr = "update book set lqurl = ? where bid=?"
      await querydb(sqlStr, arr)
    }
  } catch(err){
    console.log(err)
    console.log(bid)
  }
}
const axios = require('axios')
const cheerio = require('cheerio')
const {DB,querydb} = require('../db')
const {timedelay} = require("../utils")
const qs = require('qs')

// 获取总页数
async function getPageNum(){
    const url = 'https://sobooks.cc/';
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    let num = $('.pagination li:last-child span').text().split(' ')[1];
    return num;
}


// 获取当页电子书地址

async function getbookItemUrl(page=1){
    const url =`https://sobooks.cc/page/${page}`;
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    console.log(`当前是第${page}页\n`);
    var bookUrlArr = [];
    $("#cardslist .card-item .thumb-img>a").each(async(i,item) =>{
        const bookUrl = $(item).attr('href');
        bookUrlArr.push(bookUrl)
    })
    return bookUrlArr
}

// 获取每一本书的详情
let total = 1;
getBookInfo('https://sobooks.cc/books/17237.html')
async function getBookInfo(url){
    
    const query = {'e_secret_key': 866538}
    const option = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': url,
            'Origin': 'https://sobooks.cc',
        }
    }
    const res = await axios.post(url,qs.stringify(query),option);
    const $ = cheerio.load(res.data, { decodeEntities: false });
    // name ,cate,oldbookurl,olddownurl,author,format,tag,pubtime,score,isbn,ades,bdes,bookpic
    let name = $('.article-content .bookinfo li:nth-child(1)').text();
    name = name.substring(3,name.length)
    // 类别
    let cate = $('.article-header .muted:nth-child(1)>a').text().trim();
    // oldbookurl
    let oldbookurl = url;
    // olddownurl
   let olddownurl = $('.article-content > .dltable tr:nth-child(3) td>a:nth-child(3)').attr('href')
   if(olddownurl){
      olddownurl =  olddownurl.split('?url=')[1];
   }else{
        olddownurl = $('.article-content .e-secret>b>a:nth-child(1)').attr('href')
        if(olddownurl){
            olddownurl =  olddownurl.split('?url=')[1];
        }
   }

    //  author 作者
    let author = $('.article-content .bookinfo li:nth-child(2)').text();
    author = author.substring(3,author.length);
    //  format 格式
    let format = $('.article-content .bookinfo li:nth-child(3)').text();
    format = format.substring(3,format.length) 
    // tag 标签
    let tag = $('.article-content .bookinfo li:nth-child(4)').text();
    tag = tag.substring(3,tag.length) 
    // 时间
    let pubtime = $('.article-content .bookinfo li:nth-child(5)').text();
    pubtime = pubtime.substring(3,pubtime.length) 
    // score 评分
    let score = $('.article-content .bookinfo li:nth-child(6) b').attr('class');
    score = score.substring(9,score.length)         
    // isbn 编号
    let isbn = $('.article-content .bookinfo li:nth-child(7)').text();
    isbn = isbn.substring(5,isbn.length)
    
    // 内容简介
    let bdes = $('.article-content').html();
    bdes = bdes.match(/<h2>内容简介<\/h2>(.*)<\/h2>/);
    bdes = bdes ? bdes[0] : '';
    bdes = bdes.replace('<h2>内容简介</h2>','').replace('<h2>作者简介</h2>','')
   // 作者简介
   let ades = $('.article-content').html();
   ades = ades.match(/<h2>作者简介<\/h2>(.*)<div class="e-secret">/);
   ades = ades ? ades[0]: ''
   ades = ades.replace('<h2>作者简介</h2>','').replace('<div class="e-secret">','')
    // 书封面
    let bookpic = $('.article-content .bookpic img').attr('src');
    const arr = [name ,cate,oldbookurl,olddownurl,author,format,tag,pubtime,score,isbn,ades,bdes,bookpic]   
    const sqlStr = "insert into book (name ,cate,oldbookurl,olddownurl,author,format,tag,pubtime,score,isbn,ades,bdes,bookpic) values (?,?,?,?,?,?,?,?,?,?,?,?,?)"
    DB.query(sqlStr,arr,(err,res) =>{
        if(err){
            console.log(err)
        }else{
           console.log('保存数据库成功第'+total+'条')
           total ++
        }
    })
}

var pageBooklist = []
 async function sider(){
     const num = await getPageNum()
     var page = 1
      pageBooklist = await getbookItemUrl(page)
     while(page<=num){
         var index =0
         while (index < pageBooklist.length){
             await timedelay(index *10)
             await getBookInfo(pageBooklist[index])
             index ++
         }
         page++;
         pageBooklist = await getbookItemUrl(page)
     }
 }
sider()

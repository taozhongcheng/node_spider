
const axios = require('axios')
const puppeteer = require('puppeteer')



async function index(){
  //  let browser = new putteteer
    const browser = await puppeteer.launch({
        headless: false,
        width:1200,
        height:1200,

    })
    const page = await browser.newPage()

    await page.goto('https://306t.com/dir/14804066-41657915-ade0f4')
    await page.waitFor('.container');
    const result = await page.evaluate(() => {
        // 文件夹名字
        let title = document.querySelector('#main-content > div > div > div:nth-child(2) > div > div > div.col > h4').innerText;
        let list = document.querySelectorAll('.#table_files > tbody > tr');
        list.forEach(async(item,i) =>{
            await page.click('#table_files > tbody > tr > td:nth-child(2) > a')
        })
       // return title
    });
    console.log(result)
   // const res = await axios('https://306t.com/dir/14804066-40382441-279848')
  //  console.log(res.data)
}

index()
const axios = require('axios')
const fs = require('fs')
const {timedelay} = require('../utils')

// 1.获取总页数
// 2.获取每页列表数据

async function getPageList(page){
    const httpUrl = `https://www.app-echo.com/api/recommend/sound-day?page=${page}`
    const res = await axios.get(httpUrl);
    res.data.list.forEach(async(item,i) =>{
        let title = item.sound.name;
        // 去掉转义字符
        title = title.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        // 去掉特殊字符
        title = title.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/g,'');
        const mp3Url = item.sound.source;
        timedelay(100*i)
       await downMp3(title,mp3Url);
    })
}

//写入每首歌曲
async function downMp3(title,mp3Url){
    // 创建写入流
    const mp3Path = `./mp3/${title}.mp3`;
    let ws = fs.createWriteStream(mp3Path,{flag:'w'});
    const rs = await axios.get(mp3Url,{responseType:'stream'});
    console.log(title+'-----下载完成')
    rs.data.pipe(ws)
    rs.data.on('close',function(){
        ws.close()
    })
}

async function spider(){
    for(let i=0;i<100;i++){
        timedelay(100*i)
        await  getPageList(i)
    }
}

spider()
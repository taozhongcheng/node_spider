const fs = require('fs')

// 创建读取流
const rs = fs.createReadStream('a.MP4',{flag:'r'})
 
//监听流打开
rs.on('open',function(){
    console.log('流打开')
})

// 监听流关闭,读取完成
rs.on('close',function(){
    console.log('流读取完成！')
})

// 监听流分批读取
rs.on('data',function(item){
   // console.log(item)
   console.log(item.length)
})
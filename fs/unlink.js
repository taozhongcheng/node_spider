const fs = require('fs')
// unlink 删除文件，注意删除后找不回
fs.unlink('book.txt',function(){
    console.log('删除成功！')
})
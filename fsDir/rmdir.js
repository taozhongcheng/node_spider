const fs = require('fs')

//删除文件夹,注意只能删除文件夹，不能删除文件

fs.rmdir('a',function(){
    console.log('删除成功！')
})

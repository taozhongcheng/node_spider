const axios = require('axios')

const url = "http://cocotao.cn/news/list.html?page=2&channel="+encodeURI('头条')
axios.get(url).then(res =>{
    console.log(res.data)
})

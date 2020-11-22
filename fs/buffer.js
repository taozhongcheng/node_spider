// 内存空间开辟固定大小的内存，提高性能

// 将字符串转化为buffer对象
let buf = Buffer.from('hello')
console.log(buf.toString())

// 开辟一个buffer内存缓存区,设置位数
let buf1 = Buffer.alloc(10)
// 内存二进制
buf1[0] = 256
console.log(buf)


// 性能更高，安全性差的
let buf2 = Buffer.allocUnsafe(20)
buf2[0] =111
console.log(buf2)
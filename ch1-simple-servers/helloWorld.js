// 简单的web 服务器
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  // res.writeHead(200, { 'Content-type': 'text/plain' })
  // res.end('Hello, World')
  // 规范化url: 去掉查询字符串，可选的反斜杠，并转为小写
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
  console.log(path)
  switch(path) {
    case '':
      serveStaticFile(res, '/public/home.html', 'text/html')
      break
    case '/img/logo.jpg':
      serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg')
      break
    default:
      serveStaticFile(res, '/public/404.html', 'text/html', 404)
      break
  }
}).listen(3000)

console.log('Server started on localhost:3000; press Ctrl-C to terminate...')

// 一个处理函数
function serveStaticFile(res, path, contentType, responseCode=200) {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('500 - Internal Eroor')
    } else {
      res.writeHead(responseCode, { 'Content-Type': contentType })
      res.end(data)
    }
  })
}
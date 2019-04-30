const express = require('express')

const app = express()

app.set('port', process.env.PORT || 3000)

/**
 * 1、Express 默认的状态码是200，不用显式指定
 * 2、路由和中间件的添加顺序至关重要。如果我们把404 
 *    处理器放在所有路由上面，那首页和关于页面就不能用了，
 *    访问这些URL 得到的都是404
 */
app.get('/', (req, res) => {
  res.type('text/plain')
  res.send('Hello Express!')
})

app.get('/about', (req, res) => {
  res.type('text/plain')
  res.send('About Express')
})

// 定制404 页面
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.end('404 - Not Found')
})

// 定制500页面
app.use((req, res) => {
  res.type('text/plain')
  res.status(500)
  res.end('500 - Server Error')
})

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port'))
})

// 很多教程，甚至是Express 的脚手架生成器会建议你把主文件命名为app.js
// （或者有时是index.js 或server.js）。除非你用的托管服务或部署系统对程序主
// 文件的名称有特定的要求，否则我认为这么做是没有道理的，我更倾向于按
// 照项目命名主文件。凡是曾在编辑器里见过一堆index.html 标签的人都会立
// 刻明白这样做的好处。npm init 默认是用index.js，如果要使用其他的主文
// 件名，要记得修改package.json 文件中的main 属性。
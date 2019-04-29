const express = require('express')
const exphbs = require('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()
app.set('port', process.env.PORT || 3000)

// 设置 handlebars 视图引擎，设置默认模板布局：views/layouts/main.handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 设置静态文件
app.use(express.static(__dirname + '/public'))

/**
 * 使用视图引擎，默认返回内容类型：text/html 和状态码：200
 */
app.get('/', (req, res) => {
  res.render('home')
})

// let fortunes = [
//   '征服你的恐惧，否则它们就会征服你',
//   '河流需要泉水',
//   '不要害怕你不知道的东西',
//   '你会有一个惊喜',
//   '只要可能，保持简单'
// ]
app.get('/about', (req, res) => {
  // 随机运气
  // let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  // console.log(Math.floor(Math.random() * fortunes.length))
  // console.log(randomFortune)

  res.render('about', { fortune: fortune.getFortune() })
})

// 定制404 页面
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// 定制500页面
app.use((req, res) => {
  res.status(500)
  res.render('500')
})

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port'))
})
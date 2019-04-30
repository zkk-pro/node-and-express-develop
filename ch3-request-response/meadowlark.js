const express = require('express')

const app = express()

app.set('port', process.env.PORT || 3000)
app.disable('x-powered-by') // 禁止回传服务器信息
app.get('/headers', (req, res) => {
  // console.log(req.route)
  console.log(req.ip)
  console.log(req.xhr)
  console.log(req.protocol)
  console.log(req.secure)
  console.log(req.url)
  console.log(req.originalUrl)
  console.log(req.acceptsLanguages())
  res.set('Content-Type', 'text/plain')
  let s = ''
  for (let name in req.headers) s += `${name}:${req.headers[name]}\n`
  res.send(s)
})

app.listen(app.get('port'), () => {
  console.log(`Express started on http://locaohost:${app.get('port')}`)
})
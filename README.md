# node 与 express 开发

## 章节三：请求和响应对象

#### <div align="center">url 地址解析图</div>
<div align="center">
<img src="https://raw.githubusercontent.com/mynsy/node-and-express-develop/ch3/assets/url_parse.png" width="500" />
</div>

- 协议：协议确定如何传输请求。我们主要是处理http 和https。其他常见的协议还有file 和ftp。

- 主机名：主机名标识服务器。运行在本地计算机（localhost）和本地网络的服务器可以简单地表示，比如用一个单词，或一个数字IP 地址。在Internet 环境下，主机名通常以一个顶级域名（TLD）结尾，比如`.com` 或`.net。`另外，也许还会有子域名作为主机名的前缀。子域名可以是任何形式的，其中www 最为常见。子域名通常是可选的。

- 端口：每一台服务器都有一系列端口号。一些端口号比较“特殊”，如80 和443 端口。如果省略端口值，那么默认80 端口负责HTTP 传输，443 端口负责HTTPS 传输。如果不使用80 和443 端口，就需要一个大于10231 的端口号。通常使用容易记忆的端口号，如3000、8080 或8088。

- 路径：URL 中影响应用程序的第一个组成部分通常是路径（在考虑协议、主机名和端口的基础上做决定很合理，但是不够好）。路径是应用中的页面或其他资源的唯一标识。

- 查询字符串：查询字符串是一种键值对集合，是可选的。它以问号（?）开头，键值对则以与号（&）分隔开。所有的名称和值都必须是URL 编码的。对此，JavaScript 提供了一个嵌入式的函数encodeURIComponent 来处理。例如，空格被加号（+）替换。其他特殊字符被数字型字符替换。

- 信息片段：信息片段（或散列）被严格限制在浏览器中使用，不会传递到服务器。用它控制单页应用或AJAX 富应用越来越普遍。最初，信息片段只是用来让浏览器展现文档中通过锚点标记（`<a id="chapter06">`）指定的部分。

### 请求报头
> 我们浏览网页时，发送到服务器的并不只是URL。当你访问一个网站时，浏览器会发送很多“隐形”信息，这些“隐形”信息称为请求报头

创建一个简单的路由来展示请求头信息

```js
app.get('/headers', (req, res) => {
  res.set('Content-Type', 'text/plain')
  let s = ''
  for (let name in req.headers) s += `${name}: ${req.headers[name]}\n`
  res.send(s)
})
```

### 响应报头
正如浏览器以请求的形式发送隐藏信息到服务器，当服务器响应时，同样也会返回一些浏览器没必要显示和渲染的信息，通常是元数据和服务器信息。内容类型头信息(Content-Type)，它告诉浏览器正在被传输的内容类型（网页、图片、客户端脚本等），所以浏览器只根据内容类型来决定内容该如何渲染，响应报头还经常会包含一些关于服务器的信息，一般会指出服务器的类型，返回服务器信息存在一个问题，那就是它会给黑客一个可乘之机，从而使站点陷入危险。

<img src="https://raw.githubusercontent.com/mynsy/node-and-express-develop/ch3/assets/WeChatbb30f3ad01280b220591ad3e49bf9524.png" height="200" />

禁用Express 的X-Powered-By 头信息很简单：
```js
app.disable('x-powered-by')
```
禁用之后

<img src="https://raw.githubusercontent.com/mynsy/node-and-express-develop/ch3/assets/WeChata4172d067d6f07e22be2641224bac873.png" height="200" />

### 互联网媒体类型
内容类型报头(Content-Type)信息极其重要，如果没有它，客户端(通常为浏览器)很难判断应该如何渲染接收到的数据，内容类型由一个类型、一个子类型以及可选参数(如：字符编码)组成，例如：
```js
Content-Type: text/html;charset=UTF-8
// text: 类型 
// html: 子类型
// charset=UTF-8: 表示字符编码是UTF-8
```
> 我们常见的content type、Internet media type 和MIME type 是可以互换的。MIME（多用途互联网邮件扩展）是互联网媒体类型的前身，它们大部分是相同的。

### 请求体
除请求报头外，请求还有一个主体（就像作为实际内容返回的响应主体一样）。一般GET请求没有主体内容，但POST 请求是有的。POST 请求体最常见的媒体类型是application/x-www-form-urlendcoded，是键值对集合的简单编码，用& 分隔（基本上和查询字符串的格式一样）。如果POST 请求需要支持文件上传，则媒体类型是multipart/form-data，它是一种更为复杂的格式。最后是AJAX 请求，它可以使用application/json。

## express 的请求对象
请求对象（通常传递到回调方法，通常命名为req或request）的生命周期始于 Node 的一个核心对象 http.IncomingMessage 的实例。Express 添加了一些附加功能，请求对象中最有用的属性和方法(除了 Node 的 req.headers 和 req.url，其他所有方法都是 Express 添加)：
1. `req.params` 属性: 一个数组，包含命名过的路由参数
2. `req.param(name)` 方法：返回命名的路由参数，或者GET 请求或POST 请求参数。(已被弃用)
3. `req.query` 属性：一个对象，包含以键值对存放的查询字符串参数（通常称为GET 请求参数）
4. `req.body` 属性：一个对象，包含POST 请求参数。这样命名是因为POST 请求参数在REQUEST 正文中传递，而不像查询字符串在URL 中传递。要使req.body 可用，需要中间件能够解析请求正文内容类型（推荐 `body-parser`）
5. `req.route` 属性：关于当前匹配路由的信息，主要用于调试
6. `req.cookies/req.singnedCookies` 属性：一个对象，包含从客户端传递过来的 cookies 值
7. `req.headers` 属性：从客户端接收到的请求报头
8. `req.accepts([types])` 方法：用来确定客户端是否接受一个或一组指定的类型（可选类型可以是单个MIME类型，如 application/json，也可以是逗号分隔的集合或是数组）`[types]`表示可选的参数
9. `req.ip` 属性：客户端的IP地址
10. `req.path` 属性：请求路径（不包含协议、主机、端口或查询字符串）
11. `req.host` 方法：用来返回客户端所报告的主机名，注意：这些信息可以伪造，所以不应该用于安全目的
12. `req.xhr` 属性：如果请求由 Ajax 发起的将返回 true
13. `req.protocol` 属性：用于标识请求的协议（http 或 https）
14. `req.secure` 属性：如果连接是安全的，将返回 true，等同于  req.protocol==='https'
15. `req.url/req.originalUrl` 属性：这个属性返回了路径和查询字符串（它们不包含协议、主机或端口）。req.url 若是出于内部路由目的，则可以重写，但是req.orginalUrl 旨在保留原始请求和查询字符串。
16. `req.acceptsLanguages` 方法：返回客户端首选的一组（人类的）语言。这些信息是从请求报头中解析而来的。

> 以上的请求方法和属性是最常用也是最有用的，但是这里并没有深入进去，后面会有章节对象单个属性或方法进行深入的理解。

## express 的响应对象
响应对象（通常传递到回调方法，通常命名为 res、resp 或 response）的生命周期始于 Node 核心对象 http.ServerResponse 的实例。Express 添加了一些附加功能，响应对象中最有用的属性和方法（所有的这些方法都是由 Express 添加的）：
1. `res.status(code)`：设置 HTTP 状态码，在 Express 中，默认为200(成功)。对于重定向（状态码：301、302、303、307），有一个更好的方法：redirect
2. `res.set(name, value)`：设置响应头，通常不用手动设置
3. `res.cookie(name, value, [options]), res.clearCookie(name, [options])`：设置或清除客户端 cookies 值，需要中间件支持(推荐：`cookie-parser`)
4. `res.redirect([status], url)`：重定向浏览器。默认重定向代码是302（建立）。通常，应尽量减少重定向，除非永久移动一个页面，这种情况应当使用代码301（永久移动）。
5. `res.send([status], body)`：向客户端发送响应及可选的状态码，Express 的默认内容类型是 text/html，如果要改，需要在 res.send 之前调用res.set('Content-type', 'text/plain')，如果body 是一个对象或者数组，响应将会以 JSON 发送（内容类型需要正确设置），如果发送JSON，推荐使用res.json()
6. `res.json([status], json)`：像客户端发送 JSON 以及可选的状态码
7. `res.jsonp([status], json)`：向客户端发送 JSONP 及可选的状态码
8. `res.type(type)`：用于设置Content-Type 头信息。基本上相当于res.set('Content-Type','type')，只是如果你提供了一个没有斜杠的字符串，它会试图把其当作文件的扩展名映射为一个互联网媒体类型。比如，res.type('txt') 会将Content-Type 设为text/plain。此功能在有些领域可能会有用（例如自动提供不同的多媒体文件），但是通常应该避免使用它，以便明确设置正确的互联网媒体类型。
9. `res.format(object)`：这个方法允许你根据接收请求报头发送不同的内，这里有一个非常简单的例子：res.format({'text/plain':'hithere','text/html':'<b>hi there</b>'})，后面会详细讨论该方法
10. `res.attachment([filename]), res.download(path, [filename], [callback])`：这两个方法会将响应头Content-Type 设为attcahment，这样浏览器会选择下载而不是展现内容。可以指定filename 给浏览器作为对用户的提示，用res.download 可以指定要下载的文件，而res.attachment 只是设置报头。
11. `res.sendFile(path, [option], [callback])`：这个方法可以根据路径读取文件并将内容发送到客户端，使用这个方法很方便，正常情况下，静态文件放在公共目录下，但是，如果想根据条件在相同的URL 下提供不同的资源，这个方法可以派上用场。
12. `res.link`：设置连接响应报头，这是一个专用的报头，在大多数应用程序中几乎没有用处
13. `res.locals, res.render(view, [locals], callback)`：res.locals 是一个对象，包含用于渲染视图的默认上下文。res.render 使用配置的模板引擎渲染视图（不能把res.render 的locals 参数与res.locals 混为一谈，上下文在res.locals 中会被重写，但在没有被重写的情况下仍然可用）。res.render 的默认响应代码为200，使用res.status 可以指定一个不同的代码。
> 以上是 Express 响应对象的常用、常见方法和属性，在后面的章节中，会更深入的探讨这些方法和属性。


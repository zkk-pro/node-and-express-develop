/**
 * 模块化
 * 把随机运气抽取出来，放在单独的模块中
 */

let fortunes = [
  '征服你的恐惧，否则它们就会征服你',
  '河流需要泉水',
  '不要害怕你不知道的东西',
  '你会有一个惊喜',
  '只要可能，保持简单'
]

exports.getFortune = () => {
  let idx = Math.floor(Math.random() * fortunes.length)
  return fortunes[idx]
}
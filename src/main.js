const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  {logo: 'J', url: 'https://juejin.im/'},
  {logo: 'Z', url: 'https://www.zhihu.com/'},
  {logo: 'W',url:'https://www.w3.org/'}
]
const simplifyUrl = (url)=>{
  return url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'')
}
// 添加网址
$('.last').on('click',()=>{
  let url = window.prompt('请输入您添加的网址')
  if(url.indexOf('http') !== 0){
    url = 'https://'+url
  }
  console.log(url)
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  })
  render()
})
// render函数
const render = ()=>{
  $('.siteList').find('li:not(.last)').remove()
  hashMap.forEach((item,index)=>{
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${item.logo}</div>
        <div class="link">${simplifyUrl(item.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($('.last'))
    $li.on('click', () => {
      window.open(item.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() // 阻止冒泡
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
  const {key} = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})
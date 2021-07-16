var oHTML = document.querySelector('html')
var aHeight = oHTML.clientHeight

//設計稿: 375px
//默認字大小 16px
oHTML.style.fontSize = (aHeight / 1080) * 16 + 'px';


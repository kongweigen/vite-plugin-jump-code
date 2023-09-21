let injectFn = `
(function(){
  document.addEventListener('click', (e) => {
    // 在不同操作系统上对应不同的键，如 Command 键或 Windows 键
    // shift 或者 ctrl 按键
    if (e.metaKey || e.shiftKey || e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
      let loc = getFilePath(e.target)
      // 调用中间件的服务，传入path
      loc && fetch('/jumpcode?path=' + loc)
    }
  })

  function getFilePath(el){
    if(!el) return
    let { loc } = el.dataset || {}
    // UI 组件没有插入path，寻找父节点
    if(!loc){
      return getFilePath(el.parentElement)
    }else{
      return loc
    }
  }
})()
`
export default injectFn
let injectFn = `
(function(){
  document.addEventListener('click', (e) => {
    if (e.metaKey || e.shiftKey || e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
      let loc = getFilePath(e.target)
      loc && fetch('/test?path=' + loc)
    }
  })

  function getFilePath(el){
    if(!el) return
    let { loc } = el.dataset || {}
    if(!loc){
      return getFilePath(el.parentElement)
    }else{
      return loc
    }
  }
})()
`

export default injectFn
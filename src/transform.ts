import path from 'path'
import { normalizePath } from 'vite'

function generate(code: string, filePath: string) {
  // 根据回车拆分代码文件
  let codeArr = code.split('\n')
  let cwd = normalizePath(process.cwd())
  codeArr.forEach((codeRow, rowIndedx) => {
    // 获取相对路径
    filePath = filePath.replace(cwd, '')
    let tagName = getTagName(codeRow)
    if (tagName) {
      codeArr[rowIndedx] = codeRow.replaceAll(
        `<${tagName}`,
        `<${tagName} data-loc="${filePath}:${rowIndedx + 1}"`
      )
    }
  })
  code = codeArr.join('\n')
  return code
}
function getTagName(codeRow: string) {
  codeRow = codeRow.trim()
  // 判断是否 < 开头
  if (!/^<[a-zA-z]/.test(codeRow)) return ''
  // /\b/ 分词 '<div class="card">'.replace(/\b/g, "#") 
  // '<#div# #class#="#card#">'
  return codeRow.replace(/\b/g, '#').split('#')[1]
}
function transform(code: string, filePath: string) {
  let ext = path.extname(filePath)
  switch (ext) {
    case '.vue':
      return generate(code, filePath)
    default:
      return code
  }
}

export default transform

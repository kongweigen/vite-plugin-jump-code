import path from 'path'

function generate(code: string, filePath: string) {
  // 根据回车拆分代码文件
  let codeArr = code.split('\n')
  let cwd = process.cwd()
  // win 的路径需要转换
  if (process.platform === 'win32') {
    cwd = cwd.replace(/\\/g, '/')
  }
  codeArr.forEach((codeRow, rowIndedx) => {
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
function getTagName(codeRow) {
  codeRow = codeRow.trim()
  if (!/^<[a-zA-z]/.test(codeRow)) return ''
  let spaceIndex = codeRow.indexOf(' ')
  let endIndex = codeRow.indexOf('>')
  if (endIndex == -1) return ''
  let tagName =
    codeRow.substring(
      1,
      spaceIndex > endIndex || spaceIndex == -1 ? endIndex : spaceIndex
    ) || ''
  return tagName
}
function transform(code, filePath) {
  let ext = path.extname(filePath)
  switch (ext) {
    case '.vue':
      return generate(code, filePath)
    default:
      return code
  }
}

export default transform

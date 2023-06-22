import openEditor from './open-editor'
import url from 'url'

function middleware(req, res, next) {
  let cwd = process.cwd()
  // win 的路径需要转换
  if (process.platform === 'win32') {
    cwd = cwd.replace(/\\/g, '/')
  }
  const queryParams = url.parse(req.url!, true)
  let path = queryParams.query.path as string
  let pathList = path.split(':')
  let rowIndex = pathList[pathList.length - 1]
  // path: E:/xxx/vite-vue3/src/components/HelloWorld.vue
  path = cwd + pathList[0]

  try {
    openEditor(path, Number(rowIndex))
    // 定义状态码返回
    res.statusCode = 200
    res.end('ok')
  } catch (error) {
    console.log('打开失败', error)
    res.statusCode = 500
    res.end('ok')
  }
}

export default middleware

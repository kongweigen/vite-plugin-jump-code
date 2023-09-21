import openEditor from './open-editor'
import url from 'url'
import { normalizePath } from 'vite'
import { IncomingMessage, ServerResponse } from 'node:http'

function middleware(req: IncomingMessage, res: ServerResponse) {
  let cwd = normalizePath(process.cwd())
  const queryParams = url.parse(req.url!, true)
  let path = queryParams.query.path as string
  let pathList = path.split(':')
  // 行号
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

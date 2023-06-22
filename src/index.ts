import type { Plugin } from 'vite'
import middleware from './middleware'
import transform from './transform'
import inject from './inject'

export default function vitePluginTemplate(): Plugin {
  return {
    name: 'my-vite-plugin',
    enforce: 'pre', // pre | post, pre 比 post 先执行
    apply: 'serve', // 指明它们仅在 'build' 或 'serve' 模式时调用
    configureServer(server) {
      server.middlewares.use('/jumpcode', middleware)
    },

    /**
     * 对 index.html 进行转换
     *   1.直接转换
     *   2. 或者通过函数进行注入
     * HtmlTagDescriptor { tag: xxx, children: xxx, injectTo: xxx}
     */
    transformIndexHtml: {
      enforce: 'pre',
      transform() {
        return [
          {
            injectTo: 'head', // 指定插入位置 'head' | 'body' | 'head-prepend' | 'body-prepend'
            tag: 'script', // string 插入的节点名称
            children: inject // string | HtmlTagDescriptor[]  插入的内容
          }
        ]
      }
    },
    transform(code, path) {
      return transform(code, path)
    }
  }
}

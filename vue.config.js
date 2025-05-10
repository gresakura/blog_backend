const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({

  transpileDependencies: true,
  lintOnSave: false, // 关闭 eslint 检查

  publicPath: '/',      // 相对路径模式
  outputDir: 'dist',     // 打包输出目录
  assetsDir: 'static',   // 静态资源存放路径（相对于 outputDir）
  filenameHashing: true, // 启用文件名哈希防止缓存问题

  // 开发服务器配置
  devServer: {
    host: 'localhost',
    port: 8081,
    open: true, // 自动打开浏览器
    hot: true, // 启用热更新
    client: {
      overlay: true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
      progress: true // 在浏览器中以百分比显示编译进度
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3002', // 后端API服务器的地址
        changeOrigin: true, // 是否改变源（通常设置为true以处理跨域）
        pathRewrite: {
          '^/api': '/' // 重写路径，将/api替换为空字符串
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})

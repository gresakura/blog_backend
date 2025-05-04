const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭 eslint 检查
  
  // 开发服务器配置
  devServer: {
    host: 'localhost',
    port: 8081,
    open: true, // 自动打开浏览器
    hot: true, // 启用热更新
    client: {
      overlay: true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
      progress: true // 在浏览器中以百分比显示编译进度
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

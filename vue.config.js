const path = require('path');
const lessPath = path.join(__dirname + '/src/styles/vant.less');

module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。

                modifyVars: {
                    // 直接覆盖变量
                    // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                    hack: `true; @import "${lessPath}";`,
                },
            },
        },
    },
    devServer: {
        proxy: {
            '/api': { // 匹配所有以'/api' 开头的请求路径
                target: 'http://jasmine.since88.cn', // 代理目标的基础路径
                changeOrigin: true,
            },
        }
    }
}
// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/music' : '/',
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack: config => {
        // config.resolve.alias
    }

}
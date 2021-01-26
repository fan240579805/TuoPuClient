module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                // 配置快捷路径  @ ：src
                'assets':'@/assets',
                'network':'@/network',
                'views':'@/views',
                'components':'@/components',
                'common':'@/common',
                'service':'@/service',
                'store':'@/store'
            }
        }
    }
};

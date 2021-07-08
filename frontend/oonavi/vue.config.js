module.exports = {
    lintOnSave: false,
    devServer: {
        disableHostCheck: true,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: true
        },
        overlay: {
            warning: false,
            errors: false
        }
    },
    pluginOptions: {
        sitemap: {
            urls: [
                'http://www.suki-vietnam.com',
                'http://www.suki-vietnam.com/about',
                'http://www.suki-vietnam.com/copyright',
                'http://www.suki-vietnam.com/inquiry',
            ]
        }
    }
}
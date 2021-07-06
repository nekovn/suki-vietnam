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
}
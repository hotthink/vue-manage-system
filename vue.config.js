module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
	runtimeCompiler:true,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}
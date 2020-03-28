module.exports = {
  runtimeCompiler: true,

  css: {
    sourceMap: true
  },

  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },

  publicPath: '/vadmin',//建议独立域名部署，删除此行代码。我这里只是为了github pages子目录预览
}
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
  }
}
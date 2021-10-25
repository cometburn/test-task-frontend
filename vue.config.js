module.exports = {
  publicPath: "/",
  devServer: {
    host: "localhost",
    port: 8080,
  },
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Todo Task";
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/styles/global.scss";',
      },
    },
  },
};

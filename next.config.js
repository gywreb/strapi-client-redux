const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./styles/antd-custom.less",
  cssLoaderOptions: {
    esModule: false,
    sourceMap: false,
    modules: {
      mode: "local",
    },
  },
  webpack(config) {
    return config;
  },
});

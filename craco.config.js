const CracoAlias = require("craco-alias");

module.exports = {
  devServer: {
    port: 3003,
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
};

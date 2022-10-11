module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-reanimated/plugin",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "transform-inline-environment-variables",
      // [
      //   "module:react-native-dotenv",
      //   {
      //     envName: "APP_ENV",
      //     moduleName: "@env",
      //     path: ".env",
      //   },
      // ],
    ],
  };
};

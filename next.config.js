/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
// const webpack = require('webpack');
// const dotenv = require('dotenv');
// const { parsed } = dotenv.config();

// module.exports = {
//   webpack: (config) => {
//     config.plugins.push(new webpack.EnvironmentPlugin(parsed));
//     return config;
//   },
// };
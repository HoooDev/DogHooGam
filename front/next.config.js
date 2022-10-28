/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  distDir: "build",
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
            @import "_variables.scss";
            @import "_utils.scss";
          `
  }
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  trailingSlash: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;

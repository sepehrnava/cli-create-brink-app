/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    // localeDetection: true,
  },
  trailingSlash: false,
  images: {
    domains: [
      new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337")
        .hostname,
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;

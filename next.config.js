/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
};

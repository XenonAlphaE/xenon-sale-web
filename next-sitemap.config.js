// next-sitemap.config.js
require('dotenv').config();

module.exports = {
    siteUrl: process.env.MAIN_DOMAIN || "https://frenzwith.com", // Replace with your domain
    generateRobotsTxt: true, // Generates robots.txt file along with sitemap
    changefreq: 'daily',
    priority: 0.9,
    sitemapSize: 7000,
};
  
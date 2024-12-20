// next-sitemap.config.js
require('dotenv').config();

module.exports = {
    siteUrl: 'https://flockez.com', // Replace with your domain
    generateRobotsTxt: true, // Generates robots.txt file along with sitemap
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 7000,
};
  
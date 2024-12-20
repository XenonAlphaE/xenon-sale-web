// next-sitemap.config.js
require('dotenv').config();

module.exports = {
    siteUrl: 'https://wepetoken.com', // Replace with your domain
    generateRobotsTxt: true, // Generates robots.txt file along with sitemap
    changefreq: 'daily',
    priority: 0.9,
    sitemapSize: 7000,
};
  
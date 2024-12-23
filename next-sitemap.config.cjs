/* eslint-disable no-undef */
const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/pages-sitemap.xml', '/*', '/next/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
      {
        userAgent: '*',
        disallow: '/next/*',
      },
    ],
    additionalSitemaps: [`${siteUrl}/pages-sitemap.xml`],
  },
};

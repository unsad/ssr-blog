/**
 * Created by unsad on 2017/10/8.
 */
module.exports = config =>
  `User-agent: *
  
  Allow: /
  Sitemap: ${siteUrl}/sitemap.xml
  
  User-agent: YisouSpider
  Disallow: /
  User-agent: EasouSpider
  Disallow: /
  User-agent: EtaoSpider
  Disallow: /
  User-agent: MJ12bot
  Disallow: /`

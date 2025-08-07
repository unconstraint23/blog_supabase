
/** @type {import('next-sitemap').IConfig}   * */
/**
 * 执行指令 npx next-sitemap 自动生成 sitemap.xml robots.txt
 */
module.exports = {
  siteUrl: 'https://blog-supabase.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
}

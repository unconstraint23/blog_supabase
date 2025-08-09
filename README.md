### 已完成功能：

*  文章列表页（不含含分页）
*  文章详情页（丐版）
*  文章创建页面（丐版）
*  基础 SEO 优化（丐版）
*  实现 ISR 增量静态再生（丐版）


*  文章编辑/删除功能（丐版）
*  标签分类系统（丐版）
*  评论功能集成（丐版）
*  部署到 Vercel

注册的邮箱确认环节已关闭，已有的注册账号： user@163.com admin@163.com  zhangsan@163.com lisi@163.com  密码均为123456

### 注意事项

如果需要运行这套代码，需要在数据库执行以下语句：

DROP VIEW IF EXISTS articles_with_tag_names;
create view articles_with_tag_names as
select 
  a.article_id,
  a.title,
  a.description,
  a.content,
  a.created_at,
  a.update_at,
  a.author_id,
  (
    select array_agg(t.tag_name order by t.tag_name)
    from unnest(a.tags) as u(tag_id)
    join tags t on t.tag_id = u.tag_id::bigint
  ) as tags
from articles a;

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
-- 使用 SQL 语句更新
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = '你要关闭检验的邮箱';

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


import { CommentsSection } from "@/custom-components/CommentsSection";
import { EnhancedContent } from "@/custom-components/EnhancedContent";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/client";
import { generateBaseMetadata } from "@/utils/seo-metadata";
import { formatDate } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id, "generateMetadata id")

  const article = await getArticleDetail(id)

  return generateBaseMetadata({
    title: `${article?.title} - 我的博客`,
    description: article?.description || '精彩博客内容',
    url: `https://yourdomain.com/blog/${id}`,
    tag: article?.tags?.join(','),
    alternates: {
      canonical: `https://blog-supabase.vercel.app/articleDetail/${id}`, // 显式指定 canonical 地址
    },
  })
}

export async function generateStaticParams() {
  const supabase = supabaseAdmin
  try {
    const {data, error} = await supabase
  .from('articles_with_tag_names')
  .select('article_id')
    if(error) {
      console.log("Error fetching articles:", error)
      throw error
    }
    console.log(data, "data")

  return data.map((post) => ({
    id: post.article_id.toString(),
  }));
  } catch (error) {
    
  }
  
}

export const revalidate = 60

async function getArticleDetail(id: string) {
  if(!id) {
    return null
  }

    const supabase = await createClient()
    try {
      const {data: post, error} = await supabase
    .from('articles_with_tag_names')
  .select(`
    article_id, 
    title, 
    description,
    created_at, 
    update_at, 
    content,
    tags, 
    author_id,
    author:user_profiles (
      user_id, 
      email
    )
  `)
    .eq("article_id", Number.isNaN(Number(id)) ? 0 : Number(id))

    .maybeSingle()  
    if (error) {
      console.log("Error fetching article:", error)
      throw error
    }
    return post
    } catch (error) {
        console.log("Error fetching article:", error)
    }
    
}

export default async function page({ params }: { params: { id: string } }) {
    const { id } = await params

    const post: any = await getArticleDetail(id)
    console.log(post, "article detail")

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">

        <ArrowLeft className="mr-2 h-4 w-4" />
        返回首页
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
          <div className="text-muted-foreground">
           发布时间： {formatDate(post?.created_at)} · {post?.author?.email.split("@")[0]}

           
          </div>
        </header>

        <EnhancedContent content={post?.content ?? ""} />
 <p>
           内容分类： {post?.tags.map((tag: string) => (
            <span key={tag} className="bg-primary/20 rounded-md px-2 py-1 mx-2 text-primary">
              {tag}
            </span>
           ))}
          </p>
        <CommentsSection postId={post?.article_id} />



      </article>
    </div>
  )
}

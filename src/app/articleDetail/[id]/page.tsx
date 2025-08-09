import { CommentsSection } from "@/custom-components/CommentsSection";
import { EnhancedContent } from "@/custom-components/EnhancedContent";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/client";
import { generateBaseMetadata } from "@/utils/seo-metadata";
import { formatDate } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from 'next'


export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
  console.log(id, "generateMetadata id")

  const article = await getArticleDetail(id)

  return generateBaseMetadata({
    title: `${article?.title}`,
    description: `${article?.description}`,
    url: `https://blog-supabase.vercel.app/articleDetail/${id}`,
    tag: article?.tags?.join(','),
    alternates: {
      canonical: `https://blog-supabase.vercel.app/articleDetail/${id}`, // 显式指定 canonical 地址
    },
  })
}

export async function generateStaticParams() {
  const supabase = await createClient()
  try {
    const {data, error} = await supabase
      .from('articles_with_tag_names')
      .select('article_id')
    
    if(error) {
      console.log("Error fetching articles:", error)
      return [] // 返回空数组而不是抛出错误
    }
    
    console.log(data, "data")
    
    // 添加空值检查
    return data?.map((post) => ({
      id: post.article_id.toString(),
    })) || [];
    
  } catch (error) {
    console.log("Error in generateStaticParams:", error)
    return [] // 返回空数组
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
      return null // 返回 null 而不是抛出错误
    }
    return post
  } catch (error) {
    console.log("Error fetching article:", error)
    return null // 返回 null
  }
}

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post: any = await getArticleDetail(id)
  console.log(post, "article detail")

  // 添加文章不存在的处理
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回首页
        </Link>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold">文章未找到</h1>
          <p className="text-muted-foreground mt-4">抱歉，您访问的文章不存在。</p>
        </div>
      </div>
    )
  }

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
            发布时间： {formatDate(post?.created_at)} · {post?.author?.email?.split("@")?.[0]}
          </div>
        </header>

        <EnhancedContent content={post?.content ?? ""} />
        
        <p>
          内容分类： {post?.tags?.length > 0 ? (
            post.tags.map((tag: string) => (
              <span key={tag} className="bg-primary/20 rounded-md px-2 py-1 mx-2 text-primary">
                {tag}
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">暂无标签</span>
          )}
        </p>
        
        <CommentsSection postId={post?.article_id} />
      </article>
    </div>
  )
}
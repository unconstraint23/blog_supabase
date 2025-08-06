import { CommentsSection } from "@/custom-components/CommentsSection";
import { EnhancedContent } from "@/custom-components/EnhancedContent";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";



async function getArtcieDetail(id: string) {
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
    .eq("article_id::bigint", id)
    .single()  
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
    
    const post: any = await getArtcieDetail(params.id)
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">

        <ArrowLeft className="mr-2 h-4 w-4" />
        返回首页
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="text-muted-foreground">
           发布时间： {formatDate(post.created_at)} · {post.author.email.split("@")[0]}
           
          </div>
        </header>

        <EnhancedContent content={post.content} />

        <CommentsSection postId={post.article_id} />

      </article>
    </div>
  )
}

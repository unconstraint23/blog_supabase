import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArticleList } from "@/custom-components/ArticleList";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { generateBaseMetadata } from "@/utils/seo-metadata";
import Link from "next/link"
import { getCategories } from "./categories/page";

export const revalidate = 60

export async function generateMetadata() {
  try {
    const tagList = await getCategories()
    return generateBaseMetadata({
      title: '博客文章列表 - 我的博客',
      description: '查看所有发布的博客文章，涵盖技术、生活、学习等内容。',
      url: 'https://blog-supabase.vercel.app',
      tag: tagList.map((tag) => tag.tag_name).join(',')
    })
  } catch (error) {
    
  }
  
}

 export async function getArtciles() {
  const supabase = supabaseAdmin
  try {
    const { data, error } = await supabase
  .from('articles_with_tag_names')
  .select(`
    article_id, 
    title, 
    description,
    created_at, 
    update_at, 
    tags, 
    author_id,
    author:user_profiles (
      user_id, 
      email
    )
  `)
  .order('created_at', { ascending: false });
    if (error) {
      console.log("Error fetching articles:", error)
      throw error
    }
    return data
  } catch (error) {

  }

}

export default async function Home() {

    const articles = await getArtciles()
   
  


  return (
    <div className="h-full">
      <Card className="container mx-auto px-4 mt-4 mb-4">
        <CardHeader>
          <CardTitle>
            我的博客
          </CardTitle>
          <CardDescription>
            <h4>
              分享关于 Web 开发、设计和技术的见解和教程
            </h4>

          </CardDescription>
          <CardAction>
           <Link href="/edit">
           <Button className="w-20 bg-primary text-white hover:bg-primary/20">
              创建新文章
           </Button>
            
            
          </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle>
            文章列表
          </CardTitle>
          <CardContent>
            <ArticleList articles={articles as any} />
          </CardContent>
        </CardContent>
        <CardFooter>
          <p className="font-mono font-semibold">Card Footer</p>
        </CardFooter>
      </Card>
    </div>

  );
}

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
import { useAppToast } from "@/hooks/useAppToast";
import { createClient } from "@/lib/supabase/server";
import { useLoadingStore } from "@/utils/useLoadingStore";

async function getArtciles() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
  .from('articles')
  .select(`
    article_id, 
    title, 
    description,
    content, 
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
    console.log("articles", articles)
    // hide()


  return (
    <div className="h-svh">
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
            <Button className="w-20 bg-primary text-white hover:bg-primary/20">
              写博客
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle>
            文章列表
          </CardTitle>
          <CardContent>
            <ArticleList articles={[]} />
          </CardContent>
        </CardContent>
        <CardFooter>
          <p className="font-mono font-semibold">Card Footer</p>
        </CardFooter>
      </Card>
    </div>

  );
}

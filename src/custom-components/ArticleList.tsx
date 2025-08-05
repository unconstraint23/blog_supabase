
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

import { Post } from "@/types"
import { formatDate } from "@/utils/utils"
import { useRouter } from "next/navigation"
import Search from "./Search"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function ArticleList({articles}: {articles: Post[]}) {
    const router = useRouter()
    const [list, setList] = useState<Post[]>()
    const searchArticle = async (value: string) => {
       const supabase = await createClient()
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
        `).filter("title", "like", `%${value}%`).order('created_at', { ascending: false })
        
          if (error) {
            console.log("Error fetching articles:", error)
            throw error
          }
          setList(data as any) 
        } catch (error) {
      
        }
   }
   useEffect(() => {
    setList(articles)
   }, [articles])
  return (
    <Accordion
      type="multiple"
     
      className="w-full"
      defaultValue={articles?.map(item => item.article_id)}
    >
    
      <Search className="w-2/6 m-5" onSearch={searchArticle} />
      { list?.map(item => (
        <AccordionItem value={item.article_id} key={item.article_id}>
        <AccordionTrigger className="font-bold text-lg">{item.title}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            {item.description}
          </p>
          <p>
           内容分类： {item?.tags?.map(tag => (
            <span key={tag} className="bg-primary/20 rounded-md px-2 py-1 mx-2 text-primary">
              {tag}
            </span>
           ))}
          </p>
          <p>
            作者：{item?.author?.email.split("@")[0]}
          </p>
          <p>
            发布时间：{formatDate(item?.created_at)}
          </p>
          <div className="flex justify-end">
            <Button 
            className="w-20 bg-primary text-white hover:bg-primary/20 mx-2" 
            onClick={() => {
              router.push(`/articleDetail/${item.article_id}`)
            }}
            >
              详情
            </Button>
            <Button 
            className="w-20 bg-primary text-white hover:bg-primary/20"
            onClick={() => {
              router.push(`/edit/${item.article_id}`)
            }}
            >
              编辑
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
      ))
        }
    </Accordion>
  )
}


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

export function ArticleList({articles}: {articles: Post[]}) {
    const router = useRouter()
  return (
    <Accordion
      type="multiple"
     
      className="w-full"
      defaultValue={articles.map(item => item.article_id)}
    >
      { articles.map(item => (
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
            <Button className="w-20 bg-primary text-white hover:bg-primary/20">
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

"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { use, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import RichEditor from './RichEditor'
import { Category } from '@/types'
import { useAppToast } from '@/hooks/useAppToast'
import { useLoadingStore } from '@/utils/useLoadingStore'
import { createClient } from '@/lib/supabase/client'
import { useCommonContext } from '@/custom-components/CommonProvider'
interface IArticleEditProps {
  articleId?: string | undefined;
  tagList?: Category[];
  articleInfo?: {
    title: string;
    description: string;
    content: string;
    tags?: string[];
  }
}
type ArticleInfo = IArticleEditProps['articleInfo'];
export default function ArticleEdit(props: IArticleEditProps) {
  const { articleId, articleInfo, tagList } = props;
  const toast = useAppToast()
  const { show, hide } = useLoadingStore()
  const { userInfo } = useCommonContext()
  const supabase = createClient()
  const richRef = useRef<any>(null)

  const formSchema = z.object({
    title: z.string().min(1, "标题不能为空").max(50),
    description: z.string().min(1, "描述不能为空").max(200),
    content: z.string().min(1, "内容不能为空"),
    tags: z.array(z.string()),
  })
  const [formData, setFormData] = useState<ArticleInfo>({
    title: articleInfo?.title || '',
    description: articleInfo?.description || '',
    content: articleInfo?.content || '',
    tags: articleInfo?.tags || [],
  });
  // useEffect(() => {
  //   if(articleInfo) {

  //     console.log(articleInfo, "articleInfo")
  //      let obj: any = {}
  //       obj.content = articleInfo?.content
  //       obj.description = articleInfo?.description
  //       obj.title = articleInfo?.title
  //       obj.tags = articleInfo?.tags
  //       if(richRef.current && articleInfo.content !== "") {
  //         debugger
  //         richRef.current.setContent(articleInfo?.content)
  //       }
  //    useData.setValue("content", articleInfo?.content)
  //    useData.setValue("description", articleInfo?.description)
  //    useData.setValue("title", articleInfo?.title)
  //    useData.setValue("tags", articleInfo?.tags)
  //     setFormData(obj)

  //   }
  // },[])
  const useData = useForm({
    defaultValues: formData,
    resolver: zodResolver(formSchema),
  });
  const add = async (data: any) => {
    try {
      show()

      // 新建文章逻辑
      const { error } = await supabase
        .from('articles')
        .insert({ ...data, author_id: userInfo?.id })
      hide()
      if (error) {
        toast.error("文章发布失败，请稍后重试")
        throw error
      }
      toast.success("文章发布成功")
      useData.reset()
      richRef.current?.clear()
    } catch (error) {
      hide()
      toast.error("操作失败，请稍后重试")
    }
  }
  const update = async (data: any) => {
    try {
      show()
      const { data: article } = await supabase
        .from('articles')
        .select('author_id')
        .eq('article_id', articleId)
        .single();

      if (article?.author_id !== userInfo?.id) {
        hide()
        toast.error("无权限修改该文章");
        return
      }
      // 编辑文章逻辑
      const { error } = await supabase
        .from('articles')
        .update({ ...data, author_id: userInfo?.id })
        .eq('article_id', articleId)
        .eq('author_id', userInfo?.id);
      hide()
      if (error) {
        toast.error("文章更新失败，请稍后重试")
        throw error
      }
      toast.success("文章更新成功")

    } catch (error) {
      hide()
      toast.error("操作失败，请稍后重试")
    }

  }
  const handleSubmit = async (data: ArticleInfo) => {
    console.log(data, "提交的数据");
    setFormData(data);

    if (articleId) {
      update(data)
    } else {
      add(data)
    }

  }

  return (
    <div className="h-full">
      <Card className="container mx-auto px-4 mt-4 mb-4">
        <CardHeader>
          <CardTitle className='font-bold text-2xl'>
            {articleId ? "编辑文章" : "新建文章"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...useData}>
            <form className='space-y-4' onSubmit={useData.handleSubmit(handleSubmit)}>
              <FormField
                control={useData.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标题</FormLabel>
                    <FormControl>
                      <Input placeholder='请输入' {...field} />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />

              <FormField
                control={useData.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>描述</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='请输入文章描述'
                        {...field}
                        rows={3}
                        className="h-24"
                      />

                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />



              <FormField
                control={useData.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>内容</FormLabel>
                    <FormControl>
                      <RichEditor content={field.value} onChange={(content) => field.onChange(content)} ref={richRef} />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />
              <FormField
                control={useData.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标签（选填）</FormLabel>
                    <div className="flex flex-wrap gap-4">
                      {tagList?.map((tag) => {
                        const checked = field.value?.includes(tag.tag_id)

                        return (
                          <div key={tag.tag_id} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                className="h-4 w-4"
                                checked={checked}
                                onCheckedChange={(isChecked) => {

                                  let newValue = field.value || []
                                  if (isChecked === true) {
                                    newValue = [...newValue, tag.tag_id]
                                  } else {
                                    newValue = newValue.filter((val) => val !== tag.tag_id)
                                  }

                                  field.onChange(newValue)
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{tag.tag_name}</FormLabel>
                          </div>
                        )
                      })}
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />


              <div className='w-full flex justify-center mt-4'>
                <Button type='submit' className='w-2/12 mx-auto bg-dark text-white hover:bg-primary/40'>
                  {articleId ? "保存修改" : "发布"}
                </Button>
              </div>

            </form>

          </Form>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>
    </div>
  )
}

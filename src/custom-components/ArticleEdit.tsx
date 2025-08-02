"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import RichEditor from './RichEditor'
interface IArticleEditProps {
  articleId?: string;
  articleInfo?: {
    title: string;
    description: string;
    content: string;
    tags?: string[];
  }
}
type ArticleInfo = IArticleEditProps['articleInfo'];
export default function ArticleEdit(props: IArticleEditProps) {
  const { articleId, articleInfo } = props;



  const formSchema = z.object({
    title: z.string().min(1, "标题不能为空").max(50),
    description: z.string().min(1, "描述不能为空").max(200),
    content: z.string().min(1, "内容不能为空"),
    tags: z.array(z.string()).max(3, "最多只能选择3个标签").optional(),
  })
  const [formData, setFormData] = useState<ArticleInfo>({
    title: '',
    description: '',
    content: '',
    tags: [],
  });
  const useData = useForm({
    defaultValues: formData,
    resolver: zodResolver(formSchema),
  });
  const handleSubmit = (data: ArticleInfo) => {
    console.log(data)
    setFormData(data);
  }
  return (
    <div className="h-svh">
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
                      <RichEditor content={field.value} onChange={(content) => field.onChange(content)} />
                    </FormControl>
                     <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />
              <FormField
                control={useData.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>标签（选填）</FormLabel>
                    <div className="flex flex-wrap gap-4">
                      {(['前端', '后端', '数据库', '网络', '安全', '架构', '项目管理', '其他']).map((tag) => (
                        <FormField
                          key={tag}
                          control={useData.control}
                          name="tags"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                  className='h-4 w-4'
                                    checked={field.value?.includes(tag)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...(field?.value || []), tag])
                                      } else {
                                        field.onChange((field?.value || []).filter((val) => val !== tag))
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{tag}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />
              <div className='w-full flex justify-center mt-4'>
                <Button type='submit' className='w-2/12 mx-auto bg-dark text-white hover:bg-primary/40'>
                {articleId ? "保存" : "发布"}
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

import ArticleEdit from '@/custom-components/ArticleEdit'
import React from 'react'
import { getCategories } from '../../categories/page'
import { createClient } from '@/lib/supabase/server';
interface ArticlePageProps {
  params: {
    id?: string[]; // 可选，因为可能没有参数
  };
}

const getArticle = async (articleId: string | undefined) => {
  if(!articleId) {
    return null
  }
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('articles')
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
      .eq('article_id', articleId)
      .single()
    if (error) {
      console.log("Error fetching article:", error)
      throw error
    }
    return data
  } catch (error) {

  }
}

export default async function page({ params }: ArticlePageProps) {
  const categories = await getCategories()
  const { id } = await params
  const articleId = id?.[0]
  const articleInfo = await getArticle(articleId)
  return (
    <>
      <ArticleEdit tagList={categories} articleId={articleId} articleInfo={articleInfo as any} />
    </>
  )
}

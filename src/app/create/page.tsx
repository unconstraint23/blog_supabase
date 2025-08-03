import ArticleEdit from '@/custom-components/ArticleEdit'
import React from 'react'
import { getCategories } from '../categories/page'


export default async function page() {
  const categories = await getCategories()
  return (
    <>
      <ArticleEdit tagList={categories} />
    </>
  )
}

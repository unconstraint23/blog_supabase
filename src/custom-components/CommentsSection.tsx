"use client"

import { useState, useEffect } from "react"

import type { Comment } from "@/types"
import { Separator } from "@/components/ui/separator"
import { CommentForm } from "./comment-form"
import { CommentItem } from "./comment-item"
import { createClient } from "@/lib/supabase/client"
import { useAppToast } from "@/hooks/useAppToast"
import { useLoadingStore } from "@/utils/useLoadingStore"
import { useCommonContext } from "./CommonProvider"

interface CommentsSectionProps {
  postId: string
}

export function CommentsSection({ postId  }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // const supabase = useCallback(async () => await createClient(), [])
  const { userInfo } = useCommonContext()
  const toast = useAppToast()
  const { show, hide } = useLoadingStore()
  
  const getComments = async () => {
    try {
      const supabase = await createClient()
      show()

    const { data, error } = await supabase
      .from('comment')
      .select('*')
      .eq('article_id', postId)
      .order('created_at', { ascending: false })
    if (error) {
      console.log('Error fetching comments:', error)
      throw error
    }
    console.log(data, "comment data")
    setComments(data as Comment[])
    } catch (error) {
      toast.error('获取评论失败')
      console.log('Error fetching comments:', error)
      throw error
    } finally {
      hide()
      setIsLoading(false)
    }

  }
  useEffect(() => {
    getComments()
  }, [postId])
 

  const handleCommentAdded = async (newComment: Comment) => {
    try {
      const supabase = await createClient()

      show()

      const { data, error } = await supabase
      .from('comment')
      .insert([newComment])
    if (error) {
      console.log('Error adding comment:', error)
      throw error
    }
    toast.success('评论成功')
    getComments()
    } catch (error) {
      toast.error('评论失败')
      console.log('Error adding comment:', error)
      throw error
    } finally {
      hide()

    }
    
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">评论</h2>

      <CommentForm postId={postId} userName={userInfo?.email.split("@")[0]} onCommentAdded={handleCommentAdded} />


      <Separator className="my-6" />

      {isLoading ? (
        <div className="text-center py-8">
          <p>加载评论中...</p>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-1">
          {comments.map((comment) => (
            <div key={comment.comment_id}>
              <CommentItem comment={comment} />
              <Separator />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">暂无评论，成为第一个评论的人吧！</p>
        </div>
      )}
    </div>
  )
}

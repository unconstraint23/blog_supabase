"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


import type { Comment } from "@/types"
import { useCommonContext } from "./CommonProvider"

interface CommentFormProps {
  postId: string
  userName: string
  onCommentAdded: (comment: Comment) => void
}

export function CommentForm({ postId, userName, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { userInfo } = useCommonContext()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) {
      return
    }
 
    setIsSubmitting(true)

    const comment: Comment = {
      article_id: postId,
      user_id: userInfo?.id as any,
      user_name: userName,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    onCommentAdded(comment)
    setContent("")
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={"写下您的评论..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isSubmitting}
        className="min-h-[100px]"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "发布中..." : "发布评论"}
        </Button>
      </div>
    </form>
  )
}

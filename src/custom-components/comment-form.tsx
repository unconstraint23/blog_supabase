"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


import type { Comment } from "@/types"

interface CommentFormProps {
  postId: string
  onCommentAdded: (comment: Comment) => void
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

   

 

    setIsSubmitting(true)

   
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

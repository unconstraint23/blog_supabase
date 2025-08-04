export interface Post {
  article_id: string
  title: string
  description: string
  author_id: string
  created_at: string
  updated_at: string
  author?: {
    email: string
    user_id: string
  }
  tags?: string[]
}

export interface User {
  id: string
  email?: string
  username?: string
  display_name?: string
  avatar_url?: string
  bio?: string
}

export interface Category {
  tag_id: string
  tag_name: string
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  user?: User
}

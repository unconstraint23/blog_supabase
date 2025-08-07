

interface MetadataOptions {
  title?: string
  description?: string
  url?: string
  tag?: string
  alternates?: {
    canonical?: string
  }

}

export function generateBaseMetadata({
  title = '我的博客',
  description = '一个分享技术与思考的博客平台。',
  url = 'https://blog-supabase.vercel.app',
  tag = '',
  alternates
}: MetadataOptions = {}) {
  return {
    title,
    description,
    url,
    tag,
    alternates,

  }
}

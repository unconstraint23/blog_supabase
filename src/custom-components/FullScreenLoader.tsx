'use client'

import { useLoadingStore } from '@/utils/useLoadingStore'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils' // 如果你有classnames工具

export default function FullScreenLoader() {
  const isLoading = useLoadingStore((state) => state.isLoading)

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-sm flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}
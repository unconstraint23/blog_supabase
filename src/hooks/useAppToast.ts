
'use client'

import { toast } from 'sonner'

export function useAppToast() {
  return {
    success: (message: string, title?: string) =>
      toast.success(title ?? '成功', {
        description: message,
      }),

    error: (message: string, title?: string) =>
      toast.error(title ?? '出错了', {
        description: message,
      }),

    info: (message: string, title?: string) =>
      toast(title ?? '提示', {
        description: message,
      }),

    // 其他可选：loading 状态
    loading: (message: string, title?: string) =>
      toast.loading(title ?? '加载中...', {
        description: message,
      }),
  }
}

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function loading() {
  return (
    <div className="flex items-center space-x-4 rounded-lg">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className='space-y-2'>
        <Skeleton className="h-2/6 w-full bg-slate-500 rounded-md" />
        <Skeleton className="h-2/6 w-full bg-slate-500 rounded-md" />
      </div>
    </div>
  )
}

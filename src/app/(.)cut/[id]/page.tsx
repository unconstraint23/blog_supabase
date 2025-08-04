
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MemberModal({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState<string>('')

  useEffect(() => {
    // 解包 params
    params.then(p => setId(p.id))
  }, [params])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => router.back()}
    >
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '300px',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3>👤 用作复习路由拦截，创建新文章请点击头部的新建按钮</h3>
        <p>当前 ID：{id}</p>
        <button onClick={() => router.back()}>关闭</button>
      </div>
    </div>
  )
}

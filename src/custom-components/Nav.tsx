"use client"

import Link from "next/link"
import Search from "./Search"
import { Button } from "@/components/ui/button"

export default function Nav() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">next学习</div>
          <div>
            <Link href="/" className="mr-4 text-muted-foreground hover:text-foreground">首页</Link>
            <Link href="/create" className="mr-4 text-muted-foreground hover:text-foreground">新建</Link>
            <Link href="/categories" className="text-muted-foreground hover:text-foreground">
            分类
          </Link>
          </div>
          <div className="w-2/6 flex justify-between items-center">
            <Search className="w-3/4" />
          <Button className="w-20">
            登录
          </Button>
          </div>
          
        </div>
      </div>
    </header>
  )
}

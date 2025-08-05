"use client"

import Link from "next/link"
import Search from "./Search"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useCommonContext } from "./CommonProvider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

export default function Nav() {
  const router = useRouter()
  const { userInfo, signOut } = useCommonContext()
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">next学习</div>
          <div>
            <Link href="/" className="mr-4 text-muted-foreground hover:text-foreground">首页</Link>
            <Link href="/edit" className="mr-4 text-muted-foreground hover:text-foreground">新建</Link>
            <Link href="/categories" className="text-muted-foreground hover:text-foreground">
              分类
            </Link>
          </div>
          <div className="w-2/6 flex justify-end items-center">
            
             {userInfo ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={userInfo.user_metadata?.avatar_url || "/placeholder.svg?height=32&width=32"}
                      alt={userInfo.email || ""}
                    />
                    <AvatarFallback className="text-white">{userInfo.email ? userInfo.email.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-400" align="end">
                <DropdownMenuLabel>{userInfo.email || "用户"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>退出登录</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="w-20 bg-primary text-white hover:bg-primary/20"
              onClick={() => router.push('/login')}
            >
              登录
            </Button>
          )}
            
          </div>

        </div>
      </div>
    </header>
  )
}

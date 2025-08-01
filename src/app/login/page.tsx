"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function LoginCard() {
  const [title, setTitle] = useState("登录")
  const [isLogin, setIsLogin] = useState(true)
  return (
    <Card className="w-full max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          请输入您的邮箱和密码进行{title}
        </CardDescription>
       
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入您的邮箱"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">密码</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  忘记密码？
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-dark text-white hover:bg-primary/40">
          {isLogin ? "登录" : "注册"}
        </Button>
         {isLogin && (
          <CardAction>
          还没账号？去 <Button variant="link" onClick={() => {
            setIsLogin(false)
            setTitle("注册")
            }}>注册</Button>
        </CardAction>
         )}
        {!isLogin && (
          <CardAction>
          已有账号？去 <Button variant="link" onClick={() => {
            setIsLogin(true)
            setTitle("登录")
            }}>登录</Button>
        </CardAction>
        )}
      </CardFooter>
    </Card>
  )
}

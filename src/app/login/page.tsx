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
import { useCommonContext } from "@/custom-components/CommonProvider"
import { useState } from "react"
import { useAppToast } from "@/hooks/useAppToast"
import { useLoadingStore } from "@/utils/useLoadingStore"


export default function LoginCard() {
   const toast = useAppToast()
      const { show, hide } = useLoadingStore()
  const [title, setTitle] = useState("登录")
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const { signIn, signUp } = useCommonContext()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()  
    setIsDisabled(true)
    try {
      show()
      const { error } = isLogin ? await signIn(email, password) : await signUp(email, password)
      setIsDisabled(false)
      if (error) {
        toast.error(error.message)
        throw error
      }
      toast.success(`${isLogin ? "登录" : "注册"}成功！`)
      hide()
      // 登录或注册成功后可以进行其他操作，比如跳转到首页
      if (isLogin) {  
        
        window.location.href = "/"
      }
    } catch (error) {
      setIsDisabled(false)
      hide()
    }
    
      
  }
  return (
    <Card className="w-full max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          请输入您的邮箱和密码进行{title}
        </CardDescription>
       
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入您的邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Input 
              id="password" 
              type="password"
              placeholder="请输入您的密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required />
            </div>
          </div>
          <Button type="submit" className="w-full bg-dark text-white hover:bg-primary/40 mt-4" disabled={isDisabled}>
          {isLogin ? "登录" : "注册"}
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        
         {isLogin && (
          <CardAction>
          还没账号？去 <Button variant="link" onClick={() => {
            setIsLogin(false)
            setTitle("注册")
            }}>注册</Button>
        </CardAction>
         )}
        {!isLogin && (
          <>
          <CardAction>
          已有账号？去 <Button 
          variant="link" 
          onClick={() => {
            setIsLogin(true)
            setTitle("登录")
          }}
          >登录</Button>
        </CardAction>
          </>
          
        )}
      </CardFooter>
    </Card>
  )
}

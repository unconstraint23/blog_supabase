"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { Subscription, User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useAppToast } from "@/hooks/useAppToast"

interface ICommonProvider {
  userInfo: User | null
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
  }>
  signUp: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
  }>
  signOut: () => Promise<void>
}

const CommonContext = createContext<ICommonProvider | undefined>(undefined)

export const useCommonContext = () => {
  const ctx = useContext(CommonContext)
  if (!ctx) {
    throw new Error("CommonProvider must be used")
  }
  return ctx
}

export default function CommonProvider({ children }: { children: React.ReactNode }) {
  const toast = useAppToast()
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const supabase = createClient()
  const router = useRouter()
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { error }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserInfo(session?.user ?? null)

    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("Auth state changed:", session?.user)
      setUserInfo(session?.user ?? null)
    })
    return () => {
      subscription.unsubscribe() // Clean up the listener on unmount
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (!error && signUpData.user) {
      const userId = signUpData.user.id;
      const { error: asyncError } = await supabase.rpc('confirm_email', { user_email: email });
      
      if (asyncError) {
        toast.error('注册失败');
        return { error }
        
      } 
      toast.success('成功');
      await supabase.from('user_profiles').insert(
        {
          user_id: userId, // 这和 auth.users 的 ID 一致
          username: email.split('@')[0],
          password: password,
          email: email,
        }
      );
        

      
    }
    console.log("error...", error)

    return { error }
  }

  const signOut = async () => {
    console.log("Signing out...")
    await supabase.auth.signOut()
    setUserInfo(null)
    router.push('/login')
  }
  return (
    <CommonContext.Provider value={{ userInfo, signIn, signUp, signOut }}>
      {children}

    </CommonContext.Provider>
  )
}

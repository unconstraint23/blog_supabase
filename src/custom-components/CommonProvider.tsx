"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { Subscription, User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

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
    if(!ctx) {
        throw new Error("CommonProvider must be used")
    }
    return ctx
}

export default function CommonProvider({ children }: {children: React.ReactNode}) {
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
    if(!error && signUpData.user) {
       const userId = signUpData.user.id;
        await supabase.from('users').insert([
          {
            user_id: userId, // 这和 auth.users 的 ID 一致
            username: email.split('@')[0],
            password: password,
            email: email,
          }
        ]);
    }
    return { error }
  }

  const signOut = async () => {
    console.log("Signing out...")
    await supabase.auth.signOut()
    setUserInfo(null)
    router.push('/login')
  }
  return (
    <CommonContext.Provider value={{userInfo, signIn, signUp, signOut}}>
        {children}
        
    </CommonContext.Provider>
  )
}

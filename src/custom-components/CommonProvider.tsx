"use client"

import { createContext, useContext, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

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
    const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }


  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }
  return (
    <CommonContext.Provider value={{userInfo, signIn, signUp, signOut}}>
        {children}
        
    </CommonContext.Provider>
  )
}

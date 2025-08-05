"use client"

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
interface SearchProps {
  className: string
  onChange?: (...arg: any) => any
  onSearch?: (...arg: any) => any
}

export default function Search(props: SearchProps) {

 const [value, setValue] = useState('')
   const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === "Enter") {
            props.onSearch?.(value)
        }
   }
return <Input 
    onChange={(e) => {
  setValue(e.target.value)
  props.onChange?.(e.target.value)
}}
onKeyDown={handleSearch}
className={props.className} value={value} type="text" placeholder="请输入标题按回车搜索" />

}

"use client"

import { Input } from '@/components/ui/input'
import React from 'react'

export default function Search(props: { className: string }) {

 
   
return <Input className={props.className} type="text" placeholder="搜索" />

}

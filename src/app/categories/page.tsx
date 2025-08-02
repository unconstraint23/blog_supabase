"use client"

import { Input } from "@/components/ui/input"
import { CircleX } from "lucide-react"

export default function page() {
  return (
    <div
    className='container mx-auto px-4 mt-4 mb-4'
    >
       
            <div className='flex justify-between items-center'>
                <div className='font-bold text-1xl'>
                    点击下方标签即可在右侧输入框修改按回车确认
                </div>
                <Input className="w-2/12" placeholder='请输入分类名称' />
            </div>
            <div className='mt-4 flex flex-wrap gap-4' >
               
                    <div className='flex items-center justify-between bg-gray-100 p-2 rounded-md'>
                        <span>前端</span>
                        <CircleX className="ml-3 cursor-pointer"  size={16} />
                    </div>
                    <div className='flex items-center justify-between bg-gray-100 p-2 rounded-md'>
                        <span>后端</span>
                        <CircleX className="ml-3 cursor-pointer" size={16} />
                    </div>
          
       
             </div>
    </div>
  )
}

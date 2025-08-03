"use client"

import { Input } from "@/components/ui/input"
import { CircleX } from "lucide-react"
import { Category } from "@/types"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useConfirmDialog } from "@/hooks/use-confirm-dialog"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { cloneDeep, set } from 'lodash'
import { useAppToast } from "@/hooks/useAppToast"
import { useLoadingStore } from "@/utils/useLoadingStore"

interface tagManageProps {
    tagList?: Category[]
}

export default function TagManage({ tagList }: tagManageProps) {
    const toast = useAppToast()
    const { show, hide } = useLoadingStore()
    const [currentSelectTag, setCurrentSelectTag] = useState<Category>()
    const [inputValue, setInputValue] = useState<string>("")
    const [ConfirmDialog, confirm] = useConfirmDialog()
    const [list, setList] = useState<Category[]>(cloneDeep(tagList) || [])
    const supabase = createClient()
    const handleTagClick = (tag: Category) => {
        setCurrentSelectTag(tag)
        setInputValue(tag.tag_name)
        // 这里可以添加其他逻辑，比如加载该标签的文章等
    }
    const handleAddTag = async () => {
        if (!inputValue.trim()) {
            toast.error(
                 "请输入标签名称",
                 "标签名称不能为空"
            )
            return
        }
        try {
            show()
            const { data, error } = await supabase.from("tags").insert({
                tag_name: inputValue.trim(),
                is_delete: false,
            }).select("tag_id, tag_name").single()
            if (error) {
                throw error
            }
            setList([...list, data])
            setInputValue("")
            hide()
        } catch (error) {
            hide()
            toast.error("新增标签失败，请稍后重试")
        }
    }
    const handleUpdateTag = async () => {  
        if (!currentSelectTag) {
            toast.error("请先选择一个标签进行编辑")
            return
        }
        try {
            show()
            const { data, error } = await supabase.from("tags").update({
                tag_name: inputValue.trim(),
            }).eq("tag_id", currentSelectTag.tag_id).select("tag_id, tag_name").single()
            if (error) {
                throw error
            }
            setList(list.map((tag) => tag.tag_id === currentSelectTag.tag_id ? data : tag))
            setCurrentSelectTag(data)
            setInputValue("")
            hide()
        } catch (error) {
            hide()
            toast.error("更新标签失败，请稍后重试")
        }
     }
    const refeshTagList = async () => {
        try {
          show()
        const { data, error } = await supabase.from("tags").select("tag_id, tag_name").filter("is_delete", "eq", false).order("tag_id", { ascending: true })

        if (error) {
            console.error("Error fetching categories:", error)
            return []
        }
        setList(data)  
        hide()
        } catch (error) {
            hide()
            toast.error("获取标签列表失败，请稍后重试")
        }
        
    }
    function handleTagDelete(tag: Category) {
        confirm({
            title: "删除标签",
            description: `确定删除标签 "${tag.tag_name}" 吗？`,

        }).then(async () => {

           show()
            try {
                await supabase
                    .from("tags").update({
                        is_delete: true,
                    }).eq("tag_id", tag.tag_id)
                toast.success("标签删除成功")
                refeshTagList()
            hide()
            } catch (error) {
                toast.error("删除标签失败，请稍后重试")
                hide()
                return

            }



        })
    }

    return (
        <div
            className='container mx-auto px-4 mt-4 mb-4'
        >

            <div className='flex justify-between items-center'>
                <div className='font-bold text-1xl'>
                    点击下方标签即可在右侧输入框修改
                </div>
                <div className="flex items-center gap-4 w-2/5">
                    <Input className="w-3/4" placeholder='请输入分类名称' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <Button className="bg-primary text-white hover:bg-primary/20" onClick={handleAddTag}>
                        新增分类
                    </Button>
                    <Button className="bg-red-500 text-white hover:bg-red-500/20" onClick={handleUpdateTag} disabled={!currentSelectTag}>
                        编辑分类
                    </Button>
                </div>

            </div>
            <div className='mt-4 flex flex-wrap gap-4' >
                {list.map((tag) => (
                    <div key={tag.tag_id} className={`flex items-center cursor-pointer justify-between bg-gray-100 p-2 rounded-md ${currentSelectTag?.tag_id === tag.tag_id ? "bg-gray-400 text-cyan-400" : ""}`} onClick={() => handleTagClick(tag)} >
                        <span>{tag.tag_name}</span>
                        <CircleX className="ml-3 cursor-pointer" onClick={() => handleTagDelete(tag)} size={16} />
                    </div>

                ))}
            </div>
            {ConfirmDialog}
        </div>
    )
}


import TagManage from "@/custom-components/TagManage"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { Category } from "@/types"

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("tags").select("tag_id::text, tag_name").filter("is_delete", "eq", false).order("tag_id", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }
  
  return data as Category[]
}

export default async function page() {
  const categories = await getCategories()
  return (
    <>
      <TagManage tagList={categories} />
    </>
  )
}

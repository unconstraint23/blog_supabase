"use client";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { Button } from '@/components/ui/button';
import { Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered } from 'lucide-react';
import { forwardRef } from 'react';

interface IRichEditorProps {
  content?: string;
  onChange: (content: string) => void;
}

export default forwardRef(function RichEditor({ content, onChange }: IRichEditorProps, ref) {
  const editor = useEditor({
    extensions: [
        StarterKit.configure({
            codeBlock: true
        }),
        Heading.configure({
            levels: [1, 2, 3],
        })
    ],
    content: content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
     editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] max-w-none p-4',
    },
    },
    onUpdate: ({ editor }) => {
        if(editor.getText() === "") {
            onChange("");
            return;
        }
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="border rounded-md overflow-hidden">
        <div className='flex flex-nowrap gap-2 bg-gray-100 border-b'>
        <Button 
        variant="ghost"
          size="icon"
        onClick={() => editor?.chain().focus().toggleBold().run()} 
        className={`${editor?.isActive('bold') ? "bg-muted-foreground" : ""} btn`}
        type="button"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
        variant="ghost"
          size="icon"
        onClick={() => editor?.chain().focus().toggleItalic().run()} 
        className={`${editor?.isActive('italic') ? "bg-muted-foreground" : ""} btn`}
        type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
        variant="ghost"
          size="icon"
        onClick={() => editor?.chain().focus().toggleBulletList().run()} 
        className={`${editor?.isActive('bulletList') ? "bg-muted-foreground" : ""} btn`}
        type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
        variant="ghost"
          size="icon"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()} 
        className={`${editor?.isActive('orderedList') ? "bg-muted-foreground" : ""} btn`}
        type="button"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${editor?.isActive("heading", { level: 1 }) ? "bg-muted-foreground" : ""} btn`}
          type="button"
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${editor?.isActive("heading", { level: 2 }) ? "bg-muted-foreground" : ""} btn`}

          type="button"
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${editor?.isActive("heading", { level: 3 }) ? "bg-muted" : ""} btn`}
          type="button"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        </div>
      <EditorContent editor={editor} 
      className="prose-pre:bg-muted-foreground prose-pre:p-4 prose-pre:rounded-md" />
    </div>
  )
  
})

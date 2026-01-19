"use client"

import { useEffect, useState } from "react"
import { Bold, Italic, ListOrdered, List, Link as LinkIcon, Image as ImageIcon } from "lucide-react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type RichTextJSON = unknown

const defaultDoc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "" }],
    },
  ],
}

interface RichTextEditorProps {
  value: string
  onChange: (jsonString: string) => void
  placeholder?: string
  onUploadStart?: () => void
  onUploadEnd?: () => void
}

export function RichTextEditor({ value, onChange, placeholder, onUploadStart, onUploadEnd }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],
    content: parseContent(value),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert min-h-[220px] max-h-[520px] overflow-y-auto px-4 py-3 rounded-md border bg-background focus:outline-none prose-img:max-w-md prose-img:mx-auto prose-img:rounded-lg",
      },
    },
    onUpdate: ({ editor }: { editor: any }) => {
      const json = editor.getJSON()
      onChange(JSON.stringify(json))
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!editor) return
    // when value changes from outside (e.g., edit mode), set new content
    editor.commands.setContent(parseContent(value))
  }, [value, editor])

  if (!isMounted || !editor) return null

  const addLink = () => {
    const url = window.prompt("Nhập URL")
    if (!url) return
    editor.chain().focus().setLink({ href: url }).run()
  }

  const addImage = async () => {
    // Create file input element
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File không được vượt quá 5MB')
        return
      }

      // Notify parent that upload is starting
      setIsUploading(true)
      onUploadStart?.()
      toast.loading('Đang tải ảnh lên...', { id: 'image-upload' })

      try {
        // Upload file to upload API (for rich text editor, not media management)
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/admin/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || 'Upload failed')
        }

        const data = await response.json()
        // Insert image into editor
        editor.chain().focus().setImage({ src: data.url }).run()
        toast.success('Tải ảnh lên thành công', { id: 'image-upload' })
      } catch (error) {
        console.error('Error uploading image:', error)
        toast.error('Không thể tải ảnh lên. Vui lòng thử lại.', { id: 'image-upload' })
      } finally {
        // Notify parent that upload is finished
        setIsUploading(false)
        onUploadEnd?.()
      }
    }
    input.click()
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 border rounded-md px-2 py-1 bg-muted/50">
        <ToolbarButton
          icon={<Bold className="h-4 w-4" />}
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon={<Italic className="h-4 w-4" />}
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon={<List className="h-4 w-4" />}
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          icon={<ListOrdered className="h-4 w-4" />}
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          icon={<LinkIcon className="h-4 w-4" />}
          active={editor.isActive("link")}
          onClick={addLink}
        />
        <ToolbarButton
          icon={<ImageIcon className="h-4 w-4" />}
          active={false}
          onClick={addImage}
          disabled={isUploading}
        />
      </div>
      {!value && placeholder ? (
        <div className="text-sm text-muted-foreground">{placeholder}</div>
      ) : null}
      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarButton({
  icon,
  active,
  onClick,
  disabled,
}: {
  icon: React.ReactNode
  active: boolean
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="sm"
      className={cn("h-8 w-8 p-0")}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  )
}

function parseContent(value: string): RichTextJSON {
  if (!value) return defaultDoc
  try {
    const json = JSON.parse(value)
    return json
  } catch {
    // fallback: wrap plain text into a paragraph
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: value }],
        },
      ],
    }
  }
}

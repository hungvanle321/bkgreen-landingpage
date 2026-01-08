import React from 'react'

type JSONContent = {
  type: string
  attrs?: Record<string, any>
  content?: JSONContent[]
  text?: string
  marks?: { type: string; attrs?: Record<string, any> }[]
}

export function renderRichText(content: string | null | undefined) {
  if (!content) {
    return <p />
  }

  let doc: JSONContent
  try {
    doc = JSON.parse(content)
  } catch {
    // Fallback nếu là plain text
    return <p>{content}</p>
  }

  if (doc.type !== 'doc' || !doc.content) {
    return <p />
  }

  return doc.content.map((node, idx) => renderNode(node, idx))
}

function renderNode(node: JSONContent, key: number): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return <p key={key}>{renderInline(node.content)}</p>
    case 'heading': {
      const level = node.attrs?.level || 2
      const HeadingTag = `h${Math.min(Math.max(level, 1), 6)}` as keyof JSX.IntrinsicElements
      return <HeadingTag key={key}>{renderInline(node.content)}</HeadingTag>
    }
    case 'bulletList':
      return <ul key={key}>{node.content?.map((child, idx) => renderNode(child, idx))}</ul>
    case 'orderedList':
      return <ol key={key}>{node.content?.map((child, idx) => renderNode(child, idx))}</ol>
    case 'listItem':
      return <li key={key}>{node.content?.map((child, idx) => renderNode(child, idx))}</li>
    case 'blockquote':
      return <blockquote key={key}>{renderInline(node.content)}</blockquote>
    case 'horizontalRule':
      return <hr key={key} />
    case 'image': {
      const src = node.attrs?.src
      const alt = node.attrs?.alt || ''
      if (!src) return null
      return (
        <div key={key} className="my-4">
          {/* Dùng img thường để tránh cấu hình next/image cho đường dẫn động */}
          {/* Nếu cần tối ưu có thể chuyển sang next/image sau */}
          <img src={src} alt={alt} className="rounded-lg w-full h-auto" />
        </div>
      )
    }
    case 'hardBreak':
      return <br key={key} />
    default:
      return <p key={key}>{renderInline(node.content)}</p>
  }
}

function renderInline(content?: JSONContent[]) {
  if (!content) return null
  return content.map((child, idx) => {
    if (child.type === 'text') {
      let el: React.ReactNode = child.text
      if (child.marks) {
        child.marks.forEach((mark) => {
          if (mark.type === 'bold') {
            el = <strong key={`${idx}-b`}>{el}</strong>
          }
          if (mark.type === 'italic') {
            el = <em key={`${idx}-i`}>{el}</em>
          }
          if (mark.type === 'link') {
            const href = mark.attrs?.href || '#'
            el = (
              <a
                key={`${idx}-l`}
                href={href}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {el}
              </a>
            )
          }
        })
      }
      return <React.Fragment key={idx}>{el}</React.Fragment>
    }
    // Inline nodes like hardBreak
    return renderNode(child, idx)
  })
}

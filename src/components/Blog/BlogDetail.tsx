import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './BlogDetail.module.css'
import { FaArrowLeft, FaCalendarAlt, FaTag } from 'react-icons/fa'

type BlogPost = {
  id: number
  title: string
  slug: string
  content: string
  date: string
  category: string
  image: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with React 19 and TypeScript',
    slug: 'getting-started-react-19-typescript',
    content: `
## Introduction

This article explains how to get started with **React 19** using **TypeScript**.

### Why TypeScript?

- Static typing
- Better developer experience
- Fewer runtime bugs

### Example Component

\`\`\`tsx
type Props = {
  name: string
}

export function Hello({ name }: Props) {
  return <h2>Hello {name}</h2>
}
\`\`\`

### Conclusion

Using **React + TypeScript** is the recommended setup for modern frontend development.
`,
    date: '2023-11-15',
    category: 'React',
    image: 'https://picsum.photos/seed/react19/1200/600.jpg',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Building Responsive Layouts with CSS Grid',
    slug: 'building-responsive-layouts-css-grid',
    content: `
## CSS Grid Basics

CSS Grid allows you to build **two-dimensional layouts** easily.

### Key Concepts

- Grid container
- Grid items
- Rows and columns

### Simple Example

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`
`,
    date: '2023-10-28',
    category: 'CSS',
    image: 'https://picsum.photos/seed/cssgrid/1200/600.jpg',
    readTime: '7 min read'
  }
]

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate() // Digunakan untuk kembali ke history sebelumnya
  
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>Article not found</h2>
        {/* Tombol back darurat jika post tidak ada */}
        <button onClick={() => navigate(-1)} className={styles.backLink} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <FaArrowLeft /> Back
        </button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <section className={styles.detailSection}>
      <div className={styles.container}>
        
        {/* Diubah dari <Link> ke <button> agar bisa navigate(-1).
          className tetap menggunakan styles.backLink agar tampilan sama persis.
          Ditambah sedikit style reset agar button tidak punya border/background default browser.
        */}
        <button 
          onClick={() => navigate(-1)} 
          className={styles.backLink}
          style={{ 
            border: 'none', 
            background: 'none', 
            padding: 0, 
            fontFamily: 'inherit', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px' 
          }}
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span>
            <FaTag /> {post.category}
          </span>
          <span>
            <FaCalendarAlt /> {formatDate(post.date)}
          </span>
          <span>{post.readTime}</span>
        </div>

        <img
          src={post.image}
          alt={post.title}
          className={styles.heroImage}
        />

        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  )
}
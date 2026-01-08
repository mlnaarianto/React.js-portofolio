import { useParams, Link } from 'react-router-dom'
import styles from './BlogDetail.module.css'
import { FaArrowLeft, FaCalendarAlt, FaTag } from 'react-icons/fa'

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React 19 and TypeScript',
    slug: 'getting-started-react-19-typescript',
    content: `
      <p>Full article content here...</p>
      <p>You can write long HTML content.</p>
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
    excerpt: 'Learn how to create complex, responsive layouts using CSS Grid with practical examples and best practices.',
    date: '2023-10-28',
    category: 'CSS',
    image: 'https://picsum.photos/seed/cssgrid/600/400.jpg',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'State Management in React: Context API vs Redux',
    slug: 'state-management-react-context-vs-redux',
    excerpt: 'Compare different state management solutions in React and understand when to use Context API versus Redux.',
    date: '2023-10-15',
    category: 'React',
    image: 'https://picsum.photos/seed/statemanage/600/400.jpg',
    readTime: '10 min read'
  },
  {
    id: 4,
    title: 'Optimizing Web Performance with Modern Techniques',
    slug: 'optimizing-web-performance-modern-techniques',
    excerpt: 'Discover techniques to improve your website performance, including code splitting, lazy loading, and image optimization.',
    date: '2023-09-30',
    category: 'Performance',
    image: 'https://picsum.photos/seed/performance/600/400.jpg',
    readTime: '8 min read'
  },
  {
    id: 5,
    title: 'Introduction to Next.js 13 and App Router',
    slug: 'introduction-nextjs-13-app-router',
    excerpt: 'Get familiar with the new App Router in Next.js 13 and how it changes the way we build React applications.',
    date: '2023-09-15',
    category: 'Next.js',
    image: 'https://picsum.photos/seed/nextjs13/600/400.jpg',
    readTime: '6 min read'
  },
  {
    id: 6,
    title: 'Building Accessible Web Applications',
    slug: 'building-accessible-web-applications',
    excerpt: 'Learn the principles of web accessibility and how to implement them in your React applications for inclusive design.',
    date: '2023-08-28',
    category: 'Accessibility',
    image: 'https://picsum.photos/seed/a11y/600/400.jpg',
    readTime: '9 min read'
  }
]

export default function BlogDetail() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>Article not found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <section className={styles.detailSection}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <FaArrowLeft /> Back
        </Link>

        <h1>{post.title}</h1>

        <div className={styles.meta}>
          <span><FaTag /> {post.category}</span>
          <span><FaCalendarAlt /> {formatDate(post.date)}</span>
          <span>{post.readTime}</span>
        </div>

        <img src={post.image} alt={post.title} className={styles.heroImage} />

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  )
}

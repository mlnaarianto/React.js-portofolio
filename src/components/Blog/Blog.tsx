import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaTag, FaArrowRight } from 'react-icons/fa'
import styles from './Blog.module.css'

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React 19 and TypeScript',
    slug: 'getting-started-react-19-typescript',
    excerpt: 'Explore the new features in React 19 and how to set up a project with TypeScript for type safety and better developer experience.',
    date: '2023-11-15',
    category: 'React',
    image: 'https://picsum.photos/seed/react19/600/400.jpg',
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

export default function Blog() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [filter, setFilter] = useState('all')

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))]

  const filteredPosts =
    filter === 'all'
      ? blogPosts
      : blogPosts.filter(post => post.category === filter)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <motion.section
      ref={ref}
      id="blog"
      className={`${styles.section} blog-section`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* ===== HEADER ===== */}
      <div className={styles.sectionHeader}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Blog
        </motion.h2>

        <motion.div
          className={styles.underline}
          initial={{ width: 0 }}
          animate={inView ? { width: '80px' } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>

      {/* ===== FILTER ===== */}
      <motion.div
        className={styles.filterButtons}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {categories.map(category => (
          <motion.button
            key={category}
            className={`${styles.filterBtn} ${filter === category ? styles.active : ''
              }`}
            onClick={() => setFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* ===== BLOG GRID ===== */}
      <div className={styles.blogGrid}>
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className={styles.blogCard}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -10 }}
          >
            {/* IMAGE */}
            <div className={styles.blogImage}>
              <img src={post.image} alt={post.title} />
              <div className={styles.blogOverlay}>
                <Link to={`/blog/${post.slug}`} className={styles.readMore}>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* CONTENT */}
            <div className={styles.blogContent}>
              <div className={styles.blogMeta}>
                <span className={styles.blogCategory}>
                  <FaTag /> {post.category}
                </span>
                <span className={styles.blogDate}>
                  <FaCalendarAlt /> {formatDate(post.date)}
                </span>
              </div>

              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>

              <div className={styles.blogFooter}>
                <span className={styles.readTime}>{post.readTime}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className={styles.readMoreLink}
                >
                  Read More <FaArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== EMPTY STATE ===== */}
      {filteredPosts.length === 0 && (
        <motion.div
          className={styles.noPosts}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p>No posts found in this category.</p>
        </motion.div>
      )}
    </motion.section>
  )
}

import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Blog from './components/Blog/Blog'
import BlogDetail from './components/Blog/BlogDetail'
import Footer from './components/Footer/Footer'

export default function App() {
  const location = useLocation()

  // ================= THEME & ANCHOR =================
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    document.documentElement.setAttribute('data-theme', savedTheme ?? 'dark')

    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement
      const href = target.getAttribute('href')

      if (!href || href.startsWith('#/')) return
      e.preventDefault()

      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.querySelector(href)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const anchors = document.querySelectorAll('a[href^="#"]:not([href^="#/"])')
    anchors.forEach(a => a.addEventListener('click', handleAnchorClick))

    return () => {
      anchors.forEach(a => a.removeEventListener('click', handleAnchorClick))
    }
  }, [])

  // ================= RESTORE LAST SECTION =================
  useEffect(() => {
    if (location.pathname !== '/') return

    const lastSection = localStorage.getItem('last-section')
    if (!lastSection) return

    const timer = setTimeout(() => {
      document.getElementById(lastSection)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Blog />
            </>
          }
        />

        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>

      <Footer />
    </>
  )
}

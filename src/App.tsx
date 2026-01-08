import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Blog from './components/Blog/Blog'
import BlogDetail from './components/Blog/BlogDetail'
import Footer from './components/Footer/Footer'

export default function App() {
useEffect(() => {
  const savedTheme = localStorage.getItem('theme')
  document.documentElement.setAttribute('data-theme', savedTheme ?? 'dark')

  const handleAnchorClick = (e: Event) => {
    const target = e.currentTarget as HTMLAnchorElement
    const href = target.getAttribute('href')

    // Abaikan routing HashRouter
    if (!href || href.startsWith('#/')) return

    e.preventDefault()

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const anchors = document.querySelectorAll('a[href^="#"]:not([href^="#/"])')
  anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick))

  return () => {
    anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick))
  }
}, [])


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

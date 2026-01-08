import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [theme, setTheme] = useState('dark')

  // Load theme dari localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const currentTheme = savedTheme ? savedTheme : 'dark'
    setTheme(currentTheme)
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)

      const sections = ['home', 'about', 'skills', 'projects']
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActive(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <motion.h2 className="logo" whileHover={{ scale: 1.05 }}>
          Maulana Arianto
        </motion.h2>

        <div className="nav-links">
          {['home', 'about', 'skills', 'projects'].map((section) => (
            <motion.a
              key={section}
              href={`#${section === 'home' ? '' : section}`}
              className={`nav-link ${active === section ? 'active' : ''}`}
              whileHover={{ y: -2 }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.a>
          ))}
        </div>

        <div className="nav-icons">
          <div className="theme-switch" onClick={toggleTheme}>
            <span className={theme === 'light' ? 'active' : ''}>Light</span>
            <div className={`switch ${theme === 'dark' ? 'on' : ''}`}>
              <div className="knob"></div>
            </div>
            <span className={theme === 'dark' ? 'active' : ''}>Dark</span>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

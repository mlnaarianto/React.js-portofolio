import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Navbar.module.css'

const SECTIONS = ['home', 'about', 'skills', 'projects', 'blog']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  // ================= THEME =================
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const currentTheme = savedTheme ?? 'dark'
    setTheme(currentTheme)
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // ================= SCROLL & ACTIVE SECTION =================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // titik tengah layar
        threshold: 0
      }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  // ================= NAV CLICK =================
  const handleNavClick = (section: string) => {
    const el = document.getElementById(section)
    if (!el) return

    const yOffset = -80 // tinggi navbar
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.navContainer}>
        <motion.h2 className={styles.logo} whileHover={{ scale: 1.05 }}>
          Maulana Arianto
        </motion.h2>

        <div className={styles.navLinks}>
          {SECTIONS.map((section) => (
            <motion.button
              key={section}
              className={`${styles.navLink} ${active === section ? styles.active : ''}`}
              whileHover={{ y: -2 }}
              onClick={() => handleNavClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className={styles.navIcons}>
          <div className={styles.themeSwitch} onClick={toggleTheme}>
            <span className={theme === 'light' ? styles.activeTheme : ''}>Light</span>
            <div className={`${styles.switch} ${theme === 'dark' ? styles.switchOn : ''}`}>
              <div className={styles.knob}></div>
            </div>
            <span className={theme === 'dark' ? styles.activeTheme : ''}>Dark</span>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

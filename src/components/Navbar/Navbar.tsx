import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const SECTIONS = ['home', 'about', 'skills', 'projects', 'blog']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  const isBlogDetail = location.pathname.startsWith('/blog/')
  const blogDetailPath = isBlogDetail ? location.pathname : null

  // ================= THEME =================
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const currentTheme = savedTheme ?? 'dark'
    setTheme(currentTheme)
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  // ================= ACTIVE STATE =================
  useEffect(() => {
    if (isBlogDetail) {
      setActive('blog-detail')
      return
    }

    if (location.pathname === '/blog') {
      setActive('blog')
      return
    }

    if (location.pathname === '/' && window.scrollY < 100) {
      setActive('home')
    }
  }, [location.pathname, isBlogDetail])

  // ================= SCROLL + OBSERVER =================
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)

    if (location.pathname !== '/') {
      return () => window.removeEventListener('scroll', handleScroll)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setActive(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [location.pathname])

  // ================= CLICK OUTSIDE (MOBILE) =================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  // ================= NAV CLICK =================
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const yOffset = -80
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const handleNavClick = (section: string) => {
    setMenuOpen(false)

    if (isBlogDetail) {
      navigate(-1)
      return
    }

    if (location.pathname === '/') {
      scrollToSection(section)
      return
    }

    navigate('/')
  }

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.navContainer}>
        {/* LOGO */}
        <motion.h2
          className={styles.logo}
          onClick={() =>
            isBlogDetail
              ? navigate(-1)
              : window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        >
          Maulana Arianto
        </motion.h2>

        {/* HAMBURGER */}
        <button
          ref={hamburgerRef}
          className={styles.hamburger}
          onClick={() => setMenuOpen((p) => !p)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* NAV LINKS */}
        <div
          ref={menuRef}
          className={`${styles.navLinks} ${
            menuOpen ? styles.mobileOpen : ''
          }`}
        >
          {SECTIONS.map((section) => (
            <button
              key={section}
              className={`${styles.navLink} ${
                active === section ? styles.active : ''
              }`}
              onClick={() => handleNavClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}

          {isBlogDetail && blogDetailPath && (
            <button className={`${styles.navLink} ${styles.active}`}>
              Blog Detail
            </button>
          )}

          {/* THEME (MOBILE) */}
          <div className={styles.mobileTheme}>
            <div className={styles.themeSwitch} onClick={toggleTheme}>
              <span className={theme === 'light' ? styles.activeTheme : ''}>
                Light
              </span>
              <div
                className={`${styles.switch} ${
                  theme === 'dark' ? styles.switchOn : ''
                }`}
              >
                <div className={styles.knob} />
              </div>
              <span className={theme === 'dark' ? styles.activeTheme : ''}>
                Dark
              </span>
            </div>
          </div>
        </div>

        {/* THEME DESKTOP */}
        <div className={styles.navIcons}>
          <div className={styles.themeSwitch} onClick={toggleTheme}>
            <span className={theme === 'light' ? styles.activeTheme : ''}>
              Light
            </span>
            <div
              className={`${styles.switch} ${
                theme === 'dark' ? styles.switchOn : ''
              }`}
            >
              <div className={styles.knob} />
            </div>
            <span className={theme === 'dark' ? styles.activeTheme : ''}>
              Dark
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

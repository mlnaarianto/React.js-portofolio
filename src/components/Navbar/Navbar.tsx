import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const SECTIONS = ['home', 'about', 'skills', 'projects', 'blog']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  
  const location = useLocation()
  const navigate = useNavigate()

  // ================= 1. LOGIKA TEMA (DARK/LIGHT) =================
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

  // ================= 2. SINKRONISASI ACTIVE STATE & URL =================
  useEffect(() => {
    if (location.pathname.startsWith('/blog/')) {
      setActive('blog')
    } else if (location.hash) {
      setActive(location.hash.replace('#', ''))
    } else if (location.pathname === '/') {
      // Default ke home jika di root tanpa scroll
      if (window.scrollY < 100) setActive('home')
    }
  }, [location])

  // ================= 3. SCROLL & INTERSECTION OBSERVER =================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    let observer: IntersectionObserver | null = null;
    
    // Observer hanya aktif di halaman Home
    if (location.pathname === '/') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id)
            }
          });
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
      )

      SECTIONS.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer?.observe(el)
      })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (observer) {
        SECTIONS.forEach((id) => {
          const el = document.getElementById(id)
          if (el) observer?.unobserve(el)
        })
      }
    }
  }, [location.pathname])

  // ================= 4. NAV CLICK HANDLER (SMOOTH SCROLL) =================
  const handleNavClick = (section: string) => {
    if (location.pathname !== '/') {
      // Jika dari detail blog, pindah ke home dulu dengan hash
      navigate(`/#${section}`)
      
      // Tunggu render sebentar lalu scroll ke target
      setTimeout(() => {
        const el = document.getElementById(section)
        if (el) {
          const yOffset = -80
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Jika sudah di home, langsung scroll
      const el = document.getElementById(section)
      if (el) {
        const yOffset = -80
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.navContainer}>
        <motion.h2 
          className={styles.logo} 
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
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
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import profileImg from '../../assets/images/which.png'
import styles from './Hero.module.css'

export default function Hero() {
  const [text, setText] = useState('')
  const fullText = "Frontend Developer · React 19 · TypeScript"

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText.charAt(index))
        setIndex(prev => prev + 1)
      }, 50)

      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      className={styles.hero}
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.heroContainer}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >

          <motion.h1 className={styles.heroTitle}>
            Hello, I'm <span className={styles.highlight}>Maulana Arianto</span>
          </motion.h1>

          <motion.div className={styles.typewriter}>
            <p className={styles.typewriterText}>{text}<span className={styles.cursor}>|</span></p>
          </motion.div>

          <motion.p className={styles.heroSubtitle}>
            Hello what's up :3
          </motion.p>

          <motion.div className={styles.heroButtons}>
            <motion.button
              className={styles.primaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </motion.button>

            <motion.button
              className={styles.secondaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div className={styles.heroImage}>
          <div className={styles.profileImage}>
            <img className={styles.profileImageImg} src={profileImg} alt="Profile" />
          </div>
        </motion.div>
      </div>

      <motion.div className={styles.scrollIndicator} onClick={scrollToNext}>
        <FaArrowDown />
      </motion.div>
    </motion.section>
  )
}
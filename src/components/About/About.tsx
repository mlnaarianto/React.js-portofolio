import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import styles from './About.module.css'

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [experience, setExperience] = useState(0)

  useEffect(() => {
    if (inView) {
      const expTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setExperience(prev => {
            if (prev < 4) return prev + 1
            clearInterval(interval)
            return prev
          })
        }, 100)
        return () => clearInterval(interval)
      }, 300)

      return () => {
        clearTimeout(expTimer)
      }
    }
  }, [inView])

  return (
    <motion.section
      ref={ref}
      id="about"
      className={`${styles.section} about-section`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.sectionHeader}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          About Me
        </motion.h2>

        <motion.div
          className={styles.underline}
          initial={{ width: 0 }}
          animate={inView ? { width: '80px' } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>

      <div className={styles.aboutContent}>
        <motion.div
          className={styles.aboutText}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>
            I am a <strong>Software Engineering Technology</strong> student at
            <strong> Batam State Polytechnic</strong> who enjoys turning ideas into
            functional and well-designed web applications.
          </p>

          <p>
            My main focus is <strong>full-stack development</strong>, where I work with
            both <strong>frontend and backend technologies</strong> to build clean,
            responsive, and scalable solutions.
          </p>

          <p>
            I’m highly motivated to keep learning, explore new tools, and grow through
            hands-on projects and collaboration with others.
          </p>


        </motion.div>

        <motion.div
          className={styles.aboutStats}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.statCard}>
            <h3>{experience}+</h3>
            <p>Years Experience</p>
          </div>

          <div className={styles.statCard}>
            <h3>12+</h3>
            <p>Projects Completed</p>
          </div>

          <div className={styles.statCard}>
            <h3>100%</h3>
            <p>Commitment to Learning</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

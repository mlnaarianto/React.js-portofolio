import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [age, setAge] = useState(0)
  const [experience, setExperience] = useState(0)
  
  useEffect(() => {
    if (inView) {
      const ageTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setAge(prev => {
            if (prev < 25) return prev + 1
            clearInterval(interval)
            return prev
          })
        }, 50)
        return () => clearInterval(interval)
      }, 200)
      
      const expTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setExperience(prev => {
            if (prev < 5) return prev + 1
            clearInterval(interval)
            return prev
          })
        }, 100)
        return () => clearInterval(interval)
      }, 500)
      
      return () => {
        clearTimeout(ageTimer)
        clearTimeout(expTimer)
      }
    }
  }, [inView])

  return (
    <motion.section
      ref={ref}
      id="about"
      className="section about-section"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          About Me
        </motion.h2>
        
        <motion.div 
          className="underline"
          initial={{ width: 0 }}
          animate={inView ? { width: '80px' } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
      
      <div className="about-content">
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>
            Saya frontend developer yang berfokus pada React 19, TypeScript, Laravel & UI modern.
          </p>
          <p>
            Dengan pengalaman {experience}+ tahun dalam pengembangan web, saya bersemangat menciptakan pengalaman pengguna yang menarik dan fungsional.
          </p>
          <p>
            Saat ini, saya berusia {age} tahun dan terus memperluas pengetahuan saya dalam teknologi web terkini.
          </p>
        </motion.div>
        
        <motion.div 
          className="about-stats"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="stat-card">
            <h3>{experience}+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-card">
            <h3>20+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>Client Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
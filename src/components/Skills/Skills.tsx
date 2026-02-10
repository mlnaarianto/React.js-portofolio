import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import styles from './Skills.module.css'

const skills = [
  { name: 'PHP Native', level: 90, color: '#6C63FF' },     // ungu lembut
  { name: 'Laravel', level: 85, color: '#FF6B6B' },        // merah soft
  { name: 'CodeIgniter', level: 85, color: '#F4A261' },     // oranye pastel
  { name: 'Flutter', level: 75, color: '#4D96FF' },         // biru cerah lembut
  { name: 'IoT', level: 70, color: '#43AA8B' },             // hijau teal soft
  { name: 'React', level: 75, color: '#61C0BF' },           // cyan lembut
  { name: 'MySQL', level: 85, color: '#577590' }            // biru abu elegan
]



export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [animatedLevels, setAnimatedLevels] = useState(skills.map(() => 0))
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedLevels(prev => {
            const newLevels = [...prev]
            let allComplete = true
            
            for (let i = 0; i < newLevels.length; i++) {
              if (newLevels[i] < skills[i].level) {
                newLevels[i] = Math.min(newLevels[i] + 2, skills[i].level)
                allComplete = false
              }
            }
            
            if (allComplete) {
              clearInterval(interval)
            }
            
            return newLevels
          })
        }, 20)
        
        return () => clearInterval(interval)
      }, 200)
      
      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <motion.section
      ref={ref}
      id="skills"
      className={`${styles.section} skills-section`}
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
          Skills
        </motion.h2>
        
        <motion.div 
          className={styles.underline}
          initial={{ width: 0 }}
          animate={inView ? { width: '80px' } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
      
      <div className={styles.skillsContainer}>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              className={styles.skillCard}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <div className={styles.skillHeader}>
                <h3>{skill.name}</h3>
                <span>{animatedLevels[index]}%</span>
              </div>
              <div className={styles.skillBarContainer}>
                <motion.div 
                  className={styles.skillBar}
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${animatedLevels[index]}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + 0.1 * index }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
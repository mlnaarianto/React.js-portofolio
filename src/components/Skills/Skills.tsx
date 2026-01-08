import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import styles from './Skills.module.css'

const skills = [
  { name: 'React', level: 90, color: '#61DAFB' },
  { name: 'TypeScript', level: 85, color: '#3178C6' },
  { name: 'Laravel', level: 75, color: '#FF2D20' },
  { name: 'Tailwind', level: 88, color: '#06B6D4' },
  { name: 'MySQL', level: 70, color: '#4479A1' },
  { name: 'Next.js', level: 80, color: '#000000' },
  { name: 'Node.js', level: 65, color: '#339933' },
  { name: 'Figma', level: 75, color: '#F24E1E' }
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
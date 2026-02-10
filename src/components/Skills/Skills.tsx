import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Skills.module.css'

const skills = [
  { name: 'PHP Native', level: 90, color: '#6C63FF' },
  { name: 'Laravel', level: 85, color: '#FF6B6B' },
  { name: 'CodeIgniter', level: 85, color: '#F4A261' },
  { name: 'Flutter', level: 75, color: '#4D96FF' },
  { name: 'IoT', level: 70, color: '#43AA8B' },
  { name: 'React', level: 75, color: '#61C0BF' },
  { name: 'MySQL', level: 85, color: '#577590' }
]

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  return (
    <motion.section
      ref={ref}
      id="skills"
      className={`${styles.section} skills-section`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER */}
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

      {/* GRID */}
      <div className={styles.skillsContainer}>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={styles.skillCard}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.skillHeader}>
                <h3>{skill.name}</h3>
                <span>{skill.level}%</span>
              </div>

              <div className={styles.skillBarContainer}>
                <motion.div
                  className={styles.skillBar}
                  style={{
                    backgroundColor: skill.color,
                    transformOrigin: 'left'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: skill.level / 100 } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.2 + 0.1 * index,
                    ease: 'easeOut'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

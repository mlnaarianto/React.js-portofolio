import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import styles from './Projects.module.css'

const projects = [

  {
    title: 'Inventory Borrowing Website (PHP Native)',
    description: 'A web-based inventory borrowing management system built using native PHP and MySQL. Features include item management, borrowing and returning records, admin dashboard, and user authentication.',
    tags: ['PHP', 'MySQL'],
    image: 'https://picsum.photos/seed/borrow/600/400.jpg',
    github: 'https://github.com/mlnaarianto/inventaris-barang',
    demo: ''
  },

  {
    title: 'Room Practice Website',
    description: 'A room practice management website built with Laravel. Features include room scheduling, booking system, admin dashboard, and user authentication.',
    tags: ['PHP', 'Laravel', 'MySQL'],
    image: 'https://picsum.photos/seed/room/600/400.jpg',
    github: 'https://github.com/mlnaarianto/Room-Practice',
    demo: ''
  },
  {
    title: 'IoT Printer Server with RFID',
    description: 'An IoT-based printer server deployment system built on ARM architecture with RFID card authentication. This project enables centralized printer management, secure access control, and real-time monitoring.',
    tags: ['IoT', 'Laravel', 'MySQL'],
    image: 'https://picsum.photos/seed/iot/600/400.jpg',
    github: 'https://github.com/mlnaarianto/Printer-server-with-RFID-Card-IoT',
    demo: ''
  },
  {
    title: 'Online Store Application (CodeIgniter 4)',
    description: 'An online store web application built using PHP and the CodeIgniter 4 framework. Features include product management, shopping cart, user authentication, and order processing.',
    tags: ['PHP', 'CodeIgniter', 'MySQL'],
    image: 'https://picsum.photos/seed/company/600/400.jpg',
    github: 'https://github.com/mlnaarianto/Aplication-Store-with-code-igniter-4',
    demo: ''
  },

  {
    title: 'Personal Portfolio Website',
    description: 'A modern and responsive personal portfolio website built using React, TypeScript, and Vite. Integrated with Framer Motion for smooth animations and ESLint for code quality, featuring fast development with HMR and a clean UI design.',
    tags: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    image: 'https://picsum.photos/seed/portfolio/600/400.jpg',
    github: 'https://github.com/mlnaarianto/React.js-portofolio',
    demo: ''
  },
  {
    title: 'SITS Polibatam',
    description: 'A training and certification management web application for Polibatam built using Laravel. The system integrates REST API services for data communication, enabling efficient participant management, scheduling, and certification tracking.',
    tags: ['PHP', 'Laravel', 'MySQL', 'REST API'],
    image: 'https://picsum.photos/seed/picsum/600/400.jpg',
    github: 'https://github.com/mlnaarianto/pelatihan',
    demo: ''
  }

]

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [filter, setFilter] = useState('all')

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter(project =>
        project.tags.some(tag =>
          tag.toLowerCase().includes(filter.toLowerCase())
        )
      )

  return (
    <motion.section
      ref={ref}
      id="projects"
      className={`${styles.section} projects-section`}
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
          Projects
        </motion.h2>

        <motion.div
          className={styles.underline}
          initial={{ width: 0 }}
          animate={inView ? { width: '80px' } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>

      {/* FILTER */}
      <motion.div
        className={styles.filterButtons}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {['all', 'PHP', 'laravel', 'react', 'iot', 'codeigniter'].map(f => (
          <motion.button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            className={styles.projectCard}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -10 }}
          >
            <div className={styles.projectImage}>
              <img src={project.image} alt={project.title} />
              <div className={styles.projectOverlay}>
                <div className={styles.projectLinks}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.projectContent}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className={styles.projectTags}>
                {project.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

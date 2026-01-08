import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

const projects = [
  {
    title: 'Sistem Tracking Bus Trans Batam',
    description: 'Aplikasi pelacakan real-time untuk armada bus Trans Batam dengan integrasi GPS dan peta interaktif.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    image: 'https://picsum.photos/seed/bus/600/400.jpg',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    title: 'AI Detector Plagiarisme',
    description: 'Sistem berbasis AI untuk mendeteksi plagiarisme dalam dokumen akademis dengan tingkat akurasi tinggi.',
    tags: ['Python', 'TensorFlow', 'React', 'Flask'],
    image: 'https://picsum.photos/seed/plagiarism/600/400.jpg',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    title: 'Dashboard GPS Monitoring',
    description: 'Dashboard monitoring untuk melacak kendaraan perusahaan dengan visualisasi data real-time.',
    tags: ['React', 'TypeScript', 'Laravel', 'MySQL'],
    image: 'https://picsum.photos/seed/dashboard/600/400.jpg',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    title: 'E-Commerce Platform',
    description: 'Platform e-commerce lengkap dengan sistem pembayaran terintegrasi dan manajemen inventaris.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    image: 'https://picsum.photos/seed/ecommerce/600/400.jpg',
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
]

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [filter, setFilter] = useState('all')
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())))

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="section projects-section"
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
          Projects
        </motion.h2>
        
        <motion.div 
          className="underline"
          initial={{ width: 0 }}
          animate={inView ? { width: '80px' } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
      
      <motion.div 
        className="filter-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {['all', 'react', 'node', 'python'].map((f) => (
          <motion.button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </motion.button>
        ))}
      </motion.div>
      
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -10 }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <div className="project-links">
                  <motion.a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt />
                  </motion.a>
                </div>
              </div>
            </div>
            
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
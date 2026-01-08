import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import profileImg from '../assets/images/which.png'

export default function Hero() {
  const [text, setText] = useState('')
  const fullText = "Frontend Developer · React 19 · TypeScript"
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(prev => prev + fullText.charAt(index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [])

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      className="hero"
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1>Hello, I'm <span className="highlight">Maulana Arianto</span></motion.h1>

          <motion.div className="typewriter">
            <p>{text}<span className="cursor">|</span></p>
          </motion.div>

          <motion.p className="hero-subtitle">
            Hello what's up :3
          </motion.p>

          <motion.div className="hero-buttons">
            <motion.button 
              className="primary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </motion.button>
            
            <motion.button 
              className="secondary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div className="hero-image">
          <div className="profile-image">
            <img src={profileImg} alt="Profile" />
          </div>
        </motion.div>
      </div>

      <motion.div className="scroll-indicator" onClick={scrollToNext}>
        <FaArrowDown />
      </motion.div>
    </motion.section>
  )
}

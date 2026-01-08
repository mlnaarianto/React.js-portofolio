import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <motion.div 
          className="footer-info"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Get In Touch</h2>
          <p>
            Feel free to reach out to me for any questions or opportunities.
          </p>
          
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope />
              <span>maulana@example.com</span>
            </div>
            <div className="contact-item">
              <FaPhone />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>Batam, Indonesia</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="footer-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows={5} required></textarea>
            </div>
            <motion.button 
              type="submit" 
              className="primary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
      
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="social-links">
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            <FaTwitter />
          </motion.a>
        </div>
        
        <p>© {currentYear} Maulana. All rights reserved.</p>
      </motion.div>
    </footer>
  )
}
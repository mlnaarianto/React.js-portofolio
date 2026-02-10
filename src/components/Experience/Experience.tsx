import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./Experience.module.css";

type ExperienceItem = {
  title: string;
  company: string;
  date: string;
  description: string;
  type: "experience" | "certificate";
};

const data: ExperienceItem[] = [
  {
    title: "Frontend Developer Intern",
    company: "PT Teknologi Nusantara",
    date: "Jan 2024 - Jun 2024",
    description:
      "Mengembangkan UI menggunakan React dan Tailwind, integrasi REST API, serta meningkatkan performa aplikasi.",
    type: "experience",
  },
  {
    title: "Web Developer",
    company: "Freelance Project",
    date: "2023 - Sekarang",
    description:
      "Membuat website portfolio dan company profile menggunakan React dan Laravel.",
    type: "experience",
  },
  {
    title: "React Developer Certificate",
    company: "Dicoding Indonesia",
    date: "2023",
    description:
      "Sertifikasi resmi React Developer mencakup component, hooks, dan state management.",
    type: "certificate",
  },
  {
    title: "Fullstack Web Development",
    company: "Binar Academy",
    date: "2022",
    description:
      "Pelatihan intensif fullstack menggunakan Laravel, MySQL, dan React.",
    type: "certificate",
  },
];

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const experiences = data.filter(item => item.type === "experience");
  const certificates = data.filter(item => item.type === "certificate");

  return (
    <motion.section
      ref={ref}
      id="experience"
      className={styles.section}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* ===== HEADER ===== */}
      <div className={styles.sectionHeader}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Experience & Certificates
        </motion.h2>

        <motion.div
          className={styles.underline}
          initial={{ width: 0 }}
          animate={inView ? { width: "120px" } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className={styles.columns}>
        {/* LEFT - EXPERIENCE */}
        <div>
          <motion.h3
            className={styles.columnTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Experience
          </motion.h3>

          <div className={styles.grid}>
            {experiences.map((item, index) => (
              <motion.div
                key={index}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <span className={`${styles.badge} ${styles.experience}`}>
                  Experience
                </span>

                <h3>{item.title}</h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.date}>{item.date}</p>
                <p className={styles.description}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT - CERTIFICATE */}
        <div>
          <motion.h3
            className={styles.columnTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Certificates
          </motion.h3>

          <div className={styles.grid}>
            {certificates.map((item, index) => (
              <motion.div
                key={index}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <span className={`${styles.badge} ${styles.certificate}`}>
                  Certificate
                </span>

                <h3>{item.title}</h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.date}>{item.date}</p>
                <p className={styles.description}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

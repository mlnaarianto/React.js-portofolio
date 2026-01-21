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

const Experience = () => {
  const experiences = data.filter(item => item.type === "experience");
  const certificates = data.filter(item => item.type === "certificate");

  return (
    <section className={styles.section} id="experience">
      <div className={styles.sectionHeader}>
        <h2>Experience & Certificates</h2>
        <div className={styles.underline} />
      </div>

      <div className={styles.columns}>
        {/* LEFT - EXPERIENCE */}
        <div>
          <h3 className={styles.columnTitle}>Experience</h3>
          <div className={styles.grid}>
            {experiences.map((item, index) => (
              <div key={index} className={styles.card}>
                <span className={`${styles.badge} ${styles.experience}`}>
                  Experience
                </span>

                <h3>{item.title}</h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.date}>{item.date}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - CERTIFICATE */}
        <div>
          <h3 className={styles.columnTitle}>Certificates</h3>
          <div className={styles.grid}>
            {certificates.map((item, index) => (
              <div key={index} className={styles.card}>
                <span className={`${styles.badge} ${styles.certificate}`}>
                  Certificate
                </span>

                <h3>{item.title}</h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.date}>{item.date}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

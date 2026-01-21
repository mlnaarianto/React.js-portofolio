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
      "Developed UI using React and Tailwind, integrated REST APIs, and improved application performance.",
    type: "experience",
  },
//   {
//     title: "Web Developer",
//     company: "Freelance Project",
//     date: "2023 - Present",
//     description:
//       "Created portfolio websites and company profiles using React and Laravel.",
//     type: "experience",
//   },
  {
    title: "React Developer Certificate",
    company: "Dicoding Indonesia",
    date: "2023",
    description:
      "Official React Developer certification covering components, hooks, and state management.",
    type: "certificate",
  },
  {
    title: "Fullstack Web Development",
    company: "Binar Academy",
    date: "2022",
    description:
      "Intensive fullstack training using Laravel, MySQL, and React.",
    type: "certificate",
  },
];

const Experience = () => {
  return (
    <section className={styles.section} id="experience">
      <div className={styles.sectionHeader}>
        <h2>Experience & Certificates</h2>
        <div className={styles.underline} />
      </div>

      <div className={styles.timeline}>
        {data.map((item, index) => (
          <div key={index} className={styles.timelineItem}>
            {/* Timeline dot with different colors for each type */}
            <div className={`${styles.timelineDot} ${styles[item.type]}`}></div>
            
            {/* Content card with different styles for each type */}
            <div className={`${styles.timelineContent} ${styles[item.type]}`}>
              {/* Badge */}
              <span
                className={`${styles.badge} ${
                  item.type === "experience"
                    ? styles.experienceBadge
                    : styles.certificateBadge
                }`}
              >
                {item.type === "experience" ? "Experience" : "Certificate"}
              </span>

              <h3>{item.title}</h3>
              <h4 className={styles.company}>{item.company}</h4>
              <span className={styles.date}>{item.date}</span>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
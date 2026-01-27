import styles from "./Timeline.module.css";

const timelineData = [
  {
    date: "2025.10",
    version: "36",
    scope: "Research",
    title: "AIチューターの研究開始",
    summary: "オンラインで自学自習が可能な、生成AIによるチューターの開発に着手",
  },
  {
    date: "2023.3",
    version: "34",
    scope: "Job",
    title: "神山まるごと高専　助教に着任",
    summary: "テクノロジー系専門教員として新しい学校の立ち上げに参加",
  },
  {
    date: "2016.4",
    version: "27",
    scope: "Job",
    title: "仙台高専　助教に着任",
    summary: "学科改組に伴う新コース（ロボティクスコース）の立ち上げに関わる",
  },
  {
    date: "2016.3",
    version: "27",
    scope: "Academic",
    title: "大学院を修了",
    summary: "長岡技術科学大学大学院工学研究科　博士後期課程修了　博士（工学）",
  },
  {
    date: "2009.3",
    version: "20",
    scope: "Academic",
    title: "高専を卒業",
    summary: "プログラミング・電子回路・電気回路について学ぶ",
  },
];

export default function Timeline() {

  return (
    <div className={styles.timeline}>
      <div className={styles.header}>
        <h2>Lifelog <span> / 来歴</span></h2>
        <span className={styles.mono}>Activity</span>
      </div>

      <div className={styles.timelineList}>
        {timelineData.map((item, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineMeta}>
                <span className={styles.date}>{item.date}</span>
                <span className={styles.version}>v{item.version}</span>
                <span className={styles.scope}>{item.scope}</span>
              </div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.summary}>{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


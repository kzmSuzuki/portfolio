import styles from "./ReleaseList.module.css"


const RELEASE_DATA = 
{
  type: "教材",
  status: "active",
  version: "0.2",
  title: "自学自習型 Webプログラミング教材",
  desc: "授業と自走学習の境界を溶かす旗艦プロダクト。",
  learners: "高専3年生",
  mechanism: "段階習得 + AIによるレビュー + マイルストーン課題",
};

export default function ReleaseList() {
	return(
		<div className={styles.cardWrap}>
			<div className={styles.card}>
				<div className={styles.termBadges}>
					<span className={styles.badge}>{RELEASE_DATA.type}</span>
					<span className={styles.badge}>{RELEASE_DATA.status}</span>
					<span className={styles.badge}>v{RELEASE_DATA.version}</span>
				</div>
				<h3>{RELEASE_DATA.title}</h3>
				<p className={styles.desc}>{RELEASE_DATA.desc}</p>
				<div className={styles.kv}>
					<div>Learners
					</div>
					<div>{RELEASE_DATA.learners}</div>
					<div>Mechanism</div>
					<div>{RELEASE_DATA.mechanism}</div>
					</div>
			</div>
		</div>
	)
}
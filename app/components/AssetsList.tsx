import styles from "./AssetsList.module.css"


const ASSETS_DATA = 
{
  type: "授業資料",
  status: "stable",
  version: "0.1.27",
  title: "授業スライド（アルゴリズム）",
  desc: "探索・整列といった基礎から、セキュリティのアルゴリズムまで。",
  learners: "高専3年生",
  mechanism: "小単位・復習活用",
};

export default function AssetsList() {
	return(
		<div className={styles.cardWrap}>
			<div className={styles.card}>
				<div className={styles.termBadges}>
					<span className={styles.badge}>{ASSETS_DATA.type}</span>
					<span className={styles.badge}>{ASSETS_DATA.status}</span>
					<span className={styles.badge}>v{ASSETS_DATA.version}</span>
				</div>
				<h3>{ASSETS_DATA.title}</h3>
				<p className={styles.desc}>{ASSETS_DATA.desc}</p>
				<div className={styles.kv}>
					<div>Learners
					</div>
					<div>{ASSETS_DATA.learners}</div>
					<div>Mechanism</div>
					<div>{ASSETS_DATA.mechanism}</div>
					</div>
			</div>
		</div>
	)
}
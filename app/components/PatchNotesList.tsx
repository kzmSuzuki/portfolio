import styles from "./PatchNotesList.module.css"


const PATCH_NOTES_DATA = [
    {
        id: "pt-013",
        date: "2026/3/1",
        version: "0.1.2",
        scope: "Modules",
        title: "授業資料の公開",
        summary: "アルゴリズムの授業資料を公開しました",
        details: ["第27回　素数判定","第28回　クラスタリング"],
        tags: ["classroom", "algorithm"],
      },
    {
      id: "pt-012",
      date: "2026/2/22",
      version: "0.1.1",
      scope: "Flagship",
      title: "AIチューターの研究進捗の更新",
      summary: "AIチューターのトライアルの研究進捗を更新しました。",
      details: [
        "会話UIの改善",
        "会話履歴の集約",
      ],
      tags: ["ai", "product", "research"],
    },
    {
      id: "pt-011",
      date: "2026/1/1",
      version: "0.1",
      scope: "Other",
      title: "ポートフォリオサイトの公開",
      summary: "ポートフォリオサイト(ベータ版)を公開しました。",
      details: [],
      tags: ["research", "evidence"],
    },
  ]

export default function PatchNotesList() {
    return(
        <div className={styles.patchWrap}>
            {PATCH_NOTES_DATA.map((patchNote) => (
                <div key={patchNote.id} className={styles.patchItem}>
                    <div>
                        <div className={styles.patchMeta}>{patchNote.date}</div>
                        <div className={styles.patchVersion}>v{patchNote.version}</div>
                        <div className={styles.patchMeta}>{patchNote.scope}</div>
                    </div>
                    <div className={styles.patchBody}>
                        <h4>{patchNote.title}</h4>
                        <p>{patchNote.summary}</p>
                        <ul>
                            {patchNote.details.map((detail,index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                        <div className={styles.patchTags}>
                            {patchNote.tags.map((tag) => (
                                <span key={tag} className={styles.badge}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
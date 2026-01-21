import styles from "./ProfileSidebar.module.css";
import { Fragment } from "react";

export default function ProfileSidebar() {
  const profileData = {
    initials: "KZM",
    name: "Kzm",
    handle: "Kazuma Suzuki / 鈴木知真",
    bio: 
    `こんにちは！Kzmです。

高専でプログラミング関連の授業を担当している教員です。現在、教育現場におけるAI活用やDX推進に力を入れています。教育機関はまだまだAI活用やDXが進んでいない領域の一つです。私自身がその架け橋になれればと考えています。このサイトでは、日々の授業で見て感じた課題をもとに開発したアプリケーションを紹介しています。

少しでも興味を持っていただければ幸いです。`,
    meta: [
      ["Role", "Educator × Developer"],
      ["Focus", "AI教育活用"],
      ["Classes Taught", "Webプログラミング / アルゴリズム / 基礎プログラミング（C言語）"],
      ["Degree", "Ph.D. of Engineering / 博士（工学）"],
      ["Research Interests", "AI / Robotics / IoT / Education"],
    ]
  };

  return (
    <aside className={styles.sidebar}>
      <img src="portrait.png" alt="Portrait" className={styles.avatar} />
      <h3 className={styles.name}>{profileData.name}</h3>
      <div className={styles.handle}>{profileData.handle}</div>
      <div className={styles.socialLinks}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X (Twitter)">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
      <p className={styles.bio}>{profileData.bio}</p>

      <div className={styles.meta}>
        {profileData.meta.map(([key, value], index) => (
          <Fragment key={`${index}-meta`}>
            <div><b>{key}</b></div>
            <div>{value}</div>
          </Fragment>
        ))}
      </div>

      <div className={styles.spacer}></div>

   

      <div className={styles.spacer}></div>
      <button className={styles.btn}>Contact</button>
    </aside>
  );
}


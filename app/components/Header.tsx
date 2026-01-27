import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {

  return (
    <div className={styles.top}>
      <div className={styles.wrap}>
        <div className={styles.brand}>
          <span className={styles.dot}></span>
          <span>Blueprint v.0.1(beta)</span>
          <span style={{ opacity: 0.6 }}>- Kzm's portfolio</span>
        </div>
        <div className={styles.nav}>
          <Link href="/">Top</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products & Assets</Link>
          <button>contact</button>
        </div>
      </div>
    </div>
  );
}

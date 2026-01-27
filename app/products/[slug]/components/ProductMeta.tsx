import styles from "./ProductMeta.module.css";
import type { Product } from "../../data/productsData";

interface ProductMetaProps {
  product: Product;
}

// 相対時間を計算する関数
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  if (diffInMonths > 0) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  if (diffInDays > 0) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  if (diffInHours > 0) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInMinutes > 0) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  return 'just now';
}

const statusLabels: { [key: string]: string } = {
  active: "Active",
  beta: "Beta",
  development: "In Development",
};

export default function ProductMeta({ product }: ProductMetaProps) {
  return (
    <aside className={styles.meta}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>About</h3>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Type</span>
            <span className={styles.value}>{product.type}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Status</span>
            <span className={styles.statusBadge}>{statusLabels[product.status]}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Category</span>
            <span className={styles.value}>{product.category}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Updated</span>
            <span className={styles.value}>{getRelativeTime(product.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Target Learner</h3>
        <p className={styles.learnerText}>{product.learner}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Learning Mechanism</h3>
        <p className={styles.mechanismText}>{product.mechanism}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Tech Stack</h3>
        <div className={styles.techList}>
          {product.techStack.map((tech, index) => (
            <span key={index} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Key Features</h3>
        <ul className={styles.featuresList}>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

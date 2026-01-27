import styles from "./ProductList.module.css";
import type { FilterType, StatusType } from "../page";
import { productsData } from "../data/productsData";
import Link from "next/link";

interface ProductListProps {
  filterType: FilterType;
  selectedStatus: StatusType | null;
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

export default function ProductList({
  filterType,
  selectedStatus,
}: ProductListProps) {
  // フィルタリングロジック
  const filteredProducts = productsData.filter((product) => {
    // Type フィルター
    if (filterType === "products" && product.type !== "Product") return false;
    if (filterType === "assets" && product.type !== "Asset") return false;

    // Status フィルター
    if (selectedStatus && product.status !== selectedStatus) return false;

    return true;
  });

  return (
    <div className={styles.productList}>
      <div className={styles.header}>
        <h2>Products & Assets <span> / 教育用プロダクト・授業資料・教材</span></h2>
        <span className={styles.mono}>{filteredProducts.length} Items</span>
      </div>

      <div className={styles.list}>
        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>該当するアイテムが見つかりませんでした。</p>
            <p className={styles.emptyHint}>フィルターを変更してお試しください。</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <Link key={index} href={`/products/${product.slug}`} className={styles.repoItemLink}>
              <div className={styles.repoItem}>
                <div className={styles.repoImage}>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className={styles.repoMain}>
                  <div className={styles.repoHeader}>
                    <h3 className={styles.repoTitle}>
                      {product.title}
                    </h3>
                    <span className={styles.statusBadge}>
                      {statusLabels[product.status]}
                    </span>
                  </div>

                  <div className={styles.repoType}>{product.type}</div>

                  <p className={styles.repoDescription}>{product.description}</p>

                  <div className={styles.repoDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Learner</span>
                      <span className={styles.detailValue}>{product.learner}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Mechanism</span>
                      <span className={styles.detailValue}>{product.mechanism}</span>
                    </div>
                  </div>

                  <div className={styles.repoMeta}>
                    <span className={styles.metaItem}>Updated {getRelativeTime(product.createdAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

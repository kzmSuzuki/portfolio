import styles from "./ProductSidebar.module.css";
import type { FilterType, StatusType } from "../page";

interface ProductSidebarProps {
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  selectedStatus: StatusType | null;
  setSelectedStatus: (status: StatusType | null) => void;
}

export default function ProductSidebar({
  filterType,
  setFilterType,
  selectedStatus,
  setSelectedStatus,
}: ProductSidebarProps) {
  const filters = [
    { name: "All", value: "all" as FilterType, count: 7 },
    { name: "Products", value: "products" as FilterType, count: 4 },
    { name: "Assets", value: "assets" as FilterType, count: 3 },
  ];

  const statuses = [
    { name: "Active", value: "active" as StatusType, count: 4, color: "var(--muted)" },
    { name: "Beta", value: "beta" as StatusType, count: 1, color: "var(--muted)" },
    { name: "In Development", value: "development" as StatusType, count: 2, color: "var(--muted)" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Filter</h3>
        <div className={styles.filterList}>
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`${styles.filterItem} ${filterType === filter.value ? styles.active : ''}`}
              onClick={() => setFilterType(filter.value)}
            >
              <span>{filter.name}</span>
              <span className={styles.count}>{filter.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Status</h3>
        <div className={styles.statusList}>
          {statuses.map((status, index) => (
            <div
              key={index}
              className={`${styles.statusItem} ${selectedStatus === status.value ? styles.active : ''}`}
              onClick={() => setSelectedStatus(selectedStatus === status.value ? null : status.value)}
            >
              <div
                className={styles.statusDot}
                style={{ background: status.color }}
              ></div>
              <span className={styles.statusName}>{status.name}</span>
              <span className={styles.count}>{status.count}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

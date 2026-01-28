"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductSidebar from "@/app/products/components/ProductSidebar";
import ProductList from "@/app/products/components/ProductList";
import styles from "./page.module.css";

export type FilterType = "all" | "products" | "assets";
export type StatusType = "active" | "beta" | "development";

// useSearchParams()を使用するコンポーネントを分離
function ProductsContent() {
    const searchParams = useSearchParams();
    const filterParam = searchParams.get("filter") as FilterType | null;

    const [filterType, setFilterType] = useState<FilterType>("all");
    const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);
    const [mounted, setMounted] = useState(false);

    // URLパラメータからフィルタを設定
    useEffect(() => {
        if (filterParam && (filterParam === "products" || filterParam === "assets" || filterParam === "all")) {
            setFilterType(filterParam);
        }
    }, [filterParam]);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <main className={`${styles.main} ${mounted ? styles.fadeIn : ""}`}>
            <div className={styles.layout}>
                <ProductList
                    filterType={filterType}
                    selectedStatus={selectedStatus}
                />
                <ProductSidebar
                    filterType={filterType}
                    setFilterType={setFilterType}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
            </div>
        </main>
    );
}

export default function ProductsPage() {
    return (
        <>
            <Header />
            <Suspense fallback={
                <main className={styles.main}>
                    <div className={styles.layout}>
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                            Loading...
                        </div>
                    </div>
                </main>
            }>
                <ProductsContent />
            </Suspense>
            <Footer />
        </>
    );
}

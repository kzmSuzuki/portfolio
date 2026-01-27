"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductSidebar from "@/app/products/components/ProductSidebar";
import ProductList from "@/app/products/components/ProductList";
import styles from "./page.module.css";

export type FilterType = "all" | "products" | "assets";
export type StatusType = "active" | "beta" | "development";

export default function ProductsPage() {
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
        <>
            <Header />
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
            <Footer />
        </>
    );
}

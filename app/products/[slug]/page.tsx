"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { productsData } from "../data/productsData";
import ProductReadme from "./components/ProductReadme";
import ProductMeta from "./components/ProductMeta";
import styles from "./page.module.css";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [mounted, setMounted] = useState(false);

  const product = productsData.find(p => p.slug === slug);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!product) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.notFound}>
            <h1>404</h1>
            <p>Product not found</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={`${styles.main} ${mounted ? styles.fadeIn : ""}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.description}>{product.description}</p>
          </div>

          <div className={styles.layout}>
            <ProductReadme product={product} />
            <ProductMeta product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

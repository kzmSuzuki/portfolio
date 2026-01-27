"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProfileSidebar from "@/app/about/components/ProfileSidebar";
import Timeline from "@/app/about/components/Timeline";
import styles from "./page.module.css";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Header />
      <main className={`${styles.main} ${mounted ? styles.fadeIn : ""}`}>
        <div className={styles.layout}>
          <ProfileSidebar />
          <Timeline />
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProfileSidebar from "@/app/about/components/ProfileSidebar";
import Timeline from "@/app/about/components/Timeline";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // localStorageからTerminalの状態を確認
    if (typeof window !== "undefined") {
      const phase = localStorage.getItem("terminalPhase");
      if (phase !== "open") {
        router.push("/");
      } else {
        setIsOpen(true);
      }
    }
  }, [router]);

  // ローディング中は何も表示しない
  if (isOpen === null) {
    return null;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.layout}>
          <ProfileSidebar />
          <Timeline />
        </div>
      </main>
      <Footer />
    </>
  );
}

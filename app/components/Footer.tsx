"use client";

import styles from "./Footer.module.css";
import { useEffect, useRef } from "react";

export default function Footer() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px 50px 0px",
      threshold: 0.01
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);

    if (wrapRef.current) {
      observer.observe(wrapRef.current);
    }

    return () => {
      if (wrapRef.current) {
        observer.unobserve(wrapRef.current);
      }
    };
  }, []);

  return (
        <div ref={wrapRef} className={styles.wrap}>
            <div className={styles.foot}>
            <small>Blueprint v.0.1(beta) — Kzm's portfolio</small>
            </div>
        </div>
  );
}
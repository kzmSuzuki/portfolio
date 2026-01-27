"use client";

import styles from "./MainComponent.module.css";
import PatchNotesList from "./PatchNotesList";
import ReleaseList from "./ReleaseList";
import AssetsList from "./AssetsList";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";


export default function MainComponent({ onConceptVisible }: { onConceptVisible?: (visible: boolean) => void } = {}) {
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const kzmIllustRef = useRef<HTMLImageElement>(null);
  const kzmMessageRef = useRef<HTMLImageElement>(null);
  const pillRowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleDescRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const techRef = useRef<HTMLSpanElement>(null);
  const designRef = useRef<HTMLSpanElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);





  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);

          // imgWrapperが表示されたら、少し遅延してから画像アニメーションを開始
          if (entry.target === imgWrapperRef.current) {
            setTimeout(() => {
              if (kzmIllustRef.current) {
                kzmIllustRef.current.classList.add(styles.isAnimated);
              }
              setTimeout(() => {
                if (kzmMessageRef.current) {
                  kzmMessageRef.current.classList.add(styles.isAnimated);
                  // アニメーション完了を待つ
                  setTimeout(() => {
                    setInitialAnimationDone(true);
                  }, 500); // poyoyonアニメーションの長さ
                }
              }, 500); // kzm_messageはさらに100ms遅延
            }, 500); // imgWrapper表示後200ms遅延
          }

          // taglineが表示されたら、technology と design のアニメーションを開始
          if (entry.target === taglineRef.current) {
            if (techRef.current) {
              techRef.current.classList.add(styles.animate);
            }
            if (designRef.current) {
              designRef.current.classList.add(styles.animate);
            }
          }
        }
      });
    }, observerOptions);

    // Conceptセクション専用のObserver（もっと深くスクロールしてから検知）
    const conceptObserverOptions = {
      root: null,
      rootMargin: "0px 0px -400px 0px", // より厳しい条件
      threshold: 0.1
    };

    const conceptObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === sectionRefs.current[0]) {
          if (entry.isIntersecting) {
            onConceptVisible?.(true);
          } else {
            onConceptVisible?.(false);
          }
        }
      });
    }, conceptObserverOptions);

    const elements = [
      imgWrapperRef.current,
      pillRowRef.current,
      titleRef.current,
      titleDescRef.current,
      taglineRef.current,
      heroDescRef.current,
      ...sectionRefs.current
    ].filter(Boolean);

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Conceptセクションのみ専用Observerで監視
    if (sectionRefs.current[0]) {
      conceptObserver.observe(sectionRefs.current[0]);
    }

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      if (sectionRefs.current[0]) {
        conceptObserver.unobserve(sectionRefs.current[0]);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/about">
        <div
          ref={imgWrapperRef}
          className={styles.imgWrapper}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img ref={kzmIllustRef} className={styles.kzm_illust} src="/kzm_illust.png" alt="Kzm" />
          <img
            ref={kzmMessageRef}
            className={`${styles.kzm_message} ${initialAnimationDone && !isHovered ? styles.visible : ''}`}
            src="/message.png"
            alt="Hi! I'm Kzm"
          />
          <img
            className={`${styles.kzm_message} ${styles.kzm_message_hover} ${initialAnimationDone && isHovered ? styles.visible : ''}`}
            src="/click_to_view.png"
            alt="Click to view"
          />
          <p className={styles.toMyPage}>Who's Kzm?  {'>>'}</p>
        </div>
      </Link>
      <div ref={pillRowRef} className={styles.pillRow}>
        <span className={styles.pill}>CLASSROOM RUNTIME</span>
      </div>
      <h1 ref={titleRef} className={styles.title}>Blueprint v.0.1 (beta)</h1>
      <p ref={titleDescRef} className={styles.titleDesc}>A public beta of my education blueprint.</p>
      <p ref={taglineRef} className={styles.tagline}>Leveraging [<span ref={techRef} className={styles.tech}>technology</span>] to re[<span ref={designRef} className={styles.design}>design</span>] the learning experience.</p>

      <div ref={(el) => { sectionRefs.current[0] = el; }} className={styles.concept} id="concept">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHead}>
            <h2>Concept</h2>
          </div>
        </div>
        <p className={styles.conceptDesc}> 学びは教材だけで決まりません。<br /><br />
          学び方・評価・運用・教材の形・教員の関わり方まで含めた“設計”によって、学習体験は立ち上がります。<br />
          私は教室で起きる詰まりや違和感を起点に、学びを設計し直し、実装し、現場で検証しながら更新していく<br />—— このサイトはその public beta です。<br /><br />
          近年、AIに代表されるテクノロジーの発展はめざましく、教育体験も大きく変わっていくはずです。<br /><br />
          ただし技術は主役ではありません。<br />
          重要なのは、人が学ぶときに生まれる摩擦を前進に変えること。<br />
          そのために、関心が生まれる入口、納得できる理由、自分の文脈に接続される導線、選択の余白を設計の核に置きます。<br /><br />
          成果は点数だけでは測れません。<br />
          学習者がその時間にコミットし、次の一歩を自分で選び、学びを教室の外のプロジェクトや表現へ接続し始めること。<br /><br />
          私はテックを学びのための道具として組み合わせ、細かな改善から新しい体験の創出まで、教室起点で教育を更新し続けます。</p>
      </div>

      <div ref={(el) => { sectionRefs.current[1] = el; }} className={styles.section} id="Flagship">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHead}>
            <span className={styles.mono}>Release</span>
            <h2>Flagship Products<span> / 教育用プロダクト</span></h2>
          </div>
        </div>
        <ReleaseList />
        <Link href="/products?filter=products" className={styles.link}>
          See more {'>>'}
        </Link>
      </div>

      <div ref={(el) => { sectionRefs.current[2] = el; }} className={styles.section} id="Flagship">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHead}>
            <span className={styles.mono}>Modules</span>
            <h2>Teaching Assets<span> / 授業資料・教材</span></h2>
          </div>
        </div>
        <AssetsList />
        <Link href="/products?filter=assets" className={styles.link}>
          See more {'>>'}
        </Link>
      </div>

      <div ref={(el) => { sectionRefs.current[3] = el; }} className={styles.section} id="Contact">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHead}>
            <span className={styles.mono}>Collab</span>
            <h2>Contact<span> / お問い合わせ</span></h2>
          </div>
        </div>
        <p className={styles.contactDesc}>このサイトや私についてご質問・コメントがありましたら、下記のフォームをご利用ください。</p>
        <button className={styles.contactBtn} >
          <span>お問い合わせフォームへ</span>
        </button>
      </div>
    </div>
  );
}
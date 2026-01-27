"use client";

import TerminalGate from "@/app/components/TerminalGate";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/app/components/Header"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/app/components/Footer"), {
  ssr: false,
});

const MainComponent = dynamic(() => import("@/app/components/MainComponent"), {
  ssr: false,
});

const prefetch = () => {
  import("@/app/components/Header");
  import("@/app/components/Footer");
  import("@/app/components/MainComponent");
}

type Phase = "locked" | "opening" | "open";


export default function Page() {
  // 初期状態は常に"locked"（SSRとクライアントで一致させる）
  const [phase, setPhase] = useState<Phase>("locked");
  const [mounted, setMounted] = useState(false);
  const [isConceptVisible, setIsConceptVisible] = useState(false);

  // マウント後にlocalStorageから読み取る
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("terminalPhase");
    if (saved === "open") {
      setPhase("open");
    }
  }, []);

  // phaseが変更されたらlocalStorageに保存
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("terminalPhase", phase);
    }
  }, [phase, mounted]);

  return (
    <>
      {phase === "open" && <Header />}
      {phase === "open" && <MainComponent onConceptVisible={setIsConceptVisible} />}
      {phase === "open" && <Footer />}
      <TerminalGate
        phase={phase}
        setPhase={setPhase}
        prefetch={prefetch}
        showConceptMode={isConceptVisible}
      />

    </>
  );
}

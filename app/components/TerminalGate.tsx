"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TerminalGate.module.css";

type Phase = "locked" | "opening" | "open";

type LineType = "output" | "command" | "error" | "warning";

interface Line {
  text: string;
  type: LineType;
}

export default function TerminalGate(props: { phase: Phase, setPhase: (phase: Phase) => void, prefetch: () => void }) {
  const { phase, setPhase, prefetch } = props;
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);

  const validCommands = useMemo(() => new Set(["start", "open", "enter", "boot"]), []);

  const initialLines: Line[] = useMemo(() => [
    { text: "Welcome! 👋", type: "output" },
    { text: "___________________", type: "output" },
    { text: "| Kzm's portfolio |", type: "output" },
    { text: "¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯", type: "output" },
    { text: "New education runtime is initializing...", type: "output" },
    { text: "Site ready. 🚀🚀🚀", type: "output" },
    { text: "Note: This is a public beta. Changes are expected.", type: "warning" },
  ], []);

  useEffect(() => {
    let currentIndex = 0;
    const timers: NodeJS.Timeout[] = [];

    initialLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        currentIndex++;
        
        if (currentIndex === initialLines.length) {
          setIsAnimating(false);
          setTimeout(() => {
    inputRef.current?.focus();
          }, 100);
        }
      }, index * 100); 

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [initialLines]);

  // linesが更新されたら自動スクロール
  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (cmdRaw: string) => {
    if (isAnimating) return;
    
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, { text: cmd, type: "command" }]);

    if (validCommands.has(cmd) && phase === "locked") {
      setLines((prev) => [...prev, { text: "OK. Loading...", type: "output" }]);
      setPhase("opening");

      // サイズ変化が完了後、移動アニメーション開始（700ms後にopen状態へ）
      window.setTimeout(() => setPhase("open"), 700);
      return;
    }

    setLines((prev) => [...prev, { text: "Command not found. Try `boot`.", type: "error" }]);
  };

  return (
    <div className={styles.stage} data-phase={phase}>
      {/* ターミナル */}
      <div className={styles.terminalWrap}>
        <div className={styles.terminal}>
          {/* ターミナルヘッダー */}
          <div className={styles.termHead}>
            <div className={styles.termTitle}>portfolio-terminal</div>
            <div className={styles.termBadges}>
              <span className={`${styles.badge} ${styles.accent}`}>beta</span>
              <span className={styles.badge}>interactive</span>
            </div>
          </div>

          {/* ターミナル本体 */}
          <div ref={termBodyRef} className={styles.termBody} onClick={() => inputRef.current?.focus()}>
            {lines.map((l, i) => (
              <div key={i} className={styles.line}>
                {l.type === "command" && (
                  <>
                    <span className={styles.prompt}>edu$</span>{" "}
                  </>
                )}
                <span className={
                  l.type === "output" ? styles.output : 
                  l.type === "error" ? styles.error : 
                  l.type === "warning" ? styles.warning :
                  styles.command
                }>
                  {l.text}
                </span>
              </div>
            ))}

            <div className={styles.promptLine}>
              <span className={styles.prompt}>edu$</span>
            <input
              ref={inputRef}
              value={input}
                onChange={(e) => {setInput(e.target.value); prefetch();}}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  runCommand(input);
                  setInput("");
                }
              }}
              className={styles.input}
              aria-label="terminal input"
                disabled={phase !== "locked" || isAnimating}
                placeholder={phase === "locked" && !isAnimating ? "type `boot` ..." : ""}
            />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

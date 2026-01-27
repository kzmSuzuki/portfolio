"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TerminalGate.module.css";

type Phase = "locked" | "opening" | "open";

type LineType = "output" | "command" | "error" | "warning";

interface Line {
  text: string;
  type: LineType;
}

export default function TerminalGate(props: { phase: Phase, setPhase: (phase: Phase) => void, prefetch: () => void, showConceptMode?: boolean }) {
  const { phase, setPhase, prefetch, showConceptMode = false } = props;
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

  const conceptLines: Line[] = useMemo(() => [
    { text: "", type: "output" },
    { text: "                            [  RE-DESIGN  ]               ", type: "output" },
    { text: "                > > > > > > > > > > > > > > > > > > > >", type: "output" },
    { text: "                ^                                     v", type: "output" },
    { text: "                ^                                     v", type: "output" },
    { text: "         [ OBSERVE ]                             [ IMPLEMENT ]", type: "output" },
    { text: "    (Classroom Friction)                         (Public Beta)", type: "output" },
    { text: "                ^                                     v", type: "output" },
    { text: "                ^                                     v", type: "output" },
    { text: "                < < < < < < < < < < < < < < < < < < < <", type: "output" },
    { text: "                             [  Learner  ]                 ", type: "output" },
    { text: "", type: "output" },
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

  // Conceptセクションが表示されたらconceptLinesを表示
  useEffect(() => {
    if (phase === "open") {
      if (showConceptMode) {
        // Conceptモード: フェードアウトしてからconceptLinesを表示
        if (termBodyRef.current) {
          termBodyRef.current.style.opacity = '0';
        }
        setTimeout(() => {
          setLines(conceptLines);
          if (termBodyRef.current) {
            termBodyRef.current.style.opacity = '1';
          }
        }, 300); // 300msのフェード時間
      } else {
        // 通常モード: フェードアウトしてからinitialLinesに戻す
        if (termBodyRef.current) {
          termBodyRef.current.style.opacity = '0';
        }
        setTimeout(() => {
          setLines(initialLines);
          if (termBodyRef.current) {
            termBodyRef.current.style.opacity = '1';
          }
        }, 300);
      }
    }
  }, [showConceptMode, phase, conceptLines, initialLines]);

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

  // 矢印にアニメーションを付けるためのヘルパー関数
  const renderTextWithAnimatedArrows = (text: string, lineIndex: number) => {
    // Conceptモードの時だけアニメーションを適用
    if (!showConceptMode) {
      return text;
    }

    // 各行の矢印の位置とアニメーション遅延を決定
    const parts = text.split('');
    return parts.map((char, charIndex) => {
      if (char === '>' || char === 'v' || char === '<' || char === '^') {
        // 矢印の位置に応じて遅延を設定
        // サイクルの流れ: > (上部) → v (右側) → < (下部) → ^ (左側)
        let delay = 0;
        if (char === '>') {
          // 上部の右矢印: charIndexが小さいほど早く光る（左から右へ）
          delay = charIndex * 0.02;
        } else if (char === 'v') {
          // 右側の下矢印: lineIndexが大きいほど早く光る（上から下へ）
          delay = 0.6 + (lineIndex * 0.08);
        } else if (char === '<') {
          // 下部の左矢印: charIndexが大きいほど早く光る（右から左へ）
          delay = 1.2 + ((60 - charIndex) * 0.02);
        } else if (char === '^') {
          // 左側の上矢印: lineIndexが小さいほど早く光る（下から上へ）
          delay = 1.8 + ((15 - lineIndex) * 0.08);
        }

        return (
          <span
            key={`${lineIndex}-${charIndex}`}
            className={styles.arrowBlink}
            style={{ animationDelay: `${delay}s` }}
          >
            {char}
          </span>
        );
      }
      return char;
    });
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
                  {renderTextWithAnimatedArrows(l.text, i)}
                </span>
              </div>
            ))}

            {!showConceptMode && (
              <div className={styles.promptLine}>
                <span className={styles.prompt}>edu$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); prefetch(); }}
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
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

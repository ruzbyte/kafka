"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  NotebookPen,
  Clock,
  BookOpen,
  Github,
  ArrowRight,
  Download,
  Terminal,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/hooks/auth_hook";
import { useEffect, useState } from "react";

/*
 * DRAFT 5 — "Retro Terminal"
 * CRT monitor aesthetic: scanlines, phosphor glow, typing animations,
 * command-line inspired UI, blinking cursors, retro-futuristic.
 */

function useTypingEffect(text: string, speed: number = 60) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

function BlinkingCursor() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "10px",
        height: "1.1em",
        background: "#ea47c1",
        marginLeft: "2px",
        verticalAlign: "text-bottom",
        animation: "cursorBlink 1s step-end infinite",
      }}
    />
  );
}

export default function Draft5() {
  const { user } = useAuthStore();
  const { displayed: heroText, done: heroDone } = useTypingEffect(
    "Plane dein perfektes Semester.",
    45
  );

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Marchen', sans-serif",
        color: "#f6e8f3",
        background: "#0b0309",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* CRT Scanlines overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          )`,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* CRT vignette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
          pointerEvents: "none",
          zIndex: 9997,
        }}
      />

      {/* === HEADER — Terminal bar === */}
      <header
        style={{
          position: "sticky",
          top: 52,
          zIndex: 100,
          background: "rgba(11,3,9,0.95)",
          borderBottom: "1px solid rgba(234,71,193,0.15)",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "12px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image src="/logo.png" alt="Kafka" width={28} height={28} />
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#ea47c1", fontFamily: "monospace" }}>
              kafka@hs-albstadt:~$
            </span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "monospace", fontSize: "13px" }}>
            <span style={{ color: "rgba(246,232,243,0.3)" }}>[</span>
            {["features", "about", "source"].map((item, i) => (
              <span key={item}>
                <a
                  href={item === "source" ? "https://github.com/z4roc/yourical_enchanced" : `#${item}`}
                  style={{ color: "#e284cb", textDecoration: "none" }}
                >
                  {item}
                </a>
                {i < 2 && <span style={{ color: "rgba(246,232,243,0.2)", margin: "0 6px" }}>|</span>}
              </span>
            ))}
            <span style={{ color: "rgba(246,232,243,0.3)" }}>]</span>
          </nav>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {user ? (
              <Link href="/dashboard">
                <Button style={{ background: "rgba(234,71,193,0.15)", color: "#ea47c1", border: "1px solid rgba(234,71,193,0.3)", fontFamily: "monospace", borderRadius: "4px", fontSize: "12px" }}>
                  ./dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" style={{ color: "rgba(246,232,243,0.5)", textDecoration: "none", fontFamily: "monospace", fontSize: "12px" }}>
                  login
                </Link>
                <Link href="/register">
                  <Button style={{ background: "rgba(234,71,193,0.15)", color: "#ea47c1", border: "1px solid rgba(234,71,193,0.3)", fontFamily: "monospace", borderRadius: "4px", fontSize: "12px" }}>
                    ./register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* === HERO — Terminal typing === */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "100px 32px 60px",
        }}
      >
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(234,71,193,0.15)",
            overflow: "hidden",
            background: "rgba(11,3,9,0.8)",
            boxShadow: "0 0 60px rgba(234,71,193,0.05), 0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Terminal title bar */}
          <div
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid rgba(234,71,193,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(234,71,193,0.03)",
            }}
          >
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ea47c1" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#e284cb" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#941976" }} />
            <span style={{ marginLeft: "12px", fontFamily: "monospace", fontSize: "12px", color: "rgba(246,232,243,0.35)" }}>
              kafka-planner — zsh — 80x24
            </span>
          </div>

          {/* Terminal content */}
          <div style={{ padding: "32px", fontFamily: "monospace" }}>
            <div style={{ marginBottom: "24px" }}>
              <span style={{ color: "#ea47c1" }}>kafka@semester</span>
              <span style={{ color: "rgba(246,232,243,0.3)" }}>:</span>
              <span style={{ color: "#e284cb" }}>~</span>
              <span style={{ color: "rgba(246,232,243,0.3)" }}>$ </span>
              <span style={{ color: "#f6e8f3", fontSize: "13px" }}>cat welcome.txt</span>
            </div>

            <h1
              style={{
                fontFamily: "'Noto Sans Marchen', sans-serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 700,
                lineHeight: 1.1,
                margin: "0 0 20px",
                color: "#f6e8f3",
              }}
            >
              {heroText}
              {!heroDone && <BlinkingCursor />}
            </h1>

            <p style={{ color: "rgba(246,232,243,0.5)", fontSize: "15px", lineHeight: 1.7, maxWidth: "560px", marginBottom: "32px" }}>
              Kurse wählen, Kalender synchronisieren, Notizen organisieren.
              <br />
              Alles an einem Ort. Gebaut von Studis der HS Albstadt-Sigmaringen.
            </p>

            <div style={{ display: "flex", gap: "0", marginBottom: "32px" }}>
              <div style={{ color: "rgba(246,232,243,0.3)", marginRight: "8px" }}>$</div>
              <div>
                <span style={{ color: "#ea47c1" }}>kafka</span>
                <span style={{ color: "rgba(246,232,243,0.5)" }}> --start</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <Link href="/register">
                <Button
                  style={{
                    background: "rgba(234,71,193,0.15)",
                    color: "#ea47c1",
                    border: "1px solid rgba(234,71,193,0.3)",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "12px 28px",
                    borderRadius: "6px",
                    boxShadow: "0 0 20px rgba(234,71,193,0.1)",
                  }}
                >
                  ./register <ChevronRight size={14} />
                </Button>
              </Link>
              <Link href="https://github.com/z4roc/yourical_enchanced">
                <Button
                  variant="outline"
                  style={{
                    background: "transparent",
                    color: "rgba(246,232,243,0.6)",
                    border: "1px solid rgba(246,232,243,0.1)",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    padding: "12px 28px",
                    borderRadius: "6px",
                  }}
                >
                  <Github size={14} /> git clone
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === SCHEDULE PREVIEW — Terminal style === */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", padding: "0 32px 80px" }}>
        <div
          style={{
            border: "1px solid rgba(234,71,193,0.1)",
            borderRadius: "8px",
            background: "rgba(11,3,9,0.6)",
            fontFamily: "monospace",
            fontSize: "13px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(234,71,193,0.08)", color: "rgba(246,232,243,0.3)" }}>
            <span style={{ color: "#ea47c1" }}>$</span> kafka schedule --semester ws2025 --format table
          </div>
          <div style={{ padding: "16px 20px" }}>
            <div style={{ color: "rgba(246,232,243,0.25)", marginBottom: "8px" }}>
              ┌─────────────────────┬───────────────┬────────┐
            </div>
            <div style={{ color: "rgba(246,232,243,0.25)", marginBottom: "4px" }}>
              │ <span style={{ color: "#e284cb" }}>KURS</span>{"                "} │ <span style={{ color: "#e284cb" }}>ZEIT</span>{"          "} │ <span style={{ color: "#e284cb" }}>ECTS</span>{"  "} │
            </div>
            <div style={{ color: "rgba(246,232,243,0.25)", marginBottom: "8px" }}>
              ├─────────────────────┼───────────────┼────────┤
            </div>
            {[
              { name: "Mathematik 2       ", time: "Mo 08:00-09:30", ects: "5    " },
              { name: "Softwaretechnik    ", time: "Di 15:30-17:00", ects: "5    " },
              { name: "Einf. Informatik   ", time: "Mi 14:00-15:30", ects: "5    " },
            ].map((c, i) => (
              <div key={i} style={{ color: "rgba(246,232,243,0.5)", marginBottom: "4px" }}>
                │ <span style={{ color: "#f6e8f3" }}>{c.name}</span> │ {c.time} │ {c.ects} │
              </div>
            ))}
            <div style={{ color: "rgba(246,232,243,0.25)", marginTop: "4px" }}>
              └─────────────────────┴───────────────┴────────┘
            </div>
            <div style={{ marginTop: "12px", color: "rgba(246,232,243,0.3)" }}>
              <span style={{ color: "#ea47c1" }}>INFO:</span> 3 Kurse geladen, 15 ECTS total
            </div>
          </div>
        </div>
      </section>

      {/* === FEATURES — Command-line cards === */}
      <section id="features" style={{ position: "relative", zIndex: 1, padding: "60px 32px 100px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ fontFamily: "monospace", fontSize: "12px", color: "rgba(246,232,243,0.3)", marginBottom: "40px" }}>
            <span style={{ color: "#ea47c1" }}>$</span> kafka --list-features
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              { cmd: "schedule", icon: <Calendar size={20} />, title: "Semesterplanung", desc: "WebUntis-Integration. Automatische Stundenplan-Sync. Wochen- & Monatsansicht.", flag: "--sync" },
              { cmd: "notes", icon: <NotebookPen size={20} />, title: "Notizen", desc: "Markdown-Editor pro Fach. PDF-Upload. Volltext-Suche. Export.", flag: "--markdown" },
              { cmd: "courses", icon: <BookOpen size={20} />, title: "Kursverwaltung", desc: "ECTS-Tracking. Fachauswahl. Fortschritt. Vorgaben-Check.", flag: "--ects" },
              { cmd: "export", icon: <Download size={20} />, title: "ICS Export", desc: "Kalender-Export für Apple, Google, Outlook. Überall dabei.", flag: "--ics" },
              { cmd: "deadlines", icon: <Clock size={20} />, title: "Deadlines", desc: "Abgabe-Reminder. Prüfungsplaner. Nie wieder was verpassen.", flag: "--remind" },
              { cmd: "contribute", icon: <Github size={20} />, title: "Open Source", desc: "Quelloffen auf GitHub. Von Studis. Kostenlos. Kein Tracking.", flag: "--foss" },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  padding: "24px",
                  borderRadius: "8px",
                  border: "1px solid rgba(234,71,193,0.08)",
                  background: "rgba(234,71,193,0.02)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234,71,193,0.2)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(234,71,193,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234,71,193,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(246,232,243,0.25)", marginBottom: "16px" }}>
                  kafka {f.cmd} {f.flag}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#ea47c1" }}>{f.icon}</span>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>{f.title}</h3>
                </div>
                <p style={{ color: "rgba(246,232,243,0.4)", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA — Terminal prompt === */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 32px 100px",
        }}
      >
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(234,71,193,0.12)",
            background: "rgba(234,71,193,0.03)",
            padding: "48px 40px",
            textAlign: "center",
            boxShadow: "0 0 40px rgba(234,71,193,0.04)",
          }}
        >
          <div style={{ fontFamily: "monospace", fontSize: "12px", color: "rgba(246,232,243,0.3)", marginBottom: "24px" }}>
            <span style={{ color: "#ea47c1" }}>$</span> kafka --help
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, margin: "0 0 12px" }}>
            Bereit loszulegen?
          </h2>
          <p style={{ color: "rgba(246,232,243,0.4)", fontSize: "14px", fontFamily: "monospace", marginBottom: "32px" }}>
            kostenlos &middot; open-source &middot; kein tracking &middot; kein bullshit
          </p>
          <Link href="/register">
            <Button
              size="lg"
              style={{
                background: "rgba(234,71,193,0.15)",
                color: "#ea47c1",
                border: "1px solid rgba(234,71,193,0.3)",
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px 36px",
                borderRadius: "8px",
                boxShadow: "0 0 30px rgba(234,71,193,0.1)",
              }}
            >
              ./register --now <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(234,71,193,0.08)",
          padding: "48px 32px 24px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "32px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Image src="/logo.png" alt="Kafka" width={24} height={24} />
              <span style={{ fontWeight: 700, fontSize: "14px", fontFamily: "monospace", color: "#ea47c1" }}>kafka</span>
            </div>
            <p style={{ color: "rgba(246,232,243,0.25)", fontSize: "12px", lineHeight: 1.7, fontFamily: "monospace" }}>
              /* built by students who were tired
              <br />
              {"   "}of juggling 5 different apps */
            </p>
          </div>
          {[
            { title: "pkg", links: ["Features", "Roadmap", "Updates"] },
            { title: "help", links: ["Docs", "Contact", "Community"] },
            { title: "contributors", links: [
              { label: "z4roc", href: "https://github.com/z4roc" },
              { label: "piesalad", href: "https://github.com/piesalad" },
              { label: "Tyrenjo", href: "https://github.com/Tyrenjo" },
            ]},
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, fontSize: "11px", marginBottom: "12px", fontFamily: "monospace", color: "#ea47c1" }}>
                ./{col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {col.links.map((link, j) => {
                  const label = typeof link === "string" ? link : link.label;
                  const href = typeof link === "string" ? "#" : link.href;
                  return (
                    <li key={j}>
                      <Link href={href} style={{ color: "rgba(246,232,243,0.3)", textDecoration: "none", fontSize: "12px", fontFamily: "monospace" }}>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px", paddingTop: "16px", borderTop: "1px solid rgba(234,71,193,0.05)", color: "rgba(246,232,243,0.2)", fontSize: "11px", fontFamily: "monospace" }}>
          &copy; 2025 z4roc // MIT License // all rights reserved
        </div>
      </footer>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

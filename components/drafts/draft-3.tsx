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
  Zap,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/hooks/auth_hook";

/*
 * DRAFT 3 — "Neon Brutalist"
 * Raw exposed grids, thick borders, neon glow accents,
 * monospace details, intentionally unpolished but striking.
 */

const NEON = "#ea47c1";
const NEON_GLOW = `0 0 20px ${NEON}80, 0 0 40px ${NEON}30`;
const BORDER = `2px solid ${NEON}30`;

export default function Draft3() {
  const { user } = useAuthStore();

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
      {/* Grid overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(234,71,193,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,71,193,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* === HEADER — Brutalist bar === */}
      <header
        style={{
          position: "sticky",
          top: 52,
          zIndex: 100,
          background: "#0b0309",
          borderBottom: BORDER,
          padding: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div style={{ padding: "16px 24px", borderRight: BORDER, display: "flex", alignItems: "center", gap: "10px" }}>
            <Image src="/logo.png" alt="Kafka" width={28} height={28} />
            <span style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Kafka
            </span>
          </div>
          <nav style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
            {["Features", "Über uns", "Source"].map((item, i) => (
              <a
                key={item}
                href={item === "Source" ? "https://github.com/z4roc/yourical_enchanced" : `#${item.toLowerCase()}`}
                style={{
                  padding: "16px 24px",
                  borderRight: BORDER,
                  color: "rgba(246,232,243,0.5)",
                  textDecoration: "none",
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.2s",
                }}
              >
                {item}
              </a>
            ))}
          </nav>
          <div style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }}>
            {user ? (
              <Link href="/dashboard">
                <Button style={{ background: NEON, color: "#0b0309", border: "none", fontFamily: "'Noto Sans Marchen', sans-serif", fontWeight: 700, borderRadius: 0, textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.1em" }}>
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" style={{ color: "rgba(246,232,243,0.5)", textDecoration: "none", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Login
                </Link>
                <Link href="/register">
                  <Button style={{ background: NEON, color: "#0b0309", border: "none", fontFamily: "'Noto Sans Marchen', sans-serif", fontWeight: 700, borderRadius: 0, textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.1em", boxShadow: NEON_GLOW }}>
                    Starten
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* === HERO — Brutalist split === */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "85vh",
          borderBottom: BORDER,
        }}
      >
        {/* Left — massive text */}
        <div style={{ padding: "80px 48px", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: BORDER }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: NEON,
              marginBottom: "24px",
              fontFamily: "monospace",
            }}
          >
            // STUDENT_PLATFORM_V2.0
          </div>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 700, lineHeight: 0.95, margin: "0 0 32px", letterSpacing: "-0.02em" }}>
            SEMESTER
            <br />
            <span
              style={{
                color: NEON,
                textShadow: NEON_GLOW,
              }}
            >
              PLANER
            </span>
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(246,232,243,0.5)", maxWidth: "400px", marginBottom: "40px" }}>
            Kurse, Kalender, Notizen — alles in einem Tool. Gebaut von Studis der HS Albstadt-Sigmaringen.
          </p>
          <div style={{ display: "flex", gap: "0" }}>
            <Link href="/register">
              <Button style={{ background: NEON, color: "#0b0309", border: "none", fontFamily: "'Noto Sans Marchen', sans-serif", fontWeight: 700, borderRadius: 0, textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.08em", padding: "14px 32px", boxShadow: NEON_GLOW }}>
                Jetzt starten
              </Button>
            </Link>
            <Link href="https://github.com/z4roc/yourical_enchanced">
              <Button style={{ background: "transparent", color: "#f6e8f3", border: BORDER, borderLeft: "none", fontFamily: "'Noto Sans Marchen', sans-serif", borderRadius: 0, textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.08em", padding: "14px 32px" }}>
                <Github size={16} /> Source
              </Button>
            </Link>
          </div>
        </div>

        {/* Right — raw schedule block */}
        <div style={{ padding: "80px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ border: BORDER, background: "rgba(234,71,193,0.02)" }}>
            <div style={{ padding: "16px 20px", borderBottom: BORDER, display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: "12px" }}>
              <span style={{ color: NEON }}>$ stundenplan --ws2025</span>
              <span style={{ color: "rgba(246,232,243,0.3)" }}>15 ECTS</span>
            </div>
            {[
              { name: "MATH_2", time: "MO 08:00-09:30", status: "ACTIVE" },
              { name: "SOFTWARE_TECH", time: "DI 15:30-17:00", status: "ACTIVE" },
              { name: "INTRO_CS", time: "MI 14:00-15:30", status: "ACTIVE" },
              { name: "DATENBANKEN", time: "DO 10:00-11:30", status: "PENDING" },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 20px",
                  borderBottom: i < 3 ? `1px solid ${NEON}15` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "monospace",
                  fontSize: "13px",
                }}
              >
                <span>
                  <span style={{ color: NEON, marginRight: "12px" }}>&gt;</span>
                  {c.name}
                </span>
                <span style={{ color: "rgba(246,232,243,0.3)" }}>{c.time}</span>
                <span
                  style={{
                    fontSize: "10px",
                    padding: "2px 8px",
                    border: `1px solid ${c.status === "ACTIVE" ? NEON : "rgba(246,232,243,0.2)"}`,
                    color: c.status === "ACTIVE" ? NEON : "rgba(246,232,243,0.3)",
                  }}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>

          {/* Neon accent bar */}
          <div style={{ height: "3px", background: `linear-gradient(90deg, ${NEON}, transparent)`, marginTop: "0" }} />
        </div>
      </section>

      {/* === FEATURES — Brutal grid === */}
      <section id="features" style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {[
            { icon: <Calendar size={24} />, title: "KALENDER", desc: "WebUntis-Integration. Automatische Synchronisation. Wochen- und Monatsansicht.", tag: "CORE" },
            { icon: <NotebookPen size={24} />, title: "NOTIZEN", desc: "Markdown-Editor. Fachspezifisch. PDF-Upload. Volltext-Suche.", tag: "CORE" },
            { icon: <BookOpen size={24} />, title: "KURSE", desc: "ECTS-Tracking. Fachauswahl. Fortschrittsübersicht. Vorgaben-Check.", tag: "MGMT" },
            { icon: <Download size={24} />, title: "ICS EXPORT", desc: "Kalender exportieren. Apple, Google, Outlook kompatibel.", tag: "SYNC" },
            { icon: <Clock size={24} />, title: "DEADLINES", desc: "Abgabe-Reminder. Prüfungsplaner. Terminverwaltung.", tag: "TIME" },
            { icon: <Zap size={24} />, title: "OPEN SOURCE", desc: "Quelloffen auf GitHub. Von Studis gebaut. Kostenlos.", tag: "FOSS" },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                padding: "40px 32px",
                borderRight: (i + 1) % 3 !== 0 ? BORDER : "none",
                borderBottom: i < 3 ? BORDER : "none",
                transition: "background 0.2s",
                cursor: "default",
                position: "relative",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${NEON}08`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ color: NEON }}>{f.icon}</div>
                <span style={{ fontSize: "9px", fontFamily: "monospace", padding: "2px 8px", border: `1px solid ${NEON}30`, color: `${NEON}80`, letterSpacing: "0.1em" }}>
                  {f.tag}
                </span>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "8px" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(246,232,243,0.45)", margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* === CTA — Neon strip === */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          borderTop: BORDER,
          borderBottom: BORDER,
          padding: "80px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: `linear-gradient(90deg, ${NEON}05, ${NEON}10, ${NEON}05)`,
        }}
      >
        <div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, margin: "0 0 8px" }}>
            Bereit?
          </h2>
          <p style={{ color: "rgba(246,232,243,0.4)", fontSize: "14px", fontFamily: "monospace", margin: 0 }}>
            {">"} kostenlos {">"} open-source {">"} kein tracking
          </p>
        </div>
        <Link href="/register">
          <Button
            style={{
              background: NEON,
              color: "#0b0309",
              border: "none",
              fontFamily: "'Noto Sans Marchen', sans-serif",
              fontWeight: 700,
              borderRadius: 0,
              textTransform: "uppercase",
              fontSize: "16px",
              letterSpacing: "0.08em",
              padding: "16px 40px",
              boxShadow: NEON_GLOW,
            }}
          >
            Registrieren <ArrowRight size={18} />
          </Button>
        </Link>
      </section>

      {/* === FOOTER === */}
      <footer style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "48px 48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "32px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Image src="/logo.png" alt="Kafka" width={24} height={24} />
              <span style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Kafka</span>
            </div>
            <p style={{ color: "rgba(246,232,243,0.3)", fontSize: "12px", lineHeight: 1.7, fontFamily: "monospace" }}>
              // built with frustration and coffee
            </p>
          </div>
          {[
            { title: "PRODUCT", links: ["Features", "Roadmap", "Updates"] },
            { title: "SUPPORT", links: ["Help Center", "Contact", "Community"] },
            { title: "TEAM", links: [
              { label: "ZAROC", href: "https://github.com/z4roc" },
              { label: "Tfinn", href: "https://github.com/piesalad" },
              { label: "Tyrenjo", href: "https://github.com/Tyrenjo" },
            ]},
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, fontSize: "10px", marginBottom: "14px", letterSpacing: "0.2em", color: `${NEON}60` }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {col.links.map((link, j) => {
                  const label = typeof link === "string" ? link : link.label;
                  const href = typeof link === "string" ? "#" : link.href;
                  return (
                    <li key={j}>
                      <Link href={href} style={{ color: "rgba(246,232,243,0.35)", textDecoration: "none", fontSize: "12px", fontFamily: "monospace" }}>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px", paddingTop: "20px", borderTop: `1px solid ${NEON}10`, color: "rgba(246,232,243,0.2)", fontSize: "11px", fontFamily: "monospace" }}>
          &copy; 2025 ZAROC // ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
}

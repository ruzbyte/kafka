"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  NotebookPen,
  Clock,
  BookOpen,
  Github,
  ArrowUpRight,
  Download,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/hooks/auth_hook";

/*
 * DRAFT 2 — "Editorial"
 * Magazine-style: massive typography, asymmetric columns,
 * numbered sections, dramatic whitespace, horizontal rules.
 */

export default function Draft2() {
  const { user } = useAuthStore();

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Marchen', sans-serif",
        color: "#f6e8f3",
        background: "#0b0309",
        minHeight: "100vh",
      }}
    >
      {/* === HEADER — thin, editorial === */}
      <header
        style={{
          position: "sticky",
          top: 52,
          zIndex: 100,
          background: "rgba(11,3,9,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(246,232,243,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "14px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image src="/logo.png" alt="Kafka" width={32} height={32} />
            <span style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Kafka
            </span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {["Features", "Über uns", "Source"].map((item) => (
              <a
                key={item}
                href={item === "Source" ? "https://github.com/z4roc/yourical_enchanced" : `#${item.toLowerCase()}`}
                style={{
                  color: "rgba(246,232,243,0.5)",
                  textDecoration: "none",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </a>
            ))}
          </nav>
          <div>
            {user ? (
              <Link href="/dashboard">
                <Button style={{ background: "#ea47c1", color: "#0b0309", border: "none", fontFamily: "'Noto Sans Marchen', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Dashboard <ArrowUpRight size={14} />
                </Button>
              </Link>
            ) : (
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Link href="/login" style={{ color: "rgba(246,232,243,0.5)", textDecoration: "none", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Login
                </Link>
                <Link href="/register">
                  <Button style={{ background: "#ea47c1", color: "#0b0309", border: "none", fontFamily: "'Noto Sans Marchen', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Registrieren
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* === HERO — Massive type, asymmetric === */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "120px 48px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", alignItems: "end" }}>
          <div>
            <div style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ea47c1", marginBottom: "32px" }}>
              Semester Planner &mdash; 2025
            </div>
            <h1
              style={{
                fontSize: "clamp(56px, 8vw, 120px)",
                fontWeight: 700,
                lineHeight: 0.9,
                margin: 0,
                letterSpacing: "-0.03em",
              }}
            >
              Plane
              <br />
              dein
              <br />
              <span style={{ color: "#ea47c1" }}>Semester</span>
            </h1>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <p style={{ fontSize: "17px", lineHeight: 1.8, color: "rgba(246,232,243,0.6)", marginBottom: "40px", maxWidth: "380px" }}>
              Kafka vereint Stundenplan, Notizen und Kursverwaltung in einer Plattform.
              Gebaut von Studierenden der HS Albstadt-Sigmaringen — für Studierende.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <Link href="/register">
                <Button
                  style={{
                    background: "transparent",
                    color: "#f6e8f3",
                    border: "1px solid #f6e8f3",
                    fontFamily: "'Noto Sans Marchen', sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    padding: "12px 28px",
                    borderRadius: "0px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Jetzt starten <ArrowUpRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal rule */}
        <div style={{ height: "1px", background: "rgba(246,232,243,0.08)", marginTop: "80px" }} />
      </section>

      {/* === FEATURES — Numbered editorial sections === */}
      <section id="features" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px 120px" }}>
        {[
          {
            num: "01",
            title: "Semesterplanung",
            subtitle: "WebUntis meets intelligente Planung",
            desc: "Automatische Stundenplan-Integration mit WebUntis. Visuelle Fachauswahl, Konflikterkennung und ECTS-Tracking in einer übersichtlichen Kalenderansicht.",
            icon: <Calendar size={28} />,
          },
          {
            num: "02",
            title: "Notizen",
            subtitle: "Markdown-Editor für jedes Fach",
            desc: "Fachspezifische Notizen mit vollständigem Markdown-Support. Schnelle Suche, PDF-Upload und Export. Immer genau da, wo du sie brauchst.",
            icon: <NotebookPen size={28} />,
          },
          {
            num: "03",
            title: "Kalender-Sync",
            subtitle: "ICS-Export für alle Plattformen",
            desc: "Exportiere deinen Stundenplan als ICS und synchronisiere ihn mit Apple Calendar, Google Calendar oder Outlook. Dein Semester in jeder App.",
            icon: <Download size={28} />,
          },
          {
            num: "04",
            title: "Zeitmanagement",
            subtitle: "Deadlines immer im Blick",
            desc: "Abgabe-Reminder, Prüfungstermine und Vorlesungspläne. Tracke deinen Fortschritt und behalte den Überblick über alle Termine.",
            icon: <Clock size={28} />,
          },
        ].map((feature, i) => (
          <div key={i}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 1.2fr",
                gap: "48px",
                padding: "60px 0",
                alignItems: "start",
              }}
            >
              <div style={{ fontSize: "64px", fontWeight: 700, color: "rgba(234,71,193,0.15)", lineHeight: 1 }}>
                {feature.num}
              </div>
              <div>
                <div style={{ color: feature.num === "01" || feature.num === "03" ? "#ea47c1" : "#e284cb", marginBottom: "16px" }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "32px", fontWeight: 700, margin: "0 0 8px" }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(246,232,243,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>
                  {feature.subtitle}
                </p>
              </div>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(246,232,243,0.55)", margin: 0, paddingTop: "40px" }}>
                {feature.desc}
              </p>
            </div>
            {i < 3 && (
              <div style={{ height: "1px", background: "rgba(246,232,243,0.05)" }} />
            )}
          </div>
        ))}
      </section>

      {/* === PULL QUOTE CTA === */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "80px 48px",
          borderTop: "1px solid rgba(246,232,243,0.06)",
          borderBottom: "1px solid rgba(246,232,243,0.06)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "80px", alignItems: "center" }}>
          <blockquote style={{ margin: 0 }}>
            <p style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, lineHeight: 1.15, margin: 0 }}>
              &ldquo;Das perfekte Semester beginnt mit dem{" "}
              <span style={{ color: "#ea47c1" }}>richtigen Werkzeug.</span>&rdquo;
            </p>
          </blockquote>
          <div>
            <p style={{ color: "rgba(246,232,243,0.5)", fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>
              Kostenlos und Open Source. Keine Werbung, keine versteckten Kosten.
            </p>
            <Link href="/register">
              <Button
                style={{
                  background: "#ea47c1",
                  color: "#0b0309",
                  border: "none",
                  fontFamily: "'Noto Sans Marchen', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  padding: "14px 32px",
                  borderRadius: "0px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Jetzt loslegen <ArrowUpRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer style={{ maxWidth: "1400px", margin: "0 auto", padding: "64px 48px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Image src="/logo.png" alt="Kafka" width={24} height={24} />
              <span style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Kafka</span>
            </div>
            <p style={{ color: "rgba(246,232,243,0.35)", fontSize: "13px", lineHeight: 1.7, maxWidth: "300px" }}>
              Eine Plattform von Studenten für Studenten. Open Source und mit Liebe gebaut.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Roadmap", "Updates"] },
            { title: "Support", links: ["Help Center", "Contact", "Community"] },
            { title: "Team", links: [
              { label: "ZAROC", href: "https://github.com/z4roc" },
              { label: "Tfinn", href: "https://github.com/piesalad" },
              { label: "Tyrenjo", href: "https://github.com/Tyrenjo" },
            ]},
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, fontSize: "11px", marginBottom: "16px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(246,232,243,0.3)" }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((link, j) => {
                  const label = typeof link === "string" ? link : link.label;
                  const href = typeof link === "string" ? "#" : link.href;
                  return (
                    <li key={j}>
                      <Link href={href} style={{ color: "rgba(246,232,243,0.4)", textDecoration: "none", fontSize: "13px" }}>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "64px", paddingTop: "24px", borderTop: "1px solid rgba(246,232,243,0.04)", color: "rgba(246,232,243,0.2)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          &copy; 2025 ZAROC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

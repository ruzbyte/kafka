"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  NotebookPen,
  Clock,
  BookOpen,
  Github,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Download,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/hooks/auth_hook";

/*
 * DRAFT 1 — "Orbital"
 * Cosmic geometry: concentric orbital rings, floating elements,
 * radial feature layout, particle-like dots. Feels vast & focused.
 */

export default function Draft1() {
  const { user } = useAuthStore();

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Marchen', sans-serif",
        color: "#f6e8f3",
        background: "#0b0309",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* === HEADER === */}
      <header
        style={{
          position: "sticky",
          top: 52,
          zIndex: 100,
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(11,3,9,0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(234,71,193,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image src="/logo.png" alt="Kafka" width={36} height={36} />
          <span style={{ fontSize: "24px", fontWeight: 700, color: "#f6e8f3" }}>
            Kafka
          </span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a href="#features" style={{ color: "rgba(246,232,243,0.6)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>
            Features
          </a>
          <a href="#about" style={{ color: "rgba(246,232,243,0.6)", textDecoration: "none", fontSize: "14px" }}>
            Über uns
          </a>
          <Link href="https://github.com/z4roc/yourical_enchanced" style={{ color: "rgba(246,232,243,0.6)", textDecoration: "none", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Github size={16} /> Source
          </Link>
        </nav>
        <div style={{ display: "flex", gap: "12px" }}>
          {user ? (
            <Link href="/dashboard">
              <Button style={{ background: "#e284cb", color: "#0b0309", border: "none", fontFamily: "'Noto Sans Marchen', sans-serif" }}>
                Mein Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" style={{ color: "#f6e8f3", fontFamily: "'Noto Sans Marchen', sans-serif" }}>Login</Button>
              </Link>
              <Link href="/register">
                <Button style={{ background: "#ea47c1", color: "#0b0309", border: "none", fontFamily: "'Noto Sans Marchen', sans-serif", fontWeight: 700 }}>
                  Jetzt starten
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* === HERO with Orbital Rings === */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 40px",
        }}
      >
        {/* Orbital rings */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            border: "1px solid rgba(234,71,193,0.08)",
            animation: "orbitSpin 60s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: "1px solid rgba(226,132,203,0.12)",
            animation: "orbitSpin 40s linear infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "1px solid rgba(148,25,118,0.2)",
          }}
        />

        {/* Floating orbital dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: i % 2 === 0 ? "#ea47c1" : "#e284cb",
              boxShadow: `0 0 20px ${i % 2 === 0 ? "#ea47c1" : "#e284cb"}`,
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(${250 + (i % 3) * 100}px)`,
              animation: `orbitSpin ${30 + i * 5}s linear infinite${i % 2 ? " reverse" : ""}`,
              opacity: 0.7,
            }}
          />
        ))}

        {/* Radial gradient glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(148,25,118,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "680px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "100px",
              background: "rgba(234,71,193,0.1)",
              border: "1px solid rgba(234,71,193,0.2)",
              fontSize: "13px",
              color: "#ea47c1",
              marginBottom: "32px",
            }}
          >
            <GraduationCap size={14} />
            Von Studenten, für Studenten
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.05,
              margin: "0 0 24px",
              background: "linear-gradient(135deg, #f6e8f3 0%, #ea47c1 50%, #e284cb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dein Semester.{" "}
            <br />
            Perfekt geplant.
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "rgba(246,232,243,0.6)",
              lineHeight: 1.7,
              margin: "0 0 40px",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Kurse wählen, Kalender synchronisieren, Notizen organisieren –
            alles an einem Ort. Gebaut für Studierende der HS Albstadt-Sigmaringen.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link href="/register">
              <Button
                size="lg"
                style={{
                  background: "linear-gradient(135deg, #ea47c1, #941976)",
                  color: "#f6e8f3",
                  border: "none",
                  fontFamily: "'Noto Sans Marchen', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  padding: "12px 32px",
                  borderRadius: "12px",
                  boxShadow: "0 0 40px rgba(234,71,193,0.3)",
                }}
              >
                Kostenlos starten <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="https://github.com/z4roc/yourical_enchanced">
              <Button
                size="lg"
                variant="outline"
                style={{
                  background: "transparent",
                  color: "#f6e8f3",
                  border: "1px solid rgba(226,132,203,0.3)",
                  fontFamily: "'Noto Sans Marchen', sans-serif",
                  fontSize: "16px",
                  padding: "12px 32px",
                  borderRadius: "12px",
                }}
              >
                <Github size={18} /> GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === FEATURES — Radial card layout === */}
      <section id="features" style={{ padding: "100px 40px", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, margin: "0 0 16px" }}>
            Alles was du brauchst
          </h2>
          <p style={{ color: "rgba(246,232,243,0.5)", fontSize: "16px", maxWidth: "480px", margin: "0 auto" }}>
            Von der Kursplanung bis zur Notizverwaltung — intelligent integriert.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {[
            {
              icon: <Calendar size={24} />,
              title: "Semesterplanung",
              desc: "WebUntis-Integration mit automatischer Stundenplan-Synchronisation. Visuelle Kursauswahl und Konfliktauflösung.",
              glow: "#ea47c1",
            },
            {
              icon: <NotebookPen size={24} />,
              title: "Smarte Notizen",
              desc: "Fachspezifische Notizen mit Markdown-Support. Direkt durchsuchbar und als PDF exportierbar.",
              glow: "#e284cb",
            },
            {
              icon: <BookOpen size={24} />,
              title: "ECTS Tracking",
              desc: "Kursverwaltung mit vollständiger ECTS-Übersicht. Fortschritt tracken und Vorgaben einsehen.",
              glow: "#941976",
            },
            {
              icon: <Download size={24} />,
              title: "Kalender-Sync",
              desc: "ICS-Export für nahtlose Integration in Apple Calendar, Google Calendar oder Outlook.",
              glow: "#ea47c1",
            },
            {
              icon: <Clock size={24} />,
              title: "Zeitmanagement",
              desc: "Abgabe-Reminder und Prüfungsplanung. Nie wieder einen Termin verpassen.",
              glow: "#e284cb",
            },
            {
              icon: <Sparkles size={24} />,
              title: "Open Source",
              desc: "Gebaut von Studenten für Studenten. Vollständig quelloffen auf GitHub verfügbar.",
              glow: "#941976",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                padding: "32px",
                borderRadius: "16px",
                background: "rgba(246,232,243,0.02)",
                border: "1px solid rgba(226,132,203,0.08)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${f.glow}40`;
                e.currentTarget.style.background = "rgba(246,232,243,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(226,132,203,0.08)";
                e.currentTarget.style.background = "rgba(246,232,243,0.02)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${f.glow}10, transparent)`,
                }}
              />
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${f.glow}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: f.glow,
                  marginBottom: "20px",
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                {f.title}
              </h3>
              <p style={{ color: "rgba(246,232,243,0.5)", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* === SCHEDULE PREVIEW === */}
      <section style={{ padding: "60px 40px 120px", maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            borderRadius: "20px",
            border: "1px solid rgba(226,132,203,0.12)",
            background: "rgba(246,232,243,0.02)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(226,132,203,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: "16px" }}>Wintersemester 2025</span>
            <span style={{ color: "rgba(246,232,243,0.4)", fontSize: "13px" }}>15 ECTS</span>
          </div>
          {[
            { name: "Mathematik 2", time: "Mo 8:00–9:30", color: "#ea47c1" },
            { name: "Softwaretechnik", time: "Di 15:30–17:00", color: "#e284cb" },
            { name: "Einführung Informatik", time: "Mi 14:00–15:30", color: "#941976" },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                padding: "16px 28px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                borderBottom: i < 2 ? "1px solid rgba(226,132,203,0.05)" : "none",
              }}
            >
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: c.color, boxShadow: `0 0 12px ${c.color}60` }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px" }}>{c.name}</div>
                <div style={{ color: "rgba(246,232,243,0.4)", fontSize: "13px" }}>{c.time}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === CTA === */}
      <section
        style={{
          padding: "100px 40px",
          textAlign: "center",
          position: "relative",
          background: "linear-gradient(180deg, transparent 0%, rgba(148,25,118,0.08) 50%, transparent 100%)",
        }}
      >
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginBottom: "16px" }}>
          Bereit für dein bestes Semester?
        </h2>
        <p style={{ color: "rgba(246,232,243,0.5)", fontSize: "16px", marginBottom: "40px", maxWidth: "400px", margin: "0 auto 40px" }}>
          Kostenlos. Open Source. Gebaut mit Liebe.
        </p>
        <Link href="/register">
          <Button
            size="lg"
            style={{
              background: "linear-gradient(135deg, #ea47c1, #941976)",
              color: "#f6e8f3",
              border: "none",
              fontFamily: "'Noto Sans Marchen', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              padding: "16px 48px",
              borderRadius: "14px",
              boxShadow: "0 0 60px rgba(234,71,193,0.25)",
            }}
          >
            Jetzt registrieren <ArrowRight size={20} />
          </Button>
        </Link>
      </section>

      {/* === FOOTER === */}
      <footer
        style={{
          padding: "60px 40px 32px",
          borderTop: "1px solid rgba(226,132,203,0.08)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Image src="/logo.png" alt="Kafka" width={28} height={28} />
              <span style={{ fontWeight: 700, fontSize: "18px" }}>Kafka</span>
            </div>
            <p style={{ color: "rgba(246,232,243,0.4)", fontSize: "13px", lineHeight: 1.7, maxWidth: "280px" }}>
              Studenten die ihr Leben einfacher machen wollten, und das Ergebnis mit dir teilen.
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
              <h4 style={{ fontWeight: 700, fontSize: "14px", marginBottom: "16px", color: "#e284cb" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
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
        <div style={{ textAlign: "center", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid rgba(226,132,203,0.05)", color: "rgba(246,232,243,0.3)", fontSize: "12px" }}>
          &copy; 2025 ZAROC. All rights reserved.
        </div>
      </footer>

      <style>{`
        @keyframes orbitSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

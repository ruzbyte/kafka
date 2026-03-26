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
  Sparkles,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/hooks/auth_hook";

/*
 * DRAFT 4 — "Glass Flow"
 * Glassmorphic cards, flowing gradient blobs, layered depth,
 * soft rounded shapes, dreamy atmosphere on dark canvas.
 */

export default function Draft4() {
  const { user } = useAuthStore();

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Marchen', sans-serif",
        color: "#f6e8f3",
        background: "#0b0309",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient blobs */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(148,25,118,0.12) 0%, transparent 60%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          animation: "blobFloat 20s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-15%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234,71,193,0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: "blobFloat 25s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "40%",
          left: "30%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(226,132,203,0.06) 0%, transparent 60%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: "blobFloat 30s ease-in-out infinite",
        }}
      />

      {/* === HEADER — Glass bar === */}
      <header
        style={{
          position: "sticky",
          top: 52,
          zIndex: 100,
          padding: "12px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "12px 24px",
            borderRadius: "16px",
            background: "rgba(246,232,243,0.04)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(246,232,243,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image src="/logo.png" alt="Kafka" width={30} height={30} />
            <span style={{ fontSize: "20px", fontWeight: 700 }}>Kafka</span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {["Features", "Über uns"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                style={{
                  color: "rgba(246,232,243,0.55)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "color 0.2s",
                }}
              >
                {item}
              </a>
            ))}
            <Link href="https://github.com/z4roc/yourical_enchanced" style={{ color: "rgba(246,232,243,0.55)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
              <Github size={15} /> GitHub
            </Link>
          </nav>
          <div style={{ display: "flex", gap: "10px" }}>
            {user ? (
              <Link href="/dashboard">
                <Button style={{ background: "rgba(234,71,193,0.2)", color: "#ea47c1", border: "1px solid rgba(234,71,193,0.3)", fontFamily: "'Noto Sans Marchen', sans-serif", borderRadius: "10px", backdropFilter: "blur(12px)" }}>
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" style={{ color: "rgba(246,232,243,0.6)", fontFamily: "'Noto Sans Marchen', sans-serif", borderRadius: "10px" }}>
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button style={{ background: "rgba(234,71,193,0.2)", color: "#ea47c1", border: "1px solid rgba(234,71,193,0.3)", fontFamily: "'Noto Sans Marchen', sans-serif", fontWeight: 700, borderRadius: "10px", backdropFilter: "blur(12px)" }}>
                    Starten
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* === HERO — Centered with glass card === */}
      <section style={{ position: "relative", zIndex: 1, padding: "120px 32px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "100px",
              background: "rgba(234,71,193,0.08)",
              border: "1px solid rgba(234,71,193,0.15)",
              backdropFilter: "blur(12px)",
              fontSize: "13px",
              color: "#e284cb",
              marginBottom: "40px",
            }}
          >
            <Sparkles size={14} />
            Dein Studium, vereinfacht
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 68px)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: "0 0 24px",
            }}
          >
            Plane dein Semester
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ea47c1, #e284cb, #941976)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ohne Chaos
            </span>
          </h1>

          <p style={{ fontSize: "17px", lineHeight: 1.8, color: "rgba(246,232,243,0.5)", maxWidth: "500px", margin: "0 auto 48px" }}>
            Stundenplan, Notizen und Kursverwaltung — alles in einer wunderschönen Plattform.
            Von Studis der HS Albstadt-Sigmaringen.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
            <Link href="/register">
              <Button
                size="lg"
                style={{
                  background: "linear-gradient(135deg, rgba(234,71,193,0.3), rgba(148,25,118,0.4))",
                  color: "#f6e8f3",
                  border: "1px solid rgba(234,71,193,0.3)",
                  fontFamily: "'Noto Sans Marchen', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  padding: "14px 36px",
                  borderRadius: "14px",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(234,71,193,0.15)",
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
                  background: "rgba(246,232,243,0.04)",
                  color: "#f6e8f3",
                  border: "1px solid rgba(246,232,243,0.1)",
                  fontFamily: "'Noto Sans Marchen', sans-serif",
                  fontSize: "16px",
                  padding: "14px 36px",
                  borderRadius: "14px",
                  backdropFilter: "blur(20px)",
                }}
              >
                <Github size={18} /> Source
              </Button>
            </Link>
          </div>
        </div>

        {/* Glass schedule preview */}
        <div
          style={{
            maxWidth: "600px",
            margin: "80px auto 0",
            borderRadius: "20px",
            background: "rgba(246,232,243,0.03)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(246,232,243,0.07)",
            overflow: "hidden",
            boxShadow: "0 20px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(246,232,243,0.05)",
          }}
        >
          <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(246,232,243,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ea47c1", boxShadow: "0 0 8px #ea47c1" }} />
              <span style={{ fontWeight: 700, fontSize: "14px" }}>Wintersemester 2025</span>
            </div>
            <span style={{ color: "rgba(246,232,243,0.35)", fontSize: "12px" }}>15 ECTS</span>
          </div>
          {[
            { name: "Mathematik 2", time: "Mo 8:00–9:30", color: "#ea47c1" },
            { name: "Softwaretechnik", time: "Di 15:30–17:00", color: "#e284cb" },
            { name: "Einführung Informatik", time: "Mi 14:00–15:30", color: "#941976" },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                padding: "14px 24px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                borderBottom: i < 2 ? "1px solid rgba(246,232,243,0.03)" : "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(246,232,243,0.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ width: "4px", height: "32px", borderRadius: "2px", background: c.color, boxShadow: `0 0 12px ${c.color}40` }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: "14px" }}>{c.name}</div>
                <div style={{ color: "rgba(246,232,243,0.35)", fontSize: "12px" }}>{c.time}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === FEATURES — Glass cards === */}
      <section id="features" style={{ position: "relative", zIndex: 1, padding: "100px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, margin: "0 0 12px" }}>
            Alles integriert
          </h2>
          <p style={{ color: "rgba(246,232,243,0.45)", fontSize: "16px" }}>
            Die Tools die du wirklich brauchst, an einem Ort.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {[
            { icon: <Calendar size={22} />, title: "Semesterplanung", desc: "WebUntis-Integration mit automatischer Synchronisation. Visuelle Kursauswahl und Konflikterkennung.", accent: "#ea47c1" },
            { icon: <NotebookPen size={22} />, title: "Smarte Notizen", desc: "Fachspezifische Notizen mit Markdown. Durchsuchbar, exportierbar, immer dabei.", accent: "#e284cb" },
            { icon: <BookOpen size={22} />, title: "ECTS Tracking", desc: "Kursverwaltung mit ECTS-Übersicht. Fortschritt tracken, Vorgaben einsehen.", accent: "#941976" },
            { icon: <Download size={22} />, title: "Kalender-Sync", desc: "ICS-Export für Apple, Google und Outlook. Dein Semester überall.", accent: "#ea47c1" },
            { icon: <Clock size={22} />, title: "Zeitmanagement", desc: "Deadlines, Prüfungen, Vorlesungen — nie wieder etwas verpassen.", accent: "#e284cb" },
            { icon: <GraduationCap size={22} />, title: "By Students", desc: "Open Source, kostenlos, keine Werbung. Gebaut mit Verständnis.", accent: "#941976" },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                padding: "32px",
                borderRadius: "18px",
                background: "rgba(246,232,243,0.025)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(246,232,243,0.06)",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${f.accent}30`;
                e.currentTarget.style.boxShadow = `0 8px 40px ${f.accent}10`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(246,232,243,0.06)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: `${f.accent}12`,
                  border: `1px solid ${f.accent}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: f.accent,
                  marginBottom: "20px",
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
                {f.title}
              </h3>
              <p style={{ color: "rgba(246,232,243,0.45)", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* === CTA === */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 32px", textAlign: "center" }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "64px 48px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(148,25,118,0.12), rgba(234,71,193,0.06))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(234,71,193,0.12)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, margin: "0 0 12px" }}>
            Starte dein bestes Semester
          </h2>
          <p style={{ color: "rgba(246,232,243,0.45)", fontSize: "15px", marginBottom: "32px" }}>
            Kostenlos. Open Source. Gebaut mit Liebe.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              style={{
                background: "linear-gradient(135deg, rgba(234,71,193,0.35), rgba(148,25,118,0.45))",
                color: "#f6e8f3",
                border: "1px solid rgba(234,71,193,0.3)",
                fontFamily: "'Noto Sans Marchen', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                padding: "14px 40px",
                borderRadius: "14px",
                boxShadow: "0 8px 32px rgba(234,71,193,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              Jetzt registrieren <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer style={{ position: "relative", zIndex: 1, padding: "60px 32px 28px", borderTop: "1px solid rgba(246,232,243,0.04)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "32px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Image src="/logo.png" alt="Kafka" width={26} height={26} />
              <span style={{ fontWeight: 700, fontSize: "16px" }}>Kafka</span>
            </div>
            <p style={{ color: "rgba(246,232,243,0.3)", fontSize: "13px", lineHeight: 1.7, maxWidth: "260px" }}>
              Von Studenten für Studenten. Open Source und mit Liebe gebaut.
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
              <h4 style={{ fontWeight: 700, fontSize: "12px", marginBottom: "14px", color: "#e284cb" }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {col.links.map((link, j) => {
                  const label = typeof link === "string" ? link : link.label;
                  const href = typeof link === "string" ? "#" : link.href;
                  return (
                    <li key={j}>
                      <Link href={href} style={{ color: "rgba(246,232,243,0.35)", textDecoration: "none", fontSize: "13px" }}>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "48px", paddingTop: "20px", borderTop: "1px solid rgba(246,232,243,0.04)", color: "rgba(246,232,243,0.2)", fontSize: "12px" }}>
          &copy; 2025 ZAROC. All rights reserved.
        </div>
      </footer>

      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}

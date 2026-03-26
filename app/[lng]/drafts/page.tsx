"use client";

import { useState } from "react";
import Draft1 from "@/components/drafts/draft-1";
import Draft2 from "@/components/drafts/draft-2";
import Draft3 from "@/components/drafts/draft-3";
import Draft4 from "@/components/drafts/draft-4";
import Draft5 from "@/components/drafts/draft-5";

const drafts = [
  { id: 1, name: "Orbital", desc: "Cosmic geometry with orbital rings", component: Draft1 },
  { id: 2, name: "Editorial", desc: "Magazine-style asymmetric typography", component: Draft2 },
  { id: 3, name: "Neon Brutalist", desc: "Raw grids with neon glow", component: Draft3 },
  { id: 4, name: "Glass Flow", desc: "Glassmorphic waves and soft depth", component: Draft4 },
  { id: 5, name: "Terminal", desc: "Retro CRT terminal aesthetic", component: Draft5 },
];

export default function DraftsPage() {
  const [active, setActive] = useState(0);
  const ActiveDraft = drafts[active].component;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Noto+Sans+Marchen:400,700');
      `}</style>

      {/* Draft Selector Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "rgba(11,3,9,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(226,132,203,0.2)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'Noto Sans Marchen', sans-serif",
        }}
      >
        <span style={{ color: "#ea47c1", fontWeight: 700, fontSize: "14px", marginRight: "12px", whiteSpace: "nowrap" }}>
          DRAFTS
        </span>
        {drafts.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setActive(i)}
            style={{
              padding: "6px 16px",
              borderRadius: "6px",
              border: active === i ? "1px solid #ea47c1" : "1px solid rgba(226,132,203,0.15)",
              background: active === i ? "rgba(234,71,193,0.15)" : "transparent",
              color: active === i ? "#ea47c1" : "#f6e8f3",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              fontFamily: "'Noto Sans Marchen', sans-serif",
            }}
          >
            {d.id}. {d.name}
          </button>
        ))}
        <span style={{ color: "rgba(246,232,243,0.4)", fontSize: "12px", marginLeft: "auto", whiteSpace: "nowrap" }}>
          {drafts[active].desc}
        </span>
      </div>

      {/* Active Draft */}
      <div style={{ paddingTop: "52px" }}>
        <ActiveDraft />
      </div>
    </>
  );
}

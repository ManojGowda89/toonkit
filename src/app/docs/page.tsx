"use client";
import { useState, MouseEvent } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface FeatureRow {
  icon: string;
  label: string;
  desc: string;
}

interface TypeRow extends Array<string> {
  0: string; 1: string; 2: string; 3: string;
}

interface SectionHeaderProps {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
}

interface InfoCardProps {
  children: React.ReactNode;
  accent?: string;
}

interface CodeBlockProps {
  children: string;
  label?: string;
}

interface PropTableProps {
  rows: [string, string, string, string][];
}

const theme: Record<string, string> = {
  bg: "#0a0a0f",
  surface: "#12121a",
  surfaceHover: "#1a1a26",
  border: "#1e1e2e",
  accent: "#00e5ff",
  accentDim: "#00e5ff22",
  accentGlow: "#00e5ff44",
  green: "#00ff88",
  purple: "#b06eff",
  orange: "#ff6b35",
  yellow: "#ffd60a",
  text: "#e8e8f0",
  textMuted: "#6b6b8a",
  textDim: "#9898b8",
} as const;

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${theme.bg};
    color: ${theme.text};
    font-family: 'Syne', sans-serif;
    line-height: 1.6;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${theme.bg}; }
  ::-webkit-scrollbar-thumb { background: ${theme.accent}33; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: ${theme.accent}66; }

  .code-block {
    font-family: 'Space Mono', monospace;
    background: #080810;
    border: 1px solid ${theme.border};
    border-left: 3px solid ${theme.accent};
    border-radius: 8px;
    padding: 20px 24px;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.8;
    color: #c8c8e0;
    position: relative;
  }

  .code-block .kw { color: ${theme.purple}; }
  .code-block .str { color: ${theme.green}; }
  .code-block .num { color: ${theme.orange}; }
  .code-block .comment { color: ${theme.textMuted}; font-style: italic; }
  .code-block .type { color: ${theme.yellow}; }
  .code-block .fn { color: ${theme.accent}; }
  .code-block .toon-key { color: ${theme.accent}; font-weight: 700; }
  .code-block .toon-type { color: ${theme.yellow}; }
  .code-block .toon-val { color: ${theme.green}; }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: 'Space Mono', monospace;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 ${theme.accentGlow}; }
    50% { box-shadow: 0 0 20px 4px ${theme.accentGlow}; }
  }

  .glow-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${theme.green};
    animation: pulse-glow 2s ease infinite;
    display: inline-block;
  }

  .section-anim {
    animation: fadeInUp 0.5s ease both;
  }

  .nav-link {
    display: block;
    padding: 7px 14px;
    border-radius: 6px;
    font-size: 13px;
    color: ${theme.textDim};
    text-decoration: none;
    cursor: pointer;
    transition: all 0.15s;
    font-family: 'Space Mono', monospace;
    border: 1px solid transparent;
  }
  .nav-link:hover {
    color: ${theme.accent};
    background: ${theme.accentDim};
    border-color: ${theme.accentGlow};
  }
  .nav-link.active {
    color: ${theme.accent};
    background: ${theme.accentDim};
    border-color: ${theme.accent}55;
  }

  .tab-btn {
    padding: 8px 18px;
    border-radius: 6px;
    font-size: 12px;
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s;
    border: 1px solid ${theme.border};
    background: transparent;
    color: ${theme.textDim};
    letter-spacing: 0.05em;
  }
  .tab-btn.active {
    background: ${theme.accentDim};
    border-color: ${theme.accent};
    color: ${theme.accent};
  }
  .tab-btn:hover:not(.active) {
    background: ${theme.surfaceHover};
    color: ${theme.text};
  }

  .type-row:hover { background: ${theme.surfaceHover}; }

  h1, h2, h3, h4 { font-family: 'Syne', sans-serif; }
`;

const navItems: NavItem[] = [
  { id: "intro", label: "Introduction" },
  { id: "format", label: "TOON Format" },
  { id: "types", label: "Data Types" },
  { id: "install", label: "Installation" },
  { id: "frontend", label: "Frontend Usage" },
  { id: "backend", label: "Backend Usage" },
  { id: "postman", label: "Postman Testing" },
  { id: "examples", label: "Advanced Examples" },
  { id: "performance", label: "Performance" },
  { id: "usecases", label: "Use Cases" },
];

function SectionHeader({ id, icon, title, subtitle }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <h2
          id={id}
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: theme.text,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p style={{ color: theme.textDim, fontSize: 15, paddingLeft: 36 }}>
          {subtitle}
        </p>
      )}
      <div
        style={{
          height: 1,
          background: `linear-gradient(to right, ${theme.accent}44, transparent)`,
          marginTop: 16,
        }}
      />
    </div>
  );
}

function InfoCard({ children, accent = theme.accent }: InfoCardProps) {
  return (
    <div
      style={{
        background: theme.surface,
        border: `1px solid ${accent}33`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 8,
        padding: "16px 20px",
        marginBottom: 20,
        fontSize: 14,
        color: theme.textDim,
        lineHeight: 1.7,
      }}
    >
      {children}
    </div>
  );
}

function CodeBlock({ children, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const text = children.replace(/<[^>]+>/g, "");
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ position: "relative", marginBottom: 24 }}>
      {label && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            className="badge"
            style={{
              background: theme.accentDim,
              color: theme.accent,
              border: `1px solid ${theme.accentGlow}`,
            }}
          >
            {label}
          </span>
          <button
            onClick={copy}
            style={{
              background: "transparent",
              border: `1px solid ${theme.border}`,
              color: copied ? theme.green : theme.textMuted,
              padding: "3px 10px",
              borderRadius: 5,
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "'Space Mono', monospace",
              transition: "all 0.15s",
            }}
          >
            {copied ? "✓ copied" : "copy"}
          </button>
        </div>
      )}
      <pre
        className="code-block"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </div>
  );
}

function PropTable({ rows }: PropTableProps) {
  return (
    <div
      style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 24,
        fontSize: 13,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 100px 1fr 1fr",
          padding: "10px 20px",
          borderBottom: `1px solid ${theme.border}`,
          color: theme.textMuted,
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span>Code</span>
        <span>Type</span>
        <span>Example</span>
        <span>Notes</span>
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className="type-row"
          style={{
            display: "grid",
            gridTemplateColumns: "80px 100px 1fr 1fr",
            padding: "12px 20px",
            borderBottom: i < rows.length - 1 ? `1px solid ${theme.border}` : "none",
            transition: "background 0.1s",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              color: theme.accent,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {row[0]}
          </span>
          <span style={{ color: theme.purple }}>{row[1]}</span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              color: theme.green,
              fontSize: 12,
            }}
          >
            {row[2]}
          </span>
          <span style={{ color: theme.textDim }}>{row[3]}</span>
        </div>
      ))}
    </div>
  );
}

export default function ToonkitDocs() {
  const [activeSection, setActiveSection] = useState("intro");
  const [tabFrontend, setTabFrontend] = useState("send");
  const [tabBackend, setTabBackend] = useState("setup");

  const scrollTo = (id: any) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: theme.bg }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            borderRight: `1px solid ${theme.border}`,
            padding: "32px 12px",
            background: theme.bg,
          }}
        >
          {/* Logo */}
          <div style={{ paddingLeft: 14, marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 6,
              }}
            >
              {/* <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.purple})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#000",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                T
              </div> */}
              {/* <span
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: "-0.03em",
                  color: theme.text,
                }}
              >
                toonkit
              </span> */}
            </div>
            {/* <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="glow-dot" />
              <span style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'Space Mono', monospace" }}>
                v1.x • MIT
              </span>
            </div> */}
          </div>

          <div style={{ fontSize: 10, color: theme.textMuted, paddingLeft: 14, marginBottom: 8, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>
            Docs
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map((item) => (
              <span
                key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </span>
            ))}
          </nav>

          <div style={{ marginTop: 32, paddingLeft: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            <a
              href="https://github.com/ManojGowda89/toonkit"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: theme.textMuted,
                textDecoration: "none",
                fontFamily: "'Space Mono', monospace",
                transition: "color 0.15s",
              }}
            >
              ↗ GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/toonkit"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: theme.textMuted,
                textDecoration: "none",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              ↗ NPM Docs
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            maxWidth: 860,
            margin: "0 auto",
            padding: "60px 48px 120px",
            overflowX: "hidden",
          }}
        >
          {/* Hero */}
          <div
            className="section-anim"
            style={{
              marginBottom: 72,
              padding: "48px",
              background: `linear-gradient(135deg, ${theme.surface} 0%, #0e0e1a 100%)`,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { label: "Typed", color: theme.accent },
                { label: "Compact", color: theme.green },
                { label: "API-First", color: theme.purple },
                { label: "MIT", color: theme.orange },
              ].map((b) => (
                <span
                  key={b.label}
                  className="badge"
                  style={{ background: `${b.color}15`, color: b.color, border: `1px solid ${b.color}33` }}
                >
                  {b.label}
                </span>
              ))}
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginBottom: 16,
                background: `linear-gradient(135deg, ${theme.text} 30%, ${theme.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              toonkit
            </h1>
            <p
              style={{
                fontSize: 18,
                color: theme.textDim,
                maxWidth: 480,
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              A parser & serializer for{" "}
              <span style={{ color: theme.accent, fontWeight: 700 }}>TOON</span> —
              Typed Object Oriented Notation. Smaller payloads, human-readable, schema-first.
            </p>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: theme.textMuted }}>
              <span style={{ color: theme.green }}>$</span>{" "}
              <span style={{ color: theme.text }}>npm install toonkit</span>
            </div>
          </div>

          {/* ── INTRODUCTION ── */}
          <section id="intro" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="intro"
              icon="🧠"
              title="Introduction"
              subtitle="What is TOON and why does it exist?"
            />
            <p style={{ fontSize: 15, color: theme.textDim, lineHeight: 1.8, marginBottom: 20 }}>
              <strong style={{ color: theme.text }}>TOON</strong> stands for{" "}
              <strong style={{ color: theme.accent }}>Typed Object Oriented Notation</strong>. It is a
              lightweight, human-readable data format built as a practical alternative to JSON for
              API communication — particularly suited for structured, multi-resource responses.
            </p>
            <p style={{ fontSize: 15, color: theme.textDim, lineHeight: 1.8, marginBottom: 24 }}>
              JSON is powerful but carries heavy syntactic overhead: repeated keys, nested braces,
              and no native type schema. TOON solves this by separating the{" "}
              <span style={{ color: theme.yellow }}>schema definition</span> from the{" "}
              <span style={{ color: theme.green }}>data rows</span>, like a miniature typed table format —
              resulting in smaller payloads and faster parsing.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {[
                { icon: "✅", label: "Smaller payloads", desc: "No repeated key names in data rows" },
                { icon: "🔤", label: "Human-readable", desc: "Plain text, editable in any editor" },
                { icon: "🏷️", label: "Type-safe", desc: "Schema declares types per field" },
                { icon: "📦", label: "Multi-resource", desc: "Multiple collections in one response" },
                { icon: "⚡", label: "Fast parsing", desc: "Less to parse, simpler structure" },
                { icon: "🔗", label: "API-friendly", desc: "Works perfectly with REST APIs" },
              ].map((f) => (
                <div
                  key={f.label}
                  style={{
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 10,
                    padding: "16px 18px",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: theme.text, marginBottom: 4 }}>
                      {f.label}
                    </div>
                    <div style={{ fontSize: 12, color: theme.textMuted }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <InfoCard accent={theme.purple}>
              <strong style={{ color: theme.purple }}>toonkit</strong> is the JavaScript library that
              implements TOON. It provides four core functions:{" "}
              <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>sendToon</code>,{" "}
              <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>receiveToon</code>,{" "}
              <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>reqGetToon</code>, and{" "}
              <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>resSendToon</code> —
              covering both client and server needs.
            </InfoCard>
          </section>

          {/* ── TOON FORMAT ── */}
          <section id="format" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="format"
              icon="🧾"
              title="The TOON Format"
              subtitle="Understanding TOON syntax, anatomy, and parsing rules"
            />

            <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 12 }}>
              Anatomy of a TOON string
            </h3>
            <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 20, lineHeight: 1.7 }}>
              A TOON document is made up of one or more{" "}
              <strong style={{ color: theme.text }}>resource blocks</strong>. Each block has:
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 28,
              }}
            >
              {[
                {
                  part: "name",
                  syntax: "employees",
                  color: theme.accent,
                  desc: "The resource/collection name. Becomes the key in the parsed output.",
                },
                {
                  part: "count (optional)",
                  syntax: "[2]",
                  color: theme.yellow,
                  desc: "Number of data rows. If [1], parses as object (not array). If [2+], parses as array.",
                },
                {
                  part: "schema",
                  syntax: "{id:n,name:s}",
                  color: theme.purple,
                  desc: "Field names with their types (n=number, s=string, b=boolean, etc.).",
                },
                {
                  part: "separator",
                  syntax: ":",
                  color: theme.orange,
                  desc: "Colon separates the header declaration from the data rows.",
                },
                {
                  part: "rows",
                  syntax: "1,Riya",
                  color: theme.green,
                  desc: "Comma-separated values. One row per line, matching the schema order.",
                },
              ].map((item) => (
                <div
                  key={item.part}
                  style={{
                    display: "flex",
                    gap: 16,
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    alignItems: "center",
                  }}
                >
                  <code
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 14,
                      color: item.color,
                      fontWeight: 700,
                      minWidth: 130,
                    }}
                  >
                    {item.syntax}
                  </code>
                  <div>
                    <span
                      style={{
                        fontSize: 11,
                        color: item.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontFamily: "'Space Mono', monospace",
                        marginRight: 8,
                      }}
                    >
                      [{item.part}]
                    </span>
                    <span style={{ fontSize: 13, color: theme.textDim }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 16 }}>
              Full Example — TOON vs JSON
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              <div>
                <CodeBlock label="TOON Input">{`<span class="toon-key">meta</span>{<span class="toon-type">page:n,limit:n,total:n</span>}:
<span class="toon-val">1,10,200</span>

<span class="toon-key">employees</span>[<span class="num">2</span>]{<span class="toon-type">id:n,name:s,salary:n,active:b</span>}:
<span class="toon-val">1,Riya,90000,true</span>
<span class="toon-val">2,John,80000,false</span>

<span class="toon-key">departments</span>[<span class="num">1</span>]{<span class="toon-type">id:s,title:s</span>}:
<span class="toon-val">10,Engineering</span>`}</CodeBlock>
              </div>
              <div>
                <CodeBlock label="Parsed JSON">{`{
  <span class="str">"meta"</span>: {
    <span class="str">"page"</span>: <span class="num">1</span>,
    <span class="str">"limit"</span>: <span class="num">10</span>,
    <span class="str">"total"</span>: <span class="num">200</span>
  },
  <span class="str">"employees"</span>: [
    { <span class="str">"id"</span>: <span class="num">1</span>, <span class="str">"name"</span>: <span class="str">"Riya"</span>,
      <span class="str">"salary"</span>: <span class="num">90000</span>, <span class="str">"active"</span>: <span class="kw">true</span> },
    { <span class="str">"id"</span>: <span class="num">2</span>, <span class="str">"name"</span>: <span class="str">"John"</span>,
      <span class="str">"salary"</span>: <span class="num">80000</span>, <span class="str">"active"</span>: <span class="kw">false</span> }
  ],
  <span class="str">"departments"</span>: {
    <span class="str">"id"</span>: <span class="str">"10"</span>,
    <span class="str">"title"</span>: <span class="str">"Engineering"</span>
  }
}`}</CodeBlock>
              </div>
            </div>

            <InfoCard accent={theme.yellow}>
              <strong style={{ color: theme.yellow }}>Count rules:</strong> When the count is{" "}
              <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>[1]</code>, the parsed
              output is a plain <strong>object</strong>. When the count is{" "}
              <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>[2]</code> or
              higher, the parsed output is an <strong>array</strong>. When no count is specified (like{" "}
              <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>meta{`{…}`}</code>), it
              also parses as an object.
            </InfoCard>
          </section>

          {/* ── DATA TYPES ── */}
          <section id="types" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="types"
              icon="🧬"
              title="Data Types"
              subtitle="Every supported type code, what it maps to, and how to use it"
            />
            <PropTable
              rows={[
                ["n", "number", "25", "Integers and floats. 90000, 3.14, -7"],
                ["s", "string", "Manoj", "Plain text. Quotes not needed in TOON rows."],
                ["b", "boolean", "true / false", "Must be exactly true or false (lowercase)."],
                ["nl", "null", "null", "Explicit null value. Maps to JS null."],
                ["j", "JSON", '{"x":1}', "Embedded JSON object. Must be valid JSON."],
                ["a", "array", '["a","b"]', "Embedded JSON array. Must be valid JSON array."],
              ]}
            />
            <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 16 }}>
              All-types example
            </h3>
            <CodeBlock label="TOON — All Types">{`<span class="toon-key">sample</span>{<span class="toon-type">age:n,name:s,active:b,data:j,tags:a,value:nl</span>}:
<span class="toon-val">25,Manoj,true,{"x":1},["a","b"],null</span>`}</CodeBlock>
            <CodeBlock label="Parsed Output">{`{
  <span class="str">"sample"</span>: {
    <span class="str">"age"</span>:    <span class="num">25</span>,
    <span class="str">"name"</span>:   <span class="str">"Manoj"</span>,
    <span class="str">"active"</span>: <span class="kw">true</span>,
    <span class="str">"data"</span>:   { <span class="str">"x"</span>: <span class="num">1</span> },
    <span class="str">"tags"</span>:   [<span class="str">"a"</span>, <span class="str">"b"</span>],
    <span class="str">"value"</span>:  <span class="kw">null</span>
  }
}`}</CodeBlock>
          </section>

          {/* ── INSTALLATION ── */}
          <section id="install" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="install"
              icon="📥"
              title="Installation"
              subtitle="Getting toonkit into your project"
            />
            <CodeBlock label="npm">{`<span class="fn">npm</span> install toonkit`}</CodeBlock>
            <CodeBlock label="yarn">{`<span class="fn">yarn</span> add toonkit`}</CodeBlock>
            <CodeBlock label="pnpm">{`<span class="fn">pnpm</span> add toonkit`}</CodeBlock>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 16, marginTop: 32 }}>
              Importing
            </h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button
                className={`tab-btn ${tabFrontend === "cjs" ? "active" : ""}`}
                onClick={() => setTabFrontend("cjs")}
              >
                CommonJS
              </button>
              <button
                className={`tab-btn ${tabFrontend !== "cjs" ? "active" : ""}`}
                onClick={() => setTabFrontend("esm")}
              >
                ES Modules
              </button>
            </div>
            {tabFrontend === "cjs" ? (
              <CodeBlock label="CommonJS (Node.js / require)">{`<span class="kw">const</span> { <span class="fn">sendToon</span>, <span class="fn">receiveToon</span>, <span class="fn">reqGetToon</span>, <span class="fn">resSendToon</span> }
  = <span class="fn">require</span>(<span class="str">"toonkit"</span>);`}</CodeBlock>
            ) : (
              <CodeBlock label="ES Modules (import)">{`<span class="kw">import</span> { <span class="fn">sendToon</span>, <span class="fn">receiveToon</span>, <span class="fn">reqGetToon</span>, <span class="fn">resSendToon</span> }
  <span class="kw">from</span> <span class="str">"toonkit"</span>;`}</CodeBlock>
            )}

            <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 16, marginTop: 28 }}>
              Exported Functions
            </h3>
            <div
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {[
                {
                  fn: "sendToon(obj)",
                  use: "Frontend",
                  desc: "Converts a JavaScript object/array into a TOON-formatted string for sending.",
                },
                {
                  fn: "receiveToon(str)",
                  use: "Frontend",
                  desc: "Parses a TOON string back into a JavaScript object/array.",
                },
                {
                  fn: "reqGetToon(req)",
                  use: "Backend",
                  desc: "Reads and parses the TOON body from an Express request object.",
                },
                {
                  fn: "resSendToon(res, data)",
                  use: "Backend",
                  desc: "Serializes data to TOON and sends it as the Express response.",
                },
              ].map((item, i, arr) => (
                <div
                  key={item.fn}
                  className="type-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "220px 90px 1fr",
                    padding: "14px 20px",
                    borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : "none",
                    alignItems: "center",
                    gap: 16,
                    transition: "background 0.1s",
                  }}
                >
                  <code
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      color: theme.accent,
                      fontSize: 12,
                    }}
                  >
                    {item.fn}
                  </code>
                  <span
                    className="badge"
                    style={{
                      background: item.use === "Frontend" ? `${theme.purple}22` : `${theme.green}22`,
                      color: item.use === "Frontend" ? theme.purple : theme.green,
                      border: `1px solid ${item.use === "Frontend" ? theme.purple : theme.green}44`,
                    }}
                  >
                    {item.use}
                  </span>
                  <span style={{ fontSize: 13, color: theme.textDim }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── FRONTEND USAGE ── */}
          <section id="frontend" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="frontend"
              icon="🌐"
              title="Frontend Usage"
              subtitle="Sending and receiving TOON data from the browser"
            />
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["send", "receive", "full"].map((t) => (
                <button
                  key={t}
                  className={`tab-btn ${tabFrontend === t ? "active" : ""}`}
                  onClick={() => setTabFrontend(t)}
                >
                  {t === "send" ? "JSON → TOON" : t === "receive" ? "TOON → JSON" : "Full Flow"}
                </button>
              ))}
            </div>

            {tabFrontend === "send" && (
              <>
                <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 16, lineHeight: 1.7 }}>
                  Use <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>sendToon()</code>{" "}
                  to convert your JavaScript object into a TOON string before sending it to the server.
                  Always set <code style={{ color: theme.yellow, fontFamily: "'Space Mono', monospace" }}>Content-Type: text/plain</code>.
                </p>
                <CodeBlock label="sendToon — JSON to TOON">{`<span class="kw">import</span> { <span class="fn">sendToon</span> } <span class="kw">from</span> <span class="str">"toonkit"</span>;

<span class="kw">const</span> payload = <span class="fn">sendToon</span>({
  employees: [
    { id: <span class="num">1</span>, name: <span class="str">"Riya"</span>, salary: <span class="num">90000</span>, active: <span class="kw">true</span> },
    { id: <span class="num">2</span>, name: <span class="str">"John"</span>, salary: <span class="num">80000</span>, active: <span class="kw">false</span> }
  ]
});

<span class="comment">// payload is now a compact TOON string:</span>
<span class="comment">// employees[2]{id:n,name:s,salary:n,active:b}:</span>
<span class="comment">// 1,Riya,90000,true</span>
<span class="comment">// 2,John,80000,false</span>`}</CodeBlock>
                <CodeBlock label="Send to API via fetch">{`<span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">"/api/employees"</span>, {
  method: <span class="str">"POST"</span>,
  headers: {
    <span class="str">"Content-Type"</span>: <span class="str">"text/plain"</span>  <span class="comment">// ← Required!</span>
  },
  body: payload  <span class="comment">// TOON string</span>
});`}</CodeBlock>
              </>
            )}

            {tabFrontend === "receive" && (
              <>
                <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 16, lineHeight: 1.7 }}>
                  Use <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>receiveToon()</code>{" "}
                  to parse a TOON response string back into a usable JavaScript object.
                </p>
                <CodeBlock label="receiveToon — TOON to JSON">{`<span class="kw">import</span> { <span class="fn">receiveToon</span> } <span class="kw">from</span> <span class="str">"toonkit"</span>;

<span class="kw">const</span> res = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">"/api/employees"</span>);

<span class="comment">// Read raw text — NOT res.json()</span>
<span class="kw">const</span> text = <span class="kw">await</span> res.<span class="fn">text</span>();

<span class="kw">const</span> data = <span class="fn">receiveToon</span>(text);

console.<span class="fn">log</span>(data.employees);
<span class="comment">// → [{ id: 1, name: "Riya", ... }, ...]</span>`}</CodeBlock>
                <InfoCard>
                  Always use <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>res.text()</code>{" "}
                  (not <code style={{ color: theme.orange, fontFamily: "'Space Mono', monospace" }}>res.json()</code>)
                  when expecting a TOON response. TOON is plain text, not JSON.
                </InfoCard>
              </>
            )}

            {tabFrontend === "full" && (
              <CodeBlock label="Complete Frontend Flow">{`<span class="kw">import</span> { <span class="fn">sendToon</span>, <span class="fn">receiveToon</span> } <span class="kw">from</span> <span class="str">"toonkit"</span>;

<span class="kw">async function</span> <span class="fn">createEmployees</span>() {
  <span class="comment">// 1. Prepare data as TOON</span>
  <span class="kw">const</span> payload = <span class="fn">sendToon</span>({
    employees: [
      { id: <span class="num">1</span>, name: <span class="str">"Riya"</span>, salary: <span class="num">90000</span>, active: <span class="kw">true</span> }
    ]
  });

  <span class="comment">// 2. POST to API</span>
  <span class="kw">const</span> res = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">"/api/employees"</span>, {
    method: <span class="str">"POST"</span>,
    headers: { <span class="str">"Content-Type"</span>: <span class="str">"text/plain"</span> },
    body: payload
  });

  <span class="comment">// 3. Read TOON response as text</span>
  <span class="kw">const</span> text = <span class="kw">await</span> res.<span class="fn">text</span>();

  <span class="comment">// 4. Parse back to JS</span>
  <span class="kw">const</span> data = <span class="fn">receiveToon</span>(text);
  console.<span class="fn">log</span>(data);
}`}</CodeBlock>
            )}
          </section>

          {/* ── BACKEND USAGE ── */}
          <section id="backend" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="backend"
              icon="🖥"
              title="Backend Usage (Express)"
              subtitle="Parsing TOON requests and sending TOON responses in Node.js"
            />
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["setup", "parse", "respond", "full"].map((t) => (
                <button
                  key={t}
                  className={`tab-btn ${tabBackend === t ? "active" : ""}`}
                  onClick={() => setTabBackend(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {tabBackend === "setup" && (
              <>
                <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 16, lineHeight: 1.7 }}>
                  Before toonkit can parse the request body, Express must be configured to read
                  raw text bodies using{" "}
                  <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>express.text()</code>.
                  Without this middleware, <code style={{ color: theme.orange, fontFamily: "'Space Mono', monospace" }}>req.body</code>{" "}
                  will be undefined.
                </p>
                <CodeBlock label="Express Setup">{`<span class="kw">const</span> express = <span class="fn">require</span>(<span class="str">"express"</span>);
<span class="kw">const</span> { <span class="fn">reqGetToon</span>, <span class="fn">resSendToon</span> } = <span class="fn">require</span>(<span class="str">"toonkit"</span>);

<span class="kw">const</span> app = <span class="fn">express</span>();

<span class="comment">// ← Critical: enables plain text body parsing</span>
app.<span class="fn">use</span>(express.<span class="fn">text</span>());

app.<span class="fn">listen</span>(<span class="num">3000</span>, () => console.<span class="fn">log</span>(<span class="str">"Server running"</span>));`}</CodeBlock>
                <InfoCard accent={theme.orange}>
                  <strong style={{ color: theme.orange }}>⚠️ Required:</strong> Always call{" "}
                  <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>app.use(express.text())</code>{" "}
                  before your routes. toonkit reads from <code style={{ fontFamily: "'Space Mono', monospace" }}>req.body</code>{" "}
                  which is only populated when Express's text parser is active.
                </InfoCard>
              </>
            )}

            {tabBackend === "parse" && (
              <>
                <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 16, lineHeight: 1.7 }}>
                  <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>reqGetToon(req)</code>{" "}
                  reads the raw TOON text from{" "}
                  <code style={{ fontFamily: "'Space Mono', monospace", color: theme.yellow }}>req.body</code>{" "}
                  and parses it into a plain JavaScript object — ready for use in your route handler.
                </p>
                <CodeBlock label="reqGetToon — parse incoming TOON">{`app.<span class="fn">post</span>(<span class="str">"/api/employees"</span>, (req, res) => {
  <span class="comment">// Parse TOON request body into JS object</span>
  <span class="kw">const</span> data = <span class="fn">reqGetToon</span>(req);

  console.<span class="fn">log</span>(data);
  <span class="comment">// → { employees: [{ id: 1, name: "Riya", ... }] }</span>

  <span class="comment">// Use data as normal JS object</span>
  <span class="kw">const</span> { employees } = data;
  employees.<span class="fn">forEach</span>(emp => console.<span class="fn">log</span>(emp.name));
});`}</CodeBlock>
              </>
            )}

            {tabBackend === "respond" && (
              <>
                <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 16, lineHeight: 1.7 }}>
                  <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>resSendToon(res, data)</code>{" "}
                  serializes your JavaScript object into TOON format and writes it as the HTTP
                  response with the correct headers automatically.
                </p>
                <CodeBlock label="resSendToon — respond with TOON">{`app.<span class="fn">get</span>(<span class="str">"/api/dashboard"</span>, (req, res) => {
  <span class="kw">const</span> responseData = {
    meta: { page: <span class="num">1</span>, limit: <span class="num">10</span>, total: <span class="num">200</span> },
    employees: [
      { id: <span class="num">1</span>, name: <span class="str">"Riya"</span>, salary: <span class="num">90000</span> },
      { id: <span class="num">2</span>, name: <span class="str">"John"</span>, salary: <span class="num">80000</span> }
    ]
  };

  <span class="comment">// Serialize + send as TOON in one call</span>
  <span class="fn">resSendToon</span>(res, responseData);
});`}</CodeBlock>
              </>
            )}

            {tabBackend === "full" && (
              <CodeBlock label="Complete Express Route">{`<span class="kw">const</span> express = <span class="fn">require</span>(<span class="str">"express"</span>);
<span class="kw">const</span> { <span class="fn">reqGetToon</span>, <span class="fn">resSendToon</span> } = <span class="fn">require</span>(<span class="str">"toonkit"</span>);

<span class="kw">const</span> app = <span class="fn">express</span>();
app.<span class="fn">use</span>(express.<span class="fn">text</span>());  <span class="comment">// Required middleware</span>

app.<span class="fn">post</span>(<span class="str">"/api"</span>, (req, res) => {
  <span class="comment">// 1. Parse TOON from request</span>
  <span class="kw">const</span> data = <span class="fn">reqGetToon</span>(req);
  console.<span class="fn">log</span>(<span class="str">"Received:"</span>, data);

  <span class="comment">// 2. Process / save to DB / transform...</span>
  <span class="kw">const</span> result = { ...data, processed: <span class="kw">true</span> };

  <span class="comment">// 3. Respond with TOON</span>
  <span class="fn">resSendToon</span>(res, result);
});

app.<span class="fn">listen</span>(<span class="num">3000</span>);`}</CodeBlock>
            )}
          </section>

          {/* ── POSTMAN ── */}
          <section id="postman" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="postman"
              icon="🧪"
              title="Testing with Postman"
              subtitle="Manually sending TOON requests to your API"
            />
            <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 24, lineHeight: 1.7 }}>
              Since TOON is plain text, you can easily test your API endpoints using Postman or
              any HTTP client. Follow these four steps:
            </p>
            {[
              {
                step: "01",
                title: "Set Method",
                content: (
                  <span>
                    Select <strong style={{ color: theme.green }}>POST</strong> as the HTTP method.
                  </span>
                ),
              },
              {
                step: "02",
                title: "Add Header",
                content: (
                  <span>
                    In the <strong>Headers</strong> tab, add:{" "}
                    <code
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        color: theme.yellow,
                        fontSize: 12,
                      }}
                    >
                      Content-Type: text/plain
                    </code>
                  </span>
                ),
              },
              {
                step: "03",
                title: "Set Body",
                content: (
                  <span>
                    In the <strong>Body</strong> tab, select <strong>raw</strong> and set format to{" "}
                    <strong>Text</strong>. Then paste your TOON string.
                  </span>
                ),
              },
              {
                step: "04",
                title: "Send",
                content: (
                  <span>
                    Hit <strong style={{ color: theme.accent }}>Send</strong>. The server will parse
                    and respond with TOON.
                  </span>
                ),
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  display: "flex",
                  gap: 20,
                  marginBottom: 16,
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 10,
                  padding: "16px 20px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 22,
                    fontWeight: 700,
                    color: theme.accent,
                    opacity: 0.4,
                    minWidth: 40,
                    lineHeight: 1.3,
                  }}
                >
                  {item.step}
                </span>
                <div>
                  <div style={{ fontWeight: 700, color: theme.text, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: theme.textDim, lineHeight: 1.7 }}>{item.content}</div>
                </div>
              </div>
            ))}
            <CodeBlock label="Postman Body (raw text)">{`<span class="toon-key">employees</span>[<span class="num">2</span>]{<span class="toon-type">id:n,name:s,salary:n</span>}:
<span class="toon-val">1,Riya,90000</span>
<span class="toon-val">2,John,80000</span>`}</CodeBlock>
          </section>

          {/* ── ADVANCED EXAMPLES ── */}
          <section id="examples" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="examples"
              icon="📊"
              title="Advanced Examples"
              subtitle="Pagination, multi-collection responses, and complex schemas"
            />

            <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 16 }}>
              Pagination Response
            </h3>
            <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 16, lineHeight: 1.7 }}>
              A common API pattern is returning paginated data with a <code style={{ color: theme.accent, fontFamily: "'Space Mono', monospace" }}>meta</code> block
              alongside the collection. Because <code style={{ fontFamily: "'Space Mono', monospace" }}>meta</code> has no count (no <code style={{ fontFamily: "'Space Mono', monospace" }}>[]</code>),
              it parses as a plain object.
            </p>
            <CodeBlock label="Paginated TOON Response">{`<span class="kw">import</span> { <span class="fn">sendToon</span> } <span class="kw">from</span> <span class="str">"toonkit"</span>;

<span class="fn">sendToon</span>({
  meta: { page: <span class="num">1</span>, limit: <span class="num">10</span>, total: <span class="num">200</span> },
  employees: [
    { id: <span class="num">1</span>, name: <span class="str">"Riya"</span>, salary: <span class="num">90000</span>, active: <span class="kw">true</span>  },
    { id: <span class="num">2</span>, name: <span class="str">"John"</span>, salary: <span class="num">80000</span>, active: <span class="kw">false</span> },
    <span class="comment">// ... up to limit rows</span>
  ]
});`}</CodeBlock>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 16, marginTop: 32 }}>
              Multiple Collections
            </h3>
            <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 16, lineHeight: 1.7 }}>
              One of TOON's strengths is encoding multiple collections in a single response.
              This is useful for dashboard endpoints that return users, products, and orders together.
            </p>
            <CodeBlock label="Multi-collection Response">{`<span class="fn">sendToon</span>({
  users: [
    { id: <span class="num">1</span>, name: <span class="str">"Alice"</span>, role: <span class="str">"admin"</span> },
    { id: <span class="num">2</span>, name: <span class="str">"Bob"</span>,   role: <span class="str">"user"</span>  }
  ],
  products: [
    { sku: <span class="str">"A1"</span>, title: <span class="str">"Keyboard"</span>, price: <span class="num">79.99</span> },
    { sku: <span class="str">"B2"</span>, title: <span class="str">"Mouse"</span>,    price: <span class="num">39.99</span> }
  ],
  orders: [
    { id: <span class="num">101</span>, userId: <span class="num">1</span>, total: <span class="num">119.98</span>, fulfilled: <span class="kw">true</span> }
  ]
});`}</CodeBlock>
            <InfoCard accent={theme.green}>
              Instead of three separate API calls, return all three collections in one TOON
              response — keeping bandwidth low and round-trips minimal.
            </InfoCard>
          </section>

          {/* ── PERFORMANCE ── */}
          <section id="performance" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="performance"
              icon="⚡"
              title="Performance Advantage"
              subtitle="Why TOON is faster and lighter than JSON"
            />
            <p style={{ fontSize: 14, color: theme.textDim, marginBottom: 24, lineHeight: 1.7 }}>
              JSON repeats every key name for every row. In a dataset with 100 employees, the field
              names <code style={{ color: theme.yellow, fontFamily: "'Space Mono', monospace" }}>id</code>,{" "}
              <code style={{ color: theme.yellow, fontFamily: "'Space Mono', monospace" }}>name</code>,{" "}
              <code style={{ color: theme.yellow, fontFamily: "'Space Mono', monospace" }}>salary</code>,{" "}
              <code style={{ color: theme.yellow, fontFamily: "'Space Mono', monospace" }}>active</code>{" "}
              each appear 100 times. TOON declares them once in the schema header.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              <div
                style={{
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 10,
                  padding: 24,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 800, color: theme.orange, fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>
                  JSON
                </div>
                <div style={{ fontSize: 13, color: theme.textDim, lineHeight: 1.7 }}>
                  Keys repeated per row<br />
                  Nested braces & quotes<br />
                  Heavier for tabular data<br />
                  No inline type schema
                </div>
              </div>
              <div
                style={{
                  background: `${theme.accentDim}`,
                  border: `1px solid ${theme.accent}44`,
                  borderRadius: 10,
                  padding: 24,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 800, color: theme.accent, fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>
                  TOON
                </div>
                <div style={{ fontSize: 13, color: theme.textDim, lineHeight: 1.7 }}>
                  Keys declared once in header<br />
                  Clean CSV-style rows<br />
                  Smaller payload size<br />
                  Types baked in
                </div>
              </div>
            </div>
            <CodeBlock label="Same data — JSON vs TOON">{`<span class="comment">// JSON: ~120 bytes for 2 rows</span>
{"employees":[{"id":1,"name":"Riya","salary":90000,"active":true},{"id":2,"name":"John","salary":80000,"active":false}]}

<span class="comment">// TOON: ~70 bytes for 2 rows</span>
<span class="toon-key">employees</span>[<span class="num">2</span>]{<span class="toon-type">id:n,name:s,salary:n,active:b</span>}:
<span class="toon-val">1,Riya,90000,true</span>
<span class="toon-val">2,John,80000,false</span>`}</CodeBlock>
          </section>

          {/* ── USE CASES ── */}
          <section id="usecases" className="section-anim" style={{ marginBottom: 64 }}>
            <SectionHeader
              id="usecases"
              icon="🎯"
              title="When to Use toonkit"
              subtitle="Ideal scenarios and environments for TOON"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              {[
                { icon: "🔌", label: "REST APIs", desc: "Multi-resource responses with pagination. Replace JSON where payload size matters." },
                { icon: "🤖", label: "Bots & Automation", desc: "Structured, typed messages that are easy to produce and parse programmatically." },
                { icon: "📡", label: "Low-bandwidth Systems", desc: "IoT, mobile, and embedded environments where every byte counts." },
                { icon: "🧩", label: "Chrome Extensions", desc: "Compact storage and messaging between content scripts and background workers." },
                { icon: "⚙️", label: "Microservices", desc: "Efficient inter-service communication with typed, lightweight payloads." },
                { icon: "📋", label: "Admin Tools", desc: "Dashboard APIs returning multiple collections — users, stats, logs — in one call." },
                { icon: "🔁", label: "Data Pipelines", desc: "Pass structured data between pipeline stages with built-in type enforcement." },
                { icon: "🛠", label: "Developer Tooling", desc: "Config files and CLI tool outputs that remain human-readable and type-safe." },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 10,
                    padding: "16px 18px",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    transition: "border-color 0.15s",
                  }}
                  onMouseEnter={(e: MouseEvent<HTMLDivElement>) => ((e.currentTarget as HTMLDivElement).style.borderColor = theme.accent + "55")}
                  onMouseLeave={(e: MouseEvent<HTMLDivElement>) => ((e.currentTarget as HTMLDivElement).style.borderColor = theme.border)}
                >
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: theme.text, marginBottom: 4 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                marginTop: 64,
                padding: "32px",
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: theme.text, marginBottom: 4 }}>
                  Built by Manoj Gowda
                </div>
                <div style={{ fontSize: 13, color: theme.textMuted }}>
                  toonkit is MIT licensed and open to contributions.
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <a
                  href="https://github.com/ManojGowda89/toonkit"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "9px 18px",
                    borderRadius: 8,
                    background: theme.accentDim,
                    border: `1px solid ${theme.accent}55`,
                    color: theme.accent,
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                    transition: "all 0.15s",
                  }}
                >
                  ⭐ GitHub
                </a>
                <a
                  href="https://toonkit.manojgowda.in"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "9px 18px",
                    borderRadius: 8,
                    background: `${theme.purple}22`,
                    border: `1px solid ${theme.purple}44`,
                    color: theme.purple,
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  ↗ Docs
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
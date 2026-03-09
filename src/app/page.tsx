"use client";

import { useState, useEffect, useRef } from "react";
import {
  Copy, Check, Bug, Sparkles, Wrench, GitBranch,
  ShieldAlert, Rocket, RefreshCw, FlaskConical, ChevronDown,
  Github, GitCommit, GitMerge, GitPullRequest
} from "lucide-react";

const branchTypes = [
  { label: "Bug Fix", value: "bugfix", icon: Bug, color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)" },
  { label: "Feature", value: "feature", icon: Sparkles, color: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.35)" },
  { label: "Enhancement", value: "enhancement", icon: Wrench, color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.35)" },
  { label: "Hotfix", value: "hotfix", icon: ShieldAlert, color: "#f97316", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.35)" },
  { label: "Release", value: "release", icon: Rocket, color: "#a855f7", bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.35)" },
  { label: "Refactor", value: "refactor", icon: RefreshCw, color: "#06b6d4", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.35)" },
  { label: "Experiment", value: "experiment", icon: FlaskConical, color: "#eab308", bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.35)" },
];

const themes = {
  dark: {
    pageBg: "linear-gradient(135deg, #09090e, #13111c, #0d1117)",
    blob1: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 60%)",
    blob2: "radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 60%)",
    badgeBg: "rgba(255,255,255,0.03)", badgeBorder: "rgba(255,255,255,0.08)", badgeText: "#d8b4fe",
    heading: "#ffffff", subtext: "rgba(255,255,255,0.50)",
    cardBg: "rgba(255,255,255,0.025)", cardBorder: "rgba(255,255,255,0.06)", cardShadow: "0 30px 60px rgba(0,0,0,0.60)",
    labelColor: "rgba(255,255,255,0.60)",
    typeCardHoverBg: "rgba(255,255,255,0.05)",
    iconColor: "rgba(255,255,255,0.50)",
    inputBg: "rgba(255,255,255,0.03)", inputBorder: "rgba(255,255,255,0.08)", inputColor: "#ffffff", inputPlaceholder: "rgba(255,255,255,0.25)",
    outputBg: "rgba(0,0,0,0.40)", outputCode: "#f3f4f6",
    copyBtnBg: "rgba(255,255,255,0.08)", copyBtnBorder: "rgba(255,255,255,0.15)", copyBtnColor: "rgba(255,255,255,0.80)",
    copyBtnHoverBg: "rgba(255,255,255,0.12)",
    footerText: "rgba(255,255,255,0.25)", footerCode: "rgba(255,255,255,0.45)", divider: "rgba(255,255,255,0.08)", brandName: "rgba(255,255,255,0.65)",
    optionBg: "#13111c",
  },
};


export default function Page() {
  const [type, setType] = useState("bugfix");
  const [ticket, setTicket] = useState("");
  const [branch, setBranch] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = themes.dark;
  const selected = branchTypes.find((b) => b.value === type)!;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const createBranchName = (type: string, ticket: string) => {
    const id = ticket.split(":")[0].trim();
    const title = ticket.split(":").slice(1).join(":").trim()
      .toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return `${type}/${id}-${title}`;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket.trim()) { setError("Please enter a ticket."); return; }
    if (!ticket.includes(":")) { setError('Format should be "TICKET-ID: Ticket title"'); return; }
    setBranch(createBranchName(type, ticket));
  };

  const copyBranch = async () => {
    await navigator.clipboard.writeText(branch);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{ background: t.pageBg, transition: "background 0.4s ease" }}
    >
      {/* ── Background Elements ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {/* Ambient blobs */}
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: t.blob1, transition: "background 0.4s ease" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: t.blob2, transition: "background 0.4s ease" }} />

        {/* Faint SVG Git Network Pattern */}
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.035 }}>
          <pattern id="git-bg" x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
            {/* Network lines */}
            <path d="M 40 0 V 240 M 40 120 C 80 120, 100 80, 100 40 M 40 120 C 80 120, 100 160, 100 200 M 140 0 V 240 M 140 80 C 180 80, 200 110, 200 140 M 200 140 C 200 170, 180 200, 140 200 M 100 40 L 140 40" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
            {/* Nodes */}
            <circle cx="40" cy="120" r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="100" cy="40" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="100" cy="200" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="140" cy="80" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="200" cy="140" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#git-bg)" />
        </svg>

        {/* Floating Github Elements */}
        <div style={{ position: "absolute", top: "8%", left: "5%", opacity: 0.05, color: "#fff", animation: "float1 18s ease-in-out infinite" }}>
          <Github size={180} strokeWidth={1} />
        </div>
        <div style={{ position: "absolute", bottom: "10%", right: "3%", opacity: 0.04, color: "#fff", animation: "float2 22s ease-in-out infinite" }}>
          <GitMerge size={240} strokeWidth={1} />
        </div>
        <div style={{ position: "absolute", top: "55%", left: "12%", opacity: 0.03, color: "#fff", animation: "float3 25s ease-in-out infinite" }}>
          <GitPullRequest size={160} strokeWidth={1} />
        </div>
        <div style={{ position: "absolute", top: "12%", right: "10%", opacity: 0.04, color: "#fff", animation: "float1 20s ease-in-out infinite reverse" }}>
          <GitCommit size={140} strokeWidth={1} />
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "680px" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: t.badgeBg, border: `1px solid ${t.badgeBorder}`, borderRadius: "50px", padding: "8px 18px", marginBottom: "1.2rem", transition: "all 0.4s ease" }}>
            <GitBranch size={16} color="#a855f7" />
            <span style={{ fontSize: "13px", color: t.badgeText, fontWeight: 500, letterSpacing: "0.05em", transition: "color 0.4s ease" }}>BRANCH GENERATOR</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: t.heading, margin: 0, lineHeight: 1.2, letterSpacing: "-0.02em", transition: "color 0.4s ease" }}>
            Generate Git Branches
          </h1>
          <p style={{ color: t.subtext, marginTop: "0.6rem", fontSize: "0.95rem", transition: "color 0.4s ease" }}>
            Pick a type, enter your ticket, get a clean branch name instantly.
          </p>
        </div>

        {/* ── Card ── */}
        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "clamp(1.2rem, 3vw, 2rem)", backdropFilter: "blur(20px)", boxShadow: t.cardShadow, transition: "all 0.4s ease" }}>
          <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {/* Branch Type Custom Dropdown */}
              <div style={{ flex: "1 1 200px" }}>
                <div ref={dropdownRef} style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{ width: "100%", background: t.inputBg, border: `1px solid ${dropdownOpen ? selected.border : t.inputBorder}`, boxShadow: dropdownOpen ? `0 0 0 1px ${selected.border}` : "none", borderRadius: "10px", padding: "14px 16px", paddingLeft: "42px", paddingRight: "40px", color: t.inputColor, fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    onMouseEnter={(e) => { if (!dropdownOpen) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                    onMouseLeave={(e) => { if (!dropdownOpen) (e.currentTarget as HTMLButtonElement).style.borderColor = t.inputBorder; }}
                  >
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: selected.color, display: "flex", alignItems: "center", transition: "color 0.4s ease" }}>
                      {(() => { const Icon = selected.icon; return <Icon size={18} />; })()}
                    </div>

                    <span style={{ textAlign: "left", flex: 1 }}>{selected.label}</span>

                    <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: t.labelColor, display: "flex", alignItems: "center", transition: "transform 0.3s ease", ...(dropdownOpen ? { transform: "translateY(-50%) rotate(180deg)" } : {}) }}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {dropdownOpen && (
                    <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: t.optionBg, border: `1px solid ${t.inputBorder}`, borderRadius: "10px", overflow: "hidden", zIndex: 50, padding: "6px", boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset", animation: "fadeSlideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                      {branchTypes.map((item) => {
                        const ItemIcon = item.icon;
                        const isSelected = type === item.value;
                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => { setType(item.value); setDropdownOpen(false); }}
                            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "transparent", border: "none", borderRadius: "6px", color: t.inputColor, fontSize: "13px", cursor: "pointer", textAlign: "left", transition: "background 0.2s ease", fontFamily: "inherit" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = isSelected ? item.bg : t.typeCardHoverBg; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                          >
                            <div style={{ color: isSelected ? item.color : t.iconColor, display: "flex", alignItems: "center" }}>
                              <ItemIcon size={16} />
                            </div>
                            <span style={{ fontWeight: isSelected ? 600 : 400 }}>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Ticket Input */}
              <div style={{ flex: "2 1 300px" }}>
                <input
                  type="text"
                  placeholder="Ticket / Description (e.g. ITDEV-278: Fix bug)"
                  value={ticket}
                  onChange={(e) => { setTicket(e.target.value); setError(""); }}
                  style={{ width: "100%", height: "100%", background: t.inputBg, border: error ? "1px solid rgba(239,68,68,0.6)" : `1px solid ${t.inputBorder}`, borderRadius: "10px", padding: "14px 16px", color: t.inputColor, fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
                  onMouseEnter={(e) => { if (document.activeElement !== e.target) (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={(e) => { if (document.activeElement !== e.target) (e.target as HTMLInputElement).style.borderColor = t.inputBorder; }}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = selected.border; (e.target as HTMLInputElement).style.boxShadow = `0 0 0 1px ${selected.border}`; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = error ? "rgba(239,68,68,0.6)" : t.inputBorder; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                />
              </div>
            </div>
            {error && <p style={{ color: "#f87171", fontSize: "13px", margin: "-12px 0 0 4px", fontWeight: 500 }}>{error}</p>}

            {/* Generate Button */}
            <button
              type="submit"
              disabled={!ticket.trim()}
              className="generate-btn"
              style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)", background: !ticket.trim() ? "rgba(255,255,255,0.03)" : `linear-gradient(135deg, ${selected.color}, ${selected.color}cc)`, color: !ticket.trim() ? "rgba(255,255,255,0.2)" : "#fff", fontWeight: 700, fontSize: "15px", cursor: !ticket.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", letterSpacing: "0.02em", boxShadow: !ticket.trim() ? "none" : `0 8px 25px ${selected.color}35`, fontFamily: "inherit" }}
              onMouseEnter={(e) => { if (ticket.trim()) { (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 30px ${selected.color}50`; } }}
              onMouseLeave={(e) => { if (ticket.trim()) { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 25px ${selected.color}35`; } }}
            >
              {ticket.trim() && (() => { const Icon = selected.icon; return <Icon size={17} />; })()}
              Generate Branch
            </button>
          </form>

          {/* Branch Output */}
          {branch && (
            <div style={{ marginTop: "1.5rem", background: t.outputBg, border: `1.5px solid ${selected.border}`, borderRadius: "14px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", animation: "fadeSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)", transition: "background 0.4s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                <GitBranch size={16} color={selected.color} style={{ flexShrink: 0 }} />
                <code style={{ fontSize: "13px", color: t.outputCode, wordBreak: "break-all", fontFamily: "'Geist Mono','Fira Code',monospace", letterSpacing: "0.02em", transition: "color 0.4s ease" }}>
                  {branch}
                </code>
              </div>
              <button
                onClick={copyBranch}
                title="Copy to clipboard"
                style={{ flexShrink: 0, padding: "8px", borderRadius: "10px", border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : t.copyBtnBorder}`, background: copied ? "rgba(34,197,94,0.15)" : t.copyBtnBg, color: copied ? "#4ade80" : t.copyBtnColor, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", fontFamily: "inherit" }}
                onMouseEnter={(e) => { if (!copied) (e.currentTarget as HTMLButtonElement).style.background = t.copyBtnHoverBg; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { if (!copied) (e.currentTarget as HTMLButtonElement).style.background = t.copyBtnBg; (e.currentTarget as HTMLButtonElement).style.color = t.copyBtnColor; }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{ textAlign: "center", marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <p style={{ color: t.footerText, fontSize: "12px", margin: 0, transition: "color 0.4s ease" }}>
            Format:{" "}
            <code style={{ fontFamily: "monospace", color: t.footerCode, transition: "color 0.4s ease" }}>
              type/TICKET-ID-ticket-title
            </code>
          </p>
          <div style={{ width: "40px", height: "1px", background: t.divider, transition: "background 0.4s ease" }} />
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg, #a855f7, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", boxShadow: "0 4px 14px rgba(168,85,247,0.45)", flexShrink: 0, fontFamily: "inherit" }}>KP</div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: t.brandName, lineHeight: 1.2, transition: "color 0.4s ease" }}>Kushal Prajapati</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Global styles + animations ── */}
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: ${t.inputPlaceholder}; transition: color 0.4s ease; }

        /* Smooth generate button active state */
        .generate-btn:active {
          transform: translateY(1px) scale(0.98) !important;
          box-shadow: 0 4px 15px currentColor !important;
        }

        /* ── Floating background animations ── */
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-40px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(40px) rotate(-5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-25px) scale(1.05) rotate(8deg); }
        }

        /* ── Fade-slide-up for output panel ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Copy, Check, Bug, Sparkles, Wrench, GitBranch,
  ShieldAlert, Rocket, RefreshCw, FlaskConical, Sun, Moon,
} from "lucide-react";

const branchTypes = [
  { label: "Bug Fix", value: "bugfix", icon: Bug, color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)", description: "Fix a defect or issue" },
  { label: "Feature", value: "feature", icon: Sparkles, color: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.35)", description: "Build something new" },
  { label: "Enhancement", value: "enhancement", icon: Wrench, color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.35)", description: "Improve existing code" },
  { label: "Hotfix", value: "hotfix", icon: ShieldAlert, color: "#f97316", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.35)", description: "Urgent production fix" },
  { label: "Release", value: "release", icon: Rocket, color: "#a855f7", bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.35)", description: "Prepare a new release" },
  { label: "Refactor", value: "refactor", icon: RefreshCw, color: "#06b6d4", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.35)", description: "Restructure existing code" },
  { label: "Experiment", value: "experiment", icon: FlaskConical, color: "#eab308", bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.35)", description: "Try out new ideas" },
];

const themes = {
  dark: {
    pageBg: "linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)",
    blob1: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
    blob2: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
    badgeBg: "rgba(255,255,255,0.06)", badgeBorder: "rgba(255,255,255,0.12)", badgeText: "#c4b5fd",
    heading: "#ffffff", subtext: "rgba(255,255,255,0.45)",
    cardBg: "rgba(255,255,255,0.04)", cardBorder: "rgba(255,255,255,0.10)", cardShadow: "0 25px 60px rgba(0,0,0,0.40)",
    labelColor: "rgba(255,255,255,0.50)",
    typeCardBg: "rgba(255,255,255,0.03)", typeCardBorder: "rgba(255,255,255,0.08)",
    typeCardHoverBg: "rgba(255,255,255,0.07)", typeCardHoverBorder: "rgba(255,255,255,0.15)",
    iconBubbleBg: "rgba(255,255,255,0.06)", iconBubbleBorder: "rgba(255,255,255,0.10)", iconColor: "rgba(255,255,255,0.40)",
    labelActive: "#ffffff", labelInactive: "rgba(255,255,255,0.50)",
    descActive: "rgba(255,255,255,0.50)", descInactive: "rgba(255,255,255,0.25)",
    inputBg: "rgba(255,255,255,0.05)", inputBorder: "rgba(255,255,255,0.10)", inputColor: "#ffffff", inputPlaceholder: "rgba(255,255,255,0.20)",
    outputBg: "rgba(0,0,0,0.30)", outputCode: "#e2e8f0",
    copyBtnBg: "rgba(255,255,255,0.06)", copyBtnBorder: "rgba(255,255,255,0.12)", copyBtnColor: "rgba(255,255,255,0.60)",
    footerText: "rgba(255,255,255,0.20)", footerCode: "rgba(255,255,255,0.35)", divider: "rgba(255,255,255,0.10)", brandName: "rgba(255,255,255,0.55)",
    toggleBg: "rgba(255,255,255,0.08)", toggleBorder: "rgba(255,255,255,0.15)", toggleColor: "#c4b5fd",
  },
  light: {
    pageBg: "linear-gradient(135deg, #f0f4ff, #ffffff, #f5f0ff)",
    blob1: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)",
    blob2: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
    badgeBg: "rgba(168,85,247,0.08)", badgeBorder: "rgba(168,85,247,0.20)", badgeText: "#7c3aed",
    heading: "#0f0c29", subtext: "rgba(15,12,41,0.50)",
    cardBg: "rgba(255,255,255,0.80)", cardBorder: "rgba(0,0,0,0.08)", cardShadow: "0 25px 60px rgba(0,0,0,0.08)",
    labelColor: "rgba(15,12,41,0.40)",
    typeCardBg: "rgba(0,0,0,0.02)", typeCardBorder: "rgba(0,0,0,0.08)",
    typeCardHoverBg: "rgba(0,0,0,0.05)", typeCardHoverBorder: "rgba(0,0,0,0.15)",
    iconBubbleBg: "rgba(0,0,0,0.04)", iconBubbleBorder: "rgba(0,0,0,0.08)", iconColor: "rgba(15,12,41,0.30)",
    labelActive: "#0f0c29", labelInactive: "rgba(15,12,41,0.45)",
    descActive: "rgba(15,12,41,0.45)", descInactive: "rgba(15,12,41,0.30)",
    inputBg: "rgba(0,0,0,0.03)", inputBorder: "rgba(0,0,0,0.12)", inputColor: "#0f0c29", inputPlaceholder: "rgba(15,12,41,0.30)",
    outputBg: "rgba(0,0,0,0.03)", outputCode: "#1e1b4b",
    copyBtnBg: "rgba(0,0,0,0.04)", copyBtnBorder: "rgba(0,0,0,0.10)", copyBtnColor: "rgba(15,12,41,0.50)",
    footerText: "rgba(15,12,41,0.30)", footerCode: "rgba(15,12,41,0.45)", divider: "rgba(0,0,0,0.10)", brandName: "rgba(15,12,41,0.55)",
    toggleBg: "rgba(0,0,0,0.05)", toggleBorder: "rgba(0,0,0,0.12)", toggleColor: "#7c3aed",
  },
};

interface Particle {
  x: number; y: number; vx: number; vy: number;
  color: string; size: number; rotation: number; rotationSpeed: number;
  opacity: number; shape: "rect" | "circle";
}

function launchConfetti(canvas: HTMLCanvasElement, originX: number, originY: number) {
  const ctx = canvas.getContext("2d")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#ef4444", "#22c55e", "#3b82f6", "#f97316", "#a855f7", "#06b6d4", "#eab308", "#ec4899", "#fff"];
  const count = 90;
  const particles: Particle[] = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    return {
      x: originX, y: originY,
      vx: Math.cos(angle) * speed * (Math.random() * 1.4 + 0.3),
      vy: Math.sin(angle) * speed * (Math.random() * 1.4 + 0.3) - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 7,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      opacity: 1,
      shape: Math.random() > 0.45 ? "rect" : "circle",
    };
  });

  let frame: number;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25;          // gravity
      p.vx *= 0.98;           // air resistance
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, p.opacity - 0.014);
      if (p.opacity <= 0) continue;
      alive = true;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (alive) frame = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  frame = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(frame);
}

export default function Page() {
  const [isDark, setIsDark] = useState(true);
  const [type, setType] = useState("bugfix");
  const [ripple, setRipple] = useState<string | null>(null); // which card is rippling
  const [ticket, setTicket] = useState("");
  const [branch, setBranch] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const cancelConf = useRef<(() => void) | null>(null);

  const t = isDark ? themes.dark : themes.light;
  const selected = branchTypes.find((b) => b.value === type)!;

  // Persist theme
  useEffect(() => {
    const saved = localStorage.getItem("kp-theme");
    if (saved === "light") setIsDark(false);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      localStorage.setItem("kp-theme", !prev ? "dark" : "light");
      return !prev;
    });
  };

  // ── Ripple on card click ───────────────────────────────────────────────────
  const handleTypeSelect = (value: string) => {
    setType(value);
    setRipple(value);
    setTimeout(() => setRipple(null), 500);
  };

  // ── Confetti launcher ──────────────────────────────────────────────────────
  const fireConfetti = useCallback(() => {
    if (!canvasRef.current || !btnRef.current) return;
    cancelConf.current?.();                         // cancel any running burst
    const rect = btnRef.current.getBoundingClientRect();
    const ox = rect.left + rect.width / 2;
    const oy = rect.top + rect.height / 2;
    cancelConf.current = launchConfetti(canvasRef.current, ox, oy);
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
    setError("");
    setBranch(createBranchName(type, ticket));
    fireConfetti();
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
      {/* ── Confetti canvas (full-screen, pointer-none) ── */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}
      />

      {/* Ambient blobs */}
      <div style={{ position: "fixed", top: "-10%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: t.blob1, pointerEvents: "none", zIndex: 0, transition: "background 0.4s ease" }} />
      <div style={{ position: "fixed", bottom: "-10%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: t.blob2, pointerEvents: "none", zIndex: 0, transition: "background 0.4s ease" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "680px" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative" }}>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{ position: "absolute", top: 0, right: 0, width: "40px", height: "40px", borderRadius: "12px", border: `1px solid ${t.toggleBorder}`, background: t.toggleBg, color: t.toggleColor, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease", outline: "none", fontFamily: "inherit" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1) rotate(15deg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) rotate(0deg)"; }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

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
        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "20px", padding: "clamp(1.5rem, 4vw, 2.2rem)", backdropFilter: "blur(20px)", boxShadow: t.cardShadow, transition: "all 0.4s ease" }}>
          <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Branch Type */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: t.labelColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem", transition: "color 0.4s ease" }}>
                Branch Type
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                {branchTypes.map((item) => {
                  const Icon = item.icon;
                  const isActive = type === item.value;
                  const isRipple = ripple === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handleTypeSelect(item.value)}
                      className={isRipple ? "card-ripple" : ""}
                      style={{
                        position: "relative", overflow: "hidden",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                        padding: "14px 10px", borderRadius: "14px",
                        border: `1.5px solid ${isActive ? item.border : t.typeCardBorder}`,
                        background: isActive ? item.bg : t.typeCardBg,
                        cursor: "pointer", outline: "none", fontFamily: "inherit",
                        transform: isActive ? "scale(1.04)" : "scale(1)",
                        boxShadow: isActive ? `0 6px 24px ${item.color}35` : "none",
                        transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                        /* pulse ring for active card */
                        ...(isActive ? { "--pulse-color": item.color } as React.CSSProperties : {}),
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.background = t.typeCardHoverBg;
                          (e.currentTarget as HTMLButtonElement).style.borderColor = t.typeCardHoverBorder;
                          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.background = t.typeCardBg;
                          (e.currentTarget as HTMLButtonElement).style.borderColor = t.typeCardBorder;
                          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                        }
                      }}
                    >
                      {/* Ripple overlay */}
                      {isRipple && (
                        <span
                          className="ripple-ring"
                          style={{ "--ripple-color": item.color } as React.CSSProperties}
                        />
                      )}

                      {/* Icon bubble */}
                      <div
                        className={isActive ? "icon-pulse" : ""}
                        style={{
                          width: "40px", height: "40px", borderRadius: "12px",
                          background: isActive ? item.bg : t.iconBubbleBg,
                          border: `1px solid ${isActive ? item.border : t.iconBubbleBorder}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s ease",
                          ...(isActive ? { "--icon-glow": item.color } as React.CSSProperties : {}),
                        }}
                      >
                        <Icon size={20} color={isActive ? item.color : t.iconColor} />
                      </div>

                      <span style={{ fontSize: "12px", fontWeight: 600, color: isActive ? t.labelActive : t.labelInactive, textAlign: "center", lineHeight: 1.3, transition: "color 0.2s ease" }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: "10px", color: isActive ? t.descActive : t.descInactive, textAlign: "center", lineHeight: 1.3, transition: "color 0.2s ease" }}>
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ticket Input */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: t.labelColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", transition: "color 0.4s ease" }}>
                Ticket
              </label>
              <input
                type="text"
                placeholder="ITDEV-278: Ticket title"
                value={ticket}
                onChange={(e) => { setTicket(e.target.value); setError(""); }}
                style={{ width: "100%", background: t.inputBg, border: error ? "1.5px solid rgba(239,68,68,0.6)" : `1.5px solid ${t.inputBorder}`, borderRadius: "12px", padding: "12px 16px", color: t.inputColor, fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "all 0.4s ease" }}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = selected.border; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = error ? "rgba(239,68,68,0.6)" : t.inputBorder; }}
              />
              {error && <p style={{ color: "#f87171", fontSize: "12px", margin: "6px 0 0" }}>{error}</p>}
            </div>

            {/* Generate Button */}
            <button
              ref={btnRef}
              type="submit"
              style={{ width: "100%", padding: "13px", borderRadius: "12px", border: "none", background: `linear-gradient(135deg, ${selected.color}, ${selected.color}bb)`, color: "#fff", fontWeight: 700, fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s ease", letterSpacing: "0.02em", boxShadow: `0 4px 20px ${selected.color}40`, fontFamily: "inherit" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              {(() => { const Icon = selected.icon; return <Icon size={17} />; })()}
              Generate Branch Name
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
                style={{ flexShrink: 0, padding: "8px", borderRadius: "10px", border: `1px solid ${t.copyBtnBorder}`, background: copied ? "rgba(34,197,94,0.15)" : t.copyBtnBg, color: copied ? "#4ade80" : t.copyBtnColor, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", fontFamily: "inherit" }}
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
              <p style={{ margin: 0, fontSize: "10px", color: t.footerText, lineHeight: 1.4, transition: "color 0.4s ease" }}>Built with ❤️</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Global styles + animations ── */}
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: ${t.inputPlaceholder}; transition: color 0.4s ease; }

        /* ── Fade-slide-up for output panel ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* ── Ripple ring that expands outward from the card center ── */
        .ripple-ring {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          pointer-events: none;
          animation: rippleExpand 0.5s ease-out forwards;
          border: 2px solid var(--ripple-color, #fff);
          opacity: 0.8;
        }
        @keyframes rippleExpand {
          0%   { transform: scale(0.85); opacity: 0.9; }
          60%  { transform: scale(1.08); opacity: 0.4; }
          100% { transform: scale(1.18); opacity: 0;   }
        }

        /* ── Icon bubble gentle pulse when card becomes active ── */
        .icon-pulse {
          animation: iconPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes iconPop {
          0%   { transform: scale(1);    }
          40%  { transform: scale(1.28); }
          70%  { transform: scale(0.92); }
          100% { transform: scale(1);    }
        }
      `}</style>
    </div>
  );
}

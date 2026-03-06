"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Bug,
  Sparkles,
  Wrench,
  GitBranch,
  ShieldAlert,
  Rocket,
  RefreshCw,
  FlaskConical,
} from "lucide-react";

const branchTypes = [
  {
    label: "Bug Fix",
    value: "bugfix",
    icon: Bug,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
    description: "Fix a defect or issue",
  },
  {
    label: "Feature",
    value: "feature",
    icon: Sparkles,
    color: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.35)",
    description: "Build something new",
  },
  {
    label: "Enhancement",
    value: "enhancement",
    icon: Wrench,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.35)",
    description: "Improve existing code",
  },
  {
    label: "Hotfix",
    value: "hotfix",
    icon: ShieldAlert,
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.35)",
    description: "Urgent production fix",
  },
  {
    label: "Release",
    value: "release",
    icon: Rocket,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.35)",
    description: "Prepare a new release",
  },
  {
    label: "Refactor",
    value: "refactor",
    icon: RefreshCw,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.35)",
    description: "Restructure existing code",
  },
  {
    label: "Experiment",
    value: "experiment",
    icon: FlaskConical,
    color: "#eab308",
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.35)",
    description: "Try out new ideas",
  },
];

export default function Page() {
  const [type, setType] = useState("bugfix");
  const [ticket, setTicket] = useState("");
  const [branch, setBranch] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const selected = branchTypes.find((b) => b.value === type)!;

  const createBranchName = (type: string, ticket: string) => {
    const id = ticket.split(":")[0].trim();
    const title = ticket
      .split(":")
      .slice(1)
      .join(":")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return `${type}/${id}-${title}`;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket.trim()) {
      setError("Please enter a ticket.");
      return;
    }
    if (!ticket.includes(":")) {
      setError('Format should be "TICKET-ID: Ticket title"');
      return;
    }
    setError("");
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
      style={{ background: "linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)", }} >
      <div
        style={{
          position: "fixed",
          top: "-10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "680px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50px",
              padding: "8px 18px",
              marginBottom: "1.2rem",
            }}
          >
            <GitBranch size={16} color="#a855f7" />
            <span
              style={{
                fontSize: "13px",
                color: "#c4b5fd",
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              BRANCH GENERATOR
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          > {" "} Generate Git Branches{" "} </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              marginTop: "0.6rem",
              fontSize: "0.95rem",
            }}
          >
            Pick a type, enter your ticket, get a clean branch name instantly.
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "clamp(1.5rem, 4vw, 2.2rem)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          }}
        >
          <form
            onSubmit={handleGenerate}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.75rem",
                }}
              >
                Branch Type
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: "10px",
                }}
              >
                {branchTypes.map((item) => {
                  const Icon = item.icon;
                  const isActive = type === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setType(item.value)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        padding: "14px 10px",
                        borderRadius: "14px",
                        border: `1.5px solid ${
                          isActive ? item.border : "rgba(255,255,255,0.08)"
                        }`,
                        background: isActive
                          ? item.bg
                          : "rgba(255,255,255,0.03)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        outline: "none",
                        transform: isActive ? "scale(1.03)" : "scale(1)",
                        boxShadow: isActive
                          ? `0 4px 20px ${item.color}30`
                          : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "rgba(255,255,255,0.07)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = "rgba(255,255,255,0.15)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "rgba(255,255,255,0.03)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = "rgba(255,255,255,0.08)";
                        }
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "12px",
                          background: isActive
                            ? item.bg
                            : "rgba(255,255,255,0.06)",
                          border: `1px solid ${
                            isActive ? item.border : "rgba(255,255,255,0.1)"
                          }`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Icon
                          size={20}
                          color={
                            isActive ? item.color : "rgba(255,255,255,0.4)"
                          }
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                          textAlign: "center",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: isActive
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.25)",
                          textAlign: "center",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.5rem",
                }}
              >
                Ticket
              </label>
              <input
                type="text"
                placeholder="ITDEV-278: Ticket title"
                value={ticket}
                onChange={(e) => {
                  setTicket(e.target.value);
                  setError("");
                }}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: error
                    ? "1.5px solid rgba(239,68,68,0.6)"
                    : "1.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    selected.border;
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = error
                    ? "rgba(239,68,68,0.6)"
                    : "rgba(255,255,255,0.1)";
                }}
              />
              {error && (
                <p
                  style={{
                    color: "#f87171",
                    fontSize: "12px",
                    marginTop: "6px",
                    margin: "6px 0 0",
                  }}
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "12px",
                border: "none",
                background: `linear-gradient(135deg, ${selected.color}, ${selected.color}bb)`,
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
                boxShadow: `0 4px 20px ${selected.color}40`,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
              }}
            >
              {(() => {
                const Icon = selected.icon;
                return <Icon size={17} />;
              })()}
              Generate Branch Name
            </button>
          </form>

          {branch && (
            <div
              style={{
                marginTop: "1.5rem",
                background: "rgba(0,0,0,0.3)",
                border: `1.5px solid ${selected.border}`,
                borderRadius: "14px",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                animation: "fadeSlideUp 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  minWidth: 0,
                }}
              >
                <GitBranch
                  size={16}
                  color={selected.color}
                  style={{ flexShrink: 0 }}
                />
                <code
                  style={{
                    fontSize: "13px",
                    color: "#e2e8f0",
                    wordBreak: "break-all",
                    fontFamily: "'Geist Mono', 'Fira Code', monospace",
                    letterSpacing: "0.02em",
                  }}
                >
                  {branch}
                </code>
              </div>
              <button
                onClick={copyBranch}
                title="Copy to clipboard"
                style={{
                  flexShrink: 0,
                  padding: "8px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: copied
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(255,255,255,0.06)",
                  color: copied ? "#4ade80" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "12px",
              margin: 0,
            }}
          >
            Format:{" "}
            <code
              style={{
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.35)",
              }}
            > type/TICKET-ID-ticket-title
            </code>
          </p>

          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                boxShadow: "0 4px 14px rgba(168,85,247,0.45)",
                flexShrink: 0,
                fontFamily: "inherit",
              }}
            >
              KP
            </div>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.2,
                }}
              >
                Kushal Prajapati
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

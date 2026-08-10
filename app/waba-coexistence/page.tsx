"use client";

import { useEffect, useState, useCallback } from "react";
import Script from "next/script";
import Link from "next/link";
import {
  Zap,
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Sparkles,
  Settings,
  RefreshCw,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

interface LogEntry {
  id: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
  details?: any;
}

export default function WabaCoexistencePage() {
  const [appId, setAppId] = useState("1061127523554734");
  const [configId, setConfigId] = useState("1552212973350194");
  const [sdkReady, setSdkReady] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [authCode, setAuthCode] = useState<string | null>(null);
  const [wabaData, setWabaData] = useState<{
    waba_id?: string;
    phone_number_id?: string;
    raw?: any;
  } | null>(null);

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const addLog = useCallback(
    (type: LogEntry["type"], message: string, details?: any) => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("id-ID", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const newEntry: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        time: timeStr,
        type,
        message,
        details,
      };
      setLogs((prev) => [newEntry, ...prev]);
    },
    [],
  );

  // Initialize Meta SDK when script loads
  const initFbSdk = useCallback(() => {
    if (typeof window === "undefined") return;

    window.fbAsyncInit = function () {
      if (window.FB) {
        window.FB.init({
          appId: appId.trim(),
          cookie: true,
          xfbml: true,
          version: "v20.0",
        });

        window.FB.AppEvents?.logPageView();
        setSdkReady(true);
        addLog(
          "info",
          `Meta SDK v20.0 initialized successfully (App ID: ${appId})`,
        );
      }
    };

    // If script is already loaded
    if (window.FB) {
      window.fbAsyncInit();
    }
  }, [appId, addLog]);

  useEffect(() => {
    initFbSdk();
  }, [initFbSdk]);

  // Listen for window message event from Meta (Embedded Signup FINISH)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== "https://www.facebook.com" &&
        event.origin !== "https://web.facebook.com"
      ) {
        return;
      }

      try {
        const data =
          typeof event.data === "string"
            ? JSON.parse(event.data)
            : event.data;

        if (data && data.type === "WA_EMBEDDED_SIGNUP") {
          addLog("info", `Event WA_EMBEDDED_SIGNUP (${data.event}) diterima`, data);

          if (data.event === "FINISH") {
            const wabaId = data.data?.waba_id;
            const phoneId = data.data?.phone_number_id;

            setWabaData({
              waba_id: wabaId,
              phone_number_id: phoneId,
              raw: data.data,
            });

            addLog(
              "success",
              "🎉 BERHASIL COEXISTENCE! Nomor WhatsApp berhasil terhubung.",
              {
                waba_id: wabaId,
                phone_number_id: phoneId,
              },
            );

            alert(
              `Selamat! Nomor WhatsApp berhasil terhubung dalam mode Coexistence.\n\nWABA ID: ${wabaId || "-"}\nPhone Number ID: ${phoneId || "-"}`,
            );
          } else if (data.event === "CANCEL") {
            addLog("warning", "Pendaftaran WhatsApp Embedded Signup dibatalkan.");
          } else if (data.event === "ERROR") {
            addLog("error", "Terjadi kesalahan pada Meta Embedded Signup", data);
          }
        }
      } catch (e) {
        // Abaikan message lain
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [addLog]);

  const launchWhatsAppSignup = () => {
    if (!window.FB) {
      addLog(
        "error",
        "Meta SDK (FB) belum siap. Memuat ulang atau periksa koneksi internet.",
      );
      alert("Meta SDK belum siap! Mohon tunggu sebentar atau muat ulang halaman.");
      return;
    }

    setIsLoggingIn(true);
    addLog(
      "info",
      `Membuka pop-up Meta Embedded Signup... (Config ID: ${configId})`,
    );

    window.FB.login(
      function (response: any) {
        setIsLoggingIn(false);
        if (response && response.authResponse) {
          const code = response.authResponse.code;
          setAuthCode(code);
          addLog("success", "✅ Authorization Code diterima!", { code });
          console.log("✅ Authorization Code Diterima:", code);
          alert(
            "Login Berhasil!\nAuthorization Code berhasil didapatkan dan disalin ke dashboard.",
          );
        } else {
          addLog("warning", "Login WhatsApp dibatalkan atau tidak disetujui pengguna.");
          console.log("Login dibatalkan pengguna.");
        }
      },
      {
        config_id: configId.trim(),
        response_type: "code",
        override_default_response_type: true,
      },
    );
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addLog("info", `Teks (${key}) telah disalin ke clipboard.`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-dark)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-plus-jakarta-sans)",
      }}
    >
      {/* Meta SDK Script */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        onLoad={() => {
          initFbSdk();
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          background: "rgba(10, 31, 20, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>

        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "linear-gradient(135deg, #1A9E6E 0%, #0F2D1C 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={16} color="white" fill="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#E8F5EE" }}>
            Flowku <span style={{ fontSize: 12, opacity: 0.6, fontWeight: 500 }}>WABA Tool</span>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: sdkReady
                ? "rgba(37, 211, 102, 0.15)"
                : "rgba(255, 209, 102, 0.15)",
              border: `1px solid ${
                sdkReady
                  ? "rgba(37, 211, 102, 0.3)"
                  : "rgba(255, 209, 102, 0.3)"
              }`,
              color: sdkReady ? "#25D366" : "#FFD166",
              padding: "4px 12px",
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: sdkReady ? "#25D366" : "#FFD166",
                animation: sdkReady ? "pulse 2s infinite" : "none",
              }}
            />
            {sdkReady ? "Meta SDK Ready" : "Loading SDK..."}
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Header Title */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(37, 211, 102, 0.12)",
              border: "1px solid rgba(37, 211, 102, 0.25)",
              color: "#25D366",
              padding: "6px 16px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            <Sparkles size={14} /> Mode Coexistence WhatsApp Business
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: 12,
              color: "var(--text-primary)",
            }}
          >
            Connect WhatsApp Business
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: 16,
              maxWidth: 620,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Hubungkan WhatsApp ke Flowku & Sebelas Decor menggunakan{" "}
            <strong style={{ color: "#25D366" }}>Mode Coexistence</strong>.
            WhatsApp di HP milikmu tetap aktif &amp; tidak akan ter-logout.
          </p>
        </div>

        {/* Main Connect Card */}
        <div
          className="glass-card"
          style={{
            padding: "36px 32px",
            borderRadius: 20,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(15,45,28,0.4) 100%)",
            border: "1px solid rgba(37, 211, 102, 0.25)",
            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background:
                "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 10px 30px rgba(37, 211, 102, 0.4)",
            }}
          >
            <MessageSquare size={36} color="white" />
          </div>

          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 8,
              color: "var(--text-primary)",
            }}
          >
            📱 Connect WhatsApp Business
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: 14,
              marginBottom: 28,
              lineHeight: 1.6,
            }}
          >
            Klik tombol hijau di bawah untuk mengaktifkan Mode Coexistence.
            <br />
            Pop-up Meta Embedded Signup akan muncul untuk konfirmasi otorisasi.
          </p>

          <button
            onClick={launchWhatsAppSignup}
            disabled={isLoggingIn}
            style={{
              backgroundColor: "#25D366",
              color: "#051A0E",
              border: "none",
              padding: "16px 36px",
              fontSize: 17,
              fontWeight: 800,
              borderRadius: 14,
              cursor: isLoggingIn ? "wait" : "pointer",
              boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "all 0.2s ease",
              opacity: isLoggingIn ? 0.7 : 1,
            }}
            onMouseOver={(e) => {
              if (!isLoggingIn)
                e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              if (!isLoggingIn)
                e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {isLoggingIn ? (
              <>
                <RefreshCw size={20} className="spin" /> Memproses...
              </>
            ) : (
              <>
                <Smartphone size={20} /> Hubungkan WhatsApp Sebelas Decor
              </>
            )}
          </button>

          {/* Feature highlights */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 20,
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-secondary)" }}>
              <ShieldCheck size={16} color="#25D366" />
              <span>HP Tetap Aktif & Safe</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-secondary)" }}>
              <CheckCircle2 size={16} color="#25D366" />
              <span>Meta Graph API v20.0</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-secondary)" }}>
              <Zap size={16} color="#25D366" />
              <span>Auto Capture WABA & Phone ID</span>
            </div>
          </div>
        </div>

        {/* Results Card (Shows when Authorization Code or WABA Data received) */}
        {(authCode || wabaData) && (
          <div
            className="glass-card"
            style={{
              padding: 28,
              borderRadius: 16,
              marginBottom: 32,
              border: "1px solid rgba(37, 211, 102, 0.4)",
              background: "rgba(18, 45, 28, 0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
                paddingBottom: 12,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <CheckCircle2 size={24} color="#25D366" />
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
                Data Hasil Koneksi WhatsApp
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Auth Code */}
              {authCode && (
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Authorization Code
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(0,0,0,0.3)",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "monospace",
                      fontSize: 13,
                      wordBreak: "break-all",
                    }}
                  >
                    <span style={{ flex: 1, color: "#43D98F" }}>{authCode}</span>
                    <button
                      onClick={() => copyText(authCode, "code")}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "none",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                      }}
                    >
                      {copiedKey === "code" ? (
                        <>
                          <Check size={14} color="#25D366" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* WABA ID */}
              {wabaData?.waba_id && (
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    WABA ID (WhatsApp Business Account ID)
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(0,0,0,0.3)",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "monospace",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ flex: 1, color: "#FFD166" }}>
                      {wabaData.waba_id}
                    </span>
                    <button
                      onClick={() => copyText(wabaData.waba_id!, "waba")}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "none",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                      }}
                    >
                      {copiedKey === "waba" ? (
                        <>
                          <Check size={14} color="#25D366" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Phone Number ID */}
              {wabaData?.phone_number_id && (
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Phone Number ID
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(0,0,0,0.3)",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "monospace",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ flex: 1, color: "#60A5FA" }}>
                      {wabaData.phone_number_id}
                    </span>
                    <button
                      onClick={() =>
                        copyText(wabaData.phone_number_id!, "phone")
                      }
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "none",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                      }}
                    >
                      {copiedKey === "phone" ? (
                        <>
                          <Check size={14} color="#25D366" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Configurations Box */}
        <div
          className="glass-card"
          style={{
            padding: 24,
            borderRadius: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              color: "var(--text-primary)",
              fontWeight: 700,
            }}
          >
            <Settings size={18} color="var(--brand-primary-light)" />
            Meta Configuration Settings
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Meta App ID:
              </label>
              <input
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontFamily: "monospace",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Meta Configuration ID:
              </label>
              <input
                type="text"
                value={configId}
                onChange={(e) => setConfigId(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontFamily: "monospace",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              marginTop: 12,
            }}
          >
            * App ID dan Config ID diset secara default ke credential Sebelas Decor. Anda dapat menggantinya jika ingin melakukan pengujian dengan App ID lain.
          </p>
        </div>

        {/* Live Logs Terminal */}
        <div
          className="glass-card"
          style={{
            padding: 24,
            borderRadius: 16,
            marginBottom: 32,
            background: "rgba(5, 15, 10, 0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#43D98F",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              <Terminal size={18} /> Event Console &amp; Debug Logs
            </div>

            {logs.length > 0 && (
              <button
                onClick={() => setLogs([])}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: 12,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Clear logs
              </button>
            )}
          </div>

          <div
            style={{
              maxHeight: 220,
              overflowY: "auto",
              fontFamily: "monospace",
              fontSize: 13,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {logs.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                Belum ada log. Klik tombol &quot;Hubungkan WhatsApp Sebelas Decor&quot; untuk memulai...
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    display: "flex",
                    gap: 10,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>
                    [{log.time}]
                  </span>
                  <span
                    style={{
                      color:
                        log.type === "success"
                          ? "#25D366"
                          : log.type === "error"
                          ? "#FF6584"
                          : log.type === "warning"
                          ? "#FFD166"
                          : "#60A5FA",
                    }}
                  >
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* How Coexistence Works Explanation */}
        <div
          className="glass-card"
          style={{
            padding: 28,
            borderRadius: 16,
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 16,
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <AlertCircle size={20} color="var(--brand-primary-light)" />
            Panduan Mode Coexistence WhatsApp Business
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}
              >
                1. Apa itu Coexistence?
              </div>
              Mode Coexistence memungkinkan nomor WhatsApp Business resmi di HP kamu tetap aktif mengirim &amp; menerima pesan biasa, sementara sistem API (Flowku / Sebelas Decor) juga terhubung secara bersisian.
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}
              >
                2. Apa fungsi Authorization Code?
              </div>
              Authorization Code yang didapat digunakan oleh sistem Backend untuk ditukarkan menjadi Access Token Meta WABA secara aman melalui server-to-server Graph API.
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}
              >
                3. WABA &amp; Phone Number ID
              </div>
              Event Meta <code>WA_EMBEDDED_SIGNUP</code> otomatis mengirimkan WABA ID dan Phone Number ID setelah otorisasi selesai untuk didaftarkan ke sistem chatbot / automasi.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "30px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
          © 2026 Flowku &amp; Sebelas Decor. WhatsApp Coexistence Integration.
        </p>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

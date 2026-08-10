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
  MessageSquare,
  ArrowRight,
  Key,
  Globe,
  Phone,
  Send,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Loader2,
  Link2,
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

  // Next Steps state
  const [appSecret, setAppSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [redirectUri, setRedirectUri] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(2);
  const [stepLoading, setStepLoading] = useState<number | null>(null);
  const [stepResults, setStepResults] = useState<
    Record<number, { success: boolean; data?: any; error?: string }>
  >({});
  const [testPhoneNumber, setTestPhoneNumber] = useState("");
  const [testMessage, setTestMessage] = useState(
    "Halo! Ini adalah pesan test dari Flowku WABA Coexistence.",
  );
  const [showNextSteps, setShowNextSteps] = useState(true);
  const [manualWabaId, setManualWabaId] = useState("");
  const [manualPhoneId, setManualPhoneId] = useState("");
  const [manualAccessToken, setManualAccessToken] = useState("");

  // Set default redirectUri on mount (without trailing slash)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href.split("?")[0].split("#")[0].replace(/\/+$/, "");
      setRedirectUri(currentUrl);
    }
  }, []);

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

        // Check login status as per Meta Developer Guide
        window.FB.getLoginStatus(function (response: any) {
          if (response && response.status === "connected") {
            addLog(
              "info",
              "Meta Login Status: Connected (Pengguna sudah login Meta)",
              response.authResponse,
            );
          } else {
            addLog(
              "info",
              `Meta Login Status: ${response?.status || "not_logged_in"}`,
            );
          }
        });
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
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data && data.type === "WA_EMBEDDED_SIGNUP") {
          addLog(
            "info",
            `Event WA_EMBEDDED_SIGNUP (${data.event}) diterima`,
            data,
          );

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

            setShowNextSteps(true);
            alert(
              `Selamat! Nomor WhatsApp berhasil terhubung dalam mode Coexistence.\n\nWABA ID: ${wabaId || "-"}\nPhone Number ID: ${phoneId || "-"}`,
            );
          } else if (data.event === "CANCEL") {
            addLog(
              "warning",
              "Pendaftaran WhatsApp Embedded Signup dibatalkan.",
            );
          } else if (data.event === "ERROR") {
            addLog(
              "error",
              "Terjadi kesalahan pada Meta Embedded Signup",
              data,
            );
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
      alert(
        "Meta SDK belum siap! Mohon tunggu sebentar atau muat ulang halaman.",
      );
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
          // Clear previous step 2 error if any
          setStepResults((prev) => ({ ...prev, 2: { success: false } }));
          addLog("success", "✅ Authorization Code baru diterima!", { code });
          console.log("✅ Authorization Code Diterima:", code);
          setShowNextSteps(true);
          alert(
            "Login Berhasil!\nAuthorization Code baru berhasil didapatkan. Lanjutkan ke Step 2 (Tukar Token).",
          );
        } else {
          addLog(
            "warning",
            "Login WhatsApp dibatalkan atau tidak disetujui pengguna.",
          );
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

  // Helper to get effective IDs (from auto-capture or manual input)
  const effectiveWabaId = wabaData?.waba_id || manualWabaId.trim();
  const effectivePhoneId = wabaData?.phone_number_id || manualPhoneId.trim();
  const effectiveToken = accessToken || manualAccessToken.trim();

  // Step 2: Exchange Authorization Code for Access Token
  const exchangeCodeForToken = async () => {
    if (!authCode) {
      addLog(
        "error",
        "Authorization Code belum tersedia. Selesaikan Step 1 terlebih dahulu.",
      );
      alert(
        "Authorization Code belum ada. Klik tombol hijau 'Hubungkan WhatsApp Sebelas Decor' terlebih dahulu.",
      );
      return;
    }
    if (!appSecret.trim()) {
      addLog(
        "error",
        "App Secret wajib diisi untuk menukarkan Authorization Code.",
      );
      return;
    }

    setStepLoading(2);
    addLog(
      "info",
      "Menukarkan Authorization Code → Access Token...",
    );

    let data: any = null;

    // First try Next.js Server API Route
    try {
      const res = await fetch("/api/waba/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: appId.trim(),
          appSecret: appSecret.trim(),
          code: authCode.trim(),
          redirectUri: redirectUri.trim(),
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      }
    } catch (e) {
      // API route not reachable
      addLog("error", "Backend API tidak terjangkau. Periksa koneksi internet.");
      setStepLoading(null);
      return;
    }


    if (data && data.access_token) {
      setAccessToken(data.access_token);
      setStepResults((prev) => ({
        ...prev,
        2: { success: true, data },
      }));
      addLog(
        "success",
        "✅ Access Token berhasil didapatkan!",
        {
          token_preview: data.access_token.substring(0, 30) + "...",
        },
      );
      setCurrentStep(3);
    } else {
      const errorMsg = data?.error?.message || "Gagal mendapatkan token dari Meta.";
      let friendlyMessage = errorMsg;

      if (errorMsg.includes("Error validating verification code")) {
        friendlyMessage = `${errorMsg}\n\n💡 TIPS: Authorization Code Meta hanya berlaku 1 KALI (single-use). Jika percobaannya gagal, mohon lakukan langkah berikut:\n1. Klik lagi tombol hijau 'Hubungkan WhatsApp Sebelas Decor' (Step 1) untuk mendapatkan Authorization Code BARU.\n2. Klik tombol kuning 'Tukar Token' kembali.`;
      }

      setStepResults((prev) => ({
        ...prev,
        2: {
          success: false,
          error: friendlyMessage,
        },
      }));
      addLog("error", `Gagal mendapatkan Access Token: ${friendlyMessage}`, data);
    }
    setStepLoading(null);
  };

  // Step 3: Subscribe WABA to App
  const subscribeWaba = async () => {
    if (!effectiveWabaId) {
      addLog(
        "error",
        "WABA ID belum tersedia. Pastikan Step 1 sudah selesai atau isi secara manual.",
      );
      return;
    }
    if (!effectiveToken) {
      addLog(
        "error",
        "Access Token belum tersedia. Selesaikan Step 2 terlebih dahulu atau isi secara manual.",
      );
      return;
    }

    setStepLoading(3);
    addLog("info", `Subscribing WABA (${effectiveWabaId}) ke App...`);

    try {
      const res = await fetch(
        `https://graph.facebook.com/v20.0/${effectiveWabaId}/subscribed_apps`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${effectiveToken}` },
        },
      );
      const data = await res.json();

      if (data.success) {
        setStepResults((prev) => ({ ...prev, 3: { success: true, data } }));
        addLog(
          "success",
          "✅ WABA berhasil di-subscribe ke App! Webhook siap menerima pesan.",
        );
        setCurrentStep(4);
      } else {
        setStepResults((prev) => ({
          ...prev,
          3: {
            success: false,
            error: data.error?.message || JSON.stringify(data),
          },
        }));
        addLog(
          "error",
          `Gagal subscribe WABA: ${data.error?.message || "Unknown error"}`,
          data,
        );
      }
    } catch (err: any) {
      setStepResults((prev) => ({
        ...prev,
        3: { success: false, error: err.message },
      }));
      addLog("error", `Network error saat subscribe WABA: ${err.message}`);
    } finally {
      setStepLoading(null);
    }
  };

  // Step 4: Register Phone Number
  const registerPhoneNumber = async () => {
    if (!effectivePhoneId) {
      addLog(
        "error",
        "Phone Number ID belum tersedia. Pastikan Step 1 sudah selesai atau isi secara manual.",
      );
      return;
    }
    if (!effectiveToken) {
      addLog("error", "Access Token belum tersedia.");
      return;
    }

    setStepLoading(4);
    addLog(
      "info",
      `Mendaftarkan Phone Number (${effectivePhoneId}) ke Cloud API...`,
    );

    try {
      const res = await fetch(
        `https://graph.facebook.com/v20.0/${effectivePhoneId}/register`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${effectiveToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            pin: "123456",
          }),
        },
      );
      const data = await res.json();

      if (data.success) {
        setStepResults((prev) => ({ ...prev, 4: { success: true, data } }));
        addLog("success", "✅ Phone Number berhasil didaftarkan ke Cloud API!");
        setCurrentStep(5);
      } else {
        setStepResults((prev) => ({
          ...prev,
          4: {
            success: false,
            error: data.error?.message || JSON.stringify(data),
          },
        }));
        addLog(
          "error",
          `Gagal register phone number: ${data.error?.message || "Unknown error"}`,
          data,
        );
      }
    } catch (err: any) {
      setStepResults((prev) => ({
        ...prev,
        4: { success: false, error: err.message },
      }));
      addLog("error", `Network error saat register phone: ${err.message}`);
    } finally {
      setStepLoading(null);
    }
  };

  // Step 5: Send Test Message
  const sendTestMessage = async () => {
    if (!effectivePhoneId) {
      addLog("error", "Phone Number ID belum tersedia.");
      return;
    }
    if (!effectiveToken) {
      addLog("error", "Access Token belum tersedia.");
      return;
    }
    if (!testPhoneNumber.trim()) {
      addLog("error", "Nomor tujuan WhatsApp harus diisi (format: 628xxx).");
      return;
    }

    setStepLoading(5);
    addLog("info", `Mengirim pesan test ke ${testPhoneNumber}...`);

    try {
      const res = await fetch(
        `https://graph.facebook.com/v20.0/${effectivePhoneId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${effectiveToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: testPhoneNumber.trim(),
            type: "text",
            text: { body: testMessage },
          }),
        },
      );
      const data = await res.json();

      if (data.messages && data.messages.length > 0) {
        setStepResults((prev) => ({ ...prev, 5: { success: true, data } }));
        addLog(
          "success",
          `✅ Pesan test berhasil dikirim ke ${testPhoneNumber}!`,
          data,
        );
      } else {
        setStepResults((prev) => ({
          ...prev,
          5: {
            success: false,
            error: data.error?.message || JSON.stringify(data),
          },
        }));
        addLog(
          "error",
          `Gagal mengirim pesan: ${data.error?.message || "Unknown error"}`,
          data,
        );
      }
    } catch (err: any) {
      setStepResults((prev) => ({
        ...prev,
        5: { success: false, error: err.message },
      }));
      addLog("error", `Network error saat kirim pesan: ${err.message}`);
    } finally {
      setStepLoading(null);
    }
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
            Flowku{" "}
            <span style={{ fontSize: 12, opacity: 0.6, fontWeight: 500 }}>
              WABA Tool
            </span>
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
            Hubungkan WhatsApp ke Flowku &amp; Sebelas Decor menggunakan{" "}
            <strong style={{ color: "#25D366" }}>Mode Coexistence</strong>.
            WhatsApp di HP milikmu tetap aktif &amp; tidak akan ter-logout.
          </p>
        </div>

        {/* STEP 1: Main Connect Card */}
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
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
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
            Step 1: 📱 Connect WhatsApp Business
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--text-secondary)",
              }}
            >
              <ShieldCheck size={16} color="#25D366" />
              <span>HP Tetap Aktif &amp; Safe</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--text-secondary)",
              }}
            >
              <CheckCircle2 size={16} color="#25D366" />
              <span>Meta Graph API v20.0</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--text-secondary)",
              }}
            >
              <Zap size={16} color="#25D366" />
              <span>Auto Capture WABA &amp; Phone ID</span>
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
                Data Hasil Otentikasi Step 1
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
                    Authorization Code (Siap ditukar di Step 2)
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
                    <span style={{ flex: 1, color: "#43D98F" }}>
                      {authCode}
                    </span>
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

        {/* ========== NEXT STEPS WIZARD ========== */}
        <div
          className="glass-card"
          style={{
            padding: 0,
            borderRadius: 20,
            marginBottom: 32,
            border: "1px solid rgba(255, 209, 102, 0.25)",
            overflow: "hidden",
          }}
        >
          {/* Header toggle */}
          <button
            onClick={() => setShowNextSteps(!showNextSteps)}
            style={{
              width: "100%",
              background:
                "linear-gradient(135deg, rgba(255,209,102,0.08) 0%, rgba(26,158,110,0.08) 100%)",
              border: "none",
              padding: "20px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg, #FFD166 0%, #1A9E6E 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowRight size={18} color="white" />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  Next Steps — Token Exchange &amp; Setup API (Step 2 - 5)
                </div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 13,
                    marginTop: 2,
                  }}
                >
                  Tukarkan Authorization Code, subscribe WABA, register phone,
                  &amp; kirim pesan test
                </div>
              </div>
            </div>
            {showNextSteps ? (
              <ChevronUp size={20} color="var(--text-muted)" />
            ) : (
              <ChevronDown size={20} color="var(--text-muted)" />
            )}
          </button>

          {showNextSteps && (
            <div style={{ padding: "24px 28px" }}>
              {/* Security Warning */}
              <div
                style={{
                  background: "rgba(255, 101, 132, 0.1)",
                  border: "1px solid rgba(255, 101, 132, 0.3)",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 24,
                  display: "flex",
                  gap: 10,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                }}
              >
                <Lock
                  size={18}
                  color="#FF6584"
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
                <div>
                  <strong style={{ color: "#FF6584" }}>
                    ⚠️ Catatan Keamanan:
                  </strong>{" "}
                  Halaman ini menyediakan simulasi interaktif untuk pengujian API. Di
                  production real-world, penukaran token dan pemanggilan Graph API{" "}
                  <strong>harus dilakukan dari Backend Server</strong> agar App
                  Secret tidak terekspos ke publik.
                </div>
              </div>

              {/* Manual Override Inputs */}
              {!authCode && !wabaData && (
                <div
                  style={{
                    background: "rgba(96, 165, 250, 0.08)",
                    border: "1px solid rgba(96, 165, 250, 0.2)",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#60A5FA",
                      marginBottom: 12,
                    }}
                  >
                    📝 Input Manual Data (jika Step 1 dilakukan terpisah)
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: 12,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          color: "var(--text-muted)",
                          marginBottom: 4,
                        }}
                      >
                        WABA ID
                      </label>
                      <input
                        type="text"
                        value={manualWabaId}
                        onChange={(e) => setManualWabaId(e.target.value)}
                        placeholder="Contoh: 123456789"
                        style={{
                          width: "100%",
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "white",
                          padding: "8px 12px",
                          borderRadius: 6,
                          fontFamily: "monospace",
                          fontSize: 13,
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          color: "var(--text-muted)",
                          marginBottom: 4,
                        }}
                      >
                        Phone Number ID
                      </label>
                      <input
                        type="text"
                        value={manualPhoneId}
                        onChange={(e) => setManualPhoneId(e.target.value)}
                        placeholder="Contoh: 987654321"
                        style={{
                          width: "100%",
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "white",
                          padding: "8px 12px",
                          borderRadius: 6,
                          fontFamily: "monospace",
                          fontSize: 13,
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          color: "var(--text-muted)",
                          marginBottom: 4,
                        }}
                      >
                        Access Token (opsional)
                      </label>
                      <input
                        type="text"
                        value={manualAccessToken}
                        onChange={(e) => setManualAccessToken(e.target.value)}
                        placeholder="EAAxxxxxxx..."
                        style={{
                          width: "100%",
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "white",
                          padding: "8px 12px",
                          borderRadius: 6,
                          fontFamily: "monospace",
                          fontSize: 13,
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step Progress Bar */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginBottom: 28,
                }}
              >
                {[2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background: stepResults[step]?.success
                        ? "#25D366"
                        : currentStep >= step
                          ? "rgba(255, 209, 102, 0.6)"
                          : "rgba(255,255,255,0.1)",
                      transition: "background 0.3s ease",
                    }}
                  />
                ))}
              </div>

              {/* Steps */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* STEP 2: Exchange Code → Token */}
                <StepCard
                  stepNum={2}
                  title="Tukar Authorization Code → Access Token"
                  description="Gunakan App Secret Meta untuk menukarkan Authorization Code menjadi Access Token."
                  icon={<Key size={18} />}
                  isActive={currentStep >= 2}
                  isCompleted={!!stepResults[2]?.success}
                  isLoading={stepLoading === 2}
                  error={stepResults[2]?.error}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: 12,
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 12,
                            color: "var(--text-muted)",
                            marginBottom: 4,
                            fontWeight: 600,
                          }}
                        >
                          App Secret Meta <span style={{ color: "#FF6584" }}>*</span>
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showSecret ? "text" : "password"}
                            value={appSecret}
                            onChange={(e) => setAppSecret(e.target.value)}
                            placeholder="Masukkan App Secret Meta milikmu"
                            style={{
                              width: "100%",
                              background: "rgba(0,0,0,0.3)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              color: "white",
                              padding: "10px 40px 10px 14px",
                              borderRadius: 8,
                              fontFamily: "monospace",
                              fontSize: 13,
                              outline: "none",
                            }}
                          />
                          <button
                            onClick={() => setShowSecret(!showSecret)}
                            style={{
                              position: "absolute",
                              right: 8,
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "transparent",
                              border: "none",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              padding: 4,
                            }}
                          >
                            {showSecret ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 12,
                            color: "var(--text-muted)",
                            marginBottom: 4,
                            fontWeight: 600,
                          }}
                        >
                          Redirect URI (Otomatis)
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            value={redirectUri}
                            onChange={(e) => setRedirectUri(e.target.value)}
                            placeholder="e.g. https://flowku.my.id/waba-coexistence"
                            style={{
                              width: "100%",
                              background: "rgba(0,0,0,0.3)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              color: "var(--brand-primary-light)",
                              padding: "10px 14px",
                              borderRadius: 8,
                              fontFamily: "monospace",
                              fontSize: 12,
                              outline: "none",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={exchangeCodeForToken}
                      disabled={stepLoading === 2 || !authCode}
                      style={{
                        background:
                          "linear-gradient(135deg, #FFD166 0%, #E6A800 100%)",
                        color: "#1a1a1a",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: stepLoading === 2 ? "wait" : "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        alignSelf: "flex-start",
                        opacity: stepLoading === 2 || !authCode ? 0.5 : 1,
                        boxShadow: "0 4px 16px rgba(255, 209, 102, 0.3)",
                      }}
                    >
                      {stepLoading === 2 ? (
                        <Loader2 size={16} className="spin" />
                      ) : (
                        <ArrowRight size={16} />
                      )}
                      Tukar Token
                    </button>

                    {/* Display access token result */}
                    {accessToken && (
                      <div
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          padding: "10px 14px",
                          borderRadius: 8,
                          border: "1px solid rgba(37,211,102,0.3)",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            flex: 1,
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: "#43D98F",
                            wordBreak: "break-all",
                          }}
                        >
                          {accessToken.substring(0, 50)}...
                        </span>
                        <button
                          onClick={() => copyText(accessToken, "access_token")}
                          style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "none",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: 4,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 11,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {copiedKey === "access_token" ? (
                            <Check size={12} color="#25D366" />
                          ) : (
                            <Copy size={12} />
                          )}
                          Copy Token
                        </button>
                      </div>
                    )}
                  </div>
                </StepCard>

                {/* STEP 3: Subscribe WABA */}
                <StepCard
                  stepNum={3}
                  title="Subscribe WABA ke Aplikasi"
                  description="Mendaftarkan WABA ke Aplikasi agar server dapat menerima Webhook (pesan masuk & status)."
                  icon={<Globe size={18} />}
                  isActive={currentStep >= 3}
                  isCompleted={!!stepResults[3]?.success}
                  isLoading={stepLoading === 3}
                  error={stepResults[3]?.error}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(0,0,0,0.2)",
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: 13,
                        fontFamily: "monospace",
                        color: "var(--text-secondary)",
                      }}
                    >
                      WABA ID:{" "}
                      <span style={{ color: "#FFD166" }}>
                        {effectiveWabaId || "belum tersedia"}
                      </span>
                    </div>
                    <button
                      onClick={subscribeWaba}
                      disabled={
                        stepLoading === 3 ||
                        !effectiveWabaId ||
                        !effectiveToken
                      }
                      style={{
                        background:
                          "linear-gradient(135deg, #1A9E6E 0%, #0F2D1C 100%)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: stepLoading === 3 ? "wait" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        opacity:
                          stepLoading === 3 ||
                          !effectiveWabaId ||
                          !effectiveToken
                            ? 0.5
                            : 1,
                      }}
                    >
                      {stepLoading === 3 ? (
                        <Loader2 size={14} className="spin" />
                      ) : (
                        <Globe size={14} />
                      )}
                      Subscribe WABA
                    </button>
                  </div>
                </StepCard>

                {/* STEP 4: Register Phone Number */}
                <StepCard
                  stepNum={4}
                  title="Register Phone Number ke Cloud API"
                  description="Mendaftarkan nomor telepon ke WhatsApp Cloud API."
                  icon={<Phone size={18} />}
                  isActive={currentStep >= 4}
                  isCompleted={!!stepResults[4]?.success}
                  isLoading={stepLoading === 4}
                  error={stepResults[4]?.error}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(0,0,0,0.2)",
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: 13,
                        fontFamily: "monospace",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Phone Number ID:{" "}
                      <span style={{ color: "#60A5FA" }}>
                        {effectivePhoneId || "belum tersedia"}
                      </span>
                    </div>
                    <button
                      onClick={registerPhoneNumber}
                      disabled={
                        stepLoading === 4 ||
                        !effectivePhoneId ||
                        !effectiveToken
                      }
                      style={{
                        background:
                          "linear-gradient(135deg, #1A9E6E 0%, #0F2D1C 100%)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: stepLoading === 4 ? "wait" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        opacity:
                          stepLoading === 4 ||
                          !effectivePhoneId ||
                          !effectiveToken
                            ? 0.5
                            : 1,
                      }}
                    >
                      {stepLoading === 4 ? (
                        <Loader2 size={14} className="spin" />
                      ) : (
                        <Phone size={14} />
                      )}
                      Register Phone
                    </button>
                  </div>
                </StepCard>

                {/* STEP 5: Send Test Message */}
                <StepCard
                  stepNum={5}
                  title="Kirim Pesan Test WhatsApp"
                  description="Verifikasi seluruh integrasi dengan mengirimkan pesan WhatsApp ke nomor tujuan."
                  icon={<Send size={18} />}
                  isActive={currentStep >= 5}
                  isCompleted={!!stepResults[5]?.success}
                  isLoading={stepLoading === 5}
                  error={stepResults[5]?.error}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: 12,
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 12,
                            color: "var(--text-muted)",
                            marginBottom: 4,
                            fontWeight: 600,
                          }}
                        >
                          Nomor Tujuan <span style={{ color: "#FF6584" }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={testPhoneNumber}
                          onChange={(e) => setTestPhoneNumber(e.target.value)}
                          placeholder="Format: 628xxxxxxxxxx"
                          style={{
                            width: "100%",
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "white",
                            padding: "10px 14px",
                            borderRadius: 8,
                            fontFamily: "monospace",
                            fontSize: 13,
                            outline: "none",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 12,
                            color: "var(--text-muted)",
                            marginBottom: 4,
                            fontWeight: 600,
                          }}
                        >
                          Isi Pesan
                        </label>
                        <input
                          type="text"
                          value={testMessage}
                          onChange={(e) => setTestMessage(e.target.value)}
                          style={{
                            width: "100%",
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "white",
                            padding: "10px 14px",
                            borderRadius: 8,
                            fontSize: 13,
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={sendTestMessage}
                      disabled={
                        stepLoading === 5 ||
                        !effectivePhoneId ||
                        !effectiveToken ||
                        !testPhoneNumber.trim()
                      }
                      style={{
                        background:
                          "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: stepLoading === 5 ? "wait" : "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        alignSelf: "flex-start",
                        opacity:
                          stepLoading === 5 ||
                          !effectivePhoneId ||
                          !effectiveToken ||
                          !testPhoneNumber.trim()
                            ? 0.5
                            : 1,
                        boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                      }}
                    >
                      {stepLoading === 5 ? (
                        <Loader2 size={16} className="spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      Kirim Pesan Test
                    </button>
                  </div>
                </StepCard>
              </div>
            </div>
          )}
        </div>

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
            * App ID dan Config ID diset secara default ke credential Sebelas
            Decor. Anda dapat menggantinya jika ingin melakukan pengujian dengan
            App ID lain.
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
                Belum ada log. Klik tombol &quot;Hubungkan WhatsApp Sebelas
                Decor&quot; untuk memulai...
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
              Mode Coexistence memungkinkan nomor WhatsApp Business resmi di HP
              kamu tetap aktif mengirim &amp; menerima pesan biasa, sementara
              sistem API (Flowku / Sebelas Decor) juga terhubung secara
              bersisian.
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
              Authorization Code yang didapat digunakan oleh sistem Backend
              untuk ditukarkan menjadi Access Token Meta WABA secara aman
              melalui server-to-server Graph API.
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
              Event Meta <code>WA_EMBEDDED_SIGNUP</code> otomatis mengirimkan
              WABA ID dan Phone Number ID setelah otorisasi selesai untuk
              didaftarkan ke sistem chatbot / automasi.
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

// =============================================
// StepCard Component
// =============================================
function StepCard({
  stepNum,
  title,
  description,
  icon,
  isActive,
  isCompleted,
  isLoading,
  error,
  children,
}: {
  stepNum: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  isLoading: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: isActive
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.015)",
        border: `1px solid ${
          isCompleted
            ? "rgba(37, 211, 102, 0.35)"
            : isActive
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(255, 255, 255, 0.05)"
        }`,
        borderRadius: 14,
        padding: 20,
        opacity: isActive ? 1 : 0.5,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: isActive ? 14 : 0,
        }}
      >
        {/* Step badge */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: isCompleted
              ? "#25D366"
              : isLoading
                ? "rgba(255, 209, 102, 0.3)"
                : "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: isCompleted ? "white" : "var(--text-secondary)",
            transition: "all 0.3s ease",
          }}
        >
          {isCompleted ? (
            <CheckCircle2 size={16} />
          ) : isLoading ? (
            <Loader2 size={16} className="spin" />
          ) : (
            icon
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: isCompleted
                ? "#25D366"
                : isActive
                  ? "var(--text-primary)"
                  : "var(--text-muted)",
            }}
          >
            Step {stepNum}: {title}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              marginTop: 2,
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        </div>
      </div>

      {isActive && <div>{children}</div>}

      {error && (
        <div
          style={{
            marginTop: 10,
            background: "rgba(255, 101, 132, 0.1)",
            border: "1px solid rgba(255, 101, 132, 0.25)",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 12,
            color: "#FF6584",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          ❌ {error}
        </div>
      )}
    </div>
  );
}

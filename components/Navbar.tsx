"use client";

import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#fitur", label: "Fitur" },
    { href: "/#harga", label: "Harga" },
    { href: "/#faq", label: "FAQ" },
    { href: "/changelog", label: "Changelog" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: (scrolled || mobileOpen) ? "rgba(10, 10, 26, 0.85)" : "transparent",
        backdropFilter: (scrolled || mobileOpen) ? "blur(12px)" : "none",
        WebkitBackdropFilter: (scrolled || mobileOpen) ? "blur(12px)" : "none",
        borderBottom: (scrolled || mobileOpen)
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
          <img src="/flowku-logo-horizontal.svg" alt="Flowku" style={{ height: 36 }} />
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "rgba(241, 241, 255, 0.7)",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: 15,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#E8F5EE")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(241, 241, 255, 0.7)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 12 }}
            className="desktop-cta"
          >
            <a
              href="https://app.flowku.my.id/login"
              id="nav-login-btn"
              style={{
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
              }}
              className="btn-outline"
            >
              Masuk
            </a>
            <a
              href="https://app.flowku.my.id/register"
              id="nav-register-btn"
              style={{
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
              }}
              className="btn-primary"
            >
              Coba Gratis
            </a>
          </div>

          {/* Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: 10,
              padding: "8px",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
            className="hamburger-btn"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "16px 0 24px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              animation: "fadeInUp 0.2s ease",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: "rgba(241,241,255,0.8)",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: 16,
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </a>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginTop: 16,
              }}
            >
              <a
                href="https://app.flowku.my.id/login"
                style={{
                  padding: "13px 20px",
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "center",
                }}
                className="btn-outline"
              >
                Masuk
              </a>
              <a
                href="https://app.flowku.my.id/register"
                style={{
                  padding: "13px 20px",
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "center",
                }}
                className="btn-primary"
              >
                Coba Gratis 30 Hari
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

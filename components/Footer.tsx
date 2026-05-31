import { Zap, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.07)",
        paddingTop: 60,
        paddingBottom: 40,
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
          <img src="/flowku-logo-horizontal.svg" alt="Flowku" style={{ height: 36 }} />
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 280,
                marginBottom: 20,
              }}
            >
              Aplikasi manajemen keuangan untuk pasangan dan individu. Catat, pantau, dan capai goals finansialmu bersama.
            </p>
            <a
              href="mailto:support@flowku.my.id"
              className="footer-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              <Mail size={14} />
              support@flowku.my.id
            </a>
          </div>

          {/* Links column */}
          <div>
            <h4
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 20,
              }}
            >
              Produk
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { href: "/#fitur", label: "Fitur", external: false },
                { href: "/#harga", label: "Harga", external: false },
                { href: "/#faq", label: "FAQ", external: false },
                { href: "/changelog", label: "Changelog", external: false },
                { href: "https://app.flowku.my.id", label: "Buka Aplikasi", external: true },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="footer-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                  {link.external && <ExternalLink size={12} />}
                </a>
              ))}
            </div>
          </div>

          {/* Legal column */}
          <div>
            <h4
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 20,
              }}
            >
              Legal
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href="/privacy" className="footer-link" style={{ textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="footer-link" style={{ textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            © 2026 Flowku. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Dibuat dengan 💜 di Indonesia
          </p>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: var(--brand-primary-light);
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </footer>
  );
}

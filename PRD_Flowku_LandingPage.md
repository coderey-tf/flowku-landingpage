# Product Requirements Document (PRD): Flowku Landing Page

**Versi:** 1.0
**Tanggal:** 29 Mei 2026
**URL Target:** https://flowku.my.id
**Repositori Terpisah dari:** https://app.flowku.my.id

---

## 1. Tujuan

Landing page Flowku berfungsi sebagai **wajah publik produk** — halaman pertama yang dilihat calon pengguna sebelum memutuskan untuk mendaftar. Tujuan utamanya adalah:

1. **Konversi:** Mengubah pengunjung menjadi user baru di `app.flowku.my.id`
2. **Edukasi:** Menjelaskan value proposition Flowku secara singkat dan meyakinkan
3. **Kepercayaan:** Membangun kesan produk yang serius dan terpercaya

Landing page ini bukan bagian dari aplikasi. Tidak ada autentikasi, tidak ada data user, tidak ada koneksi ke Firebase.

---

## 2. Target Audience

Sama dengan target utama aplikasi, namun dalam konteks landing page mereka adalah **calon pengguna yang belum mengenal Flowku**:

1. **Pasangan (Couples):** Pasangan yang sedang mencari solusi keuangan bersama — baru menikah, mau menikah, atau tinggal bersama.
2. **Individu:** Pengguna personal yang ingin mulai mencatat keuangan dengan cara yang lebih terstruktur.

---

## 3. Struktur Halaman (Sections)

Landing page adalah **single page** dengan scroll vertikal. Urutan section dirancang mengikuti alur psikologi konversi: **perhatian → pemahaman → kepercayaan → aksi**.

---

### Section 1 — Hero

**Tujuan:** Tangkap perhatian dalam 3 detik pertama.

**Konten:**

- Headline utama: singkat, langsung ke problem. Contoh: _"Kelola Keuangan Bersama Pasangan, Tanpa Ribet."_
- Subheadline: 1–2 kalimat elaborasi value proposition.
- CTA Utama: tombol **"Coba Gratis 30 Hari"** → mengarah ke `app.flowku.my.id/register`
- CTA Sekunder: **"Lihat Fitur"** → scroll ke Section 2
- Visual: mockup UI aplikasi (screenshot atau ilustrasi dashboard)

**Catatan desain:**

- Background menggunakan pola Glassmorphism yang konsisten dengan desain aplikasi
- Warna dan tipografi harus identik dengan brand di aplikasi

---

### Section 2 — Problem Statement

**Tujuan:** Buat pengunjung merasa "ini masalah saya."

**Konten:**

- 2–3 pain point yang relatable, contoh:
  - _"Tidak tahu pasangan belanja berapa bulan ini."_
  - _"Susah sepakat soal anggaran bersama."_
  - _"Nabung bareng tapi tidak ada yang pantau progress-nya."_
- Tidak perlu tombol CTA di section ini.

---

### Section 3 — Fitur Utama

**Tujuan:** Tunjukkan solusi konkret untuk setiap pain point.

**Konten (4 fitur utama):**

| Fitur            | Deskripsi Singkat                                       |
| ---------------- | ------------------------------------------------------- |
| Mode Pasangan    | Sinkronisasi transaksi real-time dengan pasangan        |
| Pencatatan Mudah | Catat pemasukan & pengeluaran dalam hitungan detik      |
| Goals Bersama    | Nabung bareng untuk target tertentu dengan progress bar |
| Laporan Visual   | Grafik interaktif untuk evaluasi kebiasaan belanja      |

Setiap fitur ditampilkan dengan ikon (Lucide), judul, dan 1–2 kalimat deskripsi.

**Coming Soon — ditampilkan dengan badge khusus:**

- WhatsApp Bot: catat transaksi langsung dari chat WA

---

### Section 4 — How It Works

**Tujuan:** Kurangi friction dengan menjelaskan cara kerja secara sederhana.

**Konten (3 langkah):**

1. **Daftar** — Buat akun gratis, trial Premium 30 hari otomatis aktif.
2. **Hubungkan** — Invite pasangan dengan kode unik.
3. **Pantau Bersama** — Catat, lihat laporan, dan capai goals bersama.

Format: numbered steps dengan ikon atau ilustrasi sederhana.

---

### Section 5 — Pricing

**Tujuan:** Tampilkan harga secara transparan, dorong konversi ke trial.

**Konten:**

|                  | Free             | Premium                               |
| ---------------- | ---------------- | ------------------------------------- |
| **Harga**        | Gratis selamanya | Rp 19.000/bulan atau Rp 149.000/tahun |
| Transaksi        | ✅ Unlimited     | ✅ Unlimited                          |
| Budget           | ✅               | ✅                                    |
| Laporan 7 hari   | ✅               | ✅                                    |
| Mode Couple      | ❌               | ✅                                    |
| Goals            | ❌               | ✅                                    |
| Laporan All Time | ❌               | ✅                                    |
| WhatsApp Bot     | ❌               | ✅                                    |

- Badge **"Paling Populer"** pada kolom Premium.
- Catatan kecil: _"Semua akun baru mendapatkan akses Premium gratis selama 30 hari."_
- CTA: **"Mulai Gratis"** → `app.flowku.my.id/register`

---

### Section 6 — FAQ

**Tujuan:** Jawab keberatan umum sebelum pengunjung pergi.

**Pertanyaan yang wajib dijawab:**

1. Apakah data keuangan saya aman?
2. Apa yang terjadi setelah trial 30 hari habis?
3. Apakah bisa digunakan sendiri (tanpa pasangan)?
4. Bagaimana cara upgrade ke Premium?
5. Apakah bisa cancel kapan saja?

Format: accordion (expand/collapse) untuk menghemat ruang.

---

### Section 7 — CTA Final

**Tujuan:** Tangkap pengunjung yang scroll sampai bawah tapi belum klik CTA di atas.

**Konten:**

- Headline singkat: _"Mulai kelola keuangan bersama hari ini."_
- Subtext: _"Gratis 30 hari, tidak perlu kartu kredit."_
- Tombol: **"Daftar Sekarang"** → `app.flowku.my.id/register`

---

### Section 8 — Footer

**Konten:**

- Logo Flowku
- Link: Kebijakan Privasi, Syarat & Ketentuan
- Link ke `app.flowku.my.id`
- Kontak: email support
- Teks copyright: _© 2026 Flowku. All rights reserved._

---

## 4. Navigasi (Navbar)

**Posisi:** Fixed top, transparan dengan blur effect (Glassmorphism).

**Konten:**

- Logo Flowku (kiri)
- Link navigasi: Fitur, Harga, FAQ (tengah, hidden di mobile)
- Tombol CTA: **"Masuk"** (outline) dan **"Coba Gratis"** (filled) → masing-masing ke `app.flowku.my.id/login` dan `app.flowku.my.id/register`

**Mobile:** Hamburger menu yang menampilkan link navigasi dan kedua tombol CTA.

---

## 5. Desain & Branding

### Prinsip Utama

- **Konsistensi visual dengan aplikasi:** Warna, tipografi, dan pola desain harus identik agar transisi dari landing page ke app terasa seamless.
- **Glassmorphism:** Gunakan efek kaca (backdrop-filter: blur, background semi-transparan) konsisten dengan desain aplikasi.
- **Mobile-first:** Mayoritas pengunjung dari Indonesia mengakses via mobile.

### Elemen Visual

- Mockup aplikasi (screenshot dashboard, mode couple, goals) sebagai ilustrasi utama di Hero dan Section Fitur.
- Warna gradient sesuai brand aplikasi.
- Tipografi: sama dengan yang digunakan di aplikasi.

---

## 6. Tech Stack

| Komponen  | Pilihan                   | Alasan                                                      |
| --------- | ------------------------- | ----------------------------------------------------------- |
| Framework | **Next.js static export** | Next.js static export lebih optimal untuk SEO dan performa. |
| Styling   | **Tailwind CSS**          | Konsisten dengan stack aplikasi                             |
| Hosting   | **Vercel**                | Gratis, mudah setup custom domain `flowku.my.id`            |
| Analytics | Google Analytics          | Tracking konversi dari landing page ke register             |
| Domain    | `flowku.my.id`            | Subdomain `app.` untuk aplikasi                             |

**Catatan:** Landing page tidak memiliki koneksi ke Firebase sama sekali. Semua link eksternal mengarah ke `app.flowku.my.id`.

---

## 7. SEO

**Meta tags wajib:**

- `title`: "Flowku — Kelola Keuangan Bersama Pasangan"
- `description`: 1–2 kalimat value proposition, maks 160 karakter
- `og:image`: Screenshot hero / mockup aplikasi untuk preview saat dibagikan di media sosial
- `og:url`: `https://flowku.my.id`
- Canonical URL

**Target keyword (low-competition untuk awal):**

- "aplikasi keuangan pasangan"
- "catat keuangan bersama"
- "financial tracker couple Indonesia"

---

## 8. Performa & Technical Requirements

- **Lighthouse score target:** ≥ 90 untuk Performance, Accessibility, SEO
- **Load time:** < 2 detik pada koneksi 4G
- **Responsive:** Mobile (360px+), Tablet (768px+), Desktop (1280px+)
- **Tidak ada dependency berat:** Hindari library JavaScript yang tidak perlu
- **HTTPS:** Wajib (disediakan otomatis oleh Vercel/Netlify)

---

## 9. Halaman Tambahan (Minimal)

Selain halaman utama (`/`), perlu disiapkan dua halaman tambahan:

### `/privacy` — Kebijakan Privasi

Wajib ada sebelum launch. Berisi:

- Data apa yang dikumpulkan
- Bagaimana data digunakan dan disimpan
- Hak pengguna atas datanya
- Kontak untuk pertanyaan privasi

### `/terms` — Syarat & Ketentuan

Berisi:

- Ketentuan penggunaan layanan
- Ketentuan subscription dan pembayaran
- Kebijakan refund
- Batasan tanggung jawab

**Catatan:** Kedua halaman ini penting secara legal dan juga dibutuhkan jika kamu mendaftarkan aplikasi ke Google Play Store atau App Store di masa depan.

---

## 10. Analytics & Conversion Tracking

**Event yang perlu ditrack:**

- Klik tombol CTA (Hero, Pricing, CTA Final) — untuk tahu section mana yang paling efektif
- Scroll depth — untuk tahu seberapa jauh pengunjung membaca
- Klik "Masuk" vs "Daftar" — untuk memahami komposisi pengunjung baru vs returning

**Tool:** Google Analytics 4 atau Umami (self-hosted, privacy-friendly).

---

## 11. Launch Checklist

Sebelum landing page go-live:

- [ ] Semua CTA mengarah ke URL yang benar (`app.flowku.my.id/register`)
- [ ] Halaman `/privacy` dan `/terms` sudah ada
- [ ] Meta tags SEO lengkap
- [ ] Responsif di mobile, tablet, desktop
- [ ] Lighthouse score ≥ 90
- [ ] Custom domain `flowku.my.id` terhubung
- [ ] Analytics terpasang dan terverifikasi
- [ ] Tidak ada broken link
- [ ] Konten sudah di-review (tidak ada typo, harga sesuai)

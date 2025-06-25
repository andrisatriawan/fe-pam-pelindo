# Next.js Frontend Post Audit Monitoring & Report Setup Guide

Panduan ini berisi langkah-langkah untuk menjalankan frontend Post Audit Monitoring & Report menggunakan Next.js.

## ✅ Kebutuhan Sistem

Pastikan Anda sudah menginstal:

- Node.js (disarankan versi LTS)
- npm atau yarn

## 📦 Langkah-Langkah Instalasi Frontend

### 1. Install Dependencies

```bash
npm install
```

Atau jika menggunakan yarn:

```bash
yarn install
```

### 2. Konfigurasi Environment

Salin file `.env.example` (jika ada) dan sesuaikan:

```bash
cp .env.local.example .env.local
```

Lalu edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://domain-backend.com/api
```

### 3. Jalankan Aplikasi

Untuk mode development:

```bash
npm run dev
```

Untuk build dan menjalankan di production:

```bash
npm run build
npm start
```

### 4. Deploy (Opsional)

Untuk VPS dengan Nginx atau menggunakan layanan seperti Vercel/Netlify:

- Pastikan folder hasil build (`.next`, `out`, dll.) tersedia
- Sesuaikan konfigurasi reverse proxy jika pakai VPS

---

## 🐞 Troubleshooting Frontend

- Pastikan `NEXT_PUBLIC_API_URL` mengarah ke backend Laravel yang aktif.

---

## 📁 Struktur Project Frontend (Singkat)

```
├── components/
├── pages/
├── public/
├── styles/
├── .env.local
├── next.config.js
└── package.json
```

---

## ✍️ Author

Andri Satriawan – [@andrisatriawan](https://github.com/andrisatriawan)

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

Untuk build dan menjalankan di production:

```bash
npm run build
npm start
```

### 4. Deploy ke VPS dengan Nginx

#### a. Jalankan dengan PM2 (disarankan)

Install PM2 jika belum:

```bash
npm install -g pm2
```

Jalankan aplikasi:

```bash
pm start
# atau dengan PM2
pm run start
pm install -g pm2
pm run build
pm run start
pm2 start npm --name "nextjs-frontend" -- run start
```

#### b. Konfigurasi Nginx untuk Reverse Proxy

```nginx
server {
    listen 80;
    server_name domain-frontend.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Simpan file konfigurasi Nginx Anda dan reload:

```bash
sudo systemctl reload nginx
```

Jika menggunakan HTTPS, Anda bisa tambahkan konfigurasi SSL menggunakan Let's Encrypt + Certbot.

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

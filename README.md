# ARVO

Halaman web *link-in-bio* berbasis HTML, CSS, dan JavaScript murni untuk menampilkan kumpulan tautan, profil media sosial, serta portofolio dalam satu halaman publik di `https://arvo.web.id`.

## Ikhtisar

**ARVO** dirancang sebagai halaman profil terpusat yang ringan tanpa ketergantungan pada *framework* JavaScript maupun proses kompilasi (*build step*). Seluruh struktur halaman, penataan gaya, dan interaksi antarmuka dijalankan langsung di sisi klien menggunakan standar web natif (HTML5, CSS3, dan Vanilla JavaScript).

| Informasi | Detail |
| :--- | :--- |
| **Nama Proyek** | ARVO |
| **URL Produksi** | `https://arvo.web.id` |
| **Tech Stack** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Pengembang** | Fitrah Akbar Maulana |

## Fitur

* **Arsitektur Statis Murni**: Tidak memerlukan Node.js, *bundler*, atau *package manager*; seluruh kode sumber siap dijalankan langsung di peramban.
* **Profil & Daftar Tautan Terpusat**: Menampilkan avatar, nama tampilan, deskripsi singkat (*bio*), ikon jaringan sosial, serta daftar tombol tautan eksternal dalam satu halaman.
* **Desain Responsif (*Mobile-First*)**: Tata letak berbasis CSS Flexbox/Grid yang beradaptasi secara proporsional pada layar ponsel, tablet, maupun desktop.
* **Kustomisasi Berbasis Variabel CSS**: Pengaturan warna latar, aksen, tipografi, dan radius tombol dikelola terpusat melalui *CSS custom properties* (`:root`).
* **Interaktivitas Sisi Klien**: Penanganan *event* klik, penyalinan tautan ke *clipboard*, umpan balik visual (*toast/tooltip*), dan manipulasi DOM ditangani langsung melalui JavaScript natif.
* **Waktu Muat Instan**: Ukuran aset minimal tanpa beban pustaka pihak ketiga yang besar.

## Struktur Berkas

```text
arvo.web.id/
├── assets/                 # Aset statis (foto profil/avatar, favicon, ikon)
├── index.html              # Struktur utama halaman, metadata SEO/Open Graph, dan elemen tautan
├── style.css               # Variabel tema (:root), tata letak responsif, dan animasi transisi
├── script.js               # Logika interaksi DOM, event listener, dan fungsi utilitas klien
└── README.md               # Dokumentasi repositori
```

| Berkas | Fungsi Teknis |
| :--- | :--- |
| `index.html` | Mendefinisikan struktur semantik profil, daftar elemen `<a href="...">`, serta tag meta pratinjau tautan. |
| `style.css` | Mengatur sistem desain, *styling* kartu tautan, efek *hover/active*, serta *media queries* untuk berbagai ukuran layar. |
| `script.js` | Menangani perilaku dinamis halaman seperti fungsi salin URL, *modal* bagikan/QR, atau *rendering* daftar tautan. |

## Penggunaan & Pengembangan Lokal

Karena proyek ini hanya terdiri dari berkas statis HTML, CSS, dan JavaScript, Anda tidak perlu memasang dependensi apa pun.

1. Kloning repositori:
   ```bash
   git clone https://github.com/username/arvo.web.id.git
   cd arvo.web.id
   ```
2. Jalankan di peramban:
   * **Cara Langsung**: Buka berkas `index.html` langsung di peramban web.
   * **Menggunakan Server Statis Lokal (Opsional)**: Gunakan ekstensi **Live Server** di VS Code, atau jalankan perintah berikut di terminal:
     ```bash
     python3 -m http.server 8080
     ```
     Lalu buka `http://localhost:8080` di peramban.

## Panduan Kustomisasi

* **Mengubah Profil & Daftar Tautan**: Sunting bagian atribut profil (nama, bio, path gambar avatar) serta elemen daftar tautan di dalam `index.html` (atau objek data tautan di dalam `script.js`).
* **Mengubah Tema & Warna**: Sesuaikan nilai variabel warna dan *font* pada blok `:root` di bagian atas berkas `style.css`.

## Deployment

Proyek ini dapat langsung di-deploy ke layanan *static web hosting* tanpa konfigurasi *build command*:

* **GitHub Pages**: Aktifkan melalui menu *Settings > Pages* dari *branch* utama (`main`).
* **Cloudflare Pages / Netlify / Vercel**: Hubungkan repositori dengan pengaturan *Build Command* dikosongkan dan *Output Directory* diarahkan ke direktori utama (`/`).

## Pengembang

* **Pengembang**: Fitrah Akbar Maulana
* **Situs Web**: `https://arvo.web.id`

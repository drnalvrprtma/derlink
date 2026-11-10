# ARVO

**ARVO (`arvo.web.id`)** adalah platform web pembuat halaman kumpulan tautan (*link-in-bio* / *microsite* serupa [Linktree](https://linktr.ee)) yang memudahkan kreator, pelaku usaha, dan profesional menyatukan seluruh tautan penting, media sosial, serta portofolio ke dalam satu halaman profil yang rapi dan mudah dibagikan.

---

## Ringkasan Proyek

| Atribut | Detail |
| :--- | :--- |
| **Nama Layanan** | ARVO |
| **Domain** | `https://arvo.web.id` |
| **Kategori** | Halaman Tautan Profil (*Link-in-Bio* / *Microsite Builder*) |
| **Pengembang** | Fitrah Akbar Maulana |
| **Fungsi Utama** | Menyatukan berbagai tautan dan profil sosial dalam satu URL singkat |

---

## Fitur Utama

* **Satu Tautan untuk Semua Profil**: Kumpulkan tautan media sosial, toko daring, portofolio, kontak WhatsApp, hingga situs web pribadi ke dalam satu halaman profil (`arvo.web.id/username`).
* **Kustomisasi Tampilan Profil**: Atur foto profil, nama tampilan, deskripsi singkat (*bio*), serta tema warna atau gaya tombol agar selaras dengan identitas personal maupun *brand* Anda.
* **Pengelolaan Tautan Fleksibel**: Tambah, ubah judul, atur urutan tampil (*drag-and-drop* / prioritas), sembunyikan sementara, atau hapus tautan kapan saja dengan cepat.
* **Ikon Sosial & Tautan Cepat**: Dukungan ikon visual untuk berbagai platform populer sehingga pengunjung lebih mudah mengenali tujuan setiap tautan.
* **Bagikan dengan Kode QR**: Buat dan unduh kode QR untuk halaman profil Anda agar mudah dicantumkan pada kartu nama, kemasan produk, poster, atau materi promosi cetak.
* **Statistik Kunjungan & Klik**: Pantau jumlah kunjungan halaman dan performa klik pada masing-masing tombol tautan untuk mengetahui konten yang paling diminati audiens.
* **Desain Responsif & Ringan**: Tampilan halaman dioptimalkan agar terbuka dengan cepat dan terlihat proporsional baik di perangkat seluler (*mobile*) maupun komputer desktop.

---

## Cara Penggunaan

1. **Buat Halaman Profil**: Tentukan nama pengguna (*username* / *slug*) unik untuk alamat halaman Anda (misalnya `arvo.web.id/namaanda`), lalu lengkapi judul profil dan deskripsi singkat.
2. **Tambahkan Tautan & Sesuaikan Desain**: Masukkan daftar URL beserta label tombolnya, atur urutan tautan, dan pilih tampilan tema yang sesuai dengan gaya Anda.
3. **Publikasikan & Bagikan**: Salin URL profil ARVO Anda untuk dipasang di bio Instagram, TikTok, X, LinkedIn, atau bagikan langsung melalui kode QR.

---

## Struktur Proyek (Template Repositori)

Jika Anda mengelola kode sumber `arvo.web.id` di dalam repositori Git, sesuaikan struktur direktori dan panduan instalasi lokal di bawah ini dengan *tech stack* yang Anda gunakan:

```text
arvo.web.id/
├── public/                 # Aset statis (favicon, logo, gambar default, ikon sosial)
├── src/
│   ├── components/         # Komponen UI (kartu profil, tombol tautan, editor, modal QR)
│   ├── pages/              # Halaman utama, halaman editor, dan halaman profil publik (/[slug])
│   ├── styles/             # Konfigurasi gaya dan tema tampilan
│   └── utils/              # Fungsi bantu (validasi URL, pembuatan QR, penyimpanan/analitik)
├── server/                 # Logika backend / API endpoint untuk profil & statistik klik
├── .env.example            # Contoh konfigurasi variabel lingkungan
├── package.json            # Daftar dependensi dan skrip proyek
└── README.md               # Dokumentasi proyek
```

### Menjalankan Secara Lokal (Opsional)

1. Kloning repositori ini ke komputer lokal Anda:
   ```bash
   git clone https://github.com/username/arvo.web.id.git
   cd arvo.web.id
   ```
2. Pasang seluruh dependensi proyek:
   ```bash
   npm install
   ```
3. Salin berkas konfigurasi lingkungan dan sesuaikan pengaturannya:
   ```bash
   cp .env.example .env
   ```
4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

---

## Catatan Privasi & Keamanan

* **Visibilitas Halaman Publik**: Halaman profil dan daftar tautan yang dipublikasikan bersifat publik agar dapat diakses oleh pengunjung dari perangkat mana pun. Pastikan Anda tidak mencantumkan tautan dokumen internal atau data sensitif pada halaman profil publik.
* **Keamanan Tautan Tujuan**: Gunakan selalu URL tujuan yang valid dan aman (`https://`) untuk menjaga kenyamanan serta keamanan pengunjung halaman Anda.

---

## Kredit & Lisensi

* **Pengembang**: Dikembangkan oleh **Fitrah Akbar Maulana**
* **Situs Web**: `https://arvo.web.id`

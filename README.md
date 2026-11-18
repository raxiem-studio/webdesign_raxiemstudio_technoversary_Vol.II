# JEJAK — Closer to Nature, Closer to Indonesia

**Karya Web Design Competition — Techno Versary Vol. II**
Tema: *EcoDigital For Environment* · Subtema: **Travel Destination Ramah Lingkungan**

## Tim

| | |
|---|---|
| **Nama tim** | Raxiem Studio |
| **Universitas** | Universitas Bina Sarana Indonesia |
| **Anggota 1** | Restu Phandu Damara |
| **Anggota 2** | M. Iqbal Sugandi |

## Deskripsi website

JEJAK adalah website perjalanan dan destinasi alam Indonesia yang mengajak pengunjung mengenal keindahan alam, cerita masyarakat lokal, dan pentingnya **perjalanan yang bertanggung jawab**. JEJAK tidak hanya memperkenalkan destinasi, tetapi juga menjadi media *storytelling* dan edukasi lingkungan: setiap destinasi dilengkapi panduan berkunjung dengan bijak, dan setiap cerita jurnal membawa pesan menjaga alam.

Nilai utama JEJAK: **Discover Nature · Preserve Stories · Travel Responsibly**.

### Halaman

| Halaman | Rute | Isi |
|---|---|---|
| Home | `/` | Hero, destinasi pilihan, cerita (Our Story), jurnal, galeri, *Responsible Travel*, dan angka lingkungan Indonesia bersumber resmi |
| About | `/about` | Identitas JEJAK, cerita di balik JEJAK, dan tiga nilai perjalanan bertanggung jawab |
| Konten: Destinasi | `/destinations`, `/destinations/:slug` | Daftar destinasi dan panduan destinasi (sekilas, pengalaman utama, tips berkunjung dengan bijak) |
| Konten: Jurnal | `/journal`, `/journal/:slug` | Artikel edukasi dan cerita perjalanan |
| Galeri | `/#gallery` | Galeri foto alam Indonesia (bagian Home) |
| Contact | `/contact` | Formulir kontak yang benar-benar mengirim email, serta email yang dapat dihubungi |
| Kredit Foto | `/credits` | Atribusi foto berlisensi Creative Commons |
| Halaman 404 | rute lain | Halaman "tidak ditemukan" dengan tautan kembali ke Beranda dan Destinasi. Tautan Kebijakan Privasi dan Syarat Layanan saat ini mengarah ke sini |

### Fitur

- **Dua bahasa:** English (default, untuk audiens internasional) dan Bahasa Indonesia, dengan tombol EN / ID di navigasi. Pilihan bahasa diingat oleh browser.
- **Formulir kontak fungsional:** validasi per kolom, dropdown topik yang bisa dipakai dengan keyboard, dan pengiriman email lewat EmailJS.
- **Responsif:** mobile, tablet, dan desktop, tanpa *horizontal scroll*.
- **Aksesibilitas:** HTML semantik, *skip link*, *focus state*, teks alternatif gambar dalam dua bahasa, kontras warna sesuai WCAG AA, dan dukungan *reduced motion*.
- **Data lingkungan bersumber resmi:** tidak ada statistik karangan. Sumber tercantum di halaman dan di bagian [Sumber data](#sumber-data).

## Teknologi

- [React 19](https://react.dev) dan [Vite](https://vite.dev), dengan JavaScript, HTML5, dan CSS3.
- Tanpa library UI, template, atau komponen berbayar. Semua komponen dibuat sendiri, dan router serta sistem bahasa dibuat tanpa dependency tambahan.
- Font [Poppins](https://fonts.google.com/specimen/Poppins) (SIL Open Font License).
- [EmailJS](https://www.emailjs.com) (paket gratis) untuk pengiriman formulir.

## Instalasi

Prasyarat: **Node.js 20.19+ atau 22.12+** dan **npm**.

```bash
git clone https://github.com/raxiem-studio/webdesign_raxiemstudio_technoversary_Vol.II.git
cd webdesign_raxiemstudio_technoversary_Vol.II
npm install
```

### Konfigurasi formulir kontak (opsional)

Website tetap berjalan tanpa langkah ini. Tanpa kunci EmailJS, formulir memakai layanan cadangan FormSubmit.

1. Salin `.env.example` menjadi `.env.local`.
2. Isi `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, dan `VITE_EMAILJS_PUBLIC_KEY` dari dashboard EmailJS.
3. Template email ada di `email-templates/`. Petunjuknya ada di `email-templates/README.md`.

## Menjalankan project

```bash
npm run dev       # server pengembangan, buka http://localhost:5173
npm run build     # build produksi ke folder dist/
npm run preview   # menjalankan hasil build secara lokal
npm run lint      # pemeriksaan kode (oxlint)
```

Saat di-*hosting*, semua rute harus diarahkan ke `index.html` karena website ini adalah *single-page app*.

## Struktur folder

```
src/
  components/   komponen yang dipakai ulang (Button, Navigation, Footer, kartu, dll.)
  sections/     bagian halaman Home
  pages/        halaman (About, Contact, Destinasi, Jurnal, Kredit Foto, dll.)
  data/         seluruh konten dalam dua bahasa ({ en, id })
  i18n/         sistem bahasa dan teks antarmuka
  styles/       design token (warna, tipografi, spasi) dan gaya dasar
  hooks/        hook animasi dan carousel
email-templates/  template email notifikasi formulir
```

## Sumber data

| Angka | Sumber |
|---|---|
| 29,9 juta ha kawasan konservasi laut (2024) | Kementerian Kelautan dan Perikanan, Renstra Ditjen PKRL 2025–2029 |
| 6.262 desa wisata terdaftar (2026) | Menteri Pariwisata di Komisi VII DPR, 17 Juni 2026 (ANTARA) |
| 6,42% terumbu karang yang disurvei berkondisi sangat baik (data 2019) | LIPI (kini BRIN), dilaporkan ANTARA, 30 Juni 2020 |

## Kredit dan lisensi

- **Foto:** dari Unsplash (Unsplash License), Wikimedia Commons (CC0, CC BY, CC BY-SA), dan sumber bebas lainnya. Foto yang mewajibkan atribusi dicantumkan di halaman **Kredit Foto** (`/credits`). Daftar lengkap sumber dan lisensi ada di `src/assets/ASSETS.md`.
- **Favicon:** ikon *footprints* dari [Lucide](https://lucide.dev) (lisensi ISC), hijau di tema terang dan putih di tema gelap.
- **Kode:** dibuat oleh tim Raxiem Studio untuk Techno Versary Vol. II.

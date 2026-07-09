# Undangan Online - Andre & Rina

Undangan pernikahan online profesional dengan tema warna pink dan navy. Dibangun menggunakan HTML, CSS, dan JavaScript murni sehingga ringan dan mudah di-deploy.

## Fitur

- Desain responsif untuk desktop dan mobile
- Countdown timer menuju hari pernikahan
- Konfirmasi kehadiran (RSVP) dengan ucapan
- Integrasi Google Maps
- Tombol tambah ke kalender (.ics)
- Galeri foto placeholder
- Loading screen elegan
- Halaman pembuka elegan dengan animasi scale + blur
- Personalisasi nama penerima melalui URL parameter

## Tema Warna

- **Pink:** `#ec407a`, `#f48fb1`, `#f8bbd0`
- **Navy:** `#0a0e27`, `#1a237e`, `#3949ab`

## Cara Memberikan Nama di URL

Tambahkan parameter `to` di URL untuk menampilkan nama penerima undangan:

```
https://domain-anda.netlify.app/?to=Budi%20Santoso
```

Jika tidak ada parameter, akan muncul teks default "Bapak/Ibu/Saudara/i".

## Animasi Pembuka

Undangan memiliki halaman pembuka elegan dengan efek:
- Scale in + blur to clear saat muncul
- Fade in up bertahap untuk setiap elemen
- Heartbeat icon
- Scale out + blur saat ditutup
- Hero reveal animation setelah undangan terbuka


1. Buka [Netlify](https://www.netlify.com/) dan login.
2. Pilih **Add new site** > **Import an existing project**.
3. Hubungkan repository GitHub/GitLab/Bitbucket atau drag-and-drop folder ini ke halaman deploy Netlify.
4. Klik **Deploy site**.
5. Selesai! Netlify akan memberikan URL untuk undangan online Anda.

## Cara Deploy di Netlify

1. Buka [Netlify](https://www.netlify.com/) dan login.
2. Pilih **Add new site** > **Import an existing project**.
3. Hubungkan repository GitHub/GitLab/Bitbucket atau drag-and-drop folder ini ke halaman deploy Netlify.
4. Klik **Deploy site**.
5. Selesai! Netlify akan memberikan URL untuk undangan online Anda.

## Struktur File

```
undangan-online/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
├── netlify.toml
└── README.md
```

## Kustomisasi

- Edit `index.html` untuk mengubah nama, tanggal, lokasi, dan detail acara.
- Edit `css/style.css` untuk mengubah warna dan tata letak.
- Edit `js/main.js` untuk mengubah tanggal countdown atau menambahkan fitur baru.
- Ganti foto placeholder di folder `images/` dan sesuaikan path di HTML.

## Lisensi

Gratis untuk penggunaan pribadi.

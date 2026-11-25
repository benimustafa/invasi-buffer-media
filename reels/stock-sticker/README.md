# KUNCI: Stock Sticker Reel (pilar konten stok ilustrasi)

Dikunci Beni, 25 Nov 2026. Template: `remotion/` (komposisi `sticker-reel`). Sampel acuan: `samples/coffee-sticker-v3.mp4`.

## Format video (jangan diubah per koleksi)
- 1080x1920, sekitar 8 detik, musik 120-125 BPM, stiker muncul tiap setengah ketukan.
- Awal: TANPA teks. 14 stiker kecil (lebar 185-230 px) muncul satu per satu, menyebar dan menumpuk di atas latar konteks.
- Tengah: stiker hilang bergantian, latar digelapkan sekitar 50%.
- Akhir: teks saja, TANPA kotak/frame, putih + kuning, mengisi area tengah layar:
  INVASI STUDIO (Plex Mono kuning) / nama koleksi (Instrument Serif putih 180 px) / keterangan (Plex Mono) / garis kuning / CTA.
- CTA: tanpa menyebut nama market ("Download the full pack / link in bio / Custom illustration / invasistudio@gmail.com").
- Latar: foto konteks dari Magnific, TANPA merek atau tulisan. Prompt: "interior ... no logos or text anywhere".
- Isi stiker: PNG dari OneDrive, diubah otomatis jadi stiker oleh `make_stickers.py` (isi putih, garis tepi putih, bayangan).

## Cara bikin untuk koleksi baru
1. Ambil 11+ elemen PNG dari folder koleksi di OneDrive, jalankan `make_stickers.py`, taruh di `remotion/public/set/`.
2. Generate latar baru di Magnific (konteks yang cocok dengan koleksi, tanpa merek), simpan jadi `public/set/bg.jpg`.
3. Generate musik di Magnific (akustik ceria 120-125 BPM), deteksi ketukan dengan librosa, isi `beat` (frame per setengah ketukan) dan `firstBeat` di `Root.tsx`.
4. Ganti `name`, `meta` di `Root.tsx`. Render: `npx remotion render ... --crf=20`.
5. Push ke repo, jadwalkan lewat Buffer (IG reel + X video).

## Slot mingguan (4 posting IG/minggu, semua lewat @invasistudio)
Jam tayang IG 13:00 WIB, X 15:00 WIB. X: topik sama dengan IG tapi sudut berbeda, media sama.

### Minggu reguler
| Hari | Slot | Format | Catatan |
|---|---|---|---|
| Senin | Font collection | Carousel (cover Remotion) | cover dan back cover animasi, campuran beberapa font |
| Selasa | Stok ilustrasi | Video | Stock Sticker Reel (otomatis, tanpa syuting). Gantian dengan video stok syutingan tim (Dirda) tiap minggu video syuting siap |
| Kamis | Font video | Reel | semi-edukasi ringan ala type designer |
| Sabtu | Koleksi | Carousel | gantian mingguan: koleksi stok ilustrasi ↔ koleksi Canva |

Rotasi koleksi untuk Stock Sticker Reel: satu koleksi per Selasa, urut dari set yang sudah terjual dan punya elemen PNG (Coffee Shop dulu, lalu Western, Christmas, Americana, dst).

### Minggu rilis font baru (fase)
Selasa (stok) tetap jalan supaya stok tidak mati. Slot font diambil alih:
| Fase | Slot | Isi |
|---|---|---|
| 1 | Kamis minggu sebelum rilis | Teaser video (semi-edukasi, tanpa nama font dan detail) |
| 2 | Senin minggu rilis | Release carousel 1 |
| 3 | Kamis minggu rilis | Video proses |
| 4 | Sabtu minggu rilis | Release carousel 2 (detail pemakaian). Koleksi Sabtu yang tergeser pindah ke Sabtu berikutnya |
| 5 | Senin minggu berikutnya | Font collection bertema font baru |
Sabtu minggu berikutnya kembali ke rotasi reguler.

## Aturan tambahan
- Reel dibatasi 4 yang antre (jangan bikin brief reel baru kalau sudah 4).
- Aset yang medianya sudah lengkap langsung dijadwalkan ke Buffer (tanpa menunggu "OK jadwalkan").
- Media di-host di repo GitHub ini, URL dipin ke commit SHA.

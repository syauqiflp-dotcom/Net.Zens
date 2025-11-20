import { GameTask } from './hoaxGameData';

export const akunGameData: GameTask[] = [
  // Task 1: Jigsaw (was Task 2)
  {
    id: 1,
    type: 'jigsaw',
    scenario: 'Penanggulangan Klik Phishing',
    viralMessage: 'Scam Phishing Akun Game Online: Anda tidak sengaja mengklik link hadiah dan dibawa ke laman login palsu.',
    question: 'Susun urutan langkah penanggulangan yang benar setelah menyadari Anda berada di situs phishing.',
    options: [
      'Segera ganti password di situs resmi',
      'Cek device dari malware',
      'Laporkan tautan tersebut',
      'Abaikan pop-up aneh'
    ],
    correctOrder: [
      'Segera ganti password di situs resmi',
      'Cek device dari malware',
      'Laporkan tautan tersebut',
      'Abaikan pop-up aneh'
    ]
  },
  // Task 2: Jigsaw (was Task 3)
  {
    id: 2,
    type: 'jigsaw',
    scenario: 'Verifikasi URL E-commerce',
    viralMessage: 'Scam Phishing E-commerce: Anda menerima link tawaran diskon besar dari e-commerce yang mencurigakan.',
    question: 'Anda menerima link diskon mencurigakan. Bagaimana urutan langkah verifikasi yang benar?',
    options: [
      'Cek sertifikat SSL/HTTPS',
      'Membandingkan tautan dengan situs resmi',
      'Mencari di Google secara manual',
      'Langsung masukkan password'
    ],
    correctOrder: [
      'Cek sertifikat SSL/HTTPS',
      'Membandingkan tautan dengan situs resmi',
      'Mencari di Google secara manual',
      'Langsung masukkan password'
    ]
  },
  // Task 3: Swipe (was Task 4)
  {
    id: 3,
    type: 'swipe',
    claim: 'https://instagramm.com/login',
    sourceInfo: 'Salah eja (double m), domain mencurigakan.',
    correctSwipe: 'left' // Phishing
  },
  // Task 4: Swipe (was Task 5)
  {
    id: 4,
    type: 'swipe',
    claim: 'https://www.ojk.go.id/keuangan',
    sourceInfo: 'Domain resmi pemerintah (.go.id) dan HTTPS.',
    correctSwipe: 'right' // Aman
  },
  // Task 5: Swipe (was Task 6)
  {
    id: 5,
    type: 'swipe',
    claim: 'http://diskon-shopee.xyz/klaim-hadiah',
    sourceInfo: 'Tidak menggunakan HTTPS, domain tidak relevan (.xyz).',
    correctSwipe: 'left' // Phishing
  },
  // Task 6: Swipe (was Task 7)
  {
    id: 6,
    type: 'swipe',
    claim: 'https://www.tokopedia.com/akun',
    sourceInfo: 'URL dan domain resmi e-commerce, menggunakan HTTPS.',
    correctSwipe: 'right' // Aman
  },
  // Task 7: Swipe (was Task 8)
  {
    id: 7,
    type: 'swipe',
    claim: 'https://bit.ly/undianresmi',
    sourceInfo: 'Tautan pendek (shortened link), tujuan asli disembunyikan.',
    correctSwipe: 'left' // Phishing
  },
  // Task 8: Swipe (was Task 9)
  {
    id: 8,
    type: 'swipe',
    claim: 'https://verifikasi.bankmandiri.id/login',
    sourceInfo: 'Subdomain "verifikasi" mencurigakan dan tidak standar.',
    correctSwipe: 'left' // Phishing
  },
  // Task 9: Swipe (was Task 10)
  {
    id: 9,
    type: 'swipe',
    claim: 'https://bankbsi.co.id/login',
    sourceInfo: 'Domain resmi bank (.co.id) dan HTTPS.',
    correctSwipe: 'right' // Aman
  },
  // Task 10: Drag & Drop (was Task 11)
  {
    id: 10,
    type: 'drag-drop',
    scenario: 'BEDAH FORMULIR HADIAH: PILAH DATA RAHASIA VS PUBLIK!',
    dropZoneLabels: {
      zoneA: { label: 'Data Rahasia', icon: '💀' },
      zoneB: { label: 'Data Umum', icon: '✅' },
    },
    messageParts: [
        { text: 'SELAMAT! ANDA PEMENANG UNDIAN MINGGUAN KAMI!\n(Harap isi data dengan lengkap untuk pencairan dana)\n\n', isDraggable: false },
        { text: 'Nama Lengkap: ', isDraggable: false },
        { text: 'Nama Lengkap Sesuai KTP', isDraggable: true, id: 'dd1-akun' },
        { text: '\nNomor OTP: ', isDraggable: false },
        { text: 'Nomor OTP Terbaru', isDraggable: true, id: 'dd2-akun' },
        { text: '\nEmail Aktif: ', isDraggable: false },
        { text: 'Email Aktif Anda', isDraggable: true, id: 'dd3-akun' },
        { text: '\nKode CVV/CVC: ', isDraggable: false },
        { text: 'Kode CVV/CVC Kartu', isDraggable: true, id: 'dd4-akun' },
        { text: '\nPIN ATM: ', isDraggable: false },
        { text: 'PIN ATM/Mobile Banking', isDraggable: true, id: 'dd5-akun' },
        { text: '\nTanggal Lahir: ', isDraggable: false },
        { text: 'Tanggal Lahir Anda', isDraggable: true, id: 'dd6-akun' },
    ],
    items: [
      { id: 'dd1-akun', text: 'Nama Lengkap Sesuai KTP', correctDrop: 'zoneB' },
      { id: 'dd2-akun', text: 'Nomor OTP Terbaru', correctDrop: 'zoneA' },
      { id: 'dd3-akun', text: 'Email Aktif Anda', correctDrop: 'zoneB' },
      { id: 'dd4-akun', text: 'Kode CVV/CVC Kartu', correctDrop: 'zoneA' },
      { id: 'dd5-akun', text: 'PIN ATM/Mobile Banking', correctDrop: 'zoneA' },
      { id: 'dd6-akun', text: 'Tanggal Lahir Anda', correctDrop: 'zoneB' },
    ],
    feedbackMessages: {
        success: "✅ KEBAL! Data Finansial Anda Terlindungi!",
        failure: "💔 TERBAKAR! Kartu Anda Sudah Digunakan!",
    }
  },
  // Task 11: Swipe (was Task 12)
  {
    id: 11,
    type: 'swipe',
    displayType: 'website',
    claim: 'BPS Catat Inflasi Mei 2024 Capai 0,21 Persen Secara Bulanan',
    sourceInfo: 'www.kompas.com',
    authorAvatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Kompas_logo.svg/2560px-Kompas_logo.svg.png',
    correctSwipe: 'right' // Aman
  }
];
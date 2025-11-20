export interface JigsawTaskData {
  id: number;
  type: 'jigsaw';
  scenario: string;
  viralMessage: string;
  question: string;
  options: string[];
  correctOrder: string[];
  displayType?: 'whatsapp' | 'social-media';
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
}

export interface SwipeTaskData {
  id: number;
  type: 'swipe';
  claim: string;
  sourceInfo: string;
  correctSwipe: 'left' | 'right'; // left = 'Perlu Cek', right = 'Sumber Jelas'
  displayType?: 'default' | 'social-media' | 'news-article' | 'tiktok' | 'poster' | 'website' | 'website-phishing' | 'instagram' | 'website-news';
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
  backgroundImage?: string;
  articleImage?: string;
  articleHeadline?: string;
  articleSource?: string;
  articleBody?: string;
}

export interface DragDropDropZoneLabels {
    zoneA: { label: string; icon: string; };
    zoneB: { label: string; icon: string; };
}

export interface DragDropTaskData {
  id: number;
  type: 'drag-drop';
  scenario: string;
  dropZoneLabels: DragDropDropZoneLabels;
  messageParts?: {
      text: string;
      isDraggable: boolean;
      id?: string;
  }[];
  items: {
    id: string;
    text: string;
    correctDrop: 'zoneA' | 'zoneB';
  }[];
  feedbackMessages?: {
    success: string;
    failure: string;
  };
  displayType?: 'article';
  articleContent?: {
      headline: string;
      author: string;
      date: string;
      imageUrl?: string;
      messageParts: {
          text: string;
          isDraggable: boolean;
          id?: string;
      }[];
  };
}


export type GameTask = JigsawTaskData | SwipeTaskData | DragDropTaskData;

export const hoaxGameData: GameTask[] = [
  // Task 1: Jigsaw
  {
    id: 1,
    type: 'jigsaw',
    displayType: 'whatsapp',
    scenario: 'Analisis Pesan Viral OJK',
    viralMessage: '🚨Breaking News! 🚨\n\nBerdasarkan keputusan terbaru, Otoritas Jasa Keuangan (OJK) akan melakukan PENGHAPUSAN DATA MASSAL bagi seluruh nasabah pinjaman online (pinjol) yang mengalami gagal bayar (galbay) lebih dari 90 hari. Data Anda akan BERSIH dari SLIK OJK!\n\nIni adalah kesempatan emas! SEBARKAN ke semua teman dan keluarga yang terjerat pinjol! Jangan sampai ketinggalan! Info valid dari orang dalam.',
    question: 'Setelah menerima pesan ini, urutkan langkah kamu selanjutnya!',
    options: [
      'Sebar Fakta',
      'Cek Media Tepercaya',
      'Tahan, Jangan Sebar!',
      'Cari Tahu di Situs Resmi'
    ],
    correctOrder: [
      'Tahan, Jangan Sebar!',
      'Cari Tahu di Situs Resmi',
      'Cek Media Tepercaya',
      'Sebar Fakta'
    ]
  },
  // Task 2: Jigsaw
  {
    id: 2,
    type: 'jigsaw',
    displayType: 'social-media',
    authorName: 'Flash News',
    authorHandle: '@beritasuper_ID',
    authorAvatar: 'https://i.pravatar.cc/150?img=15',
    scenario: 'Cek Fakta Berita Online',
    viralMessage: 'Menteri Keuangan PURBAYA mengumumkan PERTALITE akan dihapus dari pasaran dan diganti dengan BBM baru dengan HARGA 2X LIPAT! Keputusan ini diambil untuk menyehatkan APBN. Simak selengkapnya: beritasupercepat.info/pertalite-naik',
    question: 'Kamu melihat berita ini beredar di media sosial. Apa langkah kamu selanjutnya?',
    options: [
      'Analisis link artikel',
      'Jangan Sebar Dulu',
      'Jangan Klik Tautan!',
      'Laporkan Jika Hoaks',
      'Cari di Media Kredibel'
    ],
    correctOrder: [
      'Jangan Sebar Dulu',
      'Jangan Klik Tautan!',
      'Analisis link artikel',
      'Cari di Media Kredibel',
      'Laporkan Jika Hoaks'
    ]
  },
  // Task 3: Swipe (TikTok View)
  {
    id: 3,
    type: 'swipe',
    displayType: 'tiktok',
    authorName: '@infopromo',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    claim: 'DANA bagi-bagi saldo Rp 500.000. Cuma modal KTP. Klik link: www.dandana.id #viral #fyp',
    sourceInfo: 'original sound - bagi-bagi duit',
    backgroundImage: 'https://images.unsplash.com/photo-1625605079052-e7fcb98994ca?w=800&h=1400&fit=crop',
    correctSwipe: 'left'
  },
  // Task 4: Swipe (TikTok View) - Previously Poster View
  {
    id: 4,
    type: 'swipe',
    displayType: 'tiktok',
    authorName: '@Mr.Cuan_Terus',
    authorAvatar: 'https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?w=100&h=100&fit=crop',
    claim: 'SEMINAR INVESTASI ANTI RUGI. Langsung jadi sultan dalam seminggu! Register:www.investeri.com/daftar #investasi #saham #cuan',
    sourceInfo: 'original sound - Money',
    backgroundImage: 'https://images.unsplash.com/photo-1627155596311-c90f02e25402?w=800&h=1400&fit=crop',
    correctSwipe: 'left'
  },
  // Task 5: Swipe (Facebook/Social Media View)
  {
    id: 5,
    type: 'swipe',
    displayType: 'social-media',
    authorName: 'dokterkarbitan',
    authorHandle: 'Kamis pukul 15.00.',
    authorAvatar: 'https://i.pravatar.cc/150?img=49',
    claim: 'TERBONGKAR! Kopi herbal ini terbukti secara klinis bisa menyembuhkan diabetes dalam 3 hari!',
    sourceInfo: 'Postingan Facebook',
    correctSwipe: 'left',
    articleImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    articleHeadline: "Kopi Herbal Ajaib Ini Ampuh Sembuhkan Diabetes dalam 24 Jam!",
    articleSource: "HEATNEWS.ID",
  },
    // Task 6: Swipe (Website Phishing View)
  {
    id: 6,
    type: 'swipe',
    displayType: 'website-phishing',
    claim: 'Bank Terkenal Bagikan Mobil Mewah, Cek Apakah Anda Pemenangnya!',
    sourceInfo: 'www.menanghadiah.xyz',
    authorAvatar: 'https://cdn.worldvectorlogo.com/logos/bca-bank-central-asia.svg', // Logo
    correctSwipe: 'left'
  },
  // Task 7: Swipe (Website News)
  {
    id: 7,
    type: 'swipe',
    displayType: 'website-news',
    claim: 'Odol Bisa Mengobati Luka Bakar, Mitos atau Fakta? Ini Kata Dokter',
    sourceInfo: 'https://lifestyle.kompas.com/',
    authorName: 'Alinda Vira, Redaksi/Karina Dwd',
    authorHandle: 'Kompas.com - 05 November 2025',
    authorAvatar: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Logo_Kompasdotcom.png', // Kompas Logo
    articleImage: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&h=600&fit=crop', // A picture of a hand with a burn
    articleBody: `KOMPAS.com - Sebagian orang masih percaya bahwa mengoleskan odol atau pasta gigi bisa membantu meredakan luka bakar. Padahal, anggapan tersebut tidak benar dan justru berbahaya.\n\nOdol untuk luka bakar adalah mitos\n\nMenurut dr. Heri Setyanto, Sp.B., FINACS, penggunaan odol pada luka bakar adalah mitos yang sebaiknya tidak dilakukan karena bisa memperparah kerusakan jaringan kulit.\n\n"Itu mitos banget. Salah satu terapi luka bakar itu nomor satu adalah dijauhkan dari sumber panas," ujar dr. Heri dalam acara Kampanye Kampanye Edukasi #BedaLukaBedaPlester Leukoplast Red First Aid di Hotel Ashley, Jakarta Pusat, Rabu (5/11/2025).\n\nLuka bakar harus didinginkan, salah satunya dengan air mengalir. Sayangnya, banyak masyarakat yang masih salah kaprah dengan langsung mengoleskan odol atau minyak ke bagian kulit yang terbakar.`,
    correctSwipe: 'right'
  },
  // Task 8: Swipe (Instagram)
  {
    id: 8,
    type: 'swipe',
    displayType: 'instagram',
    authorName: 'official.kpk',
    authorAvatar: 'https://upload.wikimedia.org/wikipedia/commons/4/48/KPK_Logo.svg',
    articleImage: 'https://images.unsplash.com/photo-1624365169364-0640dd10e180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYmFyc3xlbnwxfHx8fDE3NjMxMDk2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    claim: 'Halo, #KawanAksi!',
    articleBody: 'Sepanjang semester I, KPK telah menerima 2.617 laporan penerimaan gratifikasi dari para ASN dan Penyelenggara Negara (PN), baik yang dilaporkan langsung ke KPK, atau melalui Unit Pengendali Gratifikasi di masing-masing instansi. Dari jumlah laporan tersebut, 658 laporan ditetapkan sebagai milik negara dengan nilai Rp1,78 M.\n\nKPK terus mengimbau kepada ASN dan PN untuk menolak gratifikasi pada perayaan pertama. Sebab, gratifikasi dapat dianggap suap jika berhubungan dengan jabatan dan atau berlawanan dengan kewajiban atau tugas seseorang.\n\nSimak kinerja pencegahan terkait penerimaan laporan gratifikasi periode semester I dengan geser ke kiri!\n\n#CapsianKPK #KinerjaKPK #Gratifikasi',
    sourceInfo: 'Postingan Instagram Resmi',
    correctSwipe: 'right'
  },
  // Task 9: Drag & Drop - Article View
  {
    id: 9,
    type: 'drag-drop',
    displayType: 'article',
    scenario: 'Bedah Artikel Viral: Pilah Mana Hoax, Mana Alat Verifikasi!',
    dropZoneLabels: {
      zoneA: { label: 'Komponen Hoax / Phishing', icon: '💀' },
      zoneB: { label: 'Alat Verifikasi Fakta', icon: '✅' },
    },
    articleContent: {
        headline: "WASPADA! Pajak Ponsel Naik 50% Bulan Depan? Cek Faktanya!",
        author: "Info Viral Hari Ini",
        date: "5 Menit yang lalu",
        imageUrl: "https://images.unsplash.com/photo-1585224320092-35b1c55a29a3?auto=format&fit=crop&w=800&q=60",
        messageParts: [
            { text: 'Baru-baru ini, beredar kabar viral yang meresahkan masyarakat. Kabar tersebut menyebutkan bahwa ', isDraggable: false },
            { text: 'Pemerintah akan menaikkan pajak semua pengguna ponsel hingga 50% mulai bulan depan untuk menutup defisit anggaran.', isDraggable: true, id: 'dd1' },
            { text: ' Kabar ini diklaim ', isDraggable: false },
            { text: '100% benar, menurut "sumber orang dalam" kami', isDraggable: true, id: 'dd2' },
            { text: ' dan menyertakan link untuk detail resmi di ', isDraggable: false },
            { text: 'https://kemenkeu.info/pajak50', isDraggable: true, id: 'dd3' },
            { text: '.\n\nNamun, benarkah informasi ini? Setelah ditelusuri, ', isDraggable: false },
            { text: 'situs resmi Kominfo telah menyatakan isu kenaikan pajak ponsel 50% adalah HOAX.', isDraggable: true, id: 'dd4' },
            { text: ' Masyarakat diimbau untuk tidak panik dan selalu melakukan verifikasi. Jika ragu, Anda bisa menghubungi kontak resmi seperti ', isDraggable: false },
            { text: 'Call Center Kemenkeu di 134.', isDraggable: true, id: 'dd5' },
            { text: ' Sayangnya, pesan hoaks ini seringkali diakhiri dengan kalimat provokatif seperti ', isDraggable: false },
            { text: 'SEBARKAN segera sebelum info ini ditutup-tutupi oleh media!', isDraggable: true, id: 'dd6' },
        ]
    },
    items: [
      { id: 'dd1', text: 'Pemerintah akan menaikkan pajak semua pengguna ponsel hingga 50% mulai bulan depan untuk menutup defisit anggaran.', correctDrop: 'zoneA' },
      { id: 'dd2', text: '100% benar, menurut "sumber orang dalam" kami', correctDrop: 'zoneA' },
      { id: 'dd3', text: 'https://kemenkeu.info/pajak50', correctDrop: 'zoneA' },
      { id: 'dd4', text: 'situs resmi Kominfo telah menyatakan isu kenaikan pajak ponsel 50% adalah HOAX.', correctDrop: 'zoneB' },
      { id: 'dd5', text: 'Call Center Kemenkeu di 134.', correctDrop: 'zoneB' },
      { id: 'dd6', text: 'SEBARKAN segera sebelum info ini ditutup-tutupi oleh media!', correctDrop: 'zoneA' },
    ]
  }
];
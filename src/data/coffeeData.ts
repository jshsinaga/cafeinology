// Data kopi, kafein, dan referensi sains dari panduan-kafein-kopi.md

export interface CoffeeSpecies {
  id: string;
  name: string;
  latinName: string;
  caffeinePercent: string;
  mgPerGram: { min: number; max: number; avg: number };
  description: string;
  flavorProfile: string;
  ratioMultiplier: number;
  imageUrl: string;
  detailImageUrl?: string;
  botanicalTraits?: {
    leafStructure: string;
    beanShape: string;
    chromosomes: string;
    caffeinePurpose: string;
  };
  elevation: string;
}
export const COFFEE_SPECIES: CoffeeSpecies[] = [
  {
    id: 'arabica',
    name: 'Arabika',
    latinName: 'Coffea arabica',
    caffeinePercent: '1,2% - 1,5%',
    mgPerGram: { min: 10, max: 15, avg: 12 },
    description: 'Jenis kopi paling populer dengan cita rasa lembut, ada sentuhan buah dan bunga, serta rasa asam yang segar dan nyaman di lambung.',
    flavorProfile: 'Segar beraroma buah & bunga, rasa manis alami, tidak terlalu pahit',
    ratioMultiplier: 1.0,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    detailImageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
    botanicalTraits: {
      leafStructure: 'Daun lonjong berkilau dengan tepi daun bergelombang lembut',
      beanShape: 'Biji lonjong rapi dengan garis tengah meliuk seperti huruf S',
      chromosomes: 'Tumbuh subur di pegunungan sejuk dataran tinggi',
      caffeinePurpose: 'Kadar kafein sedang, cocok untuk dinikmati santai sehari-hari',
    },
    elevation: '1.000 - 2.200 meter (Dataran Tinggi)',
  },
  {
    id: 'robusta',
    name: 'Robusta',
    latinName: 'Coffea canephora',
    caffeinePercent: '2,2% - 2,7%',
    mgPerGram: { min: 22, max: 27, avg: 25 },
    description: 'Punya kandungan kafein 2 kali lipat lebih tinggi dari arabika. Rasanya mantap, pahit pekat khas, dan menghasilkan busa (crema) tebal.',
    flavorProfile: 'Rasa cokelat hitam, kacang panggang, rasa pahit tegas dan mantap',
    ratioMultiplier: 2.08,
    imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    detailImageUrl: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1200&q=80',
    botanicalTraits: {
      leafStructure: 'Daun lebar dan pohon sangat kuat menghadapi cuaca panas serta hama',
      beanShape: 'Biji cenderung bulat dengan garis tengah lurus',
      chromosomes: 'Mudah tumbuh di dataran rendah yang hangat',
      caffeinePurpose: 'Kafein tinggi sebagai pelindung alami pohon agar bebas dari serangga',
    },
    elevation: '200 - 800 meter (Dataran Rendah)',
  },
  {
    id: 'liberica',
    name: 'Liberika',
    latinName: 'Coffea liberica',
    caffeinePercent: '1,0% - 1,2%',
    mgPerGram: { min: 10, max: 12, avg: 11 },
    description: 'Ukuran biji paling besar dengan aroma unik menyerupai nangka matang dan kayu manis. Kadar kafeinnya justru lebih ringan dari arabika.',
    flavorProfile: 'Aroma nangka manis, sedikit wangi kayu manis, rasa unik dan eksotis',
    ratioMultiplier: 0.92,
    imageUrl: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
    detailImageUrl: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=80',
    botanicalTraits: {
      leafStructure: 'Pohon sangat tinggi seperti pohon hutan dengan daun tebal kokoh',
      beanShape: 'Ukuran biji sangat besar dan ujungnya sedikit runcing asimetris',
      chromosomes: 'Dapat tumbuh subur di tanah gambut pesisir',
      caffeinePurpose: 'Kafein ringan dengan kekayaan aroma buah tropis yang khas',
    },
    elevation: '0 - 500 meter (Lahan Gambut / Pesisir)',
  },
  {
    id: 'excelsa',
    name: 'Excelsa',
    latinName: 'Coffea excelsa / dewevrei',
    caffeinePercent: '1,0% - 1,3%',
    mgPerGram: { min: 10, max: 13, avg: 11.5 },
    description: 'Varian kopi langka bersaudara dengan liberika. Menghadirkan perpaduan rasa asam buah yang segar dengan sensasi rasa hangat yang pekat.',
    flavorProfile: 'Asam buah segar, sedikit aroma rempah, rasa kompleks dan kaya',
    ratioMultiplier: 0.95,
    imageUrl: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80',
    detailImageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80',
    botanicalTraits: {
      leafStructure: 'Pohon berdaun hijau rimbun dan tahan di berbagai kondisi lahan',
      beanShape: 'Biji berbentuk lonjong mirip tetesan air mata',
      chromosomes: 'Sering dicampur untuk memperkaya aroma kopi racikan',
      caffeinePurpose: 'Kadar kafein ringan dengan rasa asam segar yang menyegarkan',
    },
    elevation: '400 - 1.000 meter (Dataran Menengah)',
  },
];

export interface BrewMethod {
  id: string;
  name: string;
  defaultVolumeMl: number;
  defaultCaffeineMg: number;
  caffeineRange: string;
  defaultGrams: number;
  notes: string;
  category: 'espresso' | 'filter' | 'cold' | 'instant' | 'decaf';
}

export const BREW_METHODS: BrewMethod[] = [
  {
    id: 'espresso-single',
    name: 'Espresso (1 Shot)',
    defaultVolumeMl: 30,
    defaultCaffeineMg: 63,
    caffeineRange: '60 - 70 mg',
    defaultGrams: 8,
    notes: 'Kopi pekat hasil seduhan mesin bertekanan tinggi',
    category: 'espresso',
  },
  {
    id: 'espresso-double',
    name: 'Espresso (Double Shot)',
    defaultVolumeMl: 60,
    defaultCaffeineMg: 135,
    caffeineRange: '125 - 150 mg',
    defaultGrams: 16,
    notes: 'Takaran standar untuk kopi susu kekinian, latte, & cappuccino',
    category: 'espresso',
  },
  {
    id: 'manual-brew',
    name: 'Kopi Tubruk / Kopi Filter (V60)',
    defaultVolumeMl: 250,
    defaultCaffeineMg: 98,
    caffeineRange: '95 - 100 mg',
    defaultGrams: 15,
    notes: 'Seduhan air panas manual standar 1 cangkir harian',
    category: 'filter',
  },
  {
    id: 'americano',
    name: 'Americano / Long Black',
    defaultVolumeMl: 250,
    defaultCaffeineMg: 125,
    caffeineRange: '75 - 150 mg',
    defaultGrams: 16,
    notes: 'Espresso yang dicampur dengan air panas',
    category: 'espresso',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew (Kopi Seduh Dingin)',
    defaultVolumeMl: 250,
    defaultCaffeineMg: 175,
    caffeineRange: '150 - 200 mg',
    defaultGrams: 20,
    notes: 'Kopi direndam air dingin 12-24 jam sehingga kafein terekstraksi tinggi',
    category: 'cold',
  },
  {
    id: 'instant-coffee',
    name: 'Kopi Instan / Kopi Sachet',
    defaultVolumeMl: 250,
    defaultCaffeineMg: 70,
    caffeineRange: '60 - 80 mg',
    defaultGrams: 2,
    notes: 'Kopi bubuk praktis yang mudah larut dalam air',
    category: 'instant',
  },
  {
    id: 'decaf',
    name: 'Kopi Decaf (Bebas Kafein)',
    defaultVolumeMl: 250,
    defaultCaffeineMg: 3,
    caffeineRange: '2 - 5 mg',
    defaultGrams: 15,
    notes: 'Kafein sudah dibuang hingga 97%, menyisakan sedikit jejak',
    category: 'decaf',
  },
];
export interface OtherBeverage {
  id: string;
  name: string;
  portion: string;
  caffeineMg: number;
  caffeineRange: string;
  icon: string;
  imageUrl: string;
  category: string;
}

export const OTHER_BEVERAGES: OtherBeverage[] = [
  {
    id: 'black-tea',
    name: 'Teh Hitam (Black Tea)',
    portion: '250 ml (1 Cangkir)',
    caffeineMg: 55,
    caffeineRange: '40 - 70 mg',
    icon: 'tea',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    category: 'Teh Oksidasi Penuh',
  },
  {
    id: 'green-tea',
    name: 'Teh Hijau / Matcha',
    portion: '250 ml (1 Cangkir)',
    caffeineMg: 35,
    caffeineRange: '25 - 45 mg',
    icon: 'tea',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    category: 'Teh & L-Theanine',
  },
  {
    id: 'energy-drink',
    name: 'Minuman Berenergi',
    portion: '250 ml (1 Kaleng)',
    caffeineMg: 120,
    caffeineRange: '80 - 160 mg',
    icon: 'bolt',
    imageUrl: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80',
    category: 'Minuman Fungsional',
  },
  {
    id: 'cola-soda',
    name: 'Soda Berkafein (Kola)',
    portion: '350 ml (1 Kaleng)',
    caffeineMg: 35,
    caffeineRange: '30 - 40 mg',
    icon: 'bottle',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    category: 'Minuman Berkarbonasi',
  },
  {
    id: 'dark-chocolate',
    name: 'Dark Chocolate (70-85%)',
    portion: '30 gram (1 Bar Kecil)',
    caffeineMg: 20,
    caffeineRange: '15 - 28 mg',
    icon: 'cookie',
    imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80',
    category: 'Cokelat Kakao Murni',
  },
  {
    id: 'milk-chocolate',
    name: 'Cokelat Susu (Milk Choc)',
    portion: '30 gram (1 Bar)',
    caffeineMg: 6,
    caffeineRange: '3 - 9 mg',
    icon: 'cookie',
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80',
    category: 'Cokelat Susu Olahan',
  },
  {
    id: 'hot-cocoa',
    name: 'Cokelat Panas (Hot Cocoa)',
    portion: '250 ml (1 Mug)',
    caffeineMg: 10,
    caffeineRange: '5 - 15 mg',
    icon: 'cup',
    imageUrl: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
    category: 'Minuman Kakao Hangat',
  },
  {
    id: 'caffeine-pill',
    name: 'Suplemen Kafein Murni',
    portion: '1 Kapsul / Tablet',
    caffeineMg: 150,
    caffeineRange: '100 - 200 mg',
    icon: 'pill',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    category: 'Suplemen Anhidrat',
  },
];


export interface DoseEffect {
  range: string;
  minMg: number;
  maxMg: number;
  category: string;
  effect: string;
  colorLevel: 'safe' | 'active' | 'warning' | 'danger' | 'toxic';
}

export const DOSE_EFFECTS: DoseEffect[] = [
  {
    range: '0 - 50 mg',
    minMg: 0,
    maxMg: 50,
    category: 'Sangat Ringan',
    effect: 'Pengaruhnya sangat lembut. Pilihan terbaik jika Anda sensitif atau jarang minum kopi.',
    colorLevel: 'safe',
  },
  {
    range: '50 - 100 mg',
    minMg: 50,
    maxMg: 100,
    category: 'Ringan & Nyaman',
    effect: 'Membantu pikiran lebih segar dan mata melek tanpa rasa berdebar.',
    colorLevel: 'safe',
  },
  {
    range: '100 - 200 mg',
    minMg: 100,
    maxMg: 200,
    category: 'Pas (1 Cangkir Kopi Standar)',
    effect: 'Fokus kerja meningkat, semangat bertambah, dan konsentrasi terasa sangat baik.',
    colorLevel: 'active',
  },
  {
    range: '200 - 300 mg',
    minMg: 200,
    maxMg: 300,
    category: 'Kuat (Ekstra Energi)',
    effect: 'Dorongan energi tinggi. Sangat cocok sebelum olahraga atau kerja berat di pagi/siang hari.',
    colorLevel: 'active',
  },
  {
    range: '300 - 400 mg',
    minMg: 300,
    maxMg: 400,
    category: 'Tinggi (Mendekati Batas Harian)',
    effect: 'Batas wajar harian untuk orang dewasa. Bagi yang sensitif, bisa mulai merasa gelisah atau susah tidur.',
    colorLevel: 'warning',
  },
  {
    range: '400 - 600 mg',
    minMg: 400,
    maxMg: 600,
    category: 'Terlalu Banyak',
    effect: 'Melebihi batas aman harian. Dapat memicu tangan gemetar, jantung berdebar, dan perut kembung.',
    colorLevel: 'danger',
  },
  {
    range: '600 - 1000 mg',
    minMg: 600,
    maxMg: 1000,
    category: 'Berbahaya',
    effect: 'Jantung berdegup sangat kencang, gelisah parah, pusing, dan mual.',
    colorLevel: 'danger',
  },
  {
    range: '> 1000 mg',
    minMg: 1000,
    maxMg: 10000,
    category: 'Sangat Berbahaya (Dosis Racun)',
    effect: 'Dosis darurat medis yang dapat mengganggu irama jantung dan memerlukan penanganan dokter.',
    colorLevel: 'toxic',
  },
];

export interface SpecialGroup {
  group: string;
  limit: string;
  note: string;
  badge: string;
}

export const SPECIAL_GROUPS: SpecialGroup[] = [
  {
    group: 'Orang Dewasa Sehat',
    limit: 'Maksimal 400 mg / hari (± 3-4 cangkir)',
    note: 'Batas konsumsi harian yang aman menurut badan kesehatan dunia tanpa efek buruk jangka panjang.',
    badge: 'Umum',
  },
  {
    group: 'Ibu Hamil',
    limit: 'Maksimal 200 mg / hari (± 1-2 cangkir)',
    note: 'Tubuh memproses kafein lebih lambat saat hamil, dan kafein dapat mengalir ke calon bayi.',
    badge: 'Perlu Dibatasi',
  },
  {
    group: 'Ibu Menyusui',
    limit: 'Maksimal 200 - 300 mg / hari',
    note: 'Perhatikan apakah si kecil menjadi rewel atau sulit tidur setelah Anda minum kopi.',
    badge: 'Perhatikan Bayi',
  },
  {
    group: 'Remaja (12 - 18 Tahun)',
    limit: 'Maksimal 100 mg / hari (± 1 cangkir kecil)',
    note: 'Sebaiknya dibatasi agar tidak mengganggu jam tidur nyenyak yang penting untuk masa pertumbuhan.',
    badge: 'Batasi',
  },
  {
    group: 'Anak-Anak (Di bawah 12 Tahun)',
    limit: '0 mg (Hindari Kopi & Minuman Berenergi)',
    note: 'Organ hati dan tubuh anak belum siap memproses zat kafein secara optimal.',
    badge: 'Hindari',
  },
  {
    group: 'Punya Riwayat Jantung / Cemas Berlebih',
    limit: 'Konsultasikan dengan Dokter',
    note: 'Sebaiknya kurangi atau pilih kopi decaf karena tubuh lebih mudah berdebar dan gelisah.',
    badge: 'Saran Dokter',
  },
];

export interface HalfLifeSimulationStep {
  hours: number;
  label: string;
  percentage: number;
  remainingMg: (initialMg: number) => number;
}

export const HALF_LIFE_STEPS: HalfLifeSimulationStep[] = [
  { hours: 0, label: '0 Jam', percentage: 100, remainingMg: (mg) => mg },
  { hours: 5, label: '5 Jam (1x Paruh Waktu)', percentage: 50, remainingMg: (mg) => mg * 0.5 },
  { hours: 10, label: '10 Jam (2x Paruh Waktu)', percentage: 25, remainingMg: (mg) => mg * 0.25 },
  { hours: 15, label: '15 Jam (3x Paruh Waktu)', percentage: 12.5, remainingMg: (mg) => mg * 0.125 },
  { hours: 20, label: '20 Jam (4x Paruh Waktu)', percentage: 6.25, remainingMg: (mg) => mg * 0.0625 },
  { hours: 24, label: '24 Jam (Hari Berikutnya)', percentage: 4.5, remainingMg: (mg) => Math.round(mg * 0.045) },
];

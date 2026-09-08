// English display strings for coffee data (Indonesian remains the source in coffeeData.ts).
// Numeric fields (mg, ratios, images) are shared; only human-readable text is mapped here.

export const SPECIES_EN: Record<string, {
  name: string;
  description: string;
  flavorProfile: string;
  elevation: string;
  leafStructure: string;
  beanShape: string;
  chromosomes: string;
  caffeinePurpose: string;
}> = {
  arabica: {
    name: 'Arabica',
    description: 'The world’s most popular coffee with a smooth body, fruity-floral aroma, bright pleasant acidity that feels gentle on the stomach.',
    flavorProfile: 'Fresh fruity & floral aroma, natural sweetness, mild bitterness',
    elevation: '1,000 - 2,200 meters (Highlands)',
    leafStructure: 'Glossy oval leaves with softly wavy edges',
    beanShape: 'Neat oval beans with an S-curved center crease',
    chromosomes: 'Thrives in cool mountain highlands',
    caffeinePurpose: 'Moderate caffeine level, ideal for relaxed daily drinking',
  },
  robusta: {
    name: 'Robusta',
    description: 'Contains twice the caffeine of Arabica. Bold, intense bitterness with a signature thick crema layer.',
    flavorProfile: 'Dark chocolate, roasted nuts, strong decisive bitterness',
    elevation: '200 - 800 meters (Lowlands)',
    leafStructure: 'Broad leaves on tough trees resilient to heat and pests',
    beanShape: 'Rounder beans with a straight center crease',
    chromosomes: 'Grows easily in warm lowlands',
    caffeinePurpose: 'High caffeine acts as the tree’s natural insect repellent',
  },
  liberica: {
    name: 'Liberica',
    description: 'The largest beans with a unique aroma of ripe jackfruit and cinnamon. Caffeine is actually milder than Arabica.',
    flavorProfile: 'Sweet jackfruit aroma, hint of cinnamon, exotic unique taste',
    elevation: '0 - 500 meters (Peatland / Coastal)',
    leafStructure: 'Very tall forest-like trees with thick sturdy leaves',
    beanShape: 'Extra-large beans with slightly tapered asymmetric tips',
    chromosomes: 'Thrives in coastal peat soil',
    caffeinePurpose: 'Mild caffeine with rich tropical fruit aromatics',
  },
  excelsa: {
    name: 'Excelsa',
    description: 'A rare Liberica relative. Fresh fruity tartness combined with a warm, deep lingering body.',
    flavorProfile: 'Fresh fruity tartness, light spice, complex rich taste',
    elevation: '400 - 1,000 meters (Midlands)',
    leafStructure: 'Lush green trees tolerant of varied soil conditions',
    beanShape: 'Teardrop-shaped oval beans',
    chromosomes: 'Often blended to enrich aromatic coffee recipes',
    caffeinePurpose: 'Mild caffeine with refreshing fruity acidity',
  },
};

export const BREW_EN: Record<string, { name: string; notes: string }> = {
  'espresso-single': { name: 'Espresso (Single Shot)', notes: 'Concentrated coffee from high-pressure machine extraction' },
  'espresso-double': { name: 'Espresso (Double Shot)', notes: 'Standard base for modern milk coffee, latte & cappuccino' },
  'manual-brew': { name: 'Tubruk / Filter Coffee (V60)', notes: 'Standard manual hot-water brew for 1 daily cup' },
  americano: { name: 'Americano / Long Black', notes: 'Espresso diluted with hot water' },
  'cold-brew': { name: 'Cold Brew', notes: 'Coffee steeped in cold water for 12–24h, highly extracted caffeine' },
  'instant-coffee': { name: 'Instant Coffee / Sachet', notes: 'Practical powdered coffee that dissolves easily' },
  decaf: { name: 'Decaf Coffee (Caffeine-Free)', notes: 'Caffeine removed up to 97%, leaving only a trace' },
};

export const BEVERAGE_EN: Record<string, { name: string; portion: string; category: string }> = {
  'black-tea': { name: 'Black Tea', portion: '250 ml (1 Cup)', category: 'Fully Oxidized Tea' },
  'green-tea': { name: 'Green Tea / Matcha', portion: '250 ml (1 Cup)', category: 'Tea & L-Theanine' },
  'energy-drink': { name: 'Energy Drink', portion: '250 ml (1 Can)', category: 'Functional Drink' },
  'cola-soda': { name: 'Caffeinated Soda (Cola)', portion: '350 ml (1 Can)', category: 'Carbonated Drink' },
  'dark-chocolate': { name: 'Dark Chocolate (70–85%)', portion: '30 grams (1 Small Bar)', category: 'Pure Cacao Chocolate' },
  'milk-chocolate': { name: 'Milk Chocolate', portion: '30 grams (1 Bar)', category: 'Processed Milk Chocolate' },
  'hot-cocoa': { name: 'Hot Cocoa', portion: '250 ml (1 Mug)', category: 'Warm Cacao Drink' },
  'caffeine-pill': { name: 'Pure Caffeine Supplement', portion: '1 Capsule / Tablet', category: 'Anhydrous Supplement' },
};

export const DOSE_EN: Record<string, { category: string; effect: string }> = {
  '0 - 50 mg': { category: 'Very Light', effect: 'Very gentle effect. Best choice if you are sensitive or rarely drink coffee.' },
  '50 - 100 mg': { category: 'Light & Comfortable', effect: 'Helps the mind feel fresher and eyes open without jitters.' },
  '100 - 200 mg': { category: 'Just Right (1 Standard Cup)', effect: 'Work focus rises, energy lifts, and concentration feels excellent.' },
  '200 - 300 mg': { category: 'Strong (Extra Energy)', effect: 'High energy boost. Great before morning workouts or heavy work.' },
  '300 - 400 mg': { category: 'High (Near Daily Limit)', effect: 'Reasonable daily ceiling for adults. Sensitive people may feel restless or sleepless.' },
  '400 - 600 mg': { category: 'Too Much', effect: 'Exceeds the safe daily limit. May trigger shaky hands, racing heart, and bloating.' },
  '600 - 1000 mg': { category: 'Dangerous', effect: 'Very rapid heartbeat, severe restlessness, dizziness, and nausea.' },
  '> 1000 mg': { category: 'Highly Dangerous (Toxic Dose)', effect: 'Medical emergency dose that can disrupt heart rhythm and needs a doctor.' },
};

export const GROUP_EN: Record<string, { group: string; limit: string; note: string; badge: string }> = {
  'Orang Dewasa Sehat': {
    group: 'Healthy Adults',
    limit: 'Max 400 mg / day (± 3–4 cups)',
    note: 'Safe daily intake according to global health bodies with no long-term harm.',
    badge: 'General',
  },
  'Ibu Hamil': {
    group: 'Pregnant Women',
    limit: 'Max 200 mg / day (± 1–2 cups)',
    note: 'The body processes caffeine more slowly during pregnancy, and caffeine can reach the baby.',
    badge: 'Limit',
  },
  'Ibu Menyusui': {
    group: 'Breastfeeding Mothers',
    limit: 'Max 200–300 mg / day',
    note: 'Watch whether your baby becomes fussy or sleeps poorly after you drink coffee.',
    badge: 'Watch Baby',
  },
  'Remaja (12 - 18 Tahun)': {
    group: 'Teenagers (12–18 Years)',
    limit: 'Max 100 mg / day (± 1 small cup)',
    note: 'Best limited to protect deep sleep needed for growth.',
    badge: 'Limit',
  },
  'Anak-Anak (Di bawah 12 Tahun)': {
    group: 'Children (Under 12)',
    limit: '0 mg (Avoid Coffee & Energy Drinks)',
    note: 'Children’s liver and body are not ready to process caffeine optimally.',
    badge: 'Avoid',
  },
  'Punya Riwayat Jantung / Cemas Berlebih': {
    group: 'Heart History / Excess Anxiety',
    limit: 'Consult a Doctor',
    note: 'Better to reduce intake or choose decaf because the body gets jittery more easily.',
    badge: 'Medical Advice',
  },
};

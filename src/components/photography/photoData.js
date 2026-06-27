// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PHOTOS_2026 = [
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251203_052736532~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251204_010714937~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251206_010223854.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251207_065707476~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251207_073407422~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251207_113852012~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251208_085016053.NIGHT~3.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251209_013555270~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251209_014236630~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251210_080620959~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251211_223740342.NIGHT~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251212_003233563.PORTRAIT.ORIGINAL~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251212_084842007~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251212_085530222~2.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/2026/PXL_20251212_085936196~2.jpg',
];

const PHOTOS_LEGACY = [
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery01.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery02.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery03.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery03_1_.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery04.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery05.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery06.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery07.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery08.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery08_1_.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery09.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery10.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery10_1_.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery10_2_.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery10_4_.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery10_5_.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery10_6_.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery10_7_.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery10_8_.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery10_9_.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery11.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery11_1_.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery12.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery13.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery14.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery15.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery16.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery17.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery19.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery20.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery22.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery23.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery24.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery25.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery27.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery28.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery29.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery30.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery31.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery33.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery35.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery37.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery39.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery40.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery41.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery41_1_.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery42.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery43.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery44.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery45.jpg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery47.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery48.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery49.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery50.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery51.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery52.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery53.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery54.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery55.jpeg',
  'https://storage.googleapis.com/blockcontrol-2026/Photography/gallery56.jpg',
];

// 2026 first (randomized), then legacy (randomized)
export const PHOTOS = [...shuffle(PHOTOS_2026), ...shuffle(PHOTOS_LEGACY)];

import { Rug } from '@/types/rug';
import persianSilk from '@/assets/rugs/persian-silk.jpg';
import moroccanBerber from '@/assets/rugs/moroccan-berber.jpg';
import modernGeometric from '@/assets/rugs/modern-geometric.jpg';
import vintageOushak from '@/assets/rugs/vintage-oushak.jpg';
import kilimTribal from '@/assets/rugs/kilim-tribal.jpg';
import artDeco from '@/assets/rugs/art-deco.jpg';

export const sampleRugs: Rug[] = [
  {
    id: 'persian-silk-1',
    name: 'Royal Isfahan',
    collection: 'Persian Heritage',
    price: 4500,
    originalPrice: 5800,
    imageUrl: persianSilk,
    dimensions: { width: 8, height: 10, unit: 'ft' },
    material: 'Hand-knotted Silk',
    style: 'Traditional',
    colors: ['Burgundy', 'Gold', 'Navy'],
    description: 'An exquisite hand-knotted silk rug from Isfahan, featuring intricate medallion patterns.'
  },
  {
    id: 'moroccan-berber-1',
    name: 'Atlas Mountains',
    collection: 'Moroccan Artisan',
    price: 2200,
    imageUrl: moroccanBerber,
    dimensions: { width: 6, height: 9, unit: 'ft' },
    material: 'Hand-woven Wool',
    style: 'Bohemian',
    colors: ['Ivory', 'Black', 'Rust'],
    description: 'Authentic Berber rug handwoven by artisans in the Atlas Mountains.'
  },
  {
    id: 'modern-geometric-1',
    name: 'Nordic Frost',
    collection: 'Contemporary',
    price: 1800,
    imageUrl: modernGeometric,
    dimensions: { width: 8, height: 11, unit: 'ft' },
    material: 'New Zealand Wool',
    style: 'Modern',
    colors: ['Grey', 'White', 'Charcoal'],
    description: 'Minimalist geometric design perfect for modern interiors.'
  },
  {
    id: 'vintage-oushak-1',
    name: 'Anatolia Dreams',
    collection: 'Vintage Collection',
    price: 6800,
    originalPrice: 8500,
    imageUrl: vintageOushak,
    dimensions: { width: 9, height: 12, unit: 'ft' },
    material: 'Antique Wool',
    style: 'Vintage',
    colors: ['Coral', 'Sage', 'Cream'],
    description: 'Authentic vintage Oushak rug from Turkey, circa 1920.'
  },
  {
    id: 'kilim-tribal-1',
    name: 'Nomad Spirit',
    collection: 'Tribal Collection',
    price: 1400,
    imageUrl: kilimTribal,
    dimensions: { width: 5, height: 7, unit: 'ft' },
    material: 'Flatweave Wool',
    style: 'Tribal',
    colors: ['Red', 'Orange', 'Brown'],
    description: 'Vibrant kilim with traditional tribal motifs.'
  },
  {
    id: 'art-deco-1',
    name: 'Gatsby Gold',
    collection: 'Art Deco Revival',
    price: 3200,
    imageUrl: artDeco,
    dimensions: { width: 8, height: 10, unit: 'ft' },
    material: 'Silk & Wool Blend',
    style: 'Art Deco',
    colors: ['Black', 'Gold', 'Cream'],
    description: 'Luxurious Art Deco inspired rug with geometric patterns.'
  }
];

import heroLuxurySetImg from '../assets/images/hero_luxury_gold_set_1793774609569.jpg';
import royalChokerImg from '../assets/images/product_royal_choker_set_1793774609365.jpg';
import goldJhumkaImg from '../assets/images/product_gold_jhumka_earrings_1793774611595.jpg';
import heritageBanglesImg from '../assets/images/product_heritage_gold_bangles_1793774611912.jpg';
import heroSculpturalImg from '../assets/images/hero_sculptural_jewellery_1793774076327.jpg';
import solitaireRingImg from '../assets/images/product_solitaire_ring_1793774077498.jpg';
import domeRingImg from '../assets/images/product_dome_ring_1793774078190.jpg';
import pearlNecklaceImg from '../assets/images/product_pearl_necklace_1793774079733.jpg';
import herringboneChainImg from '../assets/images/product_herringbone_chain_1793774080436.jpg';
import moltenEarringsImg from '../assets/images/product_molten_earrings_1793774080043.jpg';
import hingedBangleImg from '../assets/images/product_hinged_bangle_1793774081631.jpg';
import atelierBenchImg from '../assets/images/atelier_goldsmith_bench_1793774082999.jpg';
import { Category, JewelleryProduct } from '../types/jewellery';

export const BRAND_ASSETS = {
  heroImage: heroLuxurySetImg,
  heroAlt:
    'Handcrafted 22K yellow gold royal choker set with uncut polki diamonds and emerald drops displayed on dark espresso velvet bust',
  atelierImage: atelierBenchImg,
  atelierAlt:
    'Master goldsmith workbench with brass vernier calipers, jeweller loupe, hand-carved wax ring model, and pure gold granules',
  secondaryAtelierImage: heroSculpturalImg,
};

export interface CategoryTile {
  category: Exclude<Category, Category.All>;
  subtitle: string;
  image: string;
}

export const CATEGORY_SHOWCASE: CategoryTile[] = [
  {
    category: Category.Necklaces,
    subtitle: '22K Bridal Chokers, Haslis & Pearl Pendants',
    image: royalChokerImg,
  },
  {
    category: Category.Earrings,
    subtitle: 'Temple Jhumkas, Chandbalis & Everyday Hoops',
    image: goldJhumkaImg,
  },
  {
    category: Category.Bangles,
    subtitle: 'Carved 916 Kadas & Diamond Hinged Bangles',
    image: heritageBanglesImg,
  },
  {
    category: Category.Rings,
    subtitle: 'GIA Certified Solitaires & Solid Gold Signets',
    image: solitaireRingImg,
  },
];

export const CATALOG_PRODUCTS: JewelleryProduct[] = [
  {
    id: 'rajwada-emerald-polki-choker',
    sku: 'SJ-NK-901',
    name: 'Rajwada Emerald & Polki Choker',
    category: Category.Necklaces,
    metal: '22K (916) Gold',
    netWeightGrams: 48.6,
    gemstone: 'Uncut Polki Diamonds & Zambian Emerald Drops',
    price: 485000,
    image: royalChokerImg,
    imageAlt:
      'Intricate 22K solid yellow gold filigree bridal choker set with uncut polki diamonds and pear-cut emerald drops on cream silk',
    availability: 'Ready in Showroom',
    craftNote: 'Heritage Bridal Piece',
    description:
      'Hand-crafted over 140 hours by master kundan-jadau karigars, this heirloom 22K gold collar pairs luminous syndicate uncut polki diamonds with five hand-matched pear Zambian emerald drops and seed-pearl ghungroos.',
    optionLabel: 'Back Closure Fit',
    options: ['Adjustable Zari Dori', '22K Gold Link Chain (+4.2 g)'],
    specifications: {
      netWeight: '48.60 g Net Gold',
      stoneDetail: '4.15 ct Syndicate Polki · 11.8 ct Emeralds',
      hallmark: 'BIS 916 Hallmarked + HUID',
      craftsmanship: 'Hand-carved Jadau Filigree',
    },
  },
  {
    id: 'mayuri-ruby-temple-jhumkas',
    sku: 'SJ-ER-902',
    name: 'Mayuri Ruby & Pearl Temple Jhumkas',
    category: Category.Earrings,
    metal: '22K (916) Gold',
    netWeightGrams: 21.4,
    gemstone: 'Natural Burmese Rubies & Basra-Toned Seed Pearls',
    price: 198000,
    image: goldJhumkaImg,
    imageAlt:
      'Ornate 22K yellow gold temple bell jhumka drop earrings set with cabochon rubies and delicate seed pearl fringe',
    availability: 'Ready in Showroom',
    craftNote: 'Nakshi Temple Carvings',
    description:
      'Traditional bell-silhouette jhumkas featuring deep nakshi floral relief work in solid 22K yellow gold, accented with cabochon rubies and a hand-woven fringe of natural luminous seed pearls. Includes detachable ear-chain loops.',
    optionLabel: 'Stem & Support Style',
    options: ['South Screw Post', 'Push-Back Post with Support Disc'],
    specifications: {
      netWeight: '21.40 g Net Gold (Pair)',
      stoneDetail: '1.90 ct Cabochon Rubies · Cultured Seed Pearls',
      hallmark: 'BIS 916 Hallmarked + HUID',
      craftsmanship: 'Traditional Nakshi Repoussé',
    },
  },
  {
    id: 'virasat-carved-diamond-kadas',
    sku: 'SJ-BG-903',
    name: 'Virasat Carved Diamond Gold Kadas (Pair)',
    category: Category.Bangles,
    metal: '22K (916) Gold',
    netWeightGrams: 44.2,
    gemstone: '1.40 ctw VVS-EF Natural Brilliant Diamonds',
    price: 442000,
    image: heritageBanglesImg,
    imageAlt:
      'Pair of intricately carved 22K 916 hallmarked yellow gold royal kada bangles set with brilliant diamonds on travertine and silk',
    availability: 'Ready in Showroom',
    craftNote: 'Screw-Clasp Pair',
    description:
      'Sold as a matched pair, these openwork 22K gold kadas feature scrolling heritage jaali motifs bordered by twin rows of natural VVS-EF round brilliant diamonds. Fitted with precision side screw-clasps so they open comfortably over any hand size.',
    optionLabel: 'Bangle Size (Indian Scale)',
    options: ['2-4 (57.2 mm)', '2-6 (60.3 mm)', '2-8 (63.5 mm)'],
    specifications: {
      netWeight: '44.20 g Net Gold (Pair)',
      stoneDetail: '1.40 ctw Natural VVS-EF Diamonds',
      hallmark: 'BIS 916 Hallmarked + IGI Cert',
      craftsmanship: 'Open-Jaali Hand Engraving',
    },
  },
  {
    id: 'solis-emerald-solitaire-ring',
    sku: 'SJ-RG-101',
    name: 'Solis East-West Diamond Solitaire',
    category: Category.Rings,
    metal: '18K (750) Gold',
    netWeightGrams: 4.2,
    gemstone: '0.85 ct GIA Emerald-Cut Solitaire (F / VVS1)',
    price: 215000,
    image: solitaireRingImg,
    imageAlt:
      'Minimalist east-west emerald-cut diamond solitaire ring set in brushed 18K yellow gold on pale limestone',
    availability: 'Ready in Showroom',
    craftNote: 'GIA Laser-Inscribed',
    description:
      'Set horizontally for a refined modern profile, an F-colour VVS1 emerald-cut natural diamond is secured in four sculpted talon prongs atop a satin-brushed 18K solid gold band.',
    optionLabel: 'Ring Size',
    options: ['Indian 10 (US 5.5)', 'Indian 12 (US 6)', 'Indian 14 (US 7)', 'Indian 16 (US 8)'],
    specifications: {
      netWeight: '4.20 g Net Gold',
      stoneDetail: '0.85 ct GIA Certified Solitaire (F-VVS1)',
      hallmark: 'BIS 750 Hallmarked + GIA Dossier',
      craftsmanship: 'Precision Micro-Prong Setting',
    },
  },
  {
    id: 'siren-herringbone-gold-hasli',
    sku: 'SJ-NK-209',
    name: 'Swarna Liquid Herringbone Collar',
    category: Category.Necklaces,
    metal: '22K (916) Gold',
    netWeightGrams: 16.8,
    price: 148000,
    image: herringboneChainImg,
    imageAlt:
      'Mirror-polished flat herringbone collar necklace in 22K yellow gold draped gracefully on travertine stone',
    availability: 'Ready in Showroom',
    craftNote: 'Everyday Fine Gold',
    description:
      'Closely woven flexible gold links form a supple, mirror-bright ribbon of solid 22K yellow gold that rests effortlessly along the collarbone—equally striking worn solo or layered above a long haar.',
    optionLabel: 'Collar Length',
    options: ['16 Inches (Collarbone)', '18 Inches (Classic)'],
    specifications: {
      netWeight: '16.80 g Net Gold',
      stoneDetail: 'Pure All-Gold Construction (Zero Stone Wt)',
      hallmark: 'BIS 916 Hallmarked + HUID',
      craftsmanship: 'Flexible Flat-Link Weave',
    },
  },
  {
    id: 'vera-trio-diamond-bangle',
    sku: 'SJ-BG-401',
    name: 'Aarya Three-Diamond Rose Gold Kada',
    category: Category.Bangles,
    metal: '18K Rose Gold',
    netWeightGrams: 12.8,
    gemstone: '0.36 ctw Flush-Set Natural Diamonds',
    price: 136000,
    image: hingedBangleImg,
    imageAlt:
      'Slim oval hinged bangle bracelet in 18K rose gold set with three flush bezel-mounted diamonds on limestone',
    availability: 'Ready in Showroom',
    craftNote: 'Daily Office Wear',
    description:
      'Designed to contour the wrist without rotating, this oval solid 18K rose gold bracelet highlights three bezel-framed brilliant diamonds with a concealed side push-hinge and double safety lock.',
    optionLabel: 'Wrist Fit',
    options: ['Small (2-2 / 2-4)', 'Medium (2-6)', 'Large (2-8)'],
    specifications: {
      netWeight: '12.80 g Net Gold',
      stoneDetail: '0.36 ctw IGI Certified VVS-EF Diamonds',
      hallmark: 'BIS 750 Rose Gold + HUID',
      craftsmanship: 'Seamless Oval Hinge Lock',
    },
  },
  {
    id: 'onde-sculptural-gold-ring',
    sku: 'SJ-RG-104',
    name: 'Mudra Solid 22K Gold Signet Ring',
    category: Category.Rings,
    metal: '22K (916) Gold',
    netWeightGrams: 9.4,
    price: 86500,
    image: domeRingImg,
    imageAlt:
      'High-polish sculptural 22K solid yellow gold dome signet ring resting on travertine stone',
    availability: 'Ready in Showroom',
    craftNote: 'Heavy Solid Cast',
    description:
      'A tactile, heirloom-weight solid 22K yellow gold ring with zero hollow cavities. Its gently concave signet crown catches warm golden reflections while the tapered inner comfort-band glides smoothly.',
    optionLabel: 'Ring Size',
    options: ['Indian 12 (US 6)', 'Indian 14 (US 7)', 'Indian 16 (US 8)', 'Indian 19 (US 9)'],
    specifications: {
      netWeight: '9.40 g Net Gold',
      stoneDetail: 'Pure 22K Solid Gold (No Stones)',
      hallmark: 'BIS 916 Hallmarked + HUID',
      craftsmanship: 'Hand-Buffed Solid Lost-Wax Cast',
    },
  },
  {
    id: 'nacre-baroque-pearl-pendant',
    sku: 'SJ-NK-202',
    name: 'Moti Baroque Pearl & 18K Gold Chain',
    category: Category.Necklaces,
    metal: '18K (750) Gold',
    netWeightGrams: 5.6,
    gemstone: 'Natural Lustrous Baroque Pearl',
    price: 64000,
    image: pearlNecklaceImg,
    imageAlt:
      'Luminous organic baroque pearl pendant suspended from a fine 18K yellow gold Venetian box chain',
    availability: 'Ready in Showroom',
    craftNote: 'Includes 18K Box Chain',
    description:
      'An organic, high-orient natural freshwater baroque pearl crowned with a hand-turned 18K yellow gold cap and paired with an Italian diamond-cut 18K solid gold Venetian box chain.',
    optionLabel: 'Chain Length',
    options: ['16 Inches', '18 Inches', '20 Inches'],
    specifications: {
      netWeight: '5.60 g Net 18K Gold',
      stoneDetail: '14–16 mm Natural Baroque Pearl',
      hallmark: 'BIS 750 Hallmarked + HUID',
      craftsmanship: 'Hand-Pegged Pearl Bail',
    },
  },
  {
    id: 'maris-platinum-sculpted-hoops',
    sku: 'SJ-ER-305',
    name: 'Chandni Platinum-Finish Sculpted Hoops',
    category: Category.Earrings,
    metal: 'Platinum & Silver',
    netWeightGrams: 6.4,
    price: 38500,
    image: moltenEarringsImg,
    imageAlt:
      'Pair of sculptural organic huggie hoop earrings in mirror-polished platinum and sterling silver on pale stone',
    availability: 'Crafted to Order (7 Days)',
    craftNote: 'Pt950 & 925 Alloy',
    description:
      'Lightweight undulating huggie hoops crafted in fine 925 silver bonded with pure Pt950 platinum for enduring mirror brilliance and hypoallergenic comfort. Fitted with secure click-lock hinges.',
    optionLabel: 'Hoop Diameter',
    options: ['16 mm Classic Huggie'],
    specifications: {
      netWeight: '6.40 g Metal Weight (Pair)',
      stoneDetail: 'Sculpted High-Polish Metal',
      hallmark: 'Pt950 / 925 Purity Stamp',
      craftsmanship: 'Concealed Click-Lock Hinge',
    },
  },
];

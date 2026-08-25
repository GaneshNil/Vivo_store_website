import { Brand, Category, Series, Product, Offer, StoreSettings, Review, Banner } from '../types';

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'brand-vivo',
    name: 'VIVO',
    slug: 'vivo',
    logo_url: '/assets/brands/vivo.svg',
    is_primary: true,
    description: 'Flagship ZEISS Co-engineered Imaging, OriginOS Fluid Performance & Premium Design Aesthetics',
    sort_order: 1,
  },
  {
    id: 'brand-samsung',
    name: 'Samsung',
    slug: 'samsung',
    logo_url: '/assets/brands/samsung.svg',
    is_primary: false,
    description: 'Galaxy AI, Dynamic AMOLED Displays & Pro-grade Multi-camera systems',
    sort_order: 2,
  },
  {
    id: 'brand-oppo',
    name: 'OPPO',
    slug: 'oppo',
    logo_url: '/assets/brands/oppo.svg',
    is_primary: false,
    description: 'Portrait Expert, SuperVOOC Fast Charging & Ultra-slim Aesthetics',
    sort_order: 3,
  },
  {
    id: 'brand-realme',
    name: 'Realme',
    slug: 'realme',
    logo_url: '/assets/brands/realme.svg',
    is_primary: false,
    description: 'Next-Gen Performance, Ultra-clear Periscope Zoom & Youthful Styling',
    sort_order: 4,
  },
  {
    id: 'brand-galaxy-acc',
    name: 'Galaxy Store Genuine',
    slug: 'galaxy-store-genuine',
    logo_url: '/assets/store-logo/IMG-20260822-WA0004.jpg',
    is_primary: false,
    description: 'Certified premium store accessories, tested for durability and optimal power delivery',
    sort_order: 5,
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-smartphones', name: 'Smartphones', slug: 'smartphones', type: 'phone', description: '5G Android flagships and mid-range devices', icon: 'Smartphone', sort_order: 1 },
  { id: 'cat-chargers', name: 'Chargers & Adapters', slug: 'chargers', type: 'accessory', description: 'FlashCharge, SuperVOOC & PD Fast Chargers', icon: 'Zap', sort_order: 2 },
  { id: 'cat-cables', name: 'Cables & OTG', slug: 'cables', type: 'accessory', description: 'Braided Type-C, Lightning & High-speed data cables', icon: 'Cable', sort_order: 3 },
  { id: 'cat-cases', name: 'Cases & Covers', slug: 'cases', type: 'accessory', description: 'Shockproof armor, luxury leather & slim silicone cases', icon: 'Shield', sort_order: 4 },
  { id: 'cat-tempered', name: 'Tempered Glass', slug: 'tempered-glass', type: 'accessory', description: '9H UV Curved, Anti-peep & Edge-to-edge screen protectors', icon: 'Layers', sort_order: 5 },
  { id: 'cat-tws', name: 'TWS & Earphones', slug: 'tws-earphones', type: 'accessory', description: 'ANC Wireless Earbuds & High-bass wired earphones', icon: 'Headphones', sort_order: 6 },
  { id: 'cat-powerbanks', name: 'Power Banks', slug: 'power-banks', type: 'accessory', description: '10,000mAh to 20,000mAh Fast Charging backup power', icon: 'BatteryCharging', sort_order: 7 },
  { id: 'cat-smartwatches', name: 'Smart Watches', slug: 'smart-watches', type: 'accessory', description: 'AMOLED Calling Smartwatches & Fitness trackers', icon: 'Watch', sort_order: 8 },
  { id: 'cat-speakers', name: 'Bluetooth Speakers', slug: 'speakers', type: 'accessory', description: 'Portable waterproof high-bass wireless speakers', icon: 'Speaker', sort_order: 9 },
  { id: 'cat-memory', name: 'Memory Cards & Pen Drives', slug: 'memory-cards', type: 'accessory', description: 'High-speed Class 10 MicroSD cards & Dual OTG drives', icon: 'HardDrive', sort_order: 10 },
  { id: 'cat-other-accessories', name: 'Other Accessories', slug: 'other-accessories', type: 'accessory', description: 'Car mobile holders, camera lens protectors, foldable desk stands & smart utilities', icon: 'Sparkles', sort_order: 11 }
];

export const INITIAL_SERIES: Series[] = [
  { id: 'series-vivo-x', brand_id: 'brand-vivo', name: 'X Series', slug: 'x-series', description: 'ZEISS Co-engineered Ultra Flagship Photography' },
  { id: 'series-vivo-v', brand_id: 'brand-vivo', name: 'V Series', slug: 'v-series', description: 'Studio-grade Aura Light Portrait & Slim Aesthetic' },
  { id: 'series-vivo-t', brand_id: 'brand-vivo', name: 'T Series', slug: 't-series', description: 'Turbo 5G Gaming Performance & Massive Battery' },
  { id: 'series-vivo-y', brand_id: 'brand-vivo', name: 'Y Series', slug: 'y-series', description: 'Youthful Style, Ultra-clear Sound & Reliable Endurance' },
  { id: 'series-samsung-s', brand_id: 'brand-samsung', name: 'Galaxy S Series', slug: 'galaxy-s-series', description: 'Galaxy AI Flagship Ultra with S-Pen' },
  { id: 'series-samsung-a', brand_id: 'brand-samsung', name: 'Galaxy A Series', slug: 'galaxy-a-series', description: 'Awesome Display, OIS Camera & Knox Security' },
  { id: 'series-oppo-reno', brand_id: 'brand-oppo', name: 'Reno Series', slug: 'reno-series', description: 'AI Portrait Camera & Curved OLED' },
  { id: 'series-realme-number', brand_id: 'brand-realme', name: 'Pro Series', slug: 'pro-series', description: 'Flagship Periscope Camera & Luxury Watch Design' }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  store_name: 'GALAXY MOBILE GALLERY',
  tagline: 'Your Trusted Destination for VIVO Flagships, Multi-Brand Mobiles & Genuine Accessories',
  primary_brand: 'VIVO',
  address: 'Main Road, Bazar Peth, Begampur',
  landmark: 'Near Saraf Line & Market Center',
  taluka: 'Taluka Mohol',
  district: 'District Solapur',
  state: 'Maharashtra',
  pincode: '413253',
  phone: '9067228008',
  whatsapp: '9067228008',
  email: 'galaxymobile09@gmail.com',
  hours: '10:00 AM – 09:00 PM (All 7 Days Open)',
  payment_methods: {
    bajaj_finance_emi: true,
    card_payments: true,
    home_credit: true,
    upi: true,
    cash: true
  },
  hero_flagship_product_id: 'prod-vivo-x100-pro',
  google_maps_url: 'https://maps.google.com/?q=Begampur,Mohol,Solapur,Maharashtra,413253'
};

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'offer-bajaj-zero',
    title: 'Bajaj Finance EMI Available Scheme',
    subtitle: 'Easy Monthly Installments & Instant Approval',
    badge_text: 'STORE EXCLUSIVE',
    discount_text: 'Bajaj Finance EMI Available',
    banner_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    start_date: '2026-08-01T00:00:00Z',
    end_date: '2026-12-31T23:59:59Z',
    is_active: true,
    terms: 'Applicable in-store with instant document approval via Aadhaar / PAN card.',
    sort_order: 1
  },
  {
    id: 'offer-vivo-festive',
    title: 'VIVO V40 & X100 Pro Launch Bonanza',
    subtitle: 'Get a Free TWS Earbuds + Screen Protection plan with in-store purchase',
    badge_text: 'VIVO FLAGSHIP SPECIAL',
    discount_text: 'Free Gifts Worth ₹3,999',
    banner_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    start_date: '2026-08-15T00:00:00Z',
    end_date: '2026-09-30T23:59:59Z',
    is_active: true,
    terms: 'Valid on physical purchases at Galaxy Mobile Gallery Begampur showroom.',
    sort_order: 2
  },
  {
    id: 'offer-accessories-combo',
    title: 'Complete Mobile Care Protection Pack',
    subtitle: 'Tempered Glass + Shockproof Case + Fast Cable at Special Bundle Price',
    badge_text: 'SUPER COMBO',
    discount_text: 'Save Flat 40% on Combos',
    banner_url: '/assets/accessories/IMG-20260822-WA0006.jpg',
    start_date: '2026-08-01T00:00:00Z',
    end_date: '2026-12-31T23:59:59Z',
    is_active: true,
    terms: 'Available for any smartphone model purchased or brought in store.',
    sort_order: 3
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-vivo-x100',
    title: 'VIVO X100 Pro 5G',
    subtitle: 'Co-engineered with ZEISS · 1-Inch Sensor · Dimensity 9300 Flagship',
    badge: 'FLAGSHIP PHOTOGRAPHY',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1600&q=80',
    cta_text: 'Explore Vivo Lineup',
    cta_link: '/mobiles?brand=vivo',
    is_active: true,
    sort_order: 1
  },
  {
    id: 'banner-vivo-v40',
    title: 'VIVO V40 Pro 5G',
    subtitle: 'Studio-Quality Aura Light · Ultra-Slim 3D Curved 120Hz Screen · 5500mAh',
    badge: 'PORTRAIT MASTER',
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80',
    cta_text: 'Check In-Store Stock',
    cta_link: '/product/vivo-v40-pro-5g',
    is_active: true,
    sort_order: 2
  },
  {
    id: 'banner-genuine-acc',
    title: '100% Genuine Store Accessories',
    subtitle: 'Over 500+ Premium Cases, Chargers, Fast Cables & Audio Devices in Stock',
    badge: 'IN-STORE SHOWROOM',
    image_url: '/assets/accessories/IMG-20260822-WA0003.jpg',
    cta_text: 'Browse Accessories',
    cta_link: '/accessories',
    is_active: true,
    sort_order: 3
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. VIVO X100 Pro 5G
  {
    id: 'prod-vivo-x100-pro',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-x',
    name: 'VIVO X100 Pro 5G',
    slug: 'vivo-x100-pro-5g',
    tagline: 'Photography Redefined with ZEISS APO Floating Telephoto',
    description: 'The pinnacle of smartphone optics featuring a 50MP 1-inch main camera, ZEISS Multifocal portrait focal lengths, MediaTek Dimensity 9300 4nm processor, 100W FlashCharge, and IP68 water resistance.',
    is_phone: true,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '50MP 1-inch Sony IMX989 ZEISS Primary Camera',
      'ZEISS APO Floating Telephoto with 100x Digital Zoom',
      'MediaTek Dimensity 9300 4nm Flagship Chipset',
      '100W Dual-Cell FlashCharge + 50W Wireless FlashCharge',
      '5400mAh High-Density BlueVolt Battery',
      'OriginOS 4 / Funtouch OS 14 with 3 Major OS Upgrades'
    ],
    specifications: {
      display: {
        size: '6.78 inches (17.22 cm)',
        resolution: '2800 x 1260 pixels (1.5K LTPO AMOLED)',
        type: 'Curved AMOLED, 1.07B colors, HDR10+',
        refresh_rate: '120Hz Adaptive LTPO',
        brightness: '3000 nits Peak Brightness',
        protection: 'Corning Gorilla Glass Victus'
      },
      processor: {
        chipset: 'MediaTek Dimensity 9300 (4nm)',
        cpu: 'Octa-core (1x3.25 GHz Cortex-X4 & 3x2.85 GHz Cortex-X4 & 4x2.0 GHz Cortex-A720)',
        gpu: 'Immortalis-G720 MC12',
        process_node: 'TSMC 3rd Gen 4nm'
      },
      camera: {
        rear_main: '50 MP, f/1.75, 23mm (wide), 1.0"-type, OIS',
        rear_secondary: '50 MP, f/2.5, 100mm (periscope telephoto), 4.3x optical zoom, OIS + 50 MP, f/2.0, 15mm (ultrawide)',
        rear_features: 'ZEISS T* lens coating, Laser AF, V3 Imaging Chip, 8K Video Recording',
        front_camera: '32 MP, f/2.0 (wide), 4K Video',
        video_recording: '8K @ 30fps, 4K @ 60fps, 1080p @ 120fps with Cinematic Portrait Video',
        zeiss_optics: true
      },
      battery_charging: {
        capacity: '5400 mAh BlueVolt Dual-cell',
        charging_speed: '100W Wired FlashCharge (50% in 12 mins)',
        wireless_charging: '50W Wireless FlashCharge',
        charger_in_box: 'Yes, 120W FlashCharge Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM (SA/NSA, all Indian 5G bands)',
        five_g_bands: 'n1, n3, n5, n8, n28, n38, n40, n41, n77, n78',
        wifi: 'Wi-Fi 7 (802.11be), dual-band',
        bluetooth: 'Bluetooth 5.4, aptX HD, LDAC',
        nfc: true,
        usb_type: 'Type-C 3.2 Gen1, OTG'
      },
      operating_system: {
        os_name: 'Funtouch OS 14 (Global) / OriginOS Base',
        os_version: 'Android 14 (Upgradable to Android 17)',
        ui: 'Origin Fluid Engine Micro-interactions'
      },
      build_dimensions: {
        dimensions: '164.05 x 75.28 x 8.91 mm',
        weight: '225 grams',
        ip_rating: 'IP68 Dust and Water Resistant (1.5m for 30 mins)',
        back_material: 'Fluorite AG Glass / Eco Leather'
      },
      in_the_box: [
        'VIVO X100 Pro Handset',
        '120W FlashCharge Power Adapter',
        'Type-C to Type-C Cable',
        'Premium Protective Case',
        'SIM Ejector Tool',
        'Quick Start Guide & Warranty Card'
      ]
    },
    sort_order: 1,
    images: [
      { id: 'img-x100-1', product_id: 'prod-vivo-x100-pro', image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO X100 Pro Asteroid Black Front & Back View', view_type: 'front', is_primary: true, sort_order: 1 },
      { id: 'img-x100-2', product_id: 'prod-vivo-x100-pro', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO X100 Pro ZEISS Camera Module Zoom', view_type: 'camera', is_primary: false, sort_order: 2 },
      { id: 'img-x100-3', product_id: 'prod-vivo-x100-pro', image_url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO X100 Pro Sunset Orange Edition', view_type: 'lifestyle', is_primary: false, sort_order: 3 }
    ],
    variants: [
      {
        id: 'var-x100-16-512-blk',
        product_id: 'prod-vivo-x100-pro',
        sku: 'VIVO-X100P-16-512-BLK',
        ram: '16GB',
        storage: '512GB',
        color: 'Asteroid Black',
        color_code: '#1C1C1E',
        mrp: 99999,
        selling_price: 89999,
        discount_percent: 10,
        current_stock: 4,
        low_stock_threshold: 2,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-x100-16-512-ora',
        product_id: 'prod-vivo-x100-pro',
        sku: 'VIVO-X100P-16-512-ORA',
        ram: '16GB',
        storage: '512GB',
        color: 'Sunset Orange Leather',
        color_code: '#E65C00',
        mrp: 99999,
        selling_price: 89999,
        discount_percent: 10,
        current_stock: 1,
        low_stock_threshold: 2,
        incoming_stock: 3,
        expected_arrival_date: '2026-08-28',
        manual_status: null,
        computed_status: 'LOW_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 2. VIVO V40 Pro 5G
  {
    id: 'prod-vivo-v40-pro',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-v',
    name: 'VIVO V40 Pro 5G',
    slug: 'vivo-v40-pro-5g',
    tagline: 'ZEISS All Main Camera Portrait with Studio Aura Light',
    description: 'Ultra-slim 3D curved masterpiece with triple 50MP ZEISS cameras, 50MP group selfie camera, MediaTek Dimensity 9200+ flagship power, IP68 water protection, and 5500mAh massive battery in a 7.58mm body.',
    is_phone: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '50MP Sony IMX921 ZEISS Main with OIS + 50MP ZEISS Telephoto',
      '50MP Ultra-Wide Angle AF Front Camera',
      'Upgraded Smart Studio Aura Light with AI Temperature',
      'Ultra Slim 7.58mm 3D Curved 1.5K 120Hz AMOLED',
      '5500mAh BlueVolt Battery + 80W FlashCharge',
      'IP68 & IP69 Extreme Dust and Water Resistance'
    ],
    specifications: {
      display: {
        size: '6.78 inches (17.22 cm)',
        resolution: '2800 x 1260 pixels (1.5K AMOLED)',
        type: '3D Curved AMOLED, 120Hz, 4500 nits Peak',
        refresh_rate: '120Hz',
        brightness: '4500 nits Local Peak',
        protection: 'Schott Xensation α Glass'
      },
      processor: {
        chipset: 'MediaTek Dimensity 9200+ (4nm)',
        cpu: 'Octa-core 3.35 GHz High-Performance',
        gpu: 'Immortalis-G715 MC11',
        process_node: '4nm Flagship'
      },
      camera: {
        rear_main: '50 MP Sony IMX921, f/1.88, OIS',
        rear_secondary: '50 MP Sony IMX816 Telephoto (2x Optical Zoom, 50x Digital) + 50 MP Ultra-Wide',
        rear_features: 'ZEISS Multifocal Portrait (24mm, 35mm, 50mm, 85mm, 100mm), Studio Aura Light',
        front_camera: '50 MP ZEISS Group Selfie with 92° Wide Angle',
        video_recording: '4K @ 60fps Front & Rear',
        zeiss_optics: true
      },
      battery_charging: {
        capacity: '5500 mAh BlueVolt',
        charging_speed: '80W Wired FlashCharge',
        wireless_charging: 'No',
        charger_in_box: 'Yes, 80W FlashCharge Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM (Full Indian 5G band support)',
        five_g_bands: 'n1, n3, n5, n8, n28, n40, n77, n78',
        wifi: 'Wi-Fi 7 Ready, dual-band',
        bluetooth: 'Bluetooth 5.3',
        nfc: true,
        usb_type: 'Type-C 2.0, OTG'
      },
      operating_system: {
        os_name: 'Funtouch OS 14 based on Android 14',
        os_version: 'Android 14 (3 OS upgrades promised)',
        ui: 'Origin-inspired responsive animations'
      },
      build_dimensions: {
        dimensions: '164.36 x 75.1 x 7.58 mm',
        weight: '192 grams',
        ip_rating: 'IP68 & IP69 Water & High-Pressure Jet Resistant',
        back_material: 'AG Glass with Velvet Satin Finish'
      },
      in_the_box: [
        'VIVO V40 Pro 5G',
        '80W FlashCharge Power Adapter',
        'USB Type-C Cable',
        'Transparent Case',
        'SIM Eject Tool',
        'Documentation'
      ]
    },
    sort_order: 2,
    images: [
      { id: 'img-v40-1', product_id: 'prod-vivo-v40-pro', image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO V40 Pro 5G Ganges Blue Front & Back View', view_type: 'front', is_primary: true, sort_order: 1 },
      { id: 'img-v40-2', product_id: 'prod-vivo-v40-pro', image_url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO V40 Pro Aura Light Ring Glow View', view_type: 'camera', is_primary: false, sort_order: 2 }
    ],
    variants: [
      {
        id: 'var-v40-8-256-blu',
        product_id: 'prod-vivo-v40-pro',
        sku: 'VIVO-V40P-8-256-BLU',
        ram: '8GB',
        storage: '256GB',
        color: 'Ganges Blue',
        color_code: '#2563EB',
        mrp: 54999,
        selling_price: 49999,
        discount_percent: 9.09,
        current_stock: 6,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-v40-12-512-blk',
        product_id: 'prod-vivo-v40-pro',
        sku: 'VIVO-V40P-12-512-BLK',
        ram: '12GB',
        storage: '512GB',
        color: 'Titanium Grey',
        color_code: '#4B5563',
        mrp: 60999,
        selling_price: 55999,
        discount_percent: 8.20,
        current_stock: 3,
        low_stock_threshold: 2,
        incoming_stock: 5,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 3. VIVO T3 5G
  {
    id: 'prod-vivo-t3-5g',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-t',
    name: 'VIVO T3 5G',
    slug: 'vivo-t3-5g',
    tagline: 'Turbo-Charged Speed with Dimensity 7200 & Sony OIS Camera',
    description: 'Fastest 5G smartphone in its segment powered by MediaTek Dimensity 7200, 50MP Sony IMX882 OIS camera, 120Hz Ultra Vision AMOLED display, Dual Stereo Speakers with 300% volume boost.',
    is_phone: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Mobile and 6 Months for Accessories',
    highlights: [
      'MediaTek Dimensity 7200 4nm Processor (734K+ AnTuTu)',
      '50MP Sony IMX882 OIS Super Night Camera',
      '120Hz Ultra Vision AMOLED with 1800 nits Peak Brightness',
      '44W FlashCharge with 5000mAh Battery',
      'Dual Stereo Speakers with 300% Audio Booster'
    ],
    specifications: {
      display: {
        size: '6.67 inches (16.94 cm)',
        resolution: '2400 x 1080 pixels (FHD+ AMOLED)',
        type: 'Flat AMOLED, 120Hz, In-Display Fingerprint',
        refresh_rate: '120Hz',
        brightness: '1800 nits Local Peak',
        protection: 'DT-Star2 Plus'
      },
      processor: {
        chipset: 'MediaTek Dimensity 7200 (4nm)',
        cpu: 'Octa-core up to 2.8 GHz',
        gpu: 'Mali-G610 MC4'
      },
      camera: {
        rear_main: '50 MP Sony IMX882, f/1.79, OIS + 2 MP Bokeh',
        rear_features: 'Super Night Mode, 4K Video, 2x In-Sensor Portrait Zoom',
        front_camera: '16 MP, f/2.0 Wide Selfie',
        video_recording: '4K @ 30fps, 1080p @ 60fps'
      },
      battery_charging: {
        capacity: '5000 mAh',
        charging_speed: '44W FlashCharge (50% in 28 mins)',
        charger_in_box: 'Yes, 44W Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM Dual Active',
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.3',
        nfc: false,
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'Funtouch OS 14 based on Android 14',
        os_version: 'Android 14'
      },
      build_dimensions: {
        dimensions: '163.17 x 75.81 x 7.83 mm',
        weight: '185.5 grams',
        ip_rating: 'IP54 Dust & Splash Resistant'
      },
      in_the_box: [
        'VIVO T3 5G Device',
        '44W FlashCharge Adapter',
        'Type-C Cable',
        'Protective Case',
        'SIM Pin & User Guide'
      ]
    },
    sort_order: 3,
    images: [
      { id: 'img-t3-1', product_id: 'prod-vivo-t3-5g', image_url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO T3 5G Cosmic Blue', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-t3-8-128-blu',
        product_id: 'prod-vivo-t3-5g',
        sku: 'VIVO-T3-8-128-BLU',
        ram: '8GB',
        storage: '128GB',
        color: 'Cosmic Blue',
        color_code: '#1E40AF',
        mrp: 22999,
        selling_price: 19999,
        discount_percent: 13.04,
        current_stock: 8,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-t3-8-256-crys',
        product_id: 'prod-vivo-t3-5g',
        sku: 'VIVO-T3-8-256-CRYS',
        ram: '8GB',
        storage: '256GB',
        color: 'Crystal Flake',
        color_code: '#93C5FD',
        mrp: 24999,
        selling_price: 21999,
        discount_percent: 12.00,
        current_stock: 5,
        low_stock_threshold: 2,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 4. VIVO Y200e 5G
  {
    id: 'prod-vivo-y200e-5g',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-y',
    name: 'VIVO Y200e 5G',
    slug: 'vivo-y200e-5g',
    tagline: 'EcoFiber Leather Elegance with 120Hz Ultra Vision Display',
    description: 'India’s first EcoFiber leather finish with anti-stain coating, 50MP ultra-clear main camera, Snapdragon 4 Gen 2 5G processor, and 44W FlashCharge.',
    is_phone: true,
    is_featured: false,
    is_new_arrival: false,
    is_best_seller: false,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone',
    highlights: [
      'EcoFiber Leather Back with Anti-Stain Coating',
      'Snapdragon 4 Gen 2 4nm 5G Processor',
      '120Hz AMOLED Screen with In-Display Fingerprint',
      '5000mAh Battery with 44W FlashCharge'
    ],
    specifications: {
      display: {
        size: '6.67 inches (16.94 cm)',
        resolution: '2400 x 1080 pixels (FHD+ AMOLED)',
        type: 'Flat AMOLED, 120Hz',
        refresh_rate: '120Hz'
      },
      processor: {
        chipset: 'Qualcomm Snapdragon 4 Gen 2 (4nm)',
        cpu: 'Octa-core 2.2 GHz'
      },
      camera: {
        rear_main: '50 MP f/1.8 + 2 MP Bokeh',
        front_camera: '16 MP'
      },
      battery_charging: {
        capacity: '5000 mAh',
        charging_speed: '44W FlashCharge'
      },
      connectivity: {
        network: '5G Dual SIM',
        wifi: 'Dual-band Wi-Fi',
        bluetooth: 'Bluetooth 5.0'
      },
      operating_system: {
        os_name: 'Funtouch OS 14',
        os_version: 'Android 14'
      }
    },
    sort_order: 4,
    images: [
      { id: 'img-y200e-1', product_id: 'prod-vivo-y200e-5g', image_url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO Y200e 5G Saffron Delight', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-y200e-6-128-ora',
        product_id: 'prod-vivo-y200e-5g',
        sku: 'VIVO-Y200E-6-128-ORA',
        ram: '6GB',
        storage: '128GB',
        color: 'Saffron Delight Leather',
        color_code: '#F97316',
        mrp: 23999,
        selling_price: 18999,
        discount_percent: 20.83,
        current_stock: 0,
        low_stock_threshold: 2,
        incoming_stock: 10,
        expected_arrival_date: '2026-08-30',
        manual_status: null,
        computed_status: 'COMING_SOON',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-y200e-8-128-blk',
        product_id: 'prod-vivo-y200e-5g',
        sku: 'VIVO-Y200E-8-128-BLK',
        ram: '8GB',
        storage: '128GB',
        color: 'Black Diamond',
        color_code: '#111827',
        mrp: 25999,
        selling_price: 20499,
        discount_percent: 21.15,
        current_stock: 4,
        low_stock_threshold: 2,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 5. Samsung Galaxy S24 Ultra 5G
  {
    id: 'prod-samsung-s24-ultra',
    brand_id: 'brand-samsung',
    category_id: 'cat-smartphones',
    series_id: 'series-samsung-s',
    name: 'Samsung Galaxy S24 Ultra 5G',
    slug: 'samsung-galaxy-s24-ultra-5g',
    tagline: 'Galaxy AI is Here · Titanium Armor with 200MP Quad Tele',
    description: 'Equipped with Circle to Search with Google, Live Call Translate, Note Assist, Titanium Frame, and Qualcomm Snapdragon 8 Gen 3 for Galaxy.',
    is_phone: true,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Device and 6 Months for S-Pen',
    highlights: [
      'Built-in Galaxy AI Suite with Live Translate & Photo Assist',
      'Titanium Frame with Corning Gorilla Armor Anti-Reflective Glass',
      '200MP Ultra-Clear Quad Tele System with 5x/10x/100x Space Zoom',
      'Built-in S-Pen with Air Actions',
      'Snapdragon 8 Gen 3 for Galaxy 4nm Chipset'
    ],
    specifications: {
      display: {
        size: '6.8 inches Dynamic AMOLED 2X',
        resolution: '3120 x 1440 pixels (QHD+)',
        type: 'Flat Dynamic AMOLED 2X, 120Hz LTPO',
        brightness: '2600 nits Peak Brightness',
        protection: 'Corning Gorilla Armor'
      },
      processor: {
        chipset: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
        cpu: 'Octa-core 3.39 GHz'
      },
      camera: {
        rear_main: '200 MP, f/1.7, OIS + 50 MP (5x Telephoto OIS) + 10 MP (3x Telephoto OIS) + 12 MP (Ultra-Wide)',
        front_camera: '12 MP Dual Pixel AF'
      },
      battery_charging: {
        capacity: '5000 mAh',
        charging_speed: '45W Super Fast Charging 2.0 (Adapter Sold Separately)'
      },
      build_dimensions: {
        dimensions: '162.3 x 79.0 x 8.6 mm',
        weight: '232 grams',
        ip_rating: 'IP68 Water and Dust Resistant'
      }
    },
    sort_order: 5,
    images: [
      { id: 'img-s24u-1', product_id: 'prod-samsung-s24-ultra', image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80', alt_text: 'Samsung Galaxy S24 Ultra Titanium Gray', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-s24u-12-256-gry',
        product_id: 'prod-samsung-s24-ultra',
        sku: 'SAM-S24U-12-256-GRY',
        ram: '12GB',
        storage: '256GB',
        color: 'Titanium Gray',
        color_code: '#6B7280',
        mrp: 134999,
        selling_price: 129999,
        discount_percent: 3.70,
        current_stock: 2,
        low_stock_threshold: 2,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'LOW_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-s24u-12-512-blk',
        product_id: 'prod-samsung-s24-ultra',
        sku: 'SAM-S24U-12-512-BLK',
        ram: '12GB',
        storage: '512GB',
        color: 'Titanium Black',
        color_code: '#18181B',
        mrp: 144999,
        selling_price: 139999,
        discount_percent: 3.45,
        current_stock: 3,
        low_stock_threshold: 1,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 6. Genuine In-Store Accessories
  {
    id: 'prod-acc-vivo-flash-charger',
    brand_id: 'brand-vivo',
    category_id: 'cat-chargers',
    series_id: null,
    name: 'VIVO 80W FlashCharge Dual-Engine Power Adapter Kit',
    slug: 'vivo-80w-flashcharge-power-adapter',
    tagline: 'Original Super-Fast Power Adapter with Type-C 6A Cable',
    description: 'Certified 80W VIVO FlashCharge wall adapter designed for VIVO X Series, V Series, and T Series smartphones. Features multi-level safety protections and smart temperature monitoring.',
    is_phone: false,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    warranty_info: '6 Months Replacement Warranty at Galaxy Mobile Gallery',
    highlights: [
      '80W Maximum FlashCharge Output for VIVO & iQOO',
      'Includes 6A Heavy-Duty High-Speed Type-C Cable',
      'Over-voltage, Over-temperature & Short-circuit Shield',
      'Compact travel-ready ergonomic pin design'
    ],
    specifications: {
      connectivity: {
        usb_type: 'USB Type-A output with 6A Type-C Cable'
      },
      battery_charging: {
        charging_speed: '80W (11V/7.3A Max), backward compatible with 66W, 44W, 33W, 18W'
      }
    },
    compatible_models: ['VIVO X100 Pro', 'VIVO V40 Pro', 'VIVO V30 Pro', 'VIVO T3 5G', 'VIVO Y200e 5G', 'All Type-C Mobiles'],
    sort_order: 10,
    images: [
      { id: 'img-acc-chg-1', product_id: 'prod-acc-vivo-flash-charger', image_url: '/assets/accessories/IMG-20260822-WA0007.jpg', alt_text: 'VIVO 80W Flash Charger Kit in Box', view_type: 'front', is_primary: true, sort_order: 1 },
      { id: 'img-acc-chg-2', product_id: 'prod-acc-vivo-flash-charger', image_url: '/assets/accessories/IMG-20260822-WA0010.jpg', alt_text: 'Charger pins and safety markings', view_type: 'box', is_primary: false, sort_order: 2 }
    ],
    variants: [
      {
        id: 'var-acc-chg-white',
        product_id: 'prod-acc-vivo-flash-charger',
        sku: 'ACC-VIVO-80W-WHT',
        color: 'Glossy White',
        color_code: '#FFFFFF',
        mrp: 2999,
        selling_price: 1999,
        discount_percent: 33.34,
        current_stock: 15,
        low_stock_threshold: 4,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      }
    ]
  },

  {
    id: 'prod-acc-uv-curved-glass',
    brand_id: 'brand-galaxy-acc',
    category_id: 'cat-tempered',
    series_id: null,
    name: '9H UV Liquid Full-Curved Tempered Glass Protection',
    slug: '9h-uv-liquid-curved-tempered-glass',
    tagline: 'Bubble-Free UV Curing for Curved Screen Phones with In-Store Free Installation',
    description: 'Edge-to-edge optical liquid tempered glass specifically engineered for 3D curved smartphones. We provide professional zero-bubble UV machine installation at our Begampur store.',
    is_phone: false,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    warranty_info: 'Store Installation Guarantee with Free Replacement on Application Bubbles',
    highlights: [
      '9H Hardness Optical Tempered Glass',
      'Case-Friendly Curved Edge Profile',
      'Smooth Oleophobic Anti-Fingerprint Coating',
      'Free in-store UV glue curing installation by expert technician'
    ],
    specifications: {
      build_dimensions: {
        ip_rating: '9H Scratch Resistance with Oleophobic Barrier'
      }
    },
    compatible_models: ['VIVO X100 Pro', 'VIVO V40 Pro', 'VIVO V30', 'OPPO Reno 12', 'Samsung S24 Ultra'],
    sort_order: 11,
    images: [
      { id: 'img-acc-uv-1', product_id: 'prod-acc-uv-curved-glass', image_url: '/assets/accessories/IMG-20260822-WA0006.jpg', alt_text: 'UV Tempered Glass Display Packs', view_type: 'front', is_primary: true, sort_order: 1 },
      { id: 'img-acc-uv-2', product_id: 'prod-acc-uv-curved-glass', image_url: '/assets/accessories/IMG-20260822-WA0014.jpg', alt_text: 'Curved Glass Installation Setup', view_type: 'lifestyle', is_primary: false, sort_order: 2 }
    ],
    variants: [
      {
        id: 'var-acc-uv-curved-clear',
        product_id: 'prod-acc-uv-curved-glass',
        sku: 'ACC-UV-CURVED-CLR',
        color: 'Ultra-Clear High Transparency',
        color_code: '#E2E8F0',
        mrp: 799,
        selling_price: 399,
        discount_percent: 50.06,
        current_stock: 45,
        low_stock_threshold: 10,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      }
    ]
  },

  {
    id: 'prod-acc-tws-earbuds',
    brand_id: 'brand-vivo',
    category_id: 'cat-tws',
    series_id: null,
    name: 'VIVO TWS 3e Active Noise Cancellation Earbuds',
    slug: 'vivo-tws-3e-anc-earbuds',
    tagline: 'Intelligent ANC · DeepX 3.0 Stereo Sound · 42 Hours Total Playtime',
    description: 'Lightweight ergonomic wireless earbuds featuring intelligent active noise cancellation, low latency gaming mode, dual device connection, and immersive DeepX acoustic tuning.',
    is_phone: false,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Replacement Warranty',
    highlights: [
      'Intelligent Active Noise Cancellation (ANC)',
      '11mm High-Resolution Dynamic Audio Driver',
      '42 Hours Super Long Battery Life with Charging Case',
      'Dual-Mic AI Call Noise Reduction',
      'IP54 Dust and Water Resistance for Workouts'
    ],
    specifications: {
      battery_charging: {
        capacity: '42 Hours with Case (10 mins charge = 3 hours playback)'
      },
      connectivity: {
        bluetooth: 'Bluetooth 5.3 with Dual Device Switching'
      }
    },
    compatible_models: ['All Android Mobiles', 'iPhones', 'Laptops & Tablets'],
    sort_order: 12,
    images: [
      { id: 'img-acc-tws-1', product_id: 'prod-acc-tws-earbuds', image_url: '/assets/accessories/IMG-20260822-WA0016.jpg', alt_text: 'VIVO TWS 3e Case and Earbuds', view_type: 'front', is_primary: true, sort_order: 1 },
      { id: 'img-acc-tws-2', product_id: 'prod-acc-tws-earbuds', image_url: '/assets/accessories/IMG-20260822-WA0018.jpg', alt_text: 'TWS in-ear close up', view_type: 'lifestyle', is_primary: false, sort_order: 2 }
    ],
    variants: [
      {
        id: 'var-tws-3e-wht',
        product_id: 'prod-acc-tws-earbuds',
        sku: 'ACC-VIVO-TWS3E-WHT',
        color: 'Bright White',
        color_code: '#F8FAFC',
        mrp: 2999,
        selling_price: 1899,
        discount_percent: 36.68,
        current_stock: 12,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-tws-3e-blu',
        product_id: 'prod-acc-tws-earbuds',
        sku: 'ACC-VIVO-TWS3E-BLU',
        color: 'Midnight Navy Blue',
        color_code: '#0F172A',
        mrp: 2999,
        selling_price: 1899,
        discount_percent: 36.68,
        current_stock: 8,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  {
    id: 'prod-acc-power-bank',
    brand_id: 'brand-galaxy-acc',
    category_id: 'cat-powerbanks',
    series_id: null,
    name: '20,000mAh 22.5W Two-Way Fast Charging Power Bank',
    slug: '20000mah-fast-charging-power-bank',
    tagline: 'High-Capacity Multi-Port Backup with Digital LED Percentage Display',
    description: 'Heavy duty 20,000mAh backup power bank equipped with 22.5W Super Fast output, dual Type-A ports, Type-C bidirectional PD port, and intelligent thermal management.',
    is_phone: false,
    is_featured: false,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Store Warranty with Instant Replacement',
    highlights: [
      '20,000mAh High-Density Polymer Battery',
      '22.5W Super Fast Output (Charges 0-50% in 30 mins)',
      'Simultaneous 3-Device Charging',
      'Digital LED Battery Percentage Indicator'
    ],
    specifications: {
      battery_charging: {
        capacity: '20,000 mAh High-Density Li-Polymer'
      }
    },
    compatible_models: ['All Smartphones, Tablets, Earbuds & Smartwatches'],
    sort_order: 13,
    images: [
      { id: 'img-acc-pb-1', product_id: 'prod-acc-power-bank', image_url: '/assets/accessories/IMG-20260822-WA0019.jpg', alt_text: '20,000mAh Fast Power Bank', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-acc-pb-blk',
        product_id: 'prod-acc-power-bank',
        sku: 'ACC-PB-20K-BLK',
        color: 'Matte Carbon Black',
        color_code: '#18181B',
        mrp: 2499,
        selling_price: 1399,
        discount_percent: 44.02,
        current_stock: 14,
        low_stock_threshold: 4,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      }
    ]
  },
  {
    id: 'prod-acc-car-holder',
    brand_id: 'brand-boat',
    category_id: 'cat-other-accessories',
    name: '360° Magnetic Dashboard Car Mobile Mount',
    slug: '360-magnetic-dashboard-car-mobile-mount',
    tagline: 'Ultra-Strong Neodymium Magnets & One-Hand Operation',
    description: 'Universal 360-degree rotating heavy-duty car dashboard & AC vent mobile mount holder. Features powerful neodymium magnets that securely hold any 5G smartphone on bumpy roads.',
    is_phone: false,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    warranty_info: '6 Months Replacement Warranty',
    highlights: [
      '360° Ball Joint Multi-Angle Rotation',
      'Strong 6x N52 Neodymium Magnetic Grip',
      'Washable Super-Sticky Gel Suction Base',
      'Compatible with All Smartphones & GPS Devices'
    ],
    specifications: {
      in_the_box: ['Magnetic Car Mount', '2x Metal Plates', 'User Guide']
    },
    compatible_models: ['All Smartphones & GPS Navigators'],
    sort_order: 14,
    images: [
      { id: 'img-acc-car-1', product_id: 'prod-acc-car-holder', image_url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80', alt_text: '360 Magnetic Car Mobile Mount', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-acc-car-blk',
        product_id: 'prod-acc-car-holder',
        sku: 'ACC-CAR-MOUNT-BLK',
        color: 'Matte Black',
        color_code: '#000000',
        mrp: 999,
        selling_price: 399,
        discount_percent: 60.06,
        current_stock: 18,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      }
    ]
  },
  {
    id: 'prod-acc-camera-lens-guard',
    brand_id: 'brand-vivo',
    category_id: 'cat-other-accessories',
    name: 'VIVO 9H Titanium Camera Lens Protector Ring',
    slug: 'vivo-9h-titanium-camera-lens-protector-ring',
    tagline: 'Night Circle Anti-Glare & 9H Sapphire Hardness',
    description: 'Individual aerospace-grade titanium alloy camera lens protective rings with 9H tempered optical glass. Preserves original camera clarity and ZEISS lens color accuracy while preventing scratches.',
    is_phone: false,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    warranty_info: 'Store Installation Warranty',
    highlights: [
      '9H Sapphire Hardness Anti-Scratch Glass',
      'Aerospace Titanium Alloy Metal Ring Border',
      'Ultra-HD Optical Transparency (No Flash Glare)',
      'Free Installation at Begampur Showroom'
    ],
    specifications: {
      in_the_box: ['Camera Lens Protector Set', 'Cleaning Wipe', 'Dust Sticker']
    },
    compatible_models: ['VIVO V40 Pro', 'VIVO V40', 'VIVO V40e', 'VIVO X100 Pro', 'VIVO T3 5G'],
    sort_order: 15,
    images: [
      { id: 'img-acc-lens-1', product_id: 'prod-acc-camera-lens-guard', image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80', alt_text: 'Camera Lens Protector Ring', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-acc-lens-clr',
        product_id: 'prod-acc-camera-lens-guard',
        sku: 'ACC-LENS-PROT-SLV',
        color: 'Titanium Silver / Blue',
        color_code: '#94A3B8',
        mrp: 499,
        selling_price: 199,
        discount_percent: 60.12,
        current_stock: 25,
        low_stock_threshold: 5,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      }
    ]
  },

  // ==========================================
  // RAKSHA BANDHAN PROMOTIONAL VIVO PRODUCTS
  // ==========================================

  // 16. VIVO X300 FE
  {
    id: 'prod-vivo-x300-fe',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-x',
    name: 'VIVO X300 FE',
    slug: 'vivo-x300-fe',
    tagline: 'Ultra-Slim 1.5K LTPO Fashion Flagship with ZEISS Optics',
    description: 'The vivo X300 Fashion Edition pairs Qualcomm Snapdragon 8 Gen 5 flagship performance with a compact 6.31-inch 1.5K LTPO 5000 nits AMOLED display, triple 50MP ZEISS optics with periscope telephoto, 6,500mAh BlueOcean battery and 90W FlashCharge.',
    is_phone: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '10% Instant Cashback Raksha Bandhan Festive Offer',
      '₹118 / Day Daily EMI Scheme with ₹0 Down Payment',
      'Qualcomm Snapdragon 8 Gen 5 (3nm) Flagship Processor',
      '50MP Main (OIS, ZEISS) + 50MP Periscope Telephoto + 8MP Ultra-Wide',
      '6.31" 1.5K LTPO AMOLED, 120Hz, 5000 nits Peak Brightness',
      '6,500 mAh BlueOcean Battery + 90W Wired & 40W Wireless FlashCharge',
      'IP68 & IP69 Dust and High-Pressure Water Resistance'
    ],
    specifications: {
      display: {
        size: '6.31 inches (16.03 cm)',
        resolution: '2640 x 1216 pixels (1.5K LTPO AMOLED)',
        type: 'Flat LTPO AMOLED, 120Hz Adaptive, 5000 nits Peak',
        refresh_rate: '120Hz',
        brightness: '5000 nits Peak Brightness',
        protection: 'Schott Xensation Glass'
      },
      processor: {
        chipset: 'Qualcomm Snapdragon 8 Gen 5 (3nm)',
        cpu: 'Octa-core High-Performance Flagship CPU',
        gpu: 'Next-Gen Adreno GPU',
        process_node: '3nm TSMC'
      },
      camera: {
        rear_main: '50 MP ZEISS Custom Primary Sensor, f/1.75, OIS',
        rear_secondary: '50 MP Periscope Telephoto (3x Optical, 100x Digital Zoom) + 8 MP Ultra-Wide',
        rear_features: 'ZEISS T* Lens Coating, Multifocal Portrait, Super Night Mode',
        front_camera: '50 MP AF Group Selfie with 4K Video',
        video_recording: '4K @ 60fps Front & Rear with Cinematic Video Mode',
        zeiss_optics: true
      },
      battery_charging: {
        capacity: '6500 mAh BlueOcean Silicon-Carbon Battery',
        charging_speed: '90W FlashCharge',
        wireless_charging: '40W Wireless FlashCharge',
        charger_in_box: 'Yes, 90W FlashCharge Power Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM (Global & Indian 5G Bands)',
        five_g_bands: 'n1, n3, n5, n8, n28, n40, n77, n78',
        wifi: 'Wi-Fi 7 Ready, Dual-Band',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        usb_type: 'Type-C 3.2 Gen 1, OTG'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16 (5 Major OS Upgrades, 7 Years Security)',
        ui: 'Origin Fluid Engine Responsive UI'
      },
      build_dimensions: {
        dimensions: '150.83 x 71.76 x 7.99 mm',
        weight: '191 grams',
        ip_rating: 'IP68 & IP69 Extreme Dust and Water Jet Resistant',
        back_material: 'Aerospace Aluminum Frame & Matte AG Velvet Glass'
      },
      in_the_box: [
        'VIVO X300 FE Handset',
        '90W FlashCharge Power Adapter',
        'Type-C to Type-C Cable',
        'Protective Case',
        'SIM Eject Tool',
        'Documentation'
      ]
    },
    sort_order: 16,
    images: [
      { id: 'img-x300fe-1', product_id: 'prod-vivo-x300-fe', image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO X300 FE Urban Olive Green', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-x300fe-8-256-grn',
        product_id: 'prod-vivo-x300-fe',
        sku: 'VIVO-X300FE-8-256-GRN',
        ram: '8GB',
        storage: '256GB',
        color: 'Urban Olive Green',
        color_code: '#4A5D4E',
        mrp: 89999,
        selling_price: 84999,
        discount_percent: 5.56,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-x300fe-12-256-grn',
        product_id: 'prod-vivo-x300-fe',
        sku: 'VIVO-X300FE-12-256-GRN',
        ram: '12GB',
        storage: '256GB',
        color: 'Urban Olive Green',
        color_code: '#4A5D4E',
        mrp: 94999,
        selling_price: 89999,
        discount_percent: 5.26,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      },
      {
        id: 'var-x300fe-12-512-grn',
        product_id: 'prod-vivo-x300-fe',
        sku: 'VIVO-X300FE-12-512-GRN',
        ram: '12GB',
        storage: '512GB',
        color: 'Urban Olive Green',
        color_code: '#4A5D4E',
        mrp: 104999,
        selling_price: 99999,
        discount_percent: 4.76,
        current_stock: 8,
        low_stock_threshold: 2,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 17. VIVO V70 FE
  {
    id: 'prod-vivo-v70-fe',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-v',
    name: 'VIVO V70 FE',
    slug: 'vivo-v70-fe',
    tagline: '200MP Studio Portrait Master with 7,000mAh Battery',
    description: 'Fan Edition masterpiece with an industry-leading 200MP Samsung ISOCELL HP5 OIS camera, 6.83-inch 1.5K 120Hz AMOLED display, MediaTek Dimensity 7360 Turbo processor, and massive 7,000mAh BlueOcean battery in a 7.59mm ultra-slim body.',
    is_phone: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '10% Instant Cashback Raksha Bandhan Special',
      '₹62 / Day Daily EMI Scheme with ₹0 Down Payment',
      '200MP Samsung ISOCELL HP5 (f/1.88, OIS) + Studio Aura Light',
      'MediaTek Dimensity 7360 Turbo (4nm) Performance',
      '6.83" 1.5K 120Hz AMOLED Screen with 1900 nits Peak',
      '7,000 mAh BlueOcean Battery + 90W FlashCharge',
      'IP69 Extreme High-Pressure Water Jet & Dust Proofing'
    ],
    specifications: {
      display: {
        size: '6.83 inches (17.35 cm)',
        resolution: '2800 x 1260 pixels (1.5K AMOLED)',
        type: '1.5K AMOLED, 120Hz, 1900 nits Peak Brightness',
        refresh_rate: '120Hz',
        brightness: '1900 nits Peak Brightness'
      },
      processor: {
        chipset: 'MediaTek Dimensity 7360 Turbo (4nm)',
        cpu: 'Octa-core 2.8 GHz Performance',
        gpu: 'Mali-G615 GPU'
      },
      camera: {
        rear_main: '200 MP Samsung ISOCELL HP5 Sensor, f/1.88, OIS',
        rear_secondary: '8 MP Ultra-Wide Angle + AI Studio Aura Light',
        rear_features: '200MP Ultra-HD Mode, Studio Portrait, Aura Light 3.0',
        front_camera: '50 MP AF Portrait Selfie',
        video_recording: '4K @ 60fps Front & Rear'
      },
      battery_charging: {
        capacity: '7000 mAh BlueOcean Battery',
        charging_speed: '90W FlashCharge',
        wireless_charging: 'No',
        charger_in_box: 'Yes, 90W FlashCharge Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM',
        five_g_bands: 'n1, n3, n5, n8, n28, n40, n77, n78',
        wifi: 'Wi-Fi 6 Dual-Band',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        usb_type: 'Type-C 2.0, OTG'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16'
      },
      build_dimensions: {
        dimensions: '163.7 x 76.2 x 7.59 mm',
        weight: '200 grams',
        ip_rating: 'IP69 Dust and High-Pressure Jet Proof'
      },
      in_the_box: ['VIVO V70 FE', '90W Power Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 17,
    images: [
      { id: 'img-v70fe-1', product_id: 'prod-vivo-v70-fe', image_url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO V70 FE Northern Lights Purple', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-v70fe-8-128-pur',
        product_id: 'prod-vivo-v70-fe',
        sku: 'VIVO-V70FE-8-128-PUR',
        ram: '8GB',
        storage: '128GB',
        color: 'Northern Lights Purple',
        color_code: '#A855F7',
        mrp: 49999,
        selling_price: 44999,
        discount_percent: 10.0,
        current_stock: 12,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-v70fe-8-256-pur',
        product_id: 'prod-vivo-v70-fe',
        sku: 'VIVO-V70FE-8-256-PUR',
        ram: '8GB',
        storage: '256GB',
        color: 'Northern Lights Purple',
        color_code: '#A855F7',
        mrp: 54999,
        selling_price: 49999,
        discount_percent: 9.09,
        current_stock: 12,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      },
      {
        id: 'var-v70fe-12-256-pur',
        product_id: 'prod-vivo-v70-fe',
        sku: 'VIVO-V70FE-12-256-PUR',
        ram: '12GB',
        storage: '256GB',
        color: 'Northern Lights Purple',
        color_code: '#A855F7',
        mrp: 56999,
        selling_price: 51999,
        discount_percent: 8.77,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 18. VIVO Y11 5G
  {
    id: 'prod-vivo-y11-5g',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-y',
    name: 'VIVO Y11 5G',
    slug: 'vivo-y11-5g',
    tagline: 'Long-Lasting 6,500mAh 5G Powerhouse',
    description: 'Affordable 5G powerhouse featuring MediaTek Dimensity 6300 processor, 6,500mAh massive battery, 6.74-inch 120Hz eye-comfort display, 13MP AI clear camera, and IP65 dust and water resistance.',
    is_phone: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '₹1,000 Flat Cashback Festive Offer',
      '₹25 / Day Daily EMI Scheme with ₹0 Down Payment',
      'MediaTek Dimensity 6300 5G Chipset',
      '6,500 mAh Mega Battery with 15W Fast Charge',
      '6.74" 120Hz Eye Protection Display with 1200 nits',
      'IP65 Water and Dust Resistance'
    ],
    specifications: {
      display: {
        size: '6.74 inches (17.12 cm)',
        resolution: '1600 x 720 pixels (HD+ IPS LCD)',
        type: 'IPS LCD, 120Hz, 1200 nits Peak',
        refresh_rate: '120Hz',
        brightness: '1200 nits Peak Brightness'
      },
      processor: {
        chipset: 'MediaTek Dimensity 6300 (6nm)',
        cpu: 'Octa-core 2.4 GHz 5G Engine',
        gpu: 'Mali-G57 MC2'
      },
      camera: {
        rear_main: '13 MP AI Clear Primary Camera, f/2.2',
        rear_secondary: '0.08 MP Auxiliary Sensor',
        front_camera: '5 MP HD Selfie Camera',
        video_recording: '1080p @ 30fps'
      },
      battery_charging: {
        capacity: '6500 mAh Mega Battery',
        charging_speed: '15W Fast Charge',
        charger_in_box: 'Yes, Fast Charger Included'
      },
      connectivity: {
        network: '5G Dual SIM Dual Standby',
        wifi: 'Wi-Fi Dual Band',
        bluetooth: 'Bluetooth 5.4',
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16'
      },
      build_dimensions: {
        dimensions: '167.4 x 77.1 x 8.4 mm',
        weight: '209 grams',
        ip_rating: 'IP65 Dust & Water Resistant'
      },
      in_the_box: ['VIVO Y11 5G', 'Charger Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 18,
    images: [
      { id: 'img-y11-1', product_id: 'prod-vivo-y11-5g', image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO Y11 5G Pearl Marble White', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-y11-4-64-wht',
        product_id: 'prod-vivo-y11-5g',
        sku: 'VIVO-Y11-4-64-WHT',
        ram: '4GB',
        storage: '64GB',
        color: 'Pearl Marble White',
        color_code: '#F8FAFC',
        mrp: 19999,
        selling_price: 17999,
        discount_percent: 10.0,
        current_stock: 15,
        low_stock_threshold: 4,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-y11-4-128-wht',
        product_id: 'prod-vivo-y11-5g',
        sku: 'VIVO-Y11-4-128-WHT',
        ram: '4GB',
        storage: '128GB',
        color: 'Pearl Marble White',
        color_code: '#F8FAFC',
        mrp: 22999,
        selling_price: 20999,
        discount_percent: 8.7,
        current_stock: 15,
        low_stock_threshold: 4,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 19. VIVO Y51 Pro 5G
  {
    id: 'prod-vivo-y51-pro-5g',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-y',
    name: 'VIVO Y51 Pro 5G',
    slug: 'vivo-y51-pro-5g',
    tagline: '5-Star Drop Resistant 5G with 7,200mAh Battery',
    description: 'Ultra-durable rugged elegance featuring SGS 5-star drop resistance, IP68/IP69 water protection, 7,200mAh massive battery, 44W FlashCharge, and MediaTek Dimensity 7360 Turbo 5G speed.',
    is_phone: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '₹2,000 Flat Cashback Festive Offer',
      '₹46 / Day Daily EMI Scheme with ₹0 Down Payment',
      'MediaTek Dimensity 7360 Turbo 5G Platform',
      '7,200 mAh Giant Battery + 44W FlashCharge',
      '50MP Main AI Camera + 2MP Depth',
      'SGS 5-Star Drop Resistance & IP68/IP69 Certifications'
    ],
    specifications: {
      display: {
        size: '6.75 inches (17.15 cm)',
        resolution: '2408 x 1080 pixels (FHD+ LCD)',
        type: 'FHD+ LCD, 120Hz, 1250 nits',
        refresh_rate: '120Hz',
        brightness: '1250 nits'
      },
      processor: {
        chipset: 'MediaTek Dimensity 7360 Turbo (4nm)',
        cpu: 'Octa-core 2.8 GHz'
      },
      camera: {
        rear_main: '50 MP Ultra-Clear Main, f/1.8',
        rear_secondary: '2 MP Depth Sensor',
        front_camera: '8 MP HD Selfie',
        video_recording: '1080p @ 60fps'
      },
      battery_charging: {
        capacity: '7200 mAh Monster Battery',
        charging_speed: '44W FlashCharge',
        charger_in_box: 'Yes, 44W Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM',
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.4',
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16'
      },
      build_dimensions: {
        dimensions: '165.7 x 76.0 x 7.99 mm',
        weight: '205 grams',
        ip_rating: 'IP68 & IP69 Dust and Water Resistant'
      },
      in_the_box: ['VIVO Y51 Pro 5G', '44W Power Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 19,
    images: [
      { id: 'img-y51pro-1', product_id: 'prod-vivo-y51-pro-5g', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO Y51 Pro 5G Crimson Wine Red', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-y51pro-8-128-red',
        product_id: 'prod-vivo-y51-pro-5g',
        sku: 'VIVO-Y51P-8-128-RED',
        ram: '8GB',
        storage: '128GB',
        color: 'Crimson Wine Red',
        color_code: '#991B1B',
        mrp: 36999,
        selling_price: 32999,
        discount_percent: 10.81,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-y51pro-8-256-red',
        product_id: 'prod-vivo-y51-pro-5g',
        sku: 'VIVO-Y51P-8-256-RED',
        ram: '8GB',
        storage: '256GB',
        color: 'Crimson Wine Red',
        color_code: '#991B1B',
        mrp: 41999,
        selling_price: 37999,
        discount_percent: 9.52,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 20. VIVO X300 Pro
  {
    id: 'prod-vivo-x300-pro',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-x',
    name: 'VIVO X300 Pro 5G',
    slug: 'vivo-x300-pro-5g',
    tagline: '200MP ZEISS APO Telephoto & Dimensity 9500 Flagship',
    description: 'The pinnacle of smartphone photography with a 200MP ZEISS APO Telephoto sensor (CIPA 5.5 stabilization), 50MP Sony 1-inch LYT-900 main camera, MediaTek Dimensity 9500 (3nm) flagship processor, V3+ imaging chip, and 6,510mAh battery with 90W FlashCharge.',
    is_phone: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '₹10,000 Instant Cashback Festive Offer',
      '₹167 / Day Ultra Flagship EMI Scheme with ₹0 Down Payment',
      '200MP ZEISS APO Telephoto (CIPA 5.5 Stabilization, 100x Zoom)',
      '50MP 1-inch Sony LYT-900 Main Camera with OIS',
      'MediaTek Dimensity 9500 (3nm) + V3+ Pro Imaging Chip',
      '6.78" 1.5K LTPO AMOLED, 120Hz, 4500 nits Peak',
      '6,510 mAh BlueOcean Battery + 90W FlashCharge & 40W Wireless',
      'Armor Glass & IP68 / IP69 Certifications'
    ],
    specifications: {
      display: {
        size: '6.78 inches (17.22 cm)',
        resolution: '2800 x 1260 pixels (1.5K LTPO AMOLED)',
        type: 'LTPO AMOLED, 120Hz Adaptive, 4500 nits Peak',
        refresh_rate: '120Hz',
        brightness: '4500 nits Local Peak',
        protection: 'Armor Glass Ultra'
      },
      processor: {
        chipset: 'MediaTek Dimensity 9500 (3nm) + V3+ Imaging Chip',
        cpu: 'Octa-core 3.4 GHz Flagship Core',
        gpu: 'Immortalis Flagship GPU',
        process_node: '3nm TSMC'
      },
      camera: {
        rear_main: '50 MP Sony 1-inch LYT-900, f/1.75, OIS',
        rear_secondary: '200 MP ZEISS APO Telephoto (3.7x Optical, 100x Digital Zoom, CIPA 5.5 OIS) + 50 MP Ultra-Wide',
        rear_features: 'ZEISS Multifocal Portrait, Telephoto Macro, 4K 120fps Video, Cinematic Portrait Video',
        front_camera: '50 MP ZEISS AF Selfie Camera',
        video_recording: '4K @ 120fps Rear, 4K @ 60fps Front',
        zeiss_optics: true
      },
      battery_charging: {
        capacity: '6510 mAh BlueOcean Battery',
        charging_speed: '90W FlashCharge',
        wireless_charging: '40W Wireless FlashCharge',
        charger_in_box: 'Yes, 90W Power Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM',
        five_g_bands: 'n1, n3, n5, n8, n28, n40, n77, n78',
        wifi: 'Wi-Fi 7 Ready',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        usb_type: 'Type-C 3.2 Gen 1'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16 (5 OS upgrades promised)'
      },
      build_dimensions: {
        dimensions: '164.07 x 75.3 x 8.9 mm',
        weight: '228 grams',
        ip_rating: 'IP68 & IP69 Dust/Water Jet Resistant',
        back_material: 'AG Glass with Titanium Alloy Finish'
      },
      in_the_box: ['VIVO X300 Pro Handset', '90W FlashCharge Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 20,
    images: [
      { id: 'img-x300pro-1', product_id: 'prod-vivo-x300-pro', image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO X300 Pro 5G Titanium Desert Gold', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-x300pro-16-512-gld',
        product_id: 'prod-vivo-x300-pro',
        sku: 'VIVO-X300P-16-512-GLD',
        ram: '16GB',
        storage: '512GB',
        color: 'Titanium Desert Gold',
        color_code: '#D4AF37',
        mrp: 129999,
        selling_price: 119999,
        discount_percent: 7.69,
        current_stock: 6,
        low_stock_threshold: 2,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      }
    ]
  },

  // 21. VIVO Y31 5G
  {
    id: 'prod-vivo-y31-5g',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-y',
    name: 'VIVO Y31 5G',
    slug: 'vivo-y31-5g',
    tagline: 'Ultra-Durable 6,500mAh 5G Powerhouse with IP69 Protection',
    description: 'Long-lasting 5G champion featuring Qualcomm Snapdragon 4 Gen 2 (4nm), 6,500mAh battery, 44W FlashCharge, 50MP AI main camera, and rugged IP68/IP69 dust and high-pressure water resistance.',
    is_phone: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '₹1,000 Flat Cashback Festive Offer',
      '₹39 / Day Daily EMI Scheme with ₹0 Down Payment',
      'Qualcomm Snapdragon 4 Gen 2 (4nm) 5G Engine',
      '6,500 mAh Battery + 44W Fast Charging',
      '50MP AI Main Camera with Super Night Mode',
      'IP68 & IP69 Dust, Shock, and Water Resistance'
    ],
    specifications: {
      display: {
        size: '6.68 inches (16.96 cm)',
        resolution: '1608 x 720 pixels (HD+ IPS LCD)',
        type: 'IPS LCD, 120Hz',
        refresh_rate: '120Hz'
      },
      processor: {
        chipset: 'Qualcomm Snapdragon 4 Gen 2 (4nm)',
        cpu: 'Octa-core 2.2 GHz 5G Platform'
      },
      camera: {
        rear_main: '50 MP AI Primary Camera, f/1.8',
        rear_secondary: '0.08 MP Auxiliary Sensor',
        front_camera: '8 MP HD Selfie Camera'
      },
      battery_charging: {
        capacity: '6500 mAh High-Density Battery',
        charging_speed: '44W FlashCharge',
        charger_in_box: 'Yes, 44W Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM',
        wifi: 'Wi-Fi Dual Band',
        bluetooth: 'Bluetooth 5.2',
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16'
      },
      build_dimensions: {
        dimensions: '165.7 x 76.0 x 7.99 mm',
        weight: '199 grams',
        ip_rating: 'IP68 & IP69 Extreme Jet Proof'
      },
      in_the_box: ['VIVO Y31 5G', '44W Power Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 21,
    images: [
      { id: 'img-y31-1', product_id: 'prod-vivo-y31-5g', image_url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO Y31 5G Dark Emerald Green', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-y31-6-128-grn',
        product_id: 'prod-vivo-y31-5g',
        sku: 'VIVO-Y31-6-128-GRN',
        ram: '6GB',
        storage: '128GB',
        color: 'Dark Emerald Forest Green',
        color_code: '#064E3B',
        mrp: 31999,
        selling_price: 27999,
        discount_percent: 12.5,
        current_stock: 12,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-y31-6-256-grn',
        product_id: 'prod-vivo-y31-5g',
        sku: 'VIVO-Y31-6-256-GRN',
        ram: '6GB',
        storage: '256GB',
        color: 'Dark Emerald Forest Green',
        color_code: '#064E3B',
        mrp: 35999,
        selling_price: 31999,
        discount_percent: 11.11,
        current_stock: 12,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 22. VIVO V70 Elite
  {
    id: 'prod-vivo-v70-elite',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-v',
    name: 'VIVO V70 Elite',
    slug: 'vivo-v70-elite',
    tagline: 'Ultra-Bright 5000 nits 1.5K ZEISS Portrait Master',
    description: 'Elite portrait powerhouse featuring Snapdragon 8s Gen 3, triple 50MP ZEISS cameras, 6.59-inch 1.5K 120Hz 5000 nits AMOLED display, 6,500mAh BlueOcean battery, and 90W FlashCharge in a 7.4mm slim body.',
    is_phone: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '₹5,000 Instant Cashback Festive Offer',
      '₹93 / Day Studio Flagship EMI with ₹0 Down Payment',
      'Qualcomm Snapdragon 8s Gen 3 (4nm) Flagship Performance',
      '6.59" 1.5K 120Hz AMOLED Screen with 5000 nits Peak',
      'Triple 50MP ZEISS Optics System (OIS Main + Telephoto)',
      '6,500 mAh BlueOcean Battery + 90W FlashCharge in 7.4mm Ultra-Slim Body',
      'IP68 & IP69 Dust & High-Pressure Water Jet Proof'
    ],
    specifications: {
      display: {
        size: '6.59 inches (16.73 cm)',
        resolution: '2750 x 1260 pixels (1.5K AMOLED)',
        type: '1.5K AMOLED, 120Hz, 5000 nits Peak',
        refresh_rate: '120Hz',
        brightness: '5000 nits Local Peak'
      },
      processor: {
        chipset: 'Qualcomm Snapdragon 8s Gen 3 (4nm)',
        cpu: 'Octa-core 3.0 GHz Flagship',
        gpu: 'Adreno 735'
      },
      camera: {
        rear_main: '50 MP ZEISS Custom Sensor, f/1.88, OIS',
        rear_secondary: '50 MP ZEISS Telephoto / Ultra-Wide Lens',
        front_camera: '50 MP AF Portrait Selfie',
        video_recording: '4K @ 60fps Front & Rear',
        zeiss_optics: true
      },
      battery_charging: {
        capacity: '6500 mAh BlueOcean Battery',
        charging_speed: '90W FlashCharge',
        charger_in_box: 'Yes, 90W Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM',
        five_g_bands: 'n1, n3, n5, n8, n28, n40, n77, n78',
        wifi: 'Wi-Fi 7 Ready',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16 (4 OS Upgrades, 6 Years Security)'
      },
      build_dimensions: {
        dimensions: '157.52 x 74.33 x 7.4 mm',
        weight: '187 grams',
        ip_rating: 'IP68 & IP69 Certified'
      },
      in_the_box: ['VIVO V70 Elite Handset', '90W Power Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 22,
    images: [
      { id: 'img-v70e-1', product_id: 'prod-vivo-v70-elite', image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO V70 Elite Sunset Rose Coral', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-v70e-8-256-cor',
        product_id: 'prod-vivo-v70-elite',
        sku: 'VIVO-V70E-8-256-COR',
        ram: '8GB',
        storage: '256GB',
        color: 'Sunset Rose / Coral',
        color_code: '#E11D48',
        mrp: 74999,
        selling_price: 66999,
        discount_percent: 10.67,
        current_stock: 8,
        low_stock_threshold: 2,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-v70e-12-256-cor',
        product_id: 'prod-vivo-v70-elite',
        sku: 'VIVO-V70E-12-256-COR',
        ram: '12GB',
        storage: '256GB',
        color: 'Sunset Rose / Coral',
        color_code: '#E11D48',
        mrp: 79999,
        selling_price: 71999,
        discount_percent: 10.0,
        current_stock: 8,
        low_stock_threshold: 2,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 23. VIVO X300 Ultra
  {
    id: 'prod-vivo-x300-ultra',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-x',
    name: 'VIVO X300 Ultra 5G',
    slug: 'vivo-x300-ultra-5g',
    tagline: 'Ultimate Dual 200MP ZEISS Telephoto Imaging Flagship',
    description: 'The supreme mobile imaging titan featuring dual 200MP ZEISS cameras, Snapdragon 8 Elite Gen 5 (3nm), 6.82-inch 2K 144Hz LTPO AMOLED display with Dolby Vision, 6,600mAh battery, and 100W FlashCharge.',
    is_phone: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '10% Instant Cashback Raksha Bandhan Offer',
      '₹222 / Day Ultimate Flagship EMI with ₹0 Down Payment',
      'Qualcomm Snapdragon 8 Elite Gen 5 (3nm) Apex Processor',
      'Dual 200MP ZEISS Cameras (200MP 1" Primary + 200MP Periscope Telephoto)',
      '6.82" 2K 144Hz LTPO AMOLED with Dolby Vision & HDR10+',
      '6,600 mAh Monster Battery + 100W Wired & 50W Wireless Charging',
      'IP68 & IP69 Armor Glass Protection'
    ],
    specifications: {
      display: {
        size: '6.82 inches (17.32 cm)',
        resolution: '3168 x 1440 pixels (2K LTPO AMOLED)',
        type: '2K LTPO AMOLED, 144Hz, Dolby Vision',
        refresh_rate: '144Hz',
        brightness: '5500 nits Peak Brightness',
        protection: 'Armor Glass Sapphire Edition'
      },
      processor: {
        chipset: 'Qualcomm Snapdragon 8 Elite Gen 5 (3nm)',
        cpu: 'Oryon Next-Gen CPU 4.32 GHz',
        gpu: 'Adreno Flagship GPU'
      },
      camera: {
        rear_main: '200 MP 1-inch Custom ZEISS Sensor, f/1.75, OIS',
        rear_secondary: '200 MP ZEISS APO Periscope Telephoto (up to 200x Zoom) + 50 MP Ultra-Wide',
        rear_features: 'Dual 200MP System, Photography Grip Support, 4K 120fps Dolby Vision',
        front_camera: '50 MP ZEISS AF Selfie Camera',
        video_recording: '8K @ 30fps, 4K @ 120fps',
        zeiss_optics: true
      },
      battery_charging: {
        capacity: '6600 mAh BlueOcean Battery',
        charging_speed: '100W FlashCharge',
        wireless_charging: '50W Wireless FlashCharge',
        charger_in_box: 'Yes, 100W Power Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM All Global Bands',
        five_g_bands: 'n1, n3, n5, n8, n28, n40, n77, n78, n79',
        wifi: 'Wi-Fi 7',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        usb_type: 'Type-C 3.2 Gen 2'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16 (5 OS Upgrades, 7 Years Security)'
      },
      build_dimensions: {
        dimensions: '164.8 x 76.5 x 9.1 mm',
        weight: '235 grams',
        ip_rating: 'IP68 & IP69 Extreme Jet Resistant',
        back_material: 'Titanium Grade 5 Frame & Ceramic Shield AG Glass'
      },
      in_the_box: ['VIVO X300 Ultra Handset', '100W Power Adapter', 'Type-C Cable', 'VIP Protective Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 23,
    images: [
      { id: 'img-x300u-1', product_id: 'prod-vivo-x300-ultra', image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO X300 Ultra Titanium Mint Green', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-x300u-16-512-mnt',
        product_id: 'prod-vivo-x300-ultra',
        sku: 'VIVO-X300U-16-512-MNT',
        ram: '16GB',
        storage: '512GB',
        color: 'Titanium Mint Green',
        color_code: '#A7F3D0',
        mrp: 174999,
        selling_price: 159999,
        discount_percent: 8.57,
        current_stock: 5,
        low_stock_threshold: 2,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      }
    ]
  },

  // 24. VIVO Y31t 5G
  {
    id: 'prod-vivo-y31t-5g',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-y',
    name: 'VIVO Y31t 5G',
    slug: 'vivo-y31t-5g',
    tagline: '7,200mAh Mega Battery 5G with 44W Fast Charge',
    description: 'Battery heavyweight packed with 7,200mAh giant capacity, Snapdragon 4 Gen 2 (4nm) processor, 50MP AI camera with underwater photography mode, and rugged IP68/IP69 water resistance.',
    is_phone: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '₹1,500 Flat Cashback Festive Special',
      '₹36 / Day Daily EMI Scheme with ₹0 Down Payment',
      'Qualcomm Snapdragon 4 Gen 2 (4nm) 5G Engine',
      '7,200 mAh Giant Battery with 44W Fast Charge',
      '50MP AI Main Camera + 2MP Depth',
      'IP68 & IP69 Water, Shock and Dust Resistance'
    ],
    specifications: {
      display: {
        size: '6.75 inches (17.15 cm)',
        resolution: '1608 x 720 pixels (HD+ LCD)',
        type: 'LCD, 120Hz, 1250 nits',
        refresh_rate: '120Hz'
      },
      processor: {
        chipset: 'Qualcomm Snapdragon 4 Gen 2 (4nm)',
        cpu: 'Octa-core 2.2 GHz'
      },
      camera: {
        rear_main: '50 MP AI Camera, f/1.8',
        rear_secondary: '2 MP Depth Sensor',
        front_camera: '8 MP Selfie'
      },
      battery_charging: {
        capacity: '7200 mAh High Capacity',
        charging_speed: '44W FlashCharge',
        charger_in_box: 'Yes, 44W Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM',
        wifi: 'Wi-Fi Dual Band',
        bluetooth: 'Bluetooth 5.2',
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16'
      },
      build_dimensions: {
        dimensions: '165.7 x 76.0 x 8.1 mm',
        weight: '208 grams',
        ip_rating: 'IP68 & IP69 Water Resistant'
      },
      in_the_box: ['VIVO Y31t 5G', '44W Power Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 24,
    images: [
      { id: 'img-y31t-1', product_id: 'prod-vivo-y31t-5g', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO Y31t 5G Burgundy Wine Red', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-y31t-4-128-red',
        product_id: 'prod-vivo-y31t-5g',
        sku: 'VIVO-Y31T-4-128-RED',
        ram: '4GB',
        storage: '128GB',
        color: 'Burgundy Wine Red',
        color_code: '#881337',
        mrp: 29999,
        selling_price: 25999,
        discount_percent: 13.33,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-y31t-6-128-red',
        product_id: 'prod-vivo-y31t-5g',
        sku: 'VIVO-Y31T-6-128-RED',
        ram: '6GB',
        storage: '128GB',
        color: 'Burgundy Wine Red',
        color_code: '#881337',
        mrp: 33999,
        selling_price: 29999,
        discount_percent: 11.77,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      },
      {
        id: 'var-y31t-6-256-red',
        product_id: 'prod-vivo-y31t-5g',
        sku: 'VIVO-Y31T-6-256-RED',
        ram: '6GB',
        storage: '256GB',
        color: 'Burgundy Wine Red',
        color_code: '#881337',
        mrp: 38999,
        selling_price: 34999,
        discount_percent: 10.26,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 25. VIVO Y400 5G
  {
    id: 'prod-vivo-y400-5g',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-y',
    name: 'VIVO Y400 5G',
    slug: 'vivo-y400-5g',
    tagline: '6.67" 120Hz AMOLED & 90W FlashCharge 5G',
    description: 'Stunning 6.67-inch FHD+ 120Hz AMOLED smartphone with Snapdragon 4 Gen 2 (4nm), 50MP Sony IMX852 main camera, 32MP HD selfie camera, 6,000mAh battery, and blazingly fast 90W FlashCharge.',
    is_phone: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '₹2,000 Flat Cashback Festive Offer',
      '₹44 / Day Daily EMI Scheme with ₹0 Down Payment',
      'Qualcomm Snapdragon 4 Gen 2 (4nm) 5G Speed',
      '6.67" FHD+ 120Hz AMOLED with 1800 nits Peak',
      '50MP Sony IMX852 Sensor + 32MP High-Res Selfie',
      '6,000 mAh Battery + 90W Wired Super Fast Charge',
      'IP68 & IP69 Water & Dust Resistance'
    ],
    specifications: {
      display: {
        size: '6.67 inches (16.94 cm)',
        resolution: '2400 x 1080 pixels (FHD+ AMOLED)',
        type: 'AMOLED, 120Hz, 1800 nits Peak',
        refresh_rate: '120Hz',
        brightness: '1800 nits Peak'
      },
      processor: {
        chipset: 'Qualcomm Snapdragon 4 Gen 2 (4nm)',
        cpu: 'Octa-core 2.2 GHz 5G Engine'
      },
      camera: {
        rear_main: '50 MP Sony IMX852 Main Sensor, f/1.8',
        rear_secondary: '2 MP Depth Sensor',
        front_camera: '32 MP Ultra-Clear Selfie',
        video_recording: '1080p @ 60fps'
      },
      battery_charging: {
        capacity: '6000 mAh Battery',
        charging_speed: '90W FlashCharge',
        charger_in_box: 'Yes, 90W Fast Charger Included'
      },
      connectivity: {
        network: '5G Dual SIM',
        wifi: 'Wi-Fi Dual Band',
        bluetooth: 'Bluetooth 5.2',
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16'
      },
      build_dimensions: {
        dimensions: '163.17 x 75.81 x 7.79 mm',
        weight: '190 grams',
        ip_rating: 'IP68 & IP69 Certified'
      },
      in_the_box: ['VIVO Y400 5G', '90W Power Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 25,
    images: [
      { id: 'img-y400-1', product_id: 'prod-vivo-y400-5g', image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO Y400 5G Military Olive Green', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-y400-8-128-grn',
        product_id: 'prod-vivo-y400-5g',
        sku: 'VIVO-Y400-8-128-GRN',
        ram: '8GB',
        storage: '128GB',
        color: 'Military Olive Green',
        color_code: '#3F6212',
        mrp: 35999,
        selling_price: 31999,
        discount_percent: 11.11,
        current_stock: 12,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-y400-8-256-grn',
        product_id: 'prod-vivo-y400-5g',
        sku: 'VIVO-Y400-8-256-GRN',
        ram: '8GB',
        storage: '256GB',
        color: 'Military Olive Green',
        color_code: '#3F6212',
        mrp: 38999,
        selling_price: 34999,
        discount_percent: 10.26,
        current_stock: 12,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 26. VIVO Y05
  {
    id: 'prod-vivo-y05',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-y',
    name: 'VIVO Y05',
    slug: 'vivo-y05',
    tagline: 'Everyday Essential 6,500mAh Powerhouse with 120Hz Display',
    description: 'Reliable entry-level champion with 6,500mAh massive battery, 6.74-inch 120Hz sunlight display, Unisoc T7225 octa-core processor, IP65 water resistance, and MIL-STD shock protection.',
    is_phone: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      'Festive Special Introductory Price',
      '₹28 / Day Daily EMI Scheme with ₹0 Down Payment',
      'Unisoc T7225 Octa-Core Processor',
      '6.74" 120Hz Sunlight Display with 1200 nits Peak',
      '6,500 mAh Mega Battery + 15W Fast Charge',
      'IP65 Water/Dust Resistance & MIL-STD Shock Protection'
    ],
    specifications: {
      display: {
        size: '6.74 inches (17.12 cm)',
        resolution: '1600 x 720 pixels (HD+ IPS LCD)',
        type: 'IPS LCD, 120Hz, 1200 nits',
        refresh_rate: '120Hz'
      },
      processor: {
        chipset: 'Unisoc T7225 (12nm)',
        cpu: 'Octa-core 2.0 GHz'
      },
      camera: {
        rear_main: '8 MP AI Camera with LED Flash',
        front_camera: '5 MP Selfie Camera'
      },
      battery_charging: {
        capacity: '6500 mAh Battery',
        charging_speed: '15W Fast Charge',
        charger_in_box: 'Yes, Charger Included'
      },
      connectivity: {
        network: '4G LTE Dual SIM',
        wifi: 'Wi-Fi Dual Band',
        bluetooth: 'Bluetooth 5.2',
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16'
      },
      build_dimensions: {
        dimensions: '167.4 x 77.1 x 8.4 mm',
        weight: '209 grams',
        ip_rating: 'IP65 Dust & Water Resistant'
      },
      in_the_box: ['VIVO Y05', 'Power Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 26,
    images: [
      { id: 'img-y05-1', product_id: 'prod-vivo-y05', image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO Y05 Pearl Ivory White', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-y05-4-64-wht',
        product_id: 'prod-vivo-y05',
        sku: 'VIVO-Y05-4-64-WHT',
        ram: '4GB',
        storage: '64GB',
        color: 'Pearl Ivory White',
        color_code: '#FDFBF7',
        mrp: 16999,
        selling_price: 14999,
        discount_percent: 11.77,
        current_stock: 15,
        low_stock_threshold: 4,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      }
    ]
  },

  // 27. VIVO V70 5G
  {
    id: 'prod-vivo-v70-5g',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-v',
    name: 'VIVO V70 5G',
    slug: 'vivo-v70-5g',
    tagline: '50MP ZEISS Periscope Telephoto & Snapdragon 7 Gen 4',
    description: 'Portrait excellence with Snapdragon 7 Gen 4 processor, 50MP ZEISS primary camera with OIS, 50MP ZEISS periscope telephoto lens with 100x zoom, 6.59-inch 1.5K 120Hz AMOLED display, 6,500mAh BlueOcean battery, and 90W FlashCharge in a 7.4mm slim body.',
    is_phone: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '₹4,000 Instant Cashback Raksha Bandhan Offer',
      '₹83 / Day Studio Portrait EMI with ₹0 Down Payment',
      'Qualcomm Snapdragon 7 Gen 4 (4nm) Engine',
      '50MP Main OIS + 50MP ZEISS Periscope Telephoto (3x Optical, 100x Digital Zoom)',
      '6.59" 1.5K 120Hz AMOLED in Ultra-Slim 7.4mm Profile',
      '6,500 mAh BlueOcean Battery + 90W FlashCharge',
      'IP68 & IP69 Extreme Dust and Water Resistance'
    ],
    specifications: {
      display: {
        size: '6.59 inches (16.73 cm)',
        resolution: '2750 x 1260 pixels (1.5K AMOLED)',
        type: '1.5K AMOLED, 120Hz',
        refresh_rate: '120Hz'
      },
      processor: {
        chipset: 'Qualcomm Snapdragon 7 Gen 4 (4nm)',
        cpu: 'Octa-core 2.8 GHz'
      },
      camera: {
        rear_main: '50 MP ZEISS Custom Sensor, f/1.88, OIS',
        rear_secondary: '50 MP ZEISS Periscope Telephoto (3x Optical, 100x Digital) + 8 MP Ultra-Wide',
        rear_features: 'ZEISS Multifocal Portrait, Studio Aura Light 3.0',
        front_camera: '50 MP AF Portrait Selfie',
        video_recording: '4K @ 60fps Front & Rear',
        zeiss_optics: true
      },
      battery_charging: {
        capacity: '6500 mAh BlueOcean Battery',
        charging_speed: '90W FlashCharge',
        charger_in_box: 'Yes, 90W Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM',
        five_g_bands: 'n1, n3, n5, n8, n28, n40, n77, n78',
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16 (4 OS Upgrades, 6 Years Security)'
      },
      build_dimensions: {
        dimensions: '157.52 x 74.33 x 7.4 mm',
        weight: '187 grams',
        ip_rating: 'IP68 & IP69 Certified'
      },
      in_the_box: ['VIVO V70 5G Handset', '90W Power Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 27,
    images: [
      { id: 'img-v70-1', product_id: 'prod-vivo-v70-5g', image_url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO V70 5G Desert Champagne Gold', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-v70-8-256-gld',
        product_id: 'prod-vivo-v70-5g',
        sku: 'VIVO-V70-8-256-GLD',
        ram: '8GB',
        storage: '256GB',
        color: 'Desert Champagne Gold',
        color_code: '#EAB308',
        mrp: 65999,
        selling_price: 59999,
        discount_percent: 9.09,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-v70-12-256-gld',
        product_id: 'prod-vivo-v70-5g',
        sku: 'VIVO-V70-12-256-GLD',
        ram: '12GB',
        storage: '256GB',
        color: 'Desert Champagne Gold',
        color_code: '#EAB308',
        mrp: 69999,
        selling_price: 64999,
        discount_percent: 7.14,
        current_stock: 10,
        low_stock_threshold: 3,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  },

  // 28. VIVO Y21 5G (2026)
  {
    id: 'prod-vivo-y21-5g',
    brand_id: 'brand-vivo',
    category_id: 'cat-smartphones',
    series_id: 'series-vivo-y',
    name: 'VIVO Y21 5G',
    slug: 'vivo-y21-5g',
    tagline: '50MP AI Camera & 44W FlashCharge 5G with SGS 5-Star Drop Protection',
    description: 'Fast and durable 5G device powered by MediaTek Dimensity 6300 (6nm), 6,500mAh long-lasting battery, 44W FlashCharge, 50MP AI primary camera, SGS 5-star drop resistance and IP65 splash resistance.',
    is_phone: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    warranty_info: '1 Year Brand Warranty for Phone and 6 Months for In-Box Accessories',
    highlights: [
      '₹1,000 Flat Cashback Festive Offer',
      '₹31 / Day Daily EMI Scheme with ₹0 Down Payment',
      'MediaTek Dimensity 6300 5G (6nm) Processor',
      '6,500 mAh Battery + 44W FlashCharge',
      '50MP AI Primary Camera + 0.08MP Auxiliary',
      'SGS 5-Star Drop Resistance & IP65 Water Protection'
    ],
    specifications: {
      display: {
        size: '6.74 inches (17.12 cm)',
        resolution: '1600 x 720 pixels (HD+ IPS LCD)',
        type: 'IPS LCD, 120Hz, 1200 nits',
        refresh_rate: '120Hz'
      },
      processor: {
        chipset: 'MediaTek Dimensity 6300 5G (6nm)',
        cpu: 'Octa-core 2.4 GHz'
      },
      camera: {
        rear_main: '50 MP AI Primary Camera, f/1.8',
        rear_secondary: '0.08 MP Auxiliary Sensor',
        front_camera: '5 MP Selfie Camera'
      },
      battery_charging: {
        capacity: '6500 mAh Battery',
        charging_speed: '44W FlashCharge',
        charger_in_box: 'Yes, 44W Adapter Included'
      },
      connectivity: {
        network: '5G Dual SIM (14 5G Bands)',
        wifi: 'Wi-Fi Dual Band',
        bluetooth: 'Bluetooth 5.1',
        usb_type: 'Type-C 2.0'
      },
      operating_system: {
        os_name: 'OriginOS 6 based on Android 16',
        os_version: 'Android 16'
      },
      build_dimensions: {
        dimensions: '167.4 x 77.1 x 8.4 mm',
        weight: '202 grams',
        ip_rating: 'IP65 Water/Dust Resistant & SGS 5-Star Drop Proof'
      },
      in_the_box: ['VIVO Y21 5G', '44W Adapter', 'Type-C Cable', 'Case', 'SIM Tool', 'Manuals']
    },
    sort_order: 28,
    images: [
      { id: 'img-y21-1', product_id: 'prod-vivo-y21-5g', image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', alt_text: 'VIVO Y21 5G Midnight Cosmic Navy', view_type: 'front', is_primary: true, sort_order: 1 }
    ],
    variants: [
      {
        id: 'var-y21-4-128-nvy',
        product_id: 'prod-vivo-y21-5g',
        sku: 'VIVO-Y21-4-128-NVY',
        ram: '4GB',
        storage: '128GB',
        color: 'Midnight Cosmic Navy',
        color_code: '#1E293B',
        mrp: 25999,
        selling_price: 22999,
        discount_percent: 11.54,
        current_stock: 15,
        low_stock_threshold: 4,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: true,
        is_active: true
      },
      {
        id: 'var-y21-6-128-nvy',
        product_id: 'prod-vivo-y21-5g',
        sku: 'VIVO-Y21-6-128-NVY',
        ram: '6GB',
        storage: '128GB',
        color: 'Midnight Cosmic Navy',
        color_code: '#1E293B',
        mrp: 29999,
        selling_price: 26499,
        discount_percent: 11.67,
        current_stock: 15,
        low_stock_threshold: 4,
        incoming_stock: 0,
        manual_status: null,
        computed_status: 'IN_STOCK',
        is_default: false,
        is_active: true
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    product_id: 'prod-vivo-v40-pro',
    customer_name: 'Rahul Patil (Begampur)',
    rating: 5,
    title: 'Outstanding Portrait Camera & Instant Bajaj EMI!',
    comment: 'Purchased the VIVO V40 Pro from Galaxy Mobile Gallery. The Aura light studio portraits are mind-blowing! Got Bajaj Finance EMI approved in just 10 minutes at the store.',
    is_verified_store_buyer: true,
    is_approved: true,
    created_at: '2026-08-18T14:30:00Z'
  },
  {
    id: 'rev-2',
    product_id: 'prod-vivo-x100-pro',
    customer_name: 'Amit Shinde (Mohol)',
    rating: 5,
    title: 'Best Mobile Shop in Solapur District!',
    comment: 'The owner explained all specifications patiently and applied original UV curved tempered glass perfectly for free. True flagship experience.',
    is_verified_store_buyer: true,
    is_approved: true,
    created_at: '2026-08-20T11:15:00Z'
  },
  {
    id: 'rev-3',
    customer_name: 'Suresh Deshmukh (Latur/Solapur Road)',
    rating: 5,
    title: 'Huge Collection of Genuine Accessories',
    comment: 'Found original fast chargers and premium phone covers that are not available elsewhere in the market. Highly recommended!',
    is_verified_store_buyer: true,
    is_approved: true,
    created_at: '2026-08-21T16:45:00Z'
  }
];

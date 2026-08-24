import { Brand, Category, Series, Product, Offer, StoreSettings, Review, Banner } from '../types';

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'brand-vivo',
    name: 'VIVO',
    slug: 'vivo',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Vivo_mobile_logo.png/800px-Vivo_mobile_logo.png',
    is_primary: true,
    description: 'Flagship ZEISS Co-engineered Imaging, OriginOS Fluid Performance & Premium Design Aesthetics',
    sort_order: 1,
  },
  {
    id: 'brand-samsung',
    name: 'Samsung',
    slug: 'samsung',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/800px-Samsung_Logo.svg.png',
    is_primary: false,
    description: 'Galaxy AI, Dynamic AMOLED Displays & Pro-grade Multi-camera systems',
    sort_order: 2,
  },
  {
    id: 'brand-oppo',
    name: 'OPPO',
    slug: 'oppo',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OPPO_Logo.svg/800px-OPPO_Logo.svg.png',
    is_primary: false,
    description: 'Portrait Expert, SuperVOOC Fast Charging & Ultra-slim Aesthetics',
    sort_order: 3,
  },
  {
    id: 'brand-realme',
    name: 'Realme',
    slug: 'realme',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Realme_logo.svg/800px-Realme_logo.svg.png',
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

export interface CategorySpecField {
  key: string;
  label: string;
  placeholder: string;
  description?: string;
  type?: 'text' | 'select' | 'number';
  options?: string[];
}

export interface CategorySpecGroup {
  id: string;
  name: string;
  slugs: string[];
  icon: string;
  badge: string;
  description: string;
  fields: CategorySpecField[];
}

export const CATEGORY_SPECS_SCHEMAS: Record<string, CategorySpecGroup> = {
  smartphones: {
    id: 'cat-smartphones',
    name: 'Smartphones',
    slugs: ['smartphones', 'cat-smartphones', 'phones', 'mobiles', 'mobile'],
    icon: 'Smartphone',
    badge: 'Mobile Hardware Specs',
    description: 'Hardware, display, processor, camera & battery features',
    fields: [
      { key: 'display', label: 'Display', placeholder: 'e.g. 6.78" 1.5K AMOLED, 120Hz LTPO, 4500 nits' },
      { key: 'processor', label: 'Processor', placeholder: 'e.g. Qualcomm Snapdragon 7 Gen 3 (4nm)' },
      { key: 'ram', label: 'RAM', placeholder: 'e.g. 8GB / 12GB LPDDR5X (+8GB Extended RAM)' },
      { key: 'storage', label: 'Storage', placeholder: 'e.g. 128GB / 256GB / 512GB UFS 3.1' },
      { key: 'camera', label: 'Camera', placeholder: 'e.g. 50MP Sony IMX921 OIS + 50MP ZEISS Ultra Wide / 50MP Selfie' },
      { key: 'battery', label: 'Battery', placeholder: 'e.g. 5500 mAh BlueVolt Silicon-Carbon Battery' },
      { key: 'charging', label: 'Charging', placeholder: 'e.g. 80W FlashCharge (0-100% in 35 mins)' },
      { key: 'connectivity', label: 'Connectivity', placeholder: 'e.g. Dual 5G (SA/NSA), Wi-Fi 6, Bluetooth 5.4, NFC' },
      { key: 'os', label: 'OS', placeholder: 'e.g. Funtouch OS 15 based on Android 15' },
      { key: 'sensors', label: 'Sensors', placeholder: 'e.g. In-display Optical Fingerprint, Gyroscope, E-compass' },
    ],
  },

  chargers: {
    id: 'cat-chargers',
    name: 'Chargers & Adapters',
    slugs: ['chargers', 'cat-chargers', 'chargers-adapters', 'adapters', 'charger', 'adapter'],
    icon: 'Zap',
    badge: 'Power & Charging Specs',
    description: 'Output power, ports, protocol & safety features',
    fields: [
      { key: 'wattage', label: 'Wattage', placeholder: 'e.g. 80W / 120W Super FlashCharge / 65W GaN' },
      { key: 'input', label: 'Input', placeholder: 'e.g. AC 100-240V ~ 50/60Hz, 2.0A' },
      { key: 'output', label: 'Output', placeholder: 'e.g. 5V-3A / 9V-3A / 11V-7.3A / 20V-4A (80W Max)' },
      { key: 'ports', label: 'Ports', placeholder: 'e.g. Single USB-C / Dual Port (1x USB-C + 1x USB-A)' },
      { key: 'charging_protocol', label: 'Charging Protocol', placeholder: 'e.g. FlashCharge, SuperVOOC, PD 3.0, QC 4+, PPS' },
      { key: 'compatibility', label: 'Compatibility', placeholder: 'e.g. VIVO X/V/Y Series, Samsung, iPhones, Laptops' },
      { key: 'safety', label: 'Safety', placeholder: 'e.g. 9-Layer Protection: Overvoltage, Overheat & Surge Protection' },
    ],
  },

  cables: {
    id: 'cat-cables',
    name: 'Cables & OTG',
    slugs: ['cables', 'cat-cables', 'cables-otg', 'otg', 'cable'],
    icon: 'Cable',
    badge: 'Cable & Data Specs',
    description: 'Connector, length, power rating & data speed',
    fields: [
      { key: 'connector_type', label: 'Connector Type', placeholder: 'e.g. Type-C to Type-C / USB-A to Type-C / Type-C OTG' },
      { key: 'length', label: 'Length', placeholder: 'e.g. 1.0 Meter / 1.5 Meter / 2.0 Meter' },
      { key: 'data_speed', label: 'Data Speed', placeholder: 'e.g. 480 Mbps (USB 2.0) / 10 Gbps (USB 3.2 Gen 2)' },
      { key: 'power', label: 'Power', placeholder: 'e.g. 6A Fast Charge (Up to 120W Power Delivery)' },
      { key: 'compatibility', label: 'Compatibility', placeholder: 'e.g. All Type-C Mobiles, Tablets, MacBooks & Earphones' },
      { key: 'material', label: 'Material', placeholder: 'e.g. High-density Braided Nylon with Zinc Alloy Connectors' },
    ],
  },

  cases: {
    id: 'cat-cases',
    name: 'Cases & Covers',
    slugs: ['cases', 'cat-cases', 'cases-covers', 'covers', 'case', 'cover'],
    icon: 'Shield',
    badge: 'Protection & Fit Specs',
    description: 'Fit model, materials, camera protection & finish',
    fields: [
      { key: 'compatible_model', label: 'Compatible Model', placeholder: 'e.g. VIVO V40 5G / V40 Pro 5G' },
      { key: 'material', label: 'Material', placeholder: 'e.g. Liquid Silicone / Shockproof TPU + Frosted Polycarbonate' },
      { key: 'protection', label: 'Protection', placeholder: 'e.g. 360° Military-grade Drop Protection with Airbag Corners' },
      { key: 'camera_protection', label: 'Camera Protection', placeholder: 'e.g. Raised 1.5mm Bezel / Sliding Lens Cover' },
      { key: 'magsafe_wireless', label: 'MagSafe / Wireless Charging', placeholder: 'e.g. Compatible with MagSafe & Qi Wireless Charging' },
      { key: 'colour', label: 'Colour', placeholder: 'e.g. Midnight Black, Navy Blue, Deep Purple' },
    ],
  },

  tempered: {
    id: 'cat-tempered',
    name: 'Tempered Glass',
    slugs: ['tempered-glass', 'cat-tempered', 'tempered', 'screen-guards', 'screen-protector'],
    icon: 'Layers',
    badge: 'Screen Protection Specs',
    description: 'Curved glass, hardness, thickness & coating',
    fields: [
      { key: 'compatible_model', label: 'Compatible Model', placeholder: 'e.g. VIVO X100 Pro / V40 5G (Curved Display)' },
      { key: 'thickness', label: 'Thickness', placeholder: 'e.g. 0.33 mm Ultra-thin Curved Glass' },
      { key: 'hardness', label: 'Hardness', placeholder: 'e.g. 9H Diamond-grade Scratch Resistance' },
      { key: 'coverage', label: 'Coverage', placeholder: 'e.g. Full Edge-to-Edge 3D UV Curved Coverage' },
      { key: 'privacy', label: 'Privacy', placeholder: 'e.g. High Definition Clear / 28° Anti-Peep Privacy' },
      { key: 'case_friendly', label: 'Case Friendly', placeholder: 'e.g. 100% Case Friendly Design (No edge lifting)' },
    ],
  },

  tws: {
    id: 'cat-tws',
    name: 'TWS & Earphones',
    slugs: ['tws-earphones', 'cat-tws', 'tws', 'earphones', 'earbuds', 'headphones', 'audio'],
    icon: 'Headphones',
    badge: 'Acoustics & Audio Specs',
    description: 'Driver, ANC/ENC, Bluetooth, latency & battery life',
    fields: [
      { key: 'driver', label: 'Driver', placeholder: 'e.g. 12.2 mm Deep Bass Bio-fiber Diaphragm' },
      { key: 'anc_enc', label: 'ANC / ENC', placeholder: 'e.g. 50dB Hybrid Active Noise Cancellation + AI ENC' },
      { key: 'bluetooth', label: 'Bluetooth', placeholder: 'e.g. Bluetooth v5.4 (10m range, Dual-Device Pairing)' },
      { key: 'codec', label: 'Codec', placeholder: 'e.g. LDAC, AAC, SBC Hi-Res Audio Wireless' },
      { key: 'battery', label: 'Battery', placeholder: 'e.g. 45mAh (Earbuds) + 500mAh (Charging Case)' },
      { key: 'playback_time', label: 'Playback Time', placeholder: 'e.g. 40 Hours Total (10 Hours Single Playtime)' },
      { key: 'water_resistance', label: 'Water Resistance', placeholder: 'e.g. IP54 Sweat and Splash Proof' },
      { key: 'microphones', label: 'Microphones', placeholder: 'e.g. 3-Mic Array with Wind Noise Reduction' },
    ],
  },

  powerbanks: {
    id: 'cat-powerbanks',
    name: 'Power Banks',
    slugs: ['power-banks', 'cat-powerbanks', 'powerbanks', 'powerbank', 'battery-pack'],
    icon: 'BatteryCharging',
    badge: 'Power Bank Capacity & Output',
    description: 'Capacity, output ports, fast charging & safety',
    fields: [
      { key: 'capacity', label: 'Capacity', placeholder: 'e.g. 20,000 mAh (74Wh) High-density Lithium Polymer' },
      { key: 'input', label: 'Input', placeholder: 'e.g. Type-C 18W Fast Recharging (5V-3A / 9V-2A)' },
      { key: 'output', label: 'Output', placeholder: 'e.g. USB-C 22.5W + Dual USB-A 18W Output' },
      { key: 'ports', label: 'Ports', placeholder: 'e.g. 3 Outputs (1x Type-C + 2x USB-A) + 1x Type-C Input' },
      { key: 'fast_charging', label: 'Fast Charging', placeholder: 'e.g. 22.5W Super Fast Charging / QC 3.0 / PD 20W' },
      { key: 'charging_protocol', label: 'Charging Protocol', placeholder: 'e.g. Power Delivery 3.0, Quick Charge 3.0, AFC' },
      { key: 'compatibility', label: 'Compatibility', placeholder: 'e.g. Smartphones, Tablets, Smartwatches, Bluetooth Earphones' },
    ],
  },

  smartwatches: {
    id: 'cat-smartwatches',
    name: 'Smart Watches',
    slugs: ['smart-watches', 'cat-smartwatches', 'smartwatches', 'watch', 'wearables'],
    icon: 'Watch',
    badge: 'Wearable & Fitness Specs',
    description: 'Display, health sensors, Bluetooth calling & battery',
    fields: [
      { key: 'display', label: 'Display', placeholder: 'e.g. 1.96" AMOLED HD (410×502 px), Always-On Display' },
      { key: 'sensors', label: 'Sensors', placeholder: 'e.g. Continuous Heart Rate, SpO2, Sleep Monitor, Accelerometer' },
      { key: 'battery', label: 'Battery', placeholder: 'e.g. 350 mAh (Up to 10 Days Typical Usage / 30 Days Standby)' },
      { key: 'gps', label: 'GPS', placeholder: 'e.g. Built-in Multi-system Standalone GPS' },
      { key: 'bluetooth', label: 'Bluetooth', placeholder: 'e.g. Bluetooth v5.3 Single-Chip Calling' },
      { key: 'calling', label: 'Calling', placeholder: 'e.g. HD Bluetooth Calling with Noise-Cancelling Mic & Speaker' },
      { key: 'water_resistance', label: 'Water Resistance', placeholder: 'e.g. IP68 Water & Dust Resistant (3 ATM)' },
      { key: 'os', label: 'OS', placeholder: 'e.g. Proprietary RTOS (Compatible with Android & iOS)' },
    ],
  },

  speakers: {
    id: 'cat-speakers',
    name: 'Bluetooth Speakers',
    slugs: ['speakers', 'cat-speakers', 'bluetooth-speakers', 'speaker', 'audio-speaker'],
    icon: 'Speaker',
    badge: 'Speaker Sound & Audio Specs',
    description: 'Output power, driver size, playback & waterproof rating',
    fields: [
      { key: 'output_power', label: 'Output Power', placeholder: 'e.g. 20W RMS High-Bass Stereo Output' },
      { key: 'driver', label: 'Driver', placeholder: 'e.g. Dual 48mm Full-range Drivers with Passive Bass Radiators' },
      { key: 'bluetooth', label: 'Bluetooth', placeholder: 'e.g. Bluetooth v5.3 (15m Wireless Range, TWS Party Mode)' },
      { key: 'battery', label: 'Battery', placeholder: 'e.g. 4000 mAh Rechargeable Li-ion Battery' },
      { key: 'playback_time', label: 'Playback Time', placeholder: 'e.g. Up to 14 Hours Continuous Music Playback' },
      { key: 'ports', label: 'Ports', placeholder: 'e.g. USB Type-C Charging, 3.5mm AUX, MicroSD Card Slot' },
      { key: 'water_resistance', label: 'Water Resistance', placeholder: 'e.g. IPX7 100% Waterproof & Floatable' },
    ],
  },

  memory: {
    id: 'cat-memory',
    name: 'Memory Cards & Pen Drives',
    slugs: ['memory-cards', 'cat-memory', 'storage', 'pendrives', 'pendrive', 'microsd', 'sd-card'],
    icon: 'HardDrive',
    badge: 'Storage & Speed Specs',
    description: 'Capacity, read/write speed, interface & speed class',
    fields: [
      { key: 'capacity', label: 'Capacity', placeholder: 'e.g. 64GB / 128GB / 256GB / 512GB' },
      { key: 'interface', label: 'Interface', placeholder: 'e.g. Dual OTG (Type-C + USB 3.2 Gen 1) / MicroSDXC UHS-I' },
      { key: 'read_speed', label: 'Read Speed', placeholder: 'e.g. Up to 150 MB/s High-speed Transfer' },
      { key: 'write_speed', label: 'Write Speed', placeholder: 'e.g. Up to 90 MB/s Sustained Write Speed' },
      { key: 'speed_class', label: 'Speed Class', placeholder: 'e.g. Class 10, UHS Speed Class 3 (U3), Video Speed V30, A2' },
      { key: 'compatibility', label: 'Compatibility', placeholder: 'e.g. Android Phones, Action Cameras, Drones, Laptops & TVs' },
    ],
  },

  other: {
    id: 'cat-other-accessories',
    name: 'Other Accessories',
    slugs: ['other-accessories', 'cat-other-accessories', 'accessories', 'other', 'general'],
    icon: 'Sparkles',
    badge: 'Custom Accessory Specifications',
    description: 'Custom key-value specifications for car holders, stands & utilities',
    fields: [],
  },
};

// Helper to find specification schema matching category ID, slug, or name
export function getCategorySpecSchema(categoryIdentifier?: string): CategorySpecGroup {
  if (!categoryIdentifier) return CATEGORY_SPECS_SCHEMAS.smartphones;

  const needle = categoryIdentifier.toLowerCase().trim();

  // 1. Direct key match
  if (CATEGORY_SPECS_SCHEMAS[needle]) {
    return CATEGORY_SPECS_SCHEMAS[needle];
  }

  // 2. Match by id or slugs
  for (const group of Object.values(CATEGORY_SPECS_SCHEMAS)) {
    if (group.id.toLowerCase() === needle) return group;
    if (group.slugs.some(s => s.toLowerCase() === needle || needle.includes(s.toLowerCase()))) {
      return group;
    }
  }

  // 3. Match by name
  for (const group of Object.values(CATEGORY_SPECS_SCHEMAS)) {
    if (needle.includes(group.name.toLowerCase()) || group.name.toLowerCase().includes(needle)) {
      return group;
    }
  }

  return CATEGORY_SPECS_SCHEMAS.other;
}

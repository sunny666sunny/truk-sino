// ── Products ──
export interface ProductData {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  subCategory: string;
  image: string;
  gallery: { src: string; alt: string }[];
  excerpt: string;
  badge?: string;
  seoTitle?: string;
  seoDescription?: string;
  specs: { label: string; value: string }[];
  description: string;
  features: { title: string; description: string }[];
}

export const allProducts: ProductData[] = [
  {
    id: "howo-tx-6x4-dump",
    name: "HOWO TX 6×4 Dump Truck",
    slug: "howo-tx-6x4-dump-truck",
    category: "Heavy Truck",
    categorySlug: "heavy-truck",
    subCategory: "Dump Truck",
    image: "/images/product-dump-truck.png",
    gallery: [
      { src: "/images/product-dump-truck.png", alt: "HOWO TX 6x4 Dump Truck front view" },
      { src: "/images/hero-banner-1.png", alt: "HOWO TX fleet on construction site" },
    ],
    excerpt: "The workhorse of mining and construction — 30-ton payload, reinforced steel body, and a proven powertrain built for the harshest environments.",
    badge: "Best Seller",
    specs: [
      { label: "Engine", value: "WD615.47, 371 HP" },
      { label: "Drive Type", value: "6×4" },
      { label: "Payload", value: "30 tons" },
      { label: "Body Volume", value: "18 m³" },
      { label: "Transmission", value: "HW19710, 10-speed" },
      { label: "Cab", value: "HOWO TX, extended" },
      { label: "Tire", value: "12.00R20" },
      { label: "Emission", value: "Euro II / III" },
    ],
    description: "The HOWO TX 6×4 Dump Truck is engineered for heavy-duty mining, quarrying, and large-scale earthmoving operations. Its reinforced U-shaped body withstands extreme impact loads while the hydraulic tipping system ensures rapid, controlled discharge. The proven WD615 engine delivers reliable performance in temperatures from -25°C to +50°C, and the HW19710 manual transmission offers smooth shifting under full load.",
    features: [
      { title: "Reinforced Body", description: "High-strength steel U-shaped body with 8mm floor and 6mm side plates, designed to handle 30-ton payloads without deformation." },
      { title: "Heavy-Duty Suspension", description: "Multi-leaf spring suspension with reinforced axle housings for maximum load capacity and off-road stability." },
      { title: "Hydraulic System", description: "Front-mounted HYVA hydraulic cylinder provides fast, controlled tipping with automatic shut-off at maximum angle." },
    ],
  },
  {
    id: "howo-tx-6x4-tractor",
    name: "HOWO TX 6×4 Tractor Truck",
    slug: "howo-tx-6x4-tractor-truck",
    category: "Heavy Truck",
    categorySlug: "heavy-truck",
    subCategory: "Tractor Truck",
    image: "/images/product-tractor-truck.png",
    gallery: [
      { src: "/images/product-tractor-truck.png", alt: "HOWO TX 6x4 Tractor Truck" },
      { src: "/images/hero-banner-1.png", alt: "Tractor truck on highway" },
    ],
    excerpt: "Long-haul efficiency meets driver comfort — 400 HP engine, AMT transmission, and a spacious sleeper cab designed for extended routes.",
    specs: [
      { label: "Engine", value: "MC11.40-60, 400 HP" },
      { label: "Drive Type", value: "6×4" },
      { label: "GCW", value: "55 tons" },
      { label: "Transmission", value: "HW25712AMT, 12-speed" },
      { label: "Cab", value: "HOWO TX, high-roof sleeper" },
      { label: "Fuel Tank", value: "600L aluminum" },
      { label: "Tire", value: "315/80R22.5" },
      { label: "Emission", value: "Euro V" },
    ],
    description: "The HOWO TX 6×4 Tractor Truck is designed for long-distance freight and regional distribution. The MC11 engine delivers 400 HP with excellent fuel economy, while the automated 12-speed AMT transmission reduces driver fatigue on extended hauls. The high-roof sleeper cab features a comfortable berth, air conditioning, and ample storage for multi-day routes.",
    features: [
      { title: "AMT Transmission", description: "12-speed automated manual transmission for smooth shifting and optimal fuel efficiency across all terrain types." },
      { title: "Sleeper Cab", description: "High-roof cab with 750mm wide lower berth, climate control, and ergonomic driver seat with air suspension." },
      { title: "Fleet Telematics", description: "Integrated GPS tracking and remote diagnostics for real-time fleet management and predictive maintenance." },
    ],
  },
  {
    id: "howo-tx-8x4-cargo",
    name: "HOWO TX 8×4 Cargo Truck",
    slug: "howo-tx-8x4-cargo-truck",
    category: "Heavy Truck",
    categorySlug: "heavy-truck",
    subCategory: "Cargo Truck",
    image: "/images/product-cargo-truck.png",
    gallery: [
      { src: "/images/product-cargo-truck.png", alt: "HOWO TX 8x4 Cargo Truck" },
    ],
    excerpt: "Versatile 8×4 cargo platform for logistics fleets — customizable body types, 25-ton payload, and reliable Euro V powertrain.",
    specs: [
      { label: "Engine", value: "MC11.36-60, 360 HP" },
      { label: "Drive Type", value: "8×4" },
      { label: "Payload", value: "25 tons" },
      { label: "Cargo Body", value: "9600×2400×800mm" },
      { label: "Transmission", value: "HW19710, 10-speed" },
      { label: "Emission", value: "Euro V" },
    ],
    description: "The HOWO TX 8×4 Cargo Truck provides a versatile heavy-duty platform for logistics operations. Available with stake, box, or refrigerated body configurations, it adapts to diverse cargo requirements while delivering consistent performance and low operating costs.",
    features: [
      { title: "Multiple Body Options", description: "Available as flatbed, stake, enclosed box, or refrigerated container to match your cargo requirements." },
      { title: "Dual Rear Axles", description: "8×4 configuration with dual rear axles for maximum load distribution and road legality at full payload." },
    ],
  },
  {
    id: "howo-mixer-6x4",
    name: "HOWO 6×4 Concrete Mixer Truck",
    slug: "howo-6x4-mixer-truck",
    category: "Special Vehicle",
    categorySlug: "special-vehicle",
    subCategory: "Mixer Truck",
    image: "/images/product-mixer-truck.png",
    gallery: [
      { src: "/images/product-mixer-truck.png", alt: "HOWO 6x4 Concrete Mixer Truck" },
    ],
    excerpt: "12 m³ drum capacity, PTO-driven hydraulic system, and a chassis engineered for the stop-start demands of construction sites.",
    specs: [
      { label: "Engine", value: "WD615.47, 371 HP" },
      { label: "Drive Type", value: "6×4" },
      { label: "Drum Volume", value: "12 m³" },
      { label: "Water Tank", value: "450L" },
      { label: "Transmission", value: "HW19710, 10-speed" },
      { label: "Emission", value: "Euro II" },
    ],
    description: "The HOWO 6×4 Concrete Mixer is built for continuous operation on demanding construction sites. The 12 m³ drum features a double-helix mixing blade for uniform concrete quality, while the PTO-driven hydraulic system ensures reliable rotation under all load conditions.",
    features: [
      { title: "Double Helix Blade", description: "Patented mixing blade design ensures homogeneous concrete mix with minimal segregation during transport." },
      { title: "High-Pressure Wash", description: "Onboard 450L water tank with high-pressure pump for rapid drum cleaning between loads." },
    ],
  },
  {
    id: "howo-light-cargo",
    name: "HOWO Light Cargo Truck 4×2",
    slug: "howo-light-cargo-4x2",
    category: "Light Truck",
    categorySlug: "light-truck",
    subCategory: "Cargo Truck",
    image: "/images/product-light-truck.png",
    gallery: [
      { src: "/images/product-light-truck.png", alt: "HOWO Light Cargo Truck" },
    ],
    excerpt: "Agile urban delivery vehicle — 8-ton GVW, fuel-efficient diesel, and a tight turning radius for city logistics.",
    specs: [
      { label: "Engine", value: "ISF3.8, 154 HP" },
      { label: "GVW", value: "8,000 kg" },
      { label: "Payload", value: "5 tons" },
      { label: "Cargo Body", value: "5200×2200×550mm" },
      { label: "Transmission", value: "6-speed manual" },
      { label: "Emission", value: "Euro V" },
    ],
    description: "The HOWO Light Cargo Truck is purpose-built for urban distribution and last-mile delivery. Its compact dimensions and tight turning radius enable effortless navigation through city streets, while the ISF3.8 engine delivers excellent fuel economy for high-mileage daily operations.",
    features: [
      { title: "Compact Design", description: "Optimized dimensions for urban environments with a 6.8m turning radius for U-turns on standard city roads." },
      { title: "Low Operating Cost", description: "Fuel-efficient ISF3.8 engine with 50,000 km service intervals minimizes total cost of ownership." },
    ],
  },
  {
    id: "ev-cargo-6x4",
    name: "SINOTRUK EV Cargo 6×4",
    slug: "sinotruk-ev-cargo-6x4",
    category: "New Energy Vehicle",
    categorySlug: "new-energy-vehicle",
    subCategory: "Electric Truck",
    image: "/images/product-electric-truck.png",
    gallery: [
      { src: "/images/product-electric-truck.png", alt: "SINOTRUK EV Cargo Truck" },
    ],
    excerpt: "Zero-emission heavy hauler — 300 km range, 350 kWh battery, and fast-charge capability for sustainable fleet operations.",
    badge: "New",
    specs: [
      { label: "Motor", value: "Dual e-Axle, 480 kW" },
      { label: "Battery", value: "350 kWh LFP" },
      { label: "Range", value: "300 km (laden)" },
      { label: "Charging", value: "DC 240kW, 1.5h 10→80%" },
      { label: "GVW", value: "25 tons" },
      { label: "Drive Type", value: "6×4" },
    ],
    description: "The SINOTRUK EV Cargo 6×4 represents the future of heavy-duty transport. Its 350 kWh LFP battery delivers 300 km of real-world range, while 240 kW DC fast charging enables a 10–80% top-up in just 90 minutes. Zero tailpipe emissions make it ideal for urban logistics zones and port operations.",
    features: [
      { title: "Fast Charging", description: "240 kW DC fast charging capability enables depot-based opportunity charging during driver breaks." },
      { title: "Regenerative Braking", description: "Multi-stage regenerative braking recovers up to 30% of kinetic energy, extending range in stop-start urban cycles." },
    ],
  },
];

// ── Product Categories ──
export interface ProductCategoryData {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const productCategories: ProductCategoryData[] = [
  { name: "Heavy Truck", slug: "heavy-truck", description: "Dump trucks, tractor trucks, and cargo trucks for mining, logistics, and heavy industry.", image: "/images/product-dump-truck.png" },
  { name: "Light Truck", slug: "light-truck", description: "Compact cargo trucks and tippers for urban distribution and last-mile delivery.", image: "/images/product-light-truck.png" },
  { name: "Special Vehicle", slug: "special-vehicle", description: "Concrete mixers, water tankers, oil tankers, and purpose-built specialty trucks.", image: "/images/product-mixer-truck.png" },
  { name: "Light Vehicle", slug: "light-vehicle", description: "Pickups and SUVs for commercial and personal use.", image: "/images/product-cargo-truck.png" },
  { name: "Semi Trailer", slug: "semi-trailer", description: "Flatbed, lowbed, and enclosed semi-trailers for heavy freight.", image: "/images/product-tractor-truck.png" },
  { name: "New Energy Vehicle", slug: "new-energy-vehicle", description: "Battery-electric and hybrid commercial vehicles for sustainable fleet operations.", image: "/images/product-electric-truck.png" },
];

// ── News Articles ──
export interface NewsArticleData {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export const allNews: NewsArticleData[] = [
  {
    id: "1",
    title: "SINOTRUK Launches Next-Gen TS9 Dump Truck for African Mining Markets",
    slug: "sinotruk-ts9-dump-truck-africa-launch",
    date: "June 18, 2026",
    excerpt: "The TS9 features a reinforced 30-ton payload body, upgraded cooling for tropical conditions, and integrated fleet management telematics.",
    image: "/images/product-dump-truck.png",
    content: `<h2>Introducing the TS9: Purpose-Built for African Mining</h2>
<p>SINOTRUK International today announced the launch of the TS9 dump truck, a next-generation heavy-duty vehicle designed specifically for the demanding conditions of African mining operations. The TS9 represents a significant evolution from its predecessor, incorporating feedback from fleet operators across Nigeria, Ghana, Zambia, and the Democratic Republic of Congo.</p>

<h2>Key Technical Upgrades</h2>
<p>The TS9 features a reinforced U-shaped body constructed from Hardox 450 steel, capable of handling 30-ton payloads without deformation. The upgraded cooling system includes a larger radiator and dual electric fans, ensuring stable engine temperatures in ambient conditions up to 55°C.</p>
<p>The integrated fleet management telematics platform provides real-time GPS tracking, fuel consumption monitoring, and predictive maintenance alerts. Fleet operators can access a web-based dashboard to monitor vehicle health, driver behavior, and operational efficiency across their entire fleet.</p>

<h2>Operator Feedback</h2>
<p>During the 18-month development process, SINOTRUK engineers conducted extensive field testing at mining sites in Nigeria's Niger Delta region and Ghana's Ashanti goldfields. The TS9 was subjected to continuous 24/7 operations in dusty, high-temperature conditions, validating its durability and reliability.</p>

<h2>Availability</h2>
<p>The TS9 is available for immediate order through SINOTRUK's network of authorized dealers across Africa. First deliveries are scheduled for Q3 2026, with a production capacity of 200 units per month allocated to African markets.</p>`,
    tags: ["product-launch", "mining", "africa"],
  },
  {
    id: "2",
    title: "50 Electric Trucks Deployed for Green Logistics in Southeast Asia",
    slug: "ev-fleet-deployment-southeast-asia",
    date: "May 29, 2026",
    excerpt: "SINOTRUK's largest EV export order to date — battery-electric cargo trucks begin operations in Bangkok's distribution network.",
    image: "/images/product-electric-truck.png",
    content: `<h2>Historic EV Deployment</h2>
<p>In a landmark deal for sustainable logistics, SINOTRUK International has delivered 50 battery-electric cargo trucks to a major logistics operator in Bangkok, Thailand. This represents the company's largest single EV export order and signals growing international demand for zero-emission commercial vehicles.</p>

<h2>Operational Specifications</h2>
<p>Each truck is equipped with a 250 kWh LFP battery pack delivering 200 km of real-world urban range. The fleet operates from two distribution centers in Bangkok's eastern industrial zone, serving last-mile delivery routes across the metropolitan area. Overnight depot charging at 120 kW AC ensures full batteries for each day's operations.</p>

<h2>Environmental Impact</h2>
<p>The fleet deployment is expected to eliminate approximately 3,800 tons of CO₂ emissions annually compared to the diesel vehicles it replaces. The operator has committed to transitioning its entire 200-vehicle fleet to electric by 2029, with SINOTRUK as the preferred supplier.</p>`,
    tags: ["ev", "logistics", "southeast-asia"],
  },
  {
    id: "3",
    title: "New Service Training Center Opens in Lagos, Nigeria",
    slug: "service-training-center-lagos",
    date: "April 12, 2026",
    excerpt: "The facility will train 200+ local technicians annually on vehicle maintenance, diagnostics, and genuine parts identification.",
    image: "/images/factory-workshop.png",
    content: `<h2>Investing in Local Expertise</h2>
<p>SINOTRUK International has officially opened its new Service Training Center in Lagos, Nigeria — the company's first dedicated training facility on the African continent. The center will train over 200 local technicians annually, covering engine overhaul, gearbox servicing, electrical diagnostics, and ADAS calibration.</p>

<h2>Facility Overview</h2>
<p>The 2,000 m² facility includes four fully equipped workshop bays, a classroom with capacity for 40 trainees, a parts identification laboratory, and an engine teardown room. All training equipment mirrors the tools and diagnostic systems used at SINOTRUK's factory service centers.</p>

<h2>Program Structure</h2>
<p>The certification program consists of three tiers: Basic Maintenance (2 weeks), Advanced Diagnostics (4 weeks), and Master Technician (8 weeks). Graduates receive SINOTRUK certification recognized across the company's global dealer network.</p>`,
    tags: ["service", "training", "africa"],
  },
  {
    id: "4",
    title: "SINOTRUK Wins Contract for 300 Trucks in Peru Mining Expansion",
    slug: "peru-mining-contract-300-trucks",
    date: "March 5, 2026",
    excerpt: "A major Peruvian copper mine selects SINOTRUK for its fleet expansion, ordering 300 dump trucks and tractor units.",
    image: "/images/hero-banner-1.png",
    content: `<h2>Strategic Fleet Partnership</h2>
<p>SINOTRUK International has secured a landmark contract to supply 300 heavy-duty vehicles to one of Peru's largest copper mining operations. The order includes 200 8×4 dump trucks and 100 6×4 tractor trucks, representing one of the company's largest single orders from a Latin American client.</p>

<h2>High-Altitude Engineering</h2>
<p>The mining site sits at 4,200 meters above sea level in the Peruvian Andes. All vehicles have been specially calibrated for high-altitude operation, including modified engine mapping, upgraded turbochargers, and cold-start systems rated to -15°C.</p>`,
    tags: ["mining", "south-america", "contract"],
  },
];

// ── Videos ──
export interface VideoData {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  duration: string;
  videoUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const allVideos: VideoData[] = [
  { id: "1", title: "Brand Film: Who We Are", slug: "brand-film", thumbnail: "/images/hero-banner-1.png", description: "Discover the story behind SINOTRUK — from our founding in 1993 to becoming a global force in commercial vehicle manufacturing.", duration: "5:30" },
  { id: "2", title: "TS9 Dump Truck Field Test", slug: "ts9-field-test", thumbnail: "/images/product-dump-truck.png", description: "Watch the TS9 tackle extreme conditions in our comprehensive field test, from rocky quarries to muddy construction sites.", duration: "8:15" },
  { id: "3", title: "Inside the Smart Factory", slug: "smart-factory-tour", thumbnail: "/images/hero-banner-2.png", description: "A behind-the-scenes look at our advanced manufacturing facility, featuring robotic welding, automated painting, and AI-driven quality inspection.", duration: "12:00" },
  { id: "4", title: "AMT Transmission Technology", slug: "amt-transmission", thumbnail: "/images/product-tractor-truck.png", description: "How our 12-speed automated manual transmission delivers smoother shifts and better fuel economy than traditional manual gearboxes.", duration: "6:45" },
];

// ── About Pages ──
export const aboutPages = {
  "who-we-are": {
    title: "Who We Are",
    subtitle: "Three decades of engineering excellence in commercial vehicle manufacturing.",
    sections: [
      {
        heading: "Our Heritage",
        text: "Founded in 1993 in Jinan, Shandong Province, SINOTRUK International began as a regional truck assembler with a workforce of 300. Over three decades, we have grown into one of China's most respected commercial vehicle manufacturers, with annual production exceeding 350,000 units and a global presence spanning 90+ countries.",
        image: "/images/factory-workshop.png",
      },
      {
        heading: "Global Reach",
        text: "Today, SINOTRUK operates representative offices in 80 countries, supported by 280+ dealer partners and 520+ authorized service stations. Our vehicles operate in some of the world's most challenging environments — from the mines of West Africa to the logistics corridors of Southeast Asia and the construction sites of South America.",
        image: "/images/hero-banner-1.png",
      },
      {
        heading: "Innovation & R&D",
        text: "Our R&D division employs over 8,200 engineers and technicians working across vehicle design, powertrain engineering, intelligent driving systems, materials science, and factory process optimization. We hold more than 1,600 patents and invest over 5% of annual revenue in research and development.",
        image: "/images/hero-banner-2.png",
      },
    ],
  },
  "our-journey": {
    title: "Our Journey",
    subtitle: "Key milestones that shaped SINOTRUK into a global commercial vehicle leader.",
    milestones: [
      { year: "1993", title: "Company Founded", description: "SINOTRUK established in Jinan with a 300-person workforce and a single assembly line." },
      { year: "1998", title: "First Export Order", description: "Delivered 50 dump trucks to Southeast Asia, marking our entry into international markets." },
      { year: "2003", title: "Engine Division", description: "Launched in-house engine manufacturing, achieving vertical integration of powertrain production." },
      { year: "2008", title: "100,000 Units", description: "Annual production surpassed 100,000 vehicles for the first time." },
      { year: "2012", title: "African Expansion", description: "Opened regional headquarters in Lagos, Nigeria, establishing a dedicated African sales and service network." },
      { year: "2016", title: "AMT Technology", description: "Introduced proprietary 12-speed automated manual transmission, reducing fuel consumption by 8%." },
      { year: "2019", title: "Electric Vehicle Program", description: "Launched new energy vehicle division, beginning development of battery-electric commercial platforms." },
      { year: "2022", title: "Smart Factory", description: "Commissioned AI-driven quality inspection and robotic welding across all assembly lines." },
      { year: "2024", title: "EV Production", description: "First battery-electric heavy-duty trucks enter series production with 300 km range." },
      { year: "2026", title: "Global Milestone", description: "Cumulative exports surpass 2 million vehicles across 90+ countries." },
    ],
  },
  "our-facilities": {
    title: "Our Facilities",
    subtitle: "World-class manufacturing infrastructure across eight production bases in China.",
    sections: [
      {
        heading: "Manufacturing Scale",
        text: "SINOTRUK operates eight production bases across China, with a combined annual capacity of 400,000 vehicles. Our flagship Jinan facility spans 2.4 million square meters and houses dedicated lines for heavy trucks, light trucks, special vehicles, and new energy vehicles.",
        image: "/images/hero-banner-2.png",
      },
    ],
    workshops: [
      "Axle Assembly Line",
      "Cabin Welding Line",
      "Chassis Assembly Line",
      "Engine Assembly Line",
      "Final Inspection Line",
      "Paint Shop",
    ],
    equipment: [
      "Robotic Welding Cells",
      "Automated Paint Booth",
      "CNC Machining Center",
      "Engine Test Bench",
      "Chassis Dynamometer",
      "Climate Test Chamber",
    ],
  },
  "social-responsibility": {
    title: "Social Responsibility",
    subtitle: "Generating positive impact through sustainable operations and community investment.",
    pillars: [
      { title: "New Energy Transition", description: "Committed to carbon-neutral manufacturing by 2030, with battery-electric and hydrogen fuel cell platforms reducing fleet emissions across our customers' operations." },
      { title: "Low-Carbon Operations", description: "Solar-powered production facilities, closed-loop water recycling, and zero-waste-to-landfill targets across all eight manufacturing bases." },
      { title: "Safety First", description: "Every SINOTRUK vehicle undergoes 120+ safety checkpoints. Our cabs meet ECE R29-03 crash standards and our braking systems exceed international regulatory requirements." },
      { title: "Community Investment", description: "Technical training programs in 15 countries have graduated over 5,000 local technicians, creating skilled employment opportunities in our host communities." },
      { title: "Charitable Giving", description: "The SINOTRUK Foundation supports education, healthcare, and disaster relief initiatives in the communities where we operate, with annual giving exceeding $2 million." },
    ],
  },
};

// ── Service Pages ──
export const servicePages = {
  "after-sales-service": {
    title: "After-Sales Service",
    subtitle: "Comprehensive support to maximize your fleet's uptime and total cost of ownership.",
    sections: [
      { heading: "Scheduled Maintenance", text: "Our preventive maintenance programs are tailored to your operating conditions and duty cycles. Factory-trained technicians at 520+ authorized service stations perform scheduled inspections using genuine SINOTRUK parts, helping prevent unexpected breakdowns and maximizing vehicle uptime.", image: "/images/factory-workshop.png" },
      { heading: "Technical Training", text: "We offer comprehensive driver training (covering safety, fuel-efficient driving techniques, and vehicle operation) and repair training (covering diagnostics, component disassembly/reassembly, and electronic system troubleshooting) at our regional training centers.", image: "/images/hero-banner-2.png" },
      { heading: "Genuine Parts Supply", text: "Our global parts logistics network ensures rapid delivery of genuine OEM components. Each SINOTRUK regional warehouse maintains inventory of over 3,000 part numbers, with emergency air-freight capability for critical components.", image: "/images/product-tractor-truck.png" },
    ],
  },
  "service-broadcast": {
    title: "Service Broadcast",
    subtitle: "Live technical demonstrations and diagnostic walkthroughs for dealer technicians.",
    sections: [
      { heading: "Technical Repair Demonstrations", text: "Our Service Broadcast program delivers live technical repair demonstrations to authorized dealer technicians worldwide. Each session covers a specific repair procedure — from engine overhaul to gearbox servicing to electrical diagnostics — presented by SINOTRUK factory engineers.", image: "/images/hero-banner-2.png" },
      { heading: "Regional Training Centers", text: "SINOTRUK operates regional training centers in Lagos, Bangkok, Lima, Dubai, and Moscow. Each center is equipped with vehicle lifts, engine teardown stations, and diagnostic equipment matching our factory service facilities. Training programs range from 2-week basic maintenance to 8-week master technician certification.", image: "/images/factory-workshop.png" },
    ],
  },
  "maintenance-manual": {
    title: "Maintenance Manual",
    subtitle: "Comprehensive documentation for every SINOTRUK vehicle model.",
    sections: [
      { heading: "Warranty Coverage", text: "All SINOTRUK vehicles are covered by a standard 12-month / 100,000 km warranty from the date of delivery. Warranty covers manufacturing defects in materials and workmanship across all major vehicle systems including engine, transmission, axles, and chassis components.", image: "/images/product-tractor-truck.png" },
      { heading: "Operator Manuals", text: "Every vehicle is supplied with a comprehensive operator's manual covering daily inspection procedures, fluid specifications, service intervals, and basic troubleshooting. Digital versions are available for download from our customer portal.", image: "/images/product-dump-truck.png" },
    ],
  },
};

// ── Parts Data ──
export interface PartItem {
  name: string;
  sku: string;
  image: string;
}

export const partsData: Record<string, { title: string; items: PartItem[] }> = {
  "cabin-and-body": {
    title: "Cabin & Body Parts",
    items: [
      { name: "Side Mirror Assembly", sku: "WG1642770001", image: "/images/product-dump-truck.png" },
      { name: "Front Bumper", sku: "WG1642010001", image: "/images/product-dump-truck.png" },
      { name: "Headlamp Assembly", sku: "WG9718770001", image: "/images/product-dump-truck.png" },
      { name: "Fog Lamp", sku: "WG9718770002", image: "/images/product-dump-truck.png" },
      { name: "Door Handle", sku: "WG1642810001", image: "/images/product-dump-truck.png" },
    ],
  },
  engine: {
    title: "Engine Parts",
    items: [
      { name: "Water Pump Assembly", sku: "VG1560090001", image: "/images/product-dump-truck.png" },
      { name: "Turbocharger", sku: "VG1560110001", image: "/images/product-dump-truck.png" },
      { name: "Starter Motor", sku: "VG1560090002", image: "/images/product-dump-truck.png" },
      { name: "Oil Filter", sku: "VG1560070001", image: "/images/product-dump-truck.png" },
      { name: "Fuel Injector", sku: "VG1560080001", image: "/images/product-dump-truck.png" },
    ],
  },
  gearbox: {
    title: "Gearbox Parts",
    items: [
      { name: "Synchronizer Gear Holder", sku: "WG2210100007", image: "/images/product-dump-truck.png" },
      { name: "Transmission Rear Housing", sku: "WG2210010001", image: "/images/product-dump-truck.png" },
      { name: "Input Shaft Bearing", sku: "WG2210030001", image: "/images/product-dump-truck.png" },
      { name: "Clutch Assembly", sku: "WG2210060001", image: "/images/product-dump-truck.png" },
      { name: "Shift Fork", sku: "WG2210100001", image: "/images/product-dump-truck.png" },
    ],
  },
  axle: {
    title: "Axle Parts",
    items: [
      { name: "Differential Assembly", sku: "WG9718330001", image: "/images/product-dump-truck.png" },
      { name: "Wheel Hub", sku: "WG9718340001", image: "/images/product-dump-truck.png" },
      { name: "Axle Shaft", sku: "WG9718350001", image: "/images/product-dump-truck.png" },
      { name: "Bearing Kit", sku: "WG9718360001", image: "/images/product-dump-truck.png" },
      { name: "Oil Seal", sku: "WG9718370001", image: "/images/product-dump-truck.png" },
    ],
  },
  chassis: {
    title: "Chassis Parts",
    items: [
      { name: "Brake Shoe Assembly", sku: "WG9100440030", image: "/images/product-dump-truck.png" },
      { name: "Leaf Spring", sku: "WG9718410001", image: "/images/product-dump-truck.png" },
      { name: "U-Bolt Kit", sku: "WG9718420001", image: "/images/product-dump-truck.png" },
      { name: "Shock Absorber", sku: "WG9718430001", image: "/images/product-dump-truck.png" },
      { name: "Air Spring", sku: "WG9718440001", image: "/images/product-dump-truck.png" },
    ],
  },
  "other-parts": {
    title: "Other Parts",
    items: [
      { name: "Flywheel Assembly", sku: "VG1560118229", image: "/images/product-dump-truck.png" },
      { name: "Air Compressor", sku: "VG1560130001", image: "/images/product-dump-truck.png" },
      { name: "Crankshaft", sku: "VG1560020001", image: "/images/product-dump-truck.png" },
      { name: "Electrical Harness", sku: "WG9718790001", image: "/images/product-dump-truck.png" },
      { name: "Cabin Air Filter", sku: "WG1642820001", image: "/images/product-dump-truck.png" },
    ],
  },
};

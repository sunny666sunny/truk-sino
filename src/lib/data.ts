export const navLinks = [
  { label: "Home", href: "#home" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about/who-we-are" },
      { label: "Our Journey", href: "/about/our-journey" },
      { label: "Our Facilities", href: "/about/our-facilities" },
      { label: "Social Responsibility", href: "/about/social-responsibility" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    mega: true,
    megaColumns: [
      {
        title: "Heavy Truck",
        links: [
          { label: "Dump Truck", href: "/products/heavy-truck" },
          { label: "Tractor Truck", href: "/products/heavy-truck" },
          { label: "Cargo Truck", href: "/products/heavy-truck" },
        ],
      },
      {
        title: "Light & Special",
        links: [
          { label: "Light Truck", href: "/products/light-truck" },
          { label: "Water Tanker", href: "/products/special-vehicle" },
          { label: "Mixer Truck", href: "/products/special-vehicle" },
          { label: "Oil Tanker", href: "/products/special-vehicle" },
        ],
      },
      {
        title: "Trailer & EV",
        links: [
          { label: "Semi Trailer", href: "/products/semi-trailer" },
          { label: "Pickup & SUV", href: "/products/light-vehicle" },
          { label: "New Energy Vehicle", href: "/products/new-energy-vehicle" },
        ],
      },
    ],
  },
  {
    label: "Parts",
    href: "/parts",
    children: [
      { label: "Cabin & Body", href: "/parts/cabin-and-body" },
      { label: "Engine", href: "/parts/engine" },
      { label: "Gearbox", href: "/parts/gearbox" },
      { label: "Axle", href: "/parts/axle" },
      { label: "Chassis", href: "/parts/chassis" },
      { label: "Other Parts", href: "/parts/other-parts" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Video", href: "/video" },
  {
    label: "Service",
    href: "/service",
    children: [
      { label: "After-Sales Service", href: "/service/after-sales-service" },
      { label: "Service Broadcast", href: "/service/service-broadcast" },
      { label: "Maintenance Manual", href: "/service/maintenance-manual" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export const products = [
  {
    id: "dump-truck",
    name: "Heavy-Duty Dump Trucks",
    category: "Heavy Truck",
    image: "/images/product-dump-truck.png",
    excerpt:
      "Engineered for the harshest mining and construction environments. Payloads from 20 to 50 tons with reinforced steel bodies and proven powertrains.",
    badge: "Best Seller",
  },
  {
    id: "tractor-truck",
    name: "Tractor Trucks",
    category: "Heavy Truck",
    image: "/images/product-tractor-truck.png",
    excerpt:
      "Long-haul and regional tractor units with fuel-efficient engines up to 540 HP. Ergonomic sleeper cabs designed for driver comfort on extended routes.",
  },
  {
    id: "cargo-truck",
    name: "Cargo Trucks",
    category: "Heavy Truck",
    image: "/images/product-cargo-truck.png",
    excerpt:
      "Versatile cargo platforms available in 4x2, 6x4, and 8x4 configurations. Customizable body types including stake, box, and refrigerated variants.",
  },
  {
    id: "mixer-truck",
    name: "Concrete Mixer Trucks",
    category: "Special Vehicle",
    image: "/images/product-mixer-truck.png",
    excerpt:
      "High-capacity mixer trucks with drum volumes from 6 to 16 cubic meters. Hydraulic systems engineered for continuous operation on demanding job sites.",
  },
  {
    id: "light-truck",
    name: "Light Commercial Trucks",
    category: "Light Truck",
    image: "/images/product-light-truck.png",
    excerpt:
      "Agile and efficient light-duty trucks for urban distribution. GVW from 4.5 to 12 tons with modern cabs and low operating costs.",
  },
  {
    id: "electric-truck",
    name: "New Energy Vehicles",
    category: "New Energy",
    image: "/images/product-electric-truck.png",
    excerpt:
      "Zero-emission electric and hybrid commercial vehicles. Battery-electric range up to 300 km with fast-charge capability for sustainable fleet operations.",
    badge: "New",
  },
];

export const stats = [
  { value: 90, suffix: "+", label: "Export Countries", icon: "Globe" },
  { value: 350000, suffix: "+", label: "Vehicles Delivered Annually", icon: "Truck" },
  { value: 280, suffix: "+", label: "Global Dealer Partners", icon: "Handshake" },
  { value: 520, suffix: "+", label: "Service Stations Worldwide", icon: "Wrench" },
];

export const advantages = [
  {
    icon: "Cog",
    title: "Advanced Powertrain",
    description:
      "In-house engines from 240 to 540 HP with Euro V/VI compliance. Automated manual transmissions and optimized drivetrains deliver best-in-class fuel efficiency.",
  },
  {
    icon: "Shield",
    title: "Safety Engineering",
    description:
      "ECE R29-03 certified cabs with high-strength steel structures. Standard ABS, ESC, lane departure warning, and automatic emergency braking across all models.",
  },
  {
    icon: "Brain",
    title: "Intelligent Systems",
    description:
      "Level 2+ autonomous driving capabilities, fleet telematics, remote diagnostics, and over-the-air updates keep your fleet connected and efficient.",
  },
  {
    icon: "Thermometer",
    title: "Extreme Adaptation",
    description:
      "Vehicles tested and validated from -45°C Arctic cold to +55°C desert heat. High-altitude calibration and tropical cooling packages available.",
  },
  {
    icon: "Leaf",
    title: "Green Technology",
    description:
      "Full lineup of battery-electric, hybrid, and hydrogen fuel cell vehicles. Zero-emission solutions for urban logistics and port operations.",
  },
  {
    icon: "Headset",
    title: "Global Support Network",
    description:
      "520+ service stations in 90+ countries. 24/7 technical hotline, rapid spare parts logistics, and factory-trained local technicians.",
  },
];

export const applications = [
  {
    title: "Construction",
    description: "Dump trucks and mixers for building infrastructure",
    gradient: "from-amber-900 to-amber-700",
  },
  {
    title: "Mining",
    description: "Heavy haulers built for extreme quarry conditions",
    gradient: "from-stone-800 to-stone-600",
  },
  {
    title: "Logistics",
    description: "Tractor trucks and cargo vehicles for long-haul freight",
    gradient: "from-brand-800 to-brand-600",
  },
  {
    title: "Port Operations",
    description: "Terminal tractors and specialized port equipment",
    gradient: "from-blue-900 to-blue-700",
  },
  {
    title: "Energy",
    description: "Oil tankers and fuel delivery fleet solutions",
    gradient: "from-red-900 to-red-700",
  },
  {
    title: "Municipal",
    description: "Water tankers, sweepers, and waste collection",
    gradient: "from-emerald-900 to-emerald-700",
  },
];

export const news = [
  {
    id: "1",
    slug: "truksino-ts9-dump-truck-africa-launch",
    title: "TrukSino Launches Next-Gen TS9 Dump Truck for African Mining Markets",
    date: "June 18, 2026",
    excerpt:
      "The TS9 features a reinforced 30-ton payload body, upgraded cooling for tropical conditions, and integrated fleet management telematics.",
    image: "/images/product-dump-truck.png",
  },
  {
    id: "2",
    slug: "ev-fleet-deployment-southeast-asia",
    title: "50 Electric Trucks Deployed for Green Logistics in Southeast Asia",
    date: "May 29, 2026",
    excerpt:
      "TrukSino's largest EV export order to date — battery-electric cargo trucks begin operations in Bangkok's distribution network.",
    image: "/images/product-electric-truck.png",
  },
  {
    id: "3",
    slug: "service-training-center-lagos",
    title: "New Service Training Center Opens in Lagos, Nigeria",
    date: "April 12, 2026",
    excerpt:
      "The facility will train 200+ local technicians annually on vehicle maintenance, diagnostics, and genuine parts identification.",
    image: "/images/factory-workshop.png",
  },
];

export const videos = [
  {
    slug: "brand-film",
    title: "Brand Film: Who We Are",
    thumbnail: "/images/hero-banner-1.png",
  },
  {
    slug: "ts9-field-test",
    title: "TS9 Dump Truck Field Test",
    thumbnail: "/images/product-dump-truck.png",
  },
  {
    slug: "smart-factory-tour",
    title: "Inside the Smart Factory",
    thumbnail: "/images/hero-banner-2.png",
  },
  {
    slug: "amt-transmission",
    title: "AMT Transmission Technology",
    thumbnail: "/images/product-tractor-truck.png",
  },
];

export const partCategories = [
  { name: "Cabin & Body", icon: "Car", description: "Mirrors, bumpers, lamps, panels" },
  { name: "Engine", icon: "Cog", description: "Turbo, injectors, gaskets, pistons" },
  { name: "Gearbox", icon: "Settings", description: "Gears, synchronizers, housings" },
  { name: "Axle", icon: "Circle", description: "Differentials, hubs, bearings" },
  { name: "Chassis", icon: "Square", description: "Brake shoes, springs, U-bolts" },
  { name: "Other Parts", icon: "Package", description: "Electrical, filters, fasteners" },
];

export const regionalOffices = [
  { region: "Africa", sales: "sales.africa@truksino.com", support: "support.africa@truksino.com" },
  { region: "Southeast Asia", sales: "sales.sea@truksino.com", support: "support.sea@truksino.com" },
  { region: "South America", sales: "sales.latam@truksino.com", support: "support.latam@truksino.com" },
  { region: "Middle East", sales: "sales.me@truksino.com", support: "support.me@truksino.com" },
  { region: "CIS Region", sales: "sales.cis@truksino.com", support: "support.cis@truksino.com" },
  { region: "Europe", sales: "sales.eu@truksino.com", support: "support.eu@truksino.com" },
];

/**
 * Seed script imports hardcoded product/news data into the database
 * Run: npm run db:seed
 */
import { prisma } from '../src/lib/prisma-client.ts'

const CATEGORIES = [
  { slug: 'heavy-truck', name: 'Heavy Truck', order: 1 },
  { slug: 'light-truck', name: 'Light Truck', order: 2 },
  { slug: 'special-vehicle', name: 'Special Vehicle', order: 3 },
  { slug: 'semi-trailer', name: 'Semi Trailer', order: 4 },
  { slug: 'light-vehicle', name: 'Light Vehicle', order: 5 },
  { slug: 'new-energy-vehicle', name: 'New Energy Vehicle', order: 6 },
]

const PRODUCTS = [
  {
    name: 'Heavy-Duty Dump Trucks',
    categorySlug: 'heavy-truck',
    subCategory: 'Dump Truck',
    status: 'active',
    heroImage: '/images/product-dump-truck.png',
    excerpt: 'Engineered for the harshest mining and construction environments. Payloads from 20 to 50 tons.',
    specifications: [
      { label: 'Payload', value: '20-50', unit: 'tons' },
      { label: 'Engine Power', value: '371', unit: 'HP' },
      { label: 'Wheel Configuration', value: '6x4/8x4', unit: '' },
      { label: 'Cargo Volume', value: '10-30', unit: 'cbm' },
    ],
    features: [
      { title: 'Reinforced Body', description: 'High-strength steel construction for extreme durability' },
      { title: 'Fuel Efficient', description: 'Optimized engine delivers best-in-class fuel consumption' },
      { title: 'Easy Maintenance', description: 'Quick-access service panels and centralized lubrication' },
    ],
    sortOrder: 1,
  },
  {
    name: 'Tractor Trucks',
    categorySlug: 'heavy-truck',
    subCategory: 'Tractor Truck',
    status: 'active',
    heroImage: '/images/product-tractor-truck.png',
    excerpt: 'Long-haul and regional tractor units with fuel-efficient engines up to 540 HP.',
    specifications: [
      { label: 'Engine Power', value: '400-540', unit: 'HP' },
      { label: 'Torque', value: '2100', unit: 'Nm' },
      { label: 'Transmission', value: '12-speed AMT', unit: '' },
      { label: 'Fuel Tank', value: '600', unit: 'L' },
    ],
    features: [
      { title: 'Sleep Cab', description: 'Ergonomic sleeper cab for driver comfort on extended routes' },
      { title: 'Fleet Telematics', description: 'Real-time monitoring and diagnostics via integrated systems' },
    ],
    sortOrder: 2,
  },
  {
    name: 'Cargo Trucks',
    categorySlug: 'heavy-truck',
    subCategory: 'Cargo Truck',
    status: 'active',
    heroImage: '/images/product-cargo-truck.png',
    excerpt: 'Versatile cargo platforms available in 4x2, 6x4, and 8x4 configurations.',
    specifications: [
      { label: 'GVW', value: '18-49', unit: 'tons' },
      { label: 'Engine Power', value: '240-460', unit: 'HP' },
      { label: 'Cargo Type', value: 'Stake/Box/Refrigerated', unit: '' },
    ],
    features: [
      { title: 'Multi-Config', description: 'Customizable body types for diverse logistics needs' },
      { title: 'ABS + ESC', description: 'Standard electronic stability and anti-lock braking' },
    ],
    sortOrder: 3,
  },
  {
    name: 'Concrete Mixer Trucks',
    categorySlug: 'special-vehicle',
    subCategory: 'Mixer Truck',
    status: 'active',
    heroImage: '/images/product-mixer-truck.png',
    excerpt: 'High-capacity mixer trucks with drum volumes from 6 to 16 cubic meters.',
    specifications: [
      { label: 'Drum Volume', value: '6-16', unit: 'cbm' },
      { label: 'Loading Capacity', value: '8-25', unit: 'tons' },
      { label: 'Discharge Rate', value: '3.2', unit: 'cbm/min' },
    ],
    features: [
      { title: 'Wear-Resistant', description: 'Manganese steel drum for extended service life' },
      { title: 'Hydraulic System', description: 'Renk or ZF hydraulic drive for continuous operation' },
    ],
    sortOrder: 4,
  },
  {
    name: 'Light Commercial Trucks',
    categorySlug: 'light-truck',
    subCategory: 'Light Truck',
    status: 'active',
    heroImage: '/images/product-light-truck.png',
    excerpt: 'Agile and efficient light-duty trucks for urban distribution. GVW from 4.5 to 12 tons.',
    specifications: [
      { label: 'GVW', value: '4.5-12', unit: 'tons' },
      { label: 'Engine', value: '2.8-3.0', unit: 'turbo diesel' },
      { label: 'Cargo Length', value: '3.5-7.2', unit: 'm' },
    ],
    features: [
      { title: 'Urban Friendly', description: 'Compact turning radius for city maneuverability' },
      { title: 'Low Operating Cost', description: 'Economical fuel consumption and maintenance schedule' },
    ],
    sortOrder: 5,
  },
  {
    name: 'New Energy Vehicles',
    categorySlug: 'new-energy-vehicle',
    subCategory: 'Electric Truck',
    status: 'upcoming',
    heroImage: '/images/product-electric-truck.png',
    excerpt: 'Zero-emission electric and hybrid commercial vehicles. Battery range up to 300 km.',
    specifications: [
      { label: 'Range', value: '200-300', unit: 'km' },
      { label: 'Battery', value: '282-350', unit: 'kWh' },
      { label: 'Charge Time', value: '1.5', unit: 'hours (fast)' },
      { label: 'Payload', value: '8-18', unit: 'tons' },
    ],
    features: [
      { title: 'Zero Emission', description: 'Fully electric powertrain for sustainable operations' },
      { title: 'Fast Charge', description: 'DC fast charging to 80% in 1.5 hours' },
      { title: 'Smart Energy', description: 'Regenerative braking and predictive energy management' },
    ],
    sortOrder: 6,
  },
]

const ARTICLES = [
  {
    title: 'SINOTRUK Launches Next-Gen TS9 Dump Truck for African Mining Markets',
    publishDate: '2026-06-18',
    status: 'published',
    featuredImage: '/images/product-dump-truck.png',
    excerpt: 'The TS9 features a reinforced 30-ton payload body, upgraded cooling for tropical conditions, and integrated fleet management telematics.',
    tags: ['product-launch'],
  },
  {
    title: '50 Electric Trucks Deployed for Green Logistics in Southeast Asia',
    publishDate: '2026-05-29',
    status: 'published',
    featuredImage: '/images/product-electric-truck.png',
    excerpt: "SINOTRUK's largest EV export order to date - battery-electric cargo trucks begin operations in Bangkok's distribution network.",
    tags: ['company-news'],
  },
  {
    title: 'New Service Training Center Opens in Lagos, Nigeria',
    publishDate: '2026-04-12',
    status: 'published',
    featuredImage: '/images/factory-workshop.png',
    excerpt: 'The facility will train 200+ local technicians annually on vehicle maintenance, diagnostics, and genuine parts identification.',
    tags: ['company-news'],
  },
]

async function seed() {
  console.log('Seeding database...\n')

  // Create categories
  for (const cat of CATEGORIES) {
    await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: cat,
    })
    console.log(`  Category: ${cat.name}`)
  }

  // Create products
  for (const prod of PRODUCTS) {
    const { categorySlug, ...productData } = prod
    const category = await prisma.productCategory.findUnique({
      where: { slug: categorySlug },
    })
    if (!category) continue

    const slug = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const data = {
      ...productData,
      slug,
      categoryId: category.id,
      content: [],
    }

    await prisma.product.upsert({
      where: { slug },
      create: data,
      update: data,
    })
    console.log(`  Product: ${prod.name}`)
  }

  // Create articles
  for (const art of ARTICLES) {
    const slug = art.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const data = {
      ...art,
      slug,
      publishDate: new Date(`${art.publishDate}T00:00:00.000Z`),
      content: [],
      faqs: [],
    }

    await prisma.newsArticle.upsert({
      where: { slug },
      create: data,
      update: data,
    })
    console.log(`  Article: ${art.title.slice(0, 50)}...`)
  }

  console.log('\nSeeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
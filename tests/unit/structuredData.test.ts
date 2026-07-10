import { describe, it, expect } from 'vitest'
import {
  organizationSchema,
  productSchema,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from '@/lib/structuredData'

const SITE_URL = 'https://sinotrukteam.com'

describe('organizationSchema', () => {
  const schema = organizationSchema()

  it('returns a valid Organization JSON-LD', () => {
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Organization')
  })

  it('has the correct name', () => {
    expect(schema.name).toBe('SINOTRUK International')
  })

  it('has the correct URL', () => {
    expect(schema.url).toBe(SITE_URL)
  })

  it('has a valid postal address', () => {
    expect(schema.address['@type']).toBe('PostalAddress')
    expect(schema.address.addressLocality).toBe('Jinan')
    expect(schema.address.addressRegion).toBe('Shandong')
    expect(schema.address.addressCountry).toBe('CN')
    expect(schema.address.postalCode).toBe('250101')
    expect(schema.address.streetAddress).toContain('Jing Shi Road')
  })

  it('has contact points with sales email', () => {
    expect(schema.contactPoint).toHaveLength(1)
    expect(schema.contactPoint[0].contactType).toBe('sales')
    expect(schema.contactPoint[0].email).toBe('sales@sinotruk.com')
  })

  it('has social media links in sameAs', () => {
    expect(schema.sameAs).toContain('https://www.facebook.com/sinotruk')
    expect(schema.sameAs).toContain('https://www.youtube.com/@sinotruk')
    expect(schema.sameAs).toContain('https://www.linkedin.com/company/sinotruk')
  })
})

describe('productSchema', () => {
  const product = {
    name: 'HOWO TX 6x4 Dump Truck',
    description: 'Heavy-duty dump truck for mining',
    image: '/images/product-dump-truck.png',
    category: 'Heavy Truck',
    sku: 'HOWO-TX-6X4',
  }

  const schema = productSchema(product)

  it('returns a valid Product JSON-LD', () => {
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Product')
  })

  it('includes product name and description', () => {
    expect(schema.name).toBe(product.name)
    expect(schema.description).toBe(product.description)
  })

  it('has the SINOTRUK brand', () => {
    expect(schema.brand['@type']).toBe('Brand')
    expect(schema.brand.name).toBe('SINOTRUK')
  })

  it('includes the category', () => {
    expect(schema.category).toBe('Heavy Truck')
  })

  it('prepends SITE_URL to relative image paths', () => {
    expect(schema.image).toBe(`${SITE_URL}/images/product-dump-truck.png`)
  })

  it('preserves absolute image URLs', () => {
    const absProduct = productSchema({ ...product, image: 'https://cdn.example.com/img.png' })
    expect(absProduct.image).toBe('https://cdn.example.com/img.png')
  })

  it('includes sku when provided', () => {
    expect(schema.sku).toBe('HOWO-TX-6X4')
  })

  it('omits sku when not provided', () => {
    const noSku = productSchema({ name: 'Test', description: 'Desc', image: '/img.png', category: 'Cat' })
    expect(noSku.sku).toBeUndefined()
  })

  it('has valid offers with USD currency and InStock availability', () => {
    expect(schema.offers['@type']).toBe('Offer')
    expect(schema.offers.priceCurrency).toBe('USD')
    expect(schema.offers.availability).toBe('https://schema.org/InStock')
    expect(schema.offers.itemCondition).toBe('https://schema.org/NewCondition')
    expect(schema.offers.url).toBe(`${SITE_URL}/contact`)
  })

  it('has a priceValidUntil set to next year', () => {
    const nextYear = new Date().getFullYear() + 1
    expect(schema.offers.priceValidUntil).toMatch(new RegExp(`^${nextYear}-`))
  })
})

describe('articleSchema', () => {
  const article = {
    title: 'SINOTRUK Launches TS9',
    description: 'New dump truck for African markets',
    image: '/images/news-ts9.png',
    datePublished: '2026-06-15',
    author: 'John Doe',
  }

  const schema = articleSchema(article)

  it('returns a valid Article JSON-LD', () => {
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Article')
  })

  it('maps title to headline', () => {
    expect(schema.headline).toBe(article.title)
  })

  it('includes description and datePublished', () => {
    expect(schema.description).toBe(article.description)
    expect(schema.datePublished).toBe(article.datePublished)
  })

  it('has a Person author when author name is provided', () => {
    expect(schema.author['@type']).toBe('Person')
    expect(schema.author.name).toBe('John Doe')
  })

  it('falls back to Organization author when no author is given', () => {
    const noAuthor = articleSchema({ ...article, author: undefined })
    expect(noAuthor.author['@type']).toBe('Organization')
    expect(noAuthor.author.name).toBe('SINOTRUK International')
  })

  it('has a publisher with logo', () => {
    expect(schema.publisher['@type']).toBe('Organization')
    expect(schema.publisher.name).toBe('SINOTRUK International')
    expect(schema.publisher.logo.url).toBe(`${SITE_URL}/images/logo.png`)
  })

  it('prepends SITE_URL to relative image paths', () => {
    expect(schema.image).toBe(`${SITE_URL}/images/news-ts9.png`)
  })
})

describe('breadcrumbSchema', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'HOWO TX 6x4 Dump Truck' },
  ]

  const schema = breadcrumbSchema(items)

  it('returns a valid BreadcrumbList JSON-LD', () => {
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('BreadcrumbList')
  })

  it('creates ListItem entries with correct positions', () => {
    expect(schema.itemListElement).toHaveLength(3)
    expect(schema.itemListElement[0].position).toBe(1)
    expect(schema.itemListElement[1].position).toBe(2)
    expect(schema.itemListElement[2].position).toBe(3)
  })

  it('maps labels to ListItem names', () => {
    expect(schema.itemListElement[0].name).toBe('Home')
    expect(schema.itemListElement[1].name).toBe('Products')
    expect(schema.itemListElement[2].name).toBe('HOWO TX 6x4 Dump Truck')
  })

  it('prepends SITE_URL to relative hrefs', () => {
    expect(schema.itemListElement[0].item).toBe(`${SITE_URL}/`)
    expect(schema.itemListElement[1].item).toBe(`${SITE_URL}/products`)
  })

  it('omits item property when no href is provided', () => {
    expect(schema.itemListElement[2].item).toBeUndefined()
  })

  it('preserves absolute URLs in href', () => {
    const absItems = [{ label: 'External', href: 'https://example.com/page' }]
    const absSchema = breadcrumbSchema(absItems)
    expect(absSchema.itemListElement[0].item).toBe('https://example.com/page')
  })
})

describe('faqSchema', () => {
  const faqs = [
    { question: 'What is the warranty period?', answer: 'All trucks come with a 2-year warranty.' },
    { question: 'Do you ship internationally?', answer: 'Yes, we ship to 90+ countries worldwide.' },
  ]

  const schema = faqSchema(faqs)

  it('returns a valid FAQPage JSON-LD', () => {
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('FAQPage')
  })

  it('creates Question entries for each FAQ', () => {
    expect(schema.mainEntity).toHaveLength(2)
    expect(schema.mainEntity[0]['@type']).toBe('Question')
    expect(schema.mainEntity[1]['@type']).toBe('Question')
  })

  it('maps questions to name field', () => {
    expect(schema.mainEntity[0].name).toBe('What is the warranty period?')
    expect(schema.mainEntity[1].name).toBe('Do you ship internationally?')
  })

  it('includes accepted answers', () => {
    expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('All trucks come with a 2-year warranty.')
    expect(schema.mainEntity[1].acceptedAnswer.text).toBe('Yes, we ship to 90+ countries worldwide.')
  })
})

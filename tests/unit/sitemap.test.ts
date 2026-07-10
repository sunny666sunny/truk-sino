import { beforeAll, describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { allProducts, allNews, allVideos, productCategories } from '@/lib/pageData'

const SITE_URL = 'https://sinotrukteam.com'

describe('sitemap', () => {
  let entries: Awaited<ReturnType<typeof sitemap>>

  beforeAll(async () => {
    entries = await sitemap()
  })

  const staticPageCount = 15
  const categoryPageCount = productCategories.length
  const productPageCount = allProducts.length
  const newsPageCount = allNews.length
  const videoPageCount = allVideos.length
  const partPageCount = 6
  const expectedMinimum =
    staticPageCount +
    categoryPageCount +
    productPageCount +
    newsPageCount +
    videoPageCount +
    partPageCount

  it('returns an array of URL entries', () => {
    expect(Array.isArray(entries)).toBe(true)
    expect(entries.length).toBeGreaterThan(0)
  })

  it('contains at least the fallback static pages', () => {
    expect(entries.length).toBeGreaterThanOrEqual(expectedMinimum)
  })

  it('every entry has loc (url), lastModified, changeFrequency, and priority', () => {
    for (const entry of entries) {
      expect(entry).toHaveProperty('url')
      expect(entry).toHaveProperty('lastModified')
      expect(entry).toHaveProperty('changeFrequency')
      expect(entry).toHaveProperty('priority')
      expect(typeof entry.url).toBe('string')
      expect(entry.url!.startsWith(SITE_URL)).toBe(true)
    }
  })

  it('homepage has priority 1.0', () => {
    const homepage = entries.find((e) => e.url === SITE_URL)
    expect(homepage).toBeDefined()
    expect(homepage!.priority).toBe(1.0)
  })

  it('includes product category pages', () => {
    for (const cat of productCategories) {
      const entry = entries.find((e) => e.url === `${SITE_URL}/products/${cat.slug}`)
      expect(entry).toBeDefined()
      expect(entry!.priority).toBe(0.8)
    }
  })

  it('includes product detail pages', () => {
    for (const product of allProducts) {
      const url = `${SITE_URL}/products/${product.categorySlug}/${product.slug}`
      const entry = entries.find((e) => e.url === url)
      expect(entry).toBeDefined()
      expect(entry!.priority).toBe(0.8)
      expect(entry!.changeFrequency).toBe('weekly')
    }
  })

  it('includes news article pages', () => {
    for (const news of allNews) {
      const url = `${SITE_URL}/news/${news.slug}`
      const entry = entries.find((e) => e.url === url)
      expect(entry).toBeDefined()
      expect(entry!.priority).toBe(0.7)
    }
  })

  it('includes video pages', () => {
    for (const video of allVideos) {
      const url = `${SITE_URL}/video/${video.slug}`
      const entry = entries.find((e) => e.url === url)
      expect(entry).toBeDefined()
      expect(entry!.priority).toBe(0.6)
    }
  })

  it('includes parts category pages', () => {
    const partSlugs = [
      'cabin-and-body',
      'engine',
      'gearbox',
      'axle',
      'chassis',
      'other-parts',
    ]
    for (const slug of partSlugs) {
      const url = `${SITE_URL}/parts/${slug}`
      const entry = entries.find((e) => e.url === url)
      expect(entry).toBeDefined()
    }
  })

  it('has correct priorities for key static pages', () => {
    const productsPage = entries.find((e) => e.url === `${SITE_URL}/products`)
    expect(productsPage!.priority).toBe(0.9)

    const newsPage = entries.find((e) => e.url === `${SITE_URL}/news`)
    expect(newsPage!.priority).toBe(0.8)

    const contactPage = entries.find((e) => e.url === `${SITE_URL}/contact`)
    expect(contactPage!.priority).toBe(0.8)
  })
})
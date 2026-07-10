import { describe, it, expect } from 'vitest'
import { z } from 'zod'

/**
 * Re-create the inquiry validation schema from src/app/api/inquiry/route.ts.
 * The schema is not exported from the route file, so we replicate it here
 * to test the validation rules independently.
 */
const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Please select a country'),
  company: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

const validInquiry = {
  name: 'John Doe',
  email: 'john@example.com',
  country: 'Nigeria',
  message: 'I am interested in your HOWO TX dump trucks for our mining operation.',
}

describe('inquirySchema validation', () => {
  it('accepts valid inquiry data with only required fields', () => {
    const result = inquirySchema.safeParse(validInquiry)
    expect(result.success).toBe(true)
  })

  it('accepts valid inquiry data with all optional fields', () => {
    const result = inquirySchema.safeParse({
      ...validInquiry,
      phone: '+234-800-123-4567',
      company: 'Acme Mining Ltd.',
      productInterest: 'HOWO TX 6x4 Dump Truck',
      quantity: '50',
    })
    expect(result.success).toBe(true)
  })

  it('allows optional fields to be omitted', () => {
    const result = inquirySchema.safeParse(validInquiry)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.phone).toBeUndefined()
      expect(result.data.company).toBeUndefined()
      expect(result.data.productInterest).toBeUndefined()
      expect(result.data.quantity).toBeUndefined()
    }
  })

  describe('missing required fields', () => {
    it('fails when name is missing', () => {
      const data: Partial<typeof validInquiry> = { ...validInquiry }; delete data.name
      const result = inquirySchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        const nameIssue = result.error.issues.find((i) => i.path.includes('name'))
        expect(nameIssue).toBeDefined()
      }
    })

    it('fails when email is missing', () => {
      const data: Partial<typeof validInquiry> = { ...validInquiry }; delete data.email
      const result = inquirySchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        const emailIssue = result.error.issues.find((i) => i.path.includes('email'))
        expect(emailIssue).toBeDefined()
      }
    })

    it('fails when country is missing', () => {
      const data: Partial<typeof validInquiry> = { ...validInquiry }; delete data.country
      const result = inquirySchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        const countryIssue = result.error.issues.find((i) => i.path.includes('country'))
        expect(countryIssue).toBeDefined()
      }
    })

    it('fails when message is missing', () => {
      const data: Partial<typeof validInquiry> = { ...validInquiry }; delete data.message
      const result = inquirySchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        const messageIssue = result.error.issues.find((i) => i.path.includes('message'))
        expect(messageIssue).toBeDefined()
      }
    })
  })

  describe('invalid field values', () => {
    it('fails with invalid email format', () => {
      const result = inquirySchema.safeParse({ ...validInquiry, email: 'not-an-email' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const emailIssue = result.error.issues.find((i) => i.path.includes('email'))
        expect(emailIssue).toBeDefined()
        expect(emailIssue!.message).toBe('Please enter a valid email address')
      }
    })

    it('fails when name is too short (less than 2 characters)', () => {
      const result = inquirySchema.safeParse({ ...validInquiry, name: 'J' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const nameIssue = result.error.issues.find((i) => i.path.includes('name'))
        expect(nameIssue).toBeDefined()
        expect(nameIssue!.message).toBe('Name must be at least 2 characters')
      }
    })

    it('fails when message is too short (less than 10 characters)', () => {
      const result = inquirySchema.safeParse({ ...validInquiry, message: 'Hi' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const messageIssue = result.error.issues.find((i) => i.path.includes('message'))
        expect(messageIssue).toBeDefined()
        expect(messageIssue!.message).toBe('Message must be at least 10 characters')
      }
    })

    it('fails when country is an empty string', () => {
      const result = inquirySchema.safeParse({ ...validInquiry, country: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const countryIssue = result.error.issues.find((i) => i.path.includes('country'))
        expect(countryIssue).toBeDefined()
        expect(countryIssue!.message).toBe('Please select a country')
      }
    })
  })
})

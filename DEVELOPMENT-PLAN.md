## TrukSino International 网站开发计划

---

### 一、技术架构总览

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN / Edge                           │
│                      (Vercel / Cloudflare)                  │
├──────────────────────┬──────────────────────────────────────┤
│   Next.js 14 (App)   │        Payload CMS 3 (Admin)        │
│   ┌───────────────┐  │        ┌──────────────────┐         │
│   │ SSR / SSG     │  │        │ Product CRUD     │         │
│   │ ISR 增量再生  │  │        │ News / Blog      │         │
│   │ API Routes    │◄─┼───────►│ Parts Catalog    │         │
│   │ Middleware    │  │        │ Media Library    │         │
│   └───────┬───────┘  │        │ Inquiries        │         │
│           │          │        │ SEO Meta Fields  │         │
│           ▼          │        └────────┬─────────┘         │
│   ┌───────────────┐  │                 │                    │
│   │ Payload SDK   │  │                 ▼                    │
│   │ (REST + GQL)  │  │   ┌──────────────────────┐          │
│   └───────────────┘  │   │  PostgreSQL 16       │          │
│                      │   │  + Drizzle ORM       │          │
├──────────────────────┴───┴──────────────────────┘──────────┤
│                   Shared Services                           │
│   Resend (Email)  │  Cloudinary (Images)  │  GA4 + Sentry  │
└─────────────────────────────────────────────────────────────┘
```

**为什么选这套栈：**

B2B 外贸网站的核心诉求是 SEO 排名、询盘转化、内容可维护性。Next.js 的 SSR/SSG/ISR 三模式组合是当前解决这三个诉求的最优方案：产品页用 SSG 保证加载速度，新闻页用 ISR 实现内容更新后自动再生，API Routes 处理询盘表单。Payload CMS 3 是 Node.js 原生的开源 headless CMS，TypeScript 全栈统一，不像 WordPress 那样引入 PHP 依赖，部署在同一个 Node 进程中或独立部署均可。

---

### 二、核心技术栈明细

| 层级 | 技术选型 | 版本 | 用途 |
|------|---------|------|------|
| **框架** | Next.js (App Router) | 14.x | 全栈 React 框架，SSR/SSG/ISR |
| **语言** | TypeScript | 5.x | 类型安全，全栈统一 |
| **样式** | Tailwind CSS | 3.x | 原子化 CSS + 自定义 Design Tokens |
| **动画** | Framer Motion | 11.x | 页面过渡、滚动动画、微交互 |
| **CMS** | Payload CMS 3 | 3.x | 开源 headless CMS，TypeScript 原生 |
| **数据库** | PostgreSQL | 16 | 关系型数据库，Payload 默认支持 |
| **ORM** | Drizzle ORM | 0.x | Payload 3 内置，类型安全查询 |
| **媒体** | Cloudinary | — | 图片/视频 CDN + 自动 WebP/AVIF 转换 |
| **邮件** | Resend | — | 询盘邮件发送（替代 Nodemailer） |
| **表单** | React Hook Form + Zod | — | 表单状态管理 + 运行时校验 |
| **国际化** | next-intl | 3.x | 多语言（英/法/西/阿/俄） |
| **监控** | Sentry + Vercel Analytics | — | 错误追踪 + 性能监控 |
| **测试** | Vitest + Playwright | — | 单元测试 + E2E 测试 |
| **部署** | Vercel (Frontend) + Railway (CMS+DB) | — | 全球 CDN + 托管 PostgreSQL |
| **CI/CD** | GitHub Actions | — | 自动测试 + 构建 + 部署 |

---

### 三、项目目录结构

```
truk-sino/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # 根布局（Header + Footer + SEO）
│   │   ├── page.tsx                  # 首页
│   │   ├── globals.css               # Tailwind 入口 + CSS Variables
│   │   ├── [locale]/                 # 多语言路由
│   │   │   ├── about/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── who-we-are/page.tsx
│   │   │   │   ├── our-journey/page.tsx
│   │   │   │   ├── our-facilities/page.tsx
│   │   │   │   └── social-responsibility/page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx                           # 产品总览
│   │   │   │   ├── [category]/page.tsx                # 分类页（heavy-truck 等）
│   │   │   │   └── [category]/[slug]/page.tsx         # 产品详情页
│   │   │   ├── parts/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [category]/page.tsx
│   │   │   ├── news/
│   │   │   │   ├── page.tsx                           # 新闻列表（分页）
│   │   │   │   └── [slug]/page.tsx                    # 文章详情
│   │   │   ├── video/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── service/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── after-sales-service/page.tsx
│   │   │   │   ├── service-broadcast/page.tsx
│   │   │   │   └── maintenance-manual/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── api/
│   │   │   ├── inquiry/route.ts      # 询盘提交 API
│   │   │   ├── newsletter/route.ts   # 邮件订阅 API
│   │   │   └── sitemap/route.ts      # 动态 sitemap 生成
│   │   └── sitemap.ts                # Next.js 原生 sitemap 生成
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # 固定导航 + Mega Menu
│   │   │   ├── Footer.tsx            # 五列页脚
│   │   │   ├── MobileNav.tsx         # 移动端侧滑菜单
│   │   │   └── Breadcrumb.tsx        # 面包屑组件
│   │   ├── sections/
│   │   │   ├── Hero.tsx              # 轮播 Hero
│   │   │   ├── ProductGrid.tsx       # 产品卡片网格
│   │   │   ├── StatsCounter.tsx      # 数字统计条
│   │   │   ├── Advantages.tsx        # 优势卡片
│   │   │   ├── Applications.tsx      # 行业应用
│   │   │   ├── NewsFeed.tsx          # 新闻列表
│   │   │   ├── VideoGallery.tsx      # 视频网格
│   │   │   ├── ServiceCards.tsx      # 服务卡片
│   │   │   └── CTASection.tsx        # CTA 横幅
│   │   ├── ui/
│   │   │   ├── Button.tsx            # 按钮（primary/outline/ghost）
│   │   │   ├── Card.tsx              # 通用卡片容器
│   │   │   ├── SectionHeader.tsx     # 板块标题组件
│   │   │   ├── Badge.tsx             # 标签/徽章
│   │   │   └── Carousel.tsx          # 轮播基础组件
│   │   ├── forms/
│   │   │   ├── InquiryForm.tsx       # 询盘表单
│   │   │   └── NewsletterForm.tsx    # 邮件订阅
│   │   └── shared/
│   │       ├── ScrollReveal.tsx      # 滚动渐显 HOC
│   │       ├── LazyImage.tsx         # 懒加载图片
│   │       └── CounterAnimation.tsx  # 计数器动画
│   │
│   ├── lib/
│   │   ├── payload.ts                # Payload SDK 客户端初始化
│   │   ├── inquiries.ts              # 询盘业务逻辑
│   │   ├── email.ts                  # Resend 邮件发送
│   │   ├── cloudinary.ts             # Cloudinary 配置
│   │   └── seo.ts                    # SEO metadata 生成器
│   │
│   ├── hooks/
│   │   ├── useScrollHeader.ts        # 导航栏滚动效果
│   │   ├── useIntersection.ts        # IntersectionObserver hook
│   │   ├── useCountUp.ts             # 计数器动画 hook
│   │   └── useCarousel.ts            # 轮播控制 hook
│   │
│   ├── types/
│   │   ├── product.ts                # 产品类型定义
│   │   ├── news.ts                   # 新闻类型
│   │   ├── parts.ts                  # 配件类型
│   │   └── inquiry.ts               # 询盘类型
│   │
│   └── payload/                      # Payload CMS 配置
│       ├── payload.config.ts         # CMS 全局配置
│       ├── collections/
│       │   ├── Products.ts           # 产品集合（含分类、规格）
│       │   ├── ProductCategories.ts  # 产品分类树
│       │   ├── Parts.ts              # 配件集合
│       │   ├── News.ts               # 新闻/博客
│       │   ├── Videos.ts             # 视频
│       │   ├── Inquiries.ts          # 询盘记录
│       │   ├── Media.ts              # 媒体库
│       │   ├── Pages.ts              # 通用页面（服务子页面等）
│       │   └── Users.ts              # 管理员
│       ├── globals/
│       │   ├── SiteSettings.ts       # 站点设置（Logo、联系信息等）
│       │   ├── SEO.ts                # 全局 SEO 设置
│       │   └── Navigation.ts         # 导航菜单配置
│       └── fields/
│           ├── seoFields.ts          # 可复用 SEO 字段组
│           └── linkFields.ts         # 可复用链接字段组
│
├── public/
│   ├── images/                       # 静态图片（已生成的）
│   ├── fonts/                        # 自托管字体文件
│   ├── robots.txt
│   └── favicon.ico
│
├── messages/                         # next-intl 翻译文件
│   ├── en.json
│   ├── fr.json
│   ├── es.json
│   ├── ar.json
│   └── ru.json
│
├── tests/
│   ├── unit/                         # Vitest 单元测试
│   └── e2e/                          # Playwright E2E 测试
│
├── .github/workflows/
│   ├── ci.yml                        # PR 检查：lint + test + build
│   └── deploy.yml                    # main 分支自动部署
│
├── tailwind.config.ts                # Tailwind 配置 + Design Tokens
├── next.config.ts                    # Next.js 配置
├── tsconfig.json
├── package.json
├── .env.local                        # 本地环境变量
└── docker-compose.yml                # 本地开发：PostgreSQL
```

---

### 四、Design Tokens（Tailwind 配置）

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0b1e36',   // --primary
          800: '#132d4f',
          700: '#1a3d68',
          600: '#1a6fa0',   // complement
          100: '#e6f2fa',
        },
        accent: {
          DEFAULT: '#e8580c',
          hover: '#ff6b1a',
          soft: '#fff3ec',
        },
        surface: {
          DEFAULT: '#ffffff',
          warm: '#faf8f5',
          section: '#f4f1ec',
        },
        ink: {
          DEFAULT: '#2a2a2a',
          light: '#5a6677',
          muted: '#8a96a6',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Arial Narrow', 'sans-serif'],
        body: ['Barlow', 'system-ui', 'sans-serif'],
        condensed: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography via clamp()
        'fluid-xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem)', { lineHeight: '1.5' }],
        'fluid-sm': ['clamp(0.8125rem, 0.78rem + 0.2vw, 0.875rem)', { lineHeight: '1.5' }],
        'fluid-base': ['clamp(0.9375rem, 0.88rem + 0.3vw, 1.0625rem)', { lineHeight: '1.7' }],
        'fluid-lg': ['clamp(1.0625rem, 0.98rem + 0.45vw, 1.25rem)', { lineHeight: '1.6' }],
        'fluid-xl': ['clamp(1.25rem, 1.1rem + 0.8vw, 1.625rem)', { lineHeight: '1.4' }],
        'fluid-2xl': ['clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)', { lineHeight: '1.2' }],
        'fluid-3xl': ['clamp(1.875rem, 1.4rem + 2.4vw, 3rem)', { lineHeight: '1.15' }],
        'fluid-4xl': ['clamp(2.5rem, 1.8rem + 3.5vw, 4.5rem)', { lineHeight: '1.05' }],
      },
      spacing: {
        'fluid-xs': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'fluid-md': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)',
        'fluid-xl': 'clamp(2.5rem, 1.8rem + 3.5vw, 5rem)',
        'fluid-2xl': 'clamp(4rem, 3rem + 5vw, 8rem)',
      },
      borderRadius: {
        'brand': '6px',
        'brand-lg': '12px',
      },
      animation: {
        'reveal': 'reveal 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'counter': 'counter 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),  // 新闻文章排版
    require('@tailwindcss/forms'),       // 表单样式
  ],
}
export default config
```

---

### 五、响应式设计方案

采用 **Mobile-First + Container Queries** 的混合策略：

**断点体系**（Mobile-First）：

| 断点 | 宽度 | 目标设备 | 网格列数 |
|------|------|---------|---------|
| Base | < 640px | 手机竖屏 | 1 列 |
| sm | ≥ 640px | 手机横屏 / 小平板 | 2 列 |
| md | ≥ 768px | 平板 | 2-3 列 |
| lg | ≥ 1024px | 笔记本 | 3-4 列 |
| xl | ≥ 1280px | 桌面 | 4-6 列 |
| 2xl | ≥ 1536px | 大屏 | 同 xl，最大宽度限制 |

**Container Queries** 用于组件级响应式（卡片、侧边栏等）：

```tsx
// 卡片内部布局根据容器宽度自适应，不依赖视口
<div className="@container">
  <article className="grid @lg:grid-cols-[200px_1fr] gap-4">
    <img className="aspect-video @lg:aspect-square" />
    <div>
      <h3 className="text-fluid-xl">...</h3>
    </div>
  </article>
</div>
```

**Fluid Typography** 全部使用 clamp()，不做阶梯式跳变：

```css
/* 标题从手机端 2.5rem 平滑过渡到桌面端 4.5rem */
.hero-title { font-size: clamp(2.5rem, 1.8rem + 3.5vw, 4.5rem); }
```

**图片响应式** 使用 Next.js `<Image>` 组件自动处理：

```tsx
<Image
  src={product.image}
  alt={product.name}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  priority={isAboveFold}
/>
```

**触控适配**：所有可点击区域最小 44×44px（WCAG 标准），移动端按钮全宽。

---

### 六、SEO 方案

#### 6.1 技术 SEO 基础

| 项目 | 实现方式 |
|------|---------|
| **渲染模式** | 产品页/关于页用 SSG（generateStaticParams），新闻页用 ISR（revalidate: 3600） |
| **URL 结构** | 干净的层级路径：`/products/heavy-truck/howo-tx-6x4-dump-truck` |
| **Sitemap** | `next-sitemap` 自动生成，包含所有页面 + 图片 + hreflang |
| **robots.txt** | 允许所有爬虫，屏蔽 `/api/`、`/admin/`、`/draft/` |
| **Canonical** | 每页自动生成 canonical URL，防重复内容 |
| **结构化数据** | JSON-LD：Organization、Product、Article、BreadcrumbList、FAQPage |
| **Core Web Vitals** | LCP < 2.5s, FID < 100ms, CLS < 0.1（Next.js Image + font-display: swap） |
| **Hreflang** | 多语言自动标注（`/en/products/...`, `/fr/products/...`） |

#### 6.2 页面级 SEO（每页独立配置）

通过 Payload CMS 的 `seoFields` 字段组，编辑人员可在后台为每个页面配置：

```typescript
// src/payload/fields/seoFields.ts
import type { Field } from 'payload'

export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    fields: [
      { name: 'title', type: 'text', required: true, maxLength: 60 },
      { name: 'description', type: 'textarea', maxLength: 160 },
      { name: 'keywords', type: 'text', admin: { description: 'Comma-separated' } },
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'noIndex', type: 'checkbox', defaultValue: false },
      {
        name: 'structuredData',
        type: 'json',
        admin: { description: 'Override auto-generated JSON-LD' },
      },
    ],
  },
]
```

#### 6.3 产品页 SEO 策略

每个产品详情页自动生成：

```typescript
// src/app/[locale]/products/[category]/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.slug)
  return {
    title: `${product.name} | ${product.category} | TrukSino International`,
    description: product.seoDescription || product.excerpt,
    alternates: { canonical: `/products/${params.category}/${params.slug}` },
    openGraph: {
      title: product.name,
      description: product.seoDescription,
      images: [{ url: product.heroImage.url, width: 1200, height: 630 }],
    },
  }
}
```

JSON-LD Product Schema 自动生成，包含品牌、型号、描述、图片、offers 字段。

#### 6.4 新闻/博客 SEO

- 每篇文章自动生成 Article Schema + BreadcrumbList
- 支持 FAQ 区块（自动生成 FAQPage Schema）
- ISR 模式：文章更新后 1 小时内自动再生
- 内链推荐：侧边栏相关文章、底部"你可能还想看"

#### 6.5 多语言 SEO

| 语言 | 路径前缀 | 目标市场 |
|------|---------|---------|
| English | `/en/` | 全球（默认） |
| Français | `/fr/` | 西非（尼日尔、喀麦隆等） |
| Español | `/es/` | 南美（秘鲁、智利等） |
| العربية | `/ar/` | 中东（沙特、阿联酋等） |
| Русский | `/ru/` | 独联体（俄罗斯、哈萨克斯坦等） |

每种语言独立配置 title、description、hreflang 标签互相指向。

---

### 七、询盘系统

#### 7.1 前端表单

```typescript
// src/components/forms/InquiryForm.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Please select a country'),
  company: z.string().optional(),
  productInterest: z.string().optional(), // 预填：来自哪个产品页
  quantity: z.string().optional(),
  message: z.string().min(10, 'Please provide more details'),
})

type InquiryData = z.infer<typeof inquirySchema>
```

表单支持：
- 从产品页跳转时自动预填 `productInterest` 字段
- 客户端实时校验（Zod）
- 提交按钮 loading 状态 + 防重复提交
- 成功/失败 Toast 反馈
- Google reCAPTCHA v3 防垃圾询盘

#### 7.2 后端 API

```typescript
// src/app/api/inquiry/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { resend } from '@/lib/email'

export async function POST(req: Request) {
  const data = await req.json()

  // 1. 校验（Zod）
  // 2. reCAPTCHA 验证
  // 3. 存入 Payload CMS（Inquiries 集合）
  const payload = await getPayload({ config })
  const inquiry = await payload.create({
    collection: 'inquiries',
    data: { ...data, status: 'new', source: req.headers.get('referer') || '' },
  })

  // 4. 发送邮件通知（Resend）
  await resend.emails.send({
    from: 'TrukSino <inquiries@truksino.com>',
    to: 'sales@truksino.com',
    subject: `New Inquiry: ${data.name} from ${data.country}`,
    html: inquiryEmailTemplate(data, inquiry.id),
  })

  // 5. 发送确认邮件给询盘者
  await resend.emails.send({
    from: 'TrukSino <noreply@truksino.com>',
    to: data.email,
    subject: 'Thank you for your inquiry — TrukSino International',
    html: confirmationEmailTemplate(data),
  })

  return NextResponse.json({ success: true, id: inquiry.id })
}
```

#### 7.3 询盘管理（Payload CMS 后台）

Inquiries 集合在 Payload Admin 面板中提供：

- 列表视图：按时间、状态（new / in-progress / replied / closed）、国家筛选
- 详情视图：完整询盘内容 + 来源页面 + 提交时间
- 状态流转：new → in-progress → replied → closed
- 导出：CSV / Excel 导出
- 可选对接：Webhook 推送到企业微信 / 钉钉 / CRM 系统

---

### 八、Payload CMS 数据模型

#### Products 集合

```typescript
// src/payload/collections/Products.ts
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'category', 'status'] },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'category', type: 'relationship', relationTo: 'productCategories', required: true },
    { name: 'subCategory', type: 'text' }, // e.g. "Dump Truck", "Tractor Truck"
    { name: 'status', type: 'select', options: ['active', 'discontinued', 'upcoming'] },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'gallery', type: 'array', fields: [
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'alt', type: 'text' },
    ]},
    { name: 'excerpt', type: 'textarea', maxLength: 200 },
    { name: 'content', type: 'richText' },
    { name: 'specifications', type: 'array', fields: [
      { name: 'label', type: 'text' },    // e.g. "Engine Power"
      { name: 'value', type: 'text' },    // e.g. "371 HP"
      { name: 'unit', type: 'text' },     // e.g. "HP"
    ]},
    { name: 'features', type: 'array', fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'icon', type: 'text' },     // FontAwesome icon name
    ]},
    { name: 'relatedProducts', type: 'relationship', relationTo: 'products', hasMany: true },
    { name: 'brochure', type: 'upload', relationTo: 'media' }, // PDF download
    // SEO fields (injected from seoFields)
  ],
}
```

#### News 集合

```typescript
export const News: CollectionConfig = {
  slug: 'news',
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'author', type: 'text', defaultValue: 'TrukSino Editorial' },
    { name: 'publishDate', type: 'date', required: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'excerpt', type: 'textarea', maxLength: 200 },
    { name: 'content', type: 'richText' },
    { name: 'tags', type: 'select', hasMany: true, options: [
      'product-launch', 'company-news', 'industry', 'case-study', 'event',
    ]},
    { name: 'relatedArticles', type: 'relationship', relationTo: 'news', hasMany: true },
    // FAQ 区块（自动生成 FAQPage Schema）
    { name: 'faqs', type: 'array', fields: [
      { name: 'question', type: 'text', required: true },
      { name: 'answer', type: 'richText', required: true },
    ]},
    // SEO fields
  ],
}
```

---

### 九、二级/三级页面设计与 SEO

#### 产品分类页（二级 — `/products/[category]`）

```
┌────────────────────────────────────────────┐
│ Hero Banner (分类名称 + 描述)              │
├────────────────────────────────────────────┤
│ Breadcrumb: Home > Products > Heavy Truck  │
├────────────────────────────────────────────┤
│ Category Tabs: [Heavy] Light Special ...   │
├────────────────────────────────────────────┤
│ Product Grid (3 col)                       │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│ │  Image    │ │  Image    │ │  Image    │    │
│ │  Title    │ │  Title    │ │  Title    │    │
│ │  Specs    │ │  Specs    │ │  Specs    │    │
│ │  [View]   │ │  [View]   │ │  [View]   │    │
│ └──────────┘ └──────────┘ └──────────┘    │
├────────────────────────────────────────────┤
│ CTA Banner                                 │
└────────────────────────────────────────────┘
```

SEO：分类名 + "Manufacturer" 作为 title，自动生成 ItemList Schema。

#### 产品详情页（三级 — `/products/[category]/[slug]`）

```
┌────────────────────────────────────────────┐
│ Breadcrumb: Home > Products > Heavy > TX   │
├──────────────────────┬─────────────────────┤
│                      │ Product Name (H1)   │
│  Hero Image          │ Price: Request Quote│
│  (Lightbox gallery)  │ Key Specs Table     │
│                      │ [Request Quote] btn │
├──────────────────────┴─────────────────────┤
│ Tab Navigation                             │
│ [Overview] [Specifications] [Gallery] [FAQ]│
├────────────────────────────────────────────┤
│ Rich Content (RichText from CMS)           │
│ - Product description                      │
│ - Feature highlights with icons            │
│ - Application scenarios                    │
├────────────────────────────────────────────┤
│ Specifications Table (alternating rows)    │
├────────────────────────────────────────────┤
│ Image Gallery (Lightbox)                   │
├────────────────────────────────────────────┤
│ FAQ Accordion → FAQPage Schema            │
├────────────────────────────────────────────┤
│ Related Products (3 cards)                 │
├────────────────────────────────────────────┤
│ Inquiry Form (pre-filled product name)     │
├────────────────────────────────────────────┤
│ CTA + Footer                               │
└────────────────────────────────────────────┘
```

SEO：自动生成 Product Schema（含 brand, model, image, description），FAQ Schema。

#### 新闻详情页（二级 — `/news/[slug]`）

```
┌────────────────────────────────────────────┐
│ Breadcrumb: Home > News > Article Title    │
├────────────────────────────────────────────┤
│ Featured Image                             │
├────────────────────────────────────────────┤
│ Title (H1) + Date + Author                 │
├────────────────┬───────────────────────────┤
│ Article Body   │ Sidebar                   │
│ (RichText)     │ - Related Articles        │
│                │ - Product Categories      │
│ H2 sections    │ - CTA Box                 │
│ with images    │                           │
│                │                           │
├────────────────┴───────────────────────────┤
│ FAQ Section (if applicable)                │
├────────────────────────────────────────────┤
│ Article Schema + BreadcrumbList Schema     │
└────────────────────────────────────────────┘
```

SEO：Article Schema，ISR revalidate 3600s，支持手动触发再生。

---

### 十、部署与运维

#### 环境规划

| 环境 | 用途 | 平台 |
|------|------|------|
| Local | 本地开发 | Docker Compose (PostgreSQL) + `next dev` |
| Preview | PR 预览 | Vercel Preview Deployments |
| Staging | 预发布验证 | Vercel Preview (main 分支) |
| Production | 线上 | Vercel Production + Railway (PostgreSQL) |

#### docker-compose.yml（本地开发）

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: truk_sino
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: devpassword
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

#### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint        # ESLint
      - run: npm run typecheck   # tsc --noEmit
      - run: npm run test        # Vitest
      - run: npm run build       # Next.js build
      - run: npm run test:e2e    # Playwright
```

---

### 十一、开发阶段与排期

#### Phase 1：基础架构 + 首页（2 周）

- 项目初始化（Next.js + Tailwind + Payload + PostgreSQL）
- Design Tokens + 全局组件库（Button, Card, SectionHeader, LazyImage）
- Header（Mega Menu + Mobile Nav）+ Footer
- 首页全部 Section 组件（Hero, ProductGrid, Stats, Advantages 等）
- 滚动动画系统（ScrollReveal）
- 响应式适配 + 跨浏览器测试

#### Phase 2：CMS + 内容页面（3 周）

- Payload CMS 全部 Collections + Globals 搭建
- 产品分类树 + 产品 CRUD + 媒体库
- 产品列表页 + 详情页（SSG）
- 新闻列表页（分页）+ 文章详情页（ISR）
- 视频列表页 + 详情页
- About Us 四个子页面
- Service 三个子页面
- Parts 分类页

#### Phase 3：询盘 + SEO + 多语言（2 周）

- 询盘表单（前端 + API + Resend 邮件）
- reCAPTCHA 集成
- 询盘管理面板（Payload Admin）
- 全站 SEO metadata 生成
- JSON-LD 结构化数据（Product, Article, Organization, FAQ, BreadcrumbList）
- Sitemap 自动生成
- 多语言路由（next-intl）+ 翻译文件

#### Phase 4：测试 + 优化 + 上线（1 周）

- Vitest 单元测试（核心逻辑）
- Playwright E2E 测试（关键流程：浏览产品 → 提交询盘）
- Lighthouse 性能审计（目标：Performance 90+, SEO 95+）
- Core Web Vitals 优化
- 安全检查（Helmet, CSP headers, rate limiting）
- 部署上线 + DNS 切换

**总工期：8 周**

---

### 十二、可选扩展（后续迭代）

| 功能 | 方案 | 优先级 |
|------|------|--------|
| 在线客服 | Tawk.to（免费）或 Crisp | 高 |
| Google Ads 转化追踪 | GTM + GA4 Enhanced Ecommerce | 高 |
| 产品对比功能 | 前端 state + 对比表格 | 中 |
| 经销商门户 | Payload 用户权限 + 独立 Dashboard | 中 |
| WhatsApp 一键询盘 | 浮动按钮 + 预填消息 | 高 |
| AI 智能推荐 | 基于浏览历史的"你可能需要" | 低 |
| PWA 离线支持 | next-pwa + Service Worker | 低 |

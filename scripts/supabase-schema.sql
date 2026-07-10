-- ============================================================
-- SINOTRUK International - Database Schema for Supabase
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── 1. Admin Users ─────────────────────────────────────────
create table admin_users (
  id           uuid         primary key default gen_random_uuid(),
  name         text         not null,
  email        text         unique not null,
  password_hash text       not null,
  role         text         default 'admin' check (role in ('admin', 'editor')),
  created_at   timestamptz  default now(),
  updated_at   timestamptz  default now()
);

comment on table admin_users is 'Admin panel authentication';

-- ─── 2. Product Categories ──────────────────────────────────
create table product_categories (
  id          uuid         primary key default gen_random_uuid(),
  slug        text         unique not null,
  name        text         not null,
  icon        text,
  "order"     int          default 0,
  active      boolean      default true,
  created_at  timestamptz  default now(),
  updated_at  timestamptz  default now()
);

-- ─── 3. Products ─────────────────────────────────────────────
create table products (
  id             uuid         primary key default gen_random_uuid(),
  name           text         not null,
  slug           text         unique not null,
  category_id    uuid         references product_categories(id) on delete cascade,
  sub_category   text,
  status         text         default 'active' check (status in ('active', 'discontinued', 'upcoming')),
  hero_image     text,
  gallery        jsonb,
  excerpt        text,
  content        jsonb,
  specifications jsonb,
  features       jsonb,
  brochure       text,
  sort_order     int          default 0,
  seo_title      text,
  seo_description text,
  created_at     timestamptz  default now(),
  updated_at     timestamptz  default now()
);

-- ─── 4. News Articles ────────────────────────────────────────
create table news_articles (
  id              uuid         primary key default gen_random_uuid(),
  title           text         not null,
  slug            text         unique not null,
  author          text         default 'SINOTRUK Editorial',
  publish_date    timestamptz  not null,
  featured_image  text,
  excerpt         text,
  content         jsonb,
  tags            text[]       default '{}',
  faqs            jsonb,
  related_slugs   text[],
  seo_title       text,
  seo_description text,
  status          text         default 'published' check (status in ('draft', 'published')),
  created_at      timestamptz  default now(),
  updated_at      timestamptz  default now()
);

-- ─── 5. Videos ───────────────────────────────────────────────
create table videos (
  id               uuid         primary key default gen_random_uuid(),
  slug             text         unique not null,
  title            text         not null,
  thumbnail        text,
  video_url        text,
  duration         text,
  sort_order       int          default 0,
  seo_title        text,
  seo_description  text,
  created_at       timestamptz  default now(),
  updated_at       timestamptz  default now()
);

-- ─── 6. Inquiries ────────────────────────────────────────────
create table inquiries (
  id               uuid         primary key default gen_random_uuid(),
  name             text         not null,
  email            text         not null,
  phone            text,
  country          text,
  company          text,
  product_interest text,
  quantity         text,
  message          text         not null,
  recaptcha_score  float4,
  source           text,
  ip               text,
  status           text         default 'new' check (status in ('new', 'in-progress', 'replied', 'closed')),
  note             text,
  assigned_to      text,
  replied_at       timestamptz,
  closed_at        timestamptz,
  user_id          uuid         references admin_users(id) on delete set null,
  created_at       timestamptz  default now(),
  updated_at       timestamptz  default now()
);

-- Indexes for fast filtering
create index idx_inquiries_status on inquiries(status);
create index idx_inquiries_country on inquiries(country);
create index idx_inquiries_created on inquiries(created_at desc);

-- ─── 7. Newsletter Subscribers ───────────────────────────────
create table newsletter_subscribers (
  id               uuid         primary key default gen_random_uuid(),
  email            text         unique not null,
  hash             text         unique not null,
  subscribed_at    timestamptz  default now(),
  unsubscribed_at  timestamptz,
  active           boolean      default true
);

-- ─── 8. Site Settings ────────────────────────────────────────
create table site_settings (
  id            uuid         primary key default gen_random_uuid(),
  key           text         unique not null,
  value         jsonb        not null,
  description   text,
  updated_at    timestamptz  default now()
);

-- ─── 9. Media Library ────────────────────────────────────────
create table media_items (
  id           uuid         primary key default gen_random_uuid(),
  name         text         not null,
  url          text         not null,
  thumbprint   text,
  mime_type    text         not null,
  size         int,
  width        int,
  height       int,
  alt          text,
  caption      text,
  uploaded_by  text,
  created_at   timestamptz  default now()
);

-- ═══════════════════════════════════════════════════════════
-- SEED DATA — Import your existing hardcoded content
-- ═══════════════════════════════════════════════════════════

-- Insert default admin user (password: sinotruk2026 — CHANGE IMMEDIATELY!)
insert into admin_users (name, email, password_hash, role) values
('Administrator', 'admin@sinotruk.com', '$2b$10$EXAMPLE_HASH_PLACEHOLDER_CHANGE_THIS', 'admin');

-- Insert product categories
insert into product_categories (slug, name, "order") values
('heavy-truck', 'Heavy Truck', 1),
('light-truck', 'Light Truck', 2),
('special-vehicle', 'Special Vehicle', 3),
('semi-trailer', 'Semi Trailer', 4),
('light-vehicle', 'Light Vehicle', 5),
('new-energy-vehicle', 'New Energy Vehicle', 6);

-- Insert initial site settings
insert into site_settings (key, value, description) values
('contact_email', '"sales@sinotruk.com"', 'Global sales email'),
('contact_phone', '"+86-531-8170-6666"', 'Headquarters phone'),
('company_name', '"SINOTRUK International"', 'Company display name'),
('hero_banners', '[{"title":"Built for Every Terrain","subtitle":"SINOTRUK Heavy Trucks Exported to 90+ Countries","image":"/images/hero-banner-1.png"},{"title":"Innovation Meets Reliability","subtitle":"Next-Generation Commercial Vehicles","image":"/images/hero-banner-2.png"}]', 'Homepage hero carousel'),
('footer_text', '"© 2026 SINOTRUK International. All rights reserved."', 'Footer copyright');

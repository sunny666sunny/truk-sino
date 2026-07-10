INSERT INTO "ProductCategory" ("id", "slug", "name", "icon", "order", "active", "createdAt", "updatedAt") VALUES
  ('cat_heavy_truck', 'heavy-truck', 'Heavy Truck', 'Truck', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_light_truck', 'light-truck', 'Light Truck', 'Truck', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_special_vehicle', 'special-vehicle', 'Special Vehicle', 'Cog', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_semi_trailer', 'semi-trailer', 'Semi Trailer', 'Container', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_light_vehicle', 'light-vehicle', 'Light Vehicle', 'Car', 5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_new_energy_vehicle', 'new-energy-vehicle', 'New Energy Vehicle', 'Battery', 6, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "icon" = EXCLUDED."icon",
  "order" = EXCLUDED."order",
  "active" = EXCLUDED."active",
  "updatedAt" = CURRENT_TIMESTAMP;

INSERT INTO "SiteSetting" ("id", "key", "value", "description", "updatedAt") VALUES
  ('setting_contact_email', 'contact_email', '"sales@sinotruk.com"'::jsonb, 'Primary sales contact email', CURRENT_TIMESTAMP),
  ('setting_company_name', 'company_name', '"SINOTRUK"'::jsonb, 'Public company name', CURRENT_TIMESTAMP),
  ('setting_business_hours', 'business_hours', '"Monday - Saturday, 8:00 AM - 5:30 PM (CST)"'::jsonb, 'Displayed business hours', CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO UPDATE SET
  "value" = EXCLUDED."value",
  "description" = EXCLUDED."description",
  "updatedAt" = CURRENT_TIMESTAMP;
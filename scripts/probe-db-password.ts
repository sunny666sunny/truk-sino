import pg from "pg";
const password = process.env.DB_PASSWORD!;
const ref = "zbjxejlzzsazyofhadnr";
const candidates = [
  { label: "pooler-transaction", host: "aws-1-ap-south-1.pooler.supabase.com", port: 6543, user: `postgres.${ref}` },
  { label: "pooler-session", host: "aws-1-ap-south-1.pooler.supabase.com", port: 5432, user: `postgres.${ref}` },
  { label: "direct", host: `db.${ref}.supabase.co`, port: 5432, user: "postgres" },
];
for (const c of candidates) {
  const client = new pg.Client({ host: c.host, port: c.port, database: "postgres", user: c.user, password, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 10000 });
  try {
    await client.connect();
    const result = await client.query('select count(*)::int as count from "ProductCategory"');
    console.log(JSON.stringify({ label: c.label, ok: true, count: result.rows[0].count }));
  } catch (error) {
    const msg = String((error as Error).message).replace(password, "[password]");
    console.log(JSON.stringify({ label: c.label, ok: false, message: msg.slice(0, 120) }));
  } finally {
    await client.end().catch(() => {});
  }
}
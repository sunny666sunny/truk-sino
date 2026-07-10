export default function AdminFallback() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-warm)] px-6 py-16 text-[var(--color-ink)]">
      <div className="mx-auto max-w-2xl rounded-[var(--radius-brand-lg)] border border-[var(--color-divider)] bg-white p-8 shadow-card">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[var(--color-accent)]">Admin Console</p>
        <h1 className="mb-4 font-[family-name:var(--font-display)] text-[length:var(--text-fluid-2xl)] text-[var(--color-brand-900)]">
          后台服务未启动
        </h1>
        <p className="mb-6 leading-7 text-[var(--color-ink-light)]">
          当前前台网站运行在 <strong>http://localhost:3000</strong>。后台是独立前端应用，需要单独启动后访问。
        </p>
        <div className="rounded-[var(--radius-brand)] bg-[var(--color-brand-900)] p-4 font-mono text-sm text-white">
          npm run admin:dev
        </div>
        <p className="mt-5 text-sm text-[var(--color-ink-muted)]">
          启动后访问 http://localhost:5173。部署时也可以通过 ADMIN_APP_URL 指向正式后台地址。
        </p>
      </div>
    </main>
  );
}

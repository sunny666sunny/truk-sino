import type { Metadata } from 'next'
import { getAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Admin Panel — SINOTRUK International',
}

// Layout wrapper — protects all /admin routes
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAuth()
  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 hidden lg:block">
        <div className="p-5 border-b border-gray-100">
          <h1 className="text-lg font-bold text-brand-900">SINOTRUK</h1>
          <p className="text-xs text-gray-400 mt-0.5">Admin Console</p>
        </div>

        <nav className="p-3 space-y-0.5">
          {[
            { href: '/admin', label: 'Dashboard', icon: '📊' },
            { href: '/admin/products', label: 'Products', icon: '🚛' },
            { href: '/admin/news', label: 'News', icon: '📰' },
            { href: '/admin/inquiries', label: 'Inquiries', icon: '📩' },
            { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="w-full mt-2 text-xs text-red-500 hover:text-red-700 transition px-3 py-1.5 rounded hover:bg-red-50"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <h2 className="text-lg font-semibold text-gray-900">
            Management Console
          </h2>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-600 hover:text-brand-700 transition"
            >
              View Website →
            </a>
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}

import Link from 'next/link'
import { dict } from '@/lib/i18n'

export function Footer() {

  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Col 1: Logo + Tagline */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <svg className="w-6 h-6 text-[var(--accent-red)] drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h3l2-7 4 14 3-10 2 3h6" />
              </svg>
              <h2
                className="font-display text-2xl font-bold tracking-tight"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
              >
                Pule<span style={{ color: 'var(--accent-red)' }}>feed</span>
              </h2>
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif' }}
            >
              {dict.footerTagline}
            </p>
          </div>



          {/* Col 4: Organization */}
          <div>
            <h3
              className="label-caps mb-4"
              style={{ color: 'var(--accent-red)', fontSize: 13, letterSpacing: '0.12em' }}
            >
              {dict.organization || 'Organization'}
            </h3>
            <div className="flex flex-col gap-1.5">
              <Link
                href="/about"
                className="text-sm py-1 hover:text-[var(--accent-red)] transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {dict.aboutUs}
              </Link>
              <Link
                href="/contact"
                className="text-sm py-1 hover:text-[var(--accent-red)] transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {dict.contactUs}
              </Link>
              <Link
                href="/privacy"
                className="text-sm py-1 hover:text-[var(--accent-red)] transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {dict.privacyPolicy || 'Privacy Policy'}
              </Link>
            </div>
          </div>

          {/* Col 5: Social Links */}
          <div className="col-span-1">
            <h3
              className="label-caps mb-4"
              style={{ color: 'var(--accent-red)', fontSize: 13, letterSpacing: '0.12em' }}
            >
              {dict.followUs}
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Twitter / X', href: '#', icon: '𝕏' },
                { name: 'Facebook', href: '#', icon: 'f' },
                { name: 'YouTube', href: '#', icon: '▶' },
                { name: 'Telegram', href: '#', icon: '✈' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center gap-2.5 text-sm hover:text-[var(--accent-red)] transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold transition-colors"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  >
                    {social.icon}
                  </span>
                  {social.name}
                </a>
              ))}
            </div>

          </div>
        </div>
        
        {/* Bottom Bar: Copyright */}
        <div 
          className="mt-12 md:mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <div
            className="label-caps text-[10px] tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            © {new Date().getFullYear()} PULEFEED — {dict.copyright}
          </div>
          
          <div className="flex gap-6 text-[10px] label-caps tracking-widest" style={{ color: 'var(--text-muted)' }}>
            <Link href="/privacy" className="hover:text-[var(--accent-red)] transition-colors">
              {dict.privacyPolicy || 'Privacy'}
            </Link>
            <Link href="/contact" className="hover:text-[var(--accent-red)] transition-colors">
              {dict.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

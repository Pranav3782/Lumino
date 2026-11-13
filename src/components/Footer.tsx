import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { useSmoothScroll } from '../lib/smooth-scroll'
import { navItems, site } from '../lib/utils'

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Behance', href: 'https://www.behance.net' },
]

export function Footer() {
  const { scrollTo } = useSmoothScroll()

  return (
    <footer className="border-t border-line">
      <div className="container-shell py-10 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-5">
            <a
              href="#top"
              aria-label={`${site.fullName} — back to top`}
              className="inline-block font-display text-[30px] font-medium leading-none tracking-[-0.05em]"
            >
              Lumino<span className="text-orange">.</span>
            </a>
            <p className="mt-3 max-w-xs text-[13px] leading-[1.7] text-mute">
              Lumino Tech Solutions designs and builds websites, digital products
              and brands for ambitious businesses. Independent since {site.founded}.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-ink/55">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
              </span>
              Open for Q1 2027
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline py-1 text-[13px] text-ink/70 transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#process"
                  className="link-underline py-1 text-[13px] text-ink/70 transition-colors duration-300 hover:text-ink"
                >
                  Process
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline inline-flex items-center gap-1 py-1 text-[13px] text-ink/70 transition-colors duration-300 hover:text-ink"
                  >
                    {social.label}
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-3 lg:text-right">
            <p className="eyebrow">Say hello</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-4 inline-block font-display text-[clamp(1.15rem,1.6vw,1.5rem)] font-medium tracking-[-0.03em]"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={() => scrollTo('#top')}
              className="group mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-mute transition-colors duration-300 hover:text-ink md:justify-end"
              data-cursor="Top"
            >
              <span className="link-underline">Back to top</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <ArrowUp className="h-3 w-3" strokeWidth={1.75} />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[9px] font-medium uppercase tracking-[0.18em] text-mute sm:flex-row sm:items-center sm:justify-between md:mt-14">
          <p>© {new Date().getFullYear()} Lumino Tech Solutions. All rights reserved.</p>
          <p className="hidden sm:block">Design-led technology — Est. {site.founded}</p>
          <p>Made with care, every detail</p>
        </div>
      </div>
    </footer>
  )
}

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const site = {
  name: 'Lumino',
  fullName: 'Lumino Tech Solutions',
  tagline: 'Design-led technology',
  email: 'surya@luminotechsolutions.com',
  url: 'https://www.luminotech.solutions',
  founded: '2026',
  whatsappNumber: '+91 9110705074',
  whatsappUsername: 'suryapranav13',
  whatsappUrl: 'https://wa.me/919110705074',
  instagramUrl: 'https://www.instagram.com/lumino_tech_solutions/',
}

export const whatsappMessage =
  "Hello Lumino Tech Solutions, I'm interested in discussing a project. Could you please share more details?"

export const whatsappLink = `${site.whatsappUrl}?text=${encodeURIComponent(whatsappMessage)}`

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

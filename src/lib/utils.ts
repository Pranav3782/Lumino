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
  email: 'hello@luminotech.solutions',
  url: 'https://www.luminotech.solutions',
  founded: '2026',
}

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export type ProjectKind = 'lumen' | 'meridian' | 'form' | 'nocturne'

export type Project = {
  slug: string
  name: string
  category: string
  year: string
  headline: string
  description: string
  summary: string
  brief: string
  move: string
  result: string
  stats: { value: string; label: string }[]
  deliverables: string[]
  kind: ProjectKind
}

export const projects: Project[] = [
  {
    slug: 'lumen',
    name: 'Lumen',
    category: 'Brand identity & website',
    year: '2025',
    headline: 'A warmer kind of light.',
    description:
      'A new identity and digital home for a lighting studio designing for the way we actually live.',
    summary:
      'Lumen makes lighting for slow evenings, long tables and quiet corners. They came to us with beautiful objects and a brand that felt clinical. We gave the work a language of its own.',
    brief:
      'Reposition Lumen from a trade supplier to a design-led lighting house, with an identity and e-commerce experience that could hold its own next to the products.',
    move:
      'An editorial system built around warmth, tactility and generous space. A serif-leaning voice, a sun-washed palette, and a site that lets each object breathe.',
    result:
      'Lumen launched to a sold-out first collection, a 3.4× lift in direct sales and a new wholesale pipeline across Europe.',
    stats: [
      { value: '3.4×', label: 'Direct sales' },
      { value: '+186%', label: 'Time on site' },
      { value: '12', label: 'Weeks to launch' },
    ],
    deliverables: [
      'Brand strategy',
      'Visual identity',
      'Art direction',
      'E-commerce',
      'Motion',
    ],
    kind: 'lumen',
  },
  {
    slug: 'meridian',
    name: 'Meridian',
    category: 'Digital product',
    year: '2025',
    headline: 'Banking, rethought around calm.',
    description:
      'A calmer, clearer banking product for people who would rather be doing something else.',
    summary:
      'Most banking apps compete on features. Meridian wanted to compete on feeling. We designed a product that removes decisions, not adds them — and gives people their attention back.',
    brief:
      'Rethink the everyday banking experience for a challenger entering three new markets, balancing trust, speed and a distinctly human tone.',
    move:
      'We rebuilt the core flows around a single question: what does this person need to know right now? A restrained interface, a confident type system and motion that explains rather than decorates.',
    result:
      'The new product tested 42% faster for core tasks and helped Meridian secure its next funding round within six months.',
    stats: [
      { value: '42%', label: 'Faster tasks' },
      { value: '3', label: 'New markets' },
      { value: '4.9', label: 'App rating' },
    ],
    deliverables: ['Product strategy', 'UX research', 'UI system', 'Prototyping', 'Design ops'],
    kind: 'meridian',
  },
  {
    slug: 'atelier-form',
    name: 'Atelier Form',
    category: 'E-commerce',
    year: '2024',
    headline: 'Furniture with a point of view.',
    description:
      'An editorial storefront for a slow furniture atelier, built to let the objects lead.',
    summary:
      'Atelier Form makes a small number of pieces, slowly. Their old site made them look like everyone else. We built a storefront with the confidence of a gallery and the ease of a good shop.',
    brief:
      'Create a commerce experience for a made-to-order furniture studio, without the noise of a typical catalogue site.',
    move:
      'A product-first layout with museum-level pacing, tactile typography and a checkout that steps out of the way. Every object gets a full page and a point of view.',
    result:
      'Average order value rose 28%, and the studio booked its production calendar six months ahead.',
    stats: [
      { value: '+28%', label: 'Order value' },
      { value: '6 mo', label: 'Order book' },
      { value: '2.1×', label: 'Enquiries' },
    ],
    deliverables: ['Art direction', 'E-commerce', 'Photography direction', 'Development'],
    kind: 'form',
  },
  {
    slug: 'nocturne',
    name: 'Nocturne',
    category: 'Culture & events',
    year: '2024',
    headline: 'Nights that sound like this.',
    description:
      'A living identity and ticketing platform for a festival that refuses to stand still.',
    summary:
      'Nocturne is three nights of sound and light in Lisbon. The identity needed to work on a poster at midnight and a phone at noon — and never feel the same twice.',
    brief:
      'Build a festival brand and digital platform that could flex across line-up drops, stages and cities without losing its atmosphere.',
    move:
      'A graphic system of frequencies and silhouettes, paired with a ticketing experience that shifts with the programme. Motion became part of the identity, not an afterthought.',
    result:
      'The festival sold out three weeks earlier than the previous year, with 64% of tickets bought on mobile.',
    stats: [
      { value: '100%', label: 'Sold out' },
      { value: '64%', label: 'Mobile sales' },
      { value: '3 wks', label: 'Earlier' },
    ],
    deliverables: ['Identity', 'Digital platform', 'Ticketing', 'Motion', 'Campaign'],
    kind: 'nocturne',
  },
]

export type ServiceKind = 'ui' | 'web' | 'brand' | 'app' | 'seo'

export type Service = {
  index: string
  title: string
  description: string
  tags: string[]
  kind: ServiceKind
  accent: string
}

export const services: Service[] = [
  {
    index: '01',
    title: 'UI/UX Design',
    description:
      'Research-led interfaces and product systems that make complex things feel effortless.',
    tags: ['Product strategy', 'UX research', 'Design systems', 'Prototyping'],
    kind: 'ui',
    accent: '#625BFF',
  },
  {
    index: '02',
    title: 'Website Development',
    description:
      'Fast, accessible custom websites, e-commerce and web applications built around real people and real business goals.',
    tags: ['React', 'Webflow', 'Motion design', 'CMS'],
    kind: 'web',
    accent: '#FF6535',
  },
  {
    index: '03',
    title: 'Branding & Identity',
    description:
      'Names, identities and visual languages with a clear point of view and room to grow.',
    tags: ['Naming', 'Visual identity', 'Art direction', 'Guidelines'],
    kind: 'brand',
    accent: '#171717',
  },
  {
    index: '04',
    title: 'App Development',
    description:
      'Building modern, scalable mobile applications with intuitive experiences and reliable functionality.',
    tags: ['iOS & Android', 'React Native', 'API integration', 'App UX'],
    kind: 'app',
    accent: '#625BFF',
  },
  {
    index: '05',
    title: 'SEO & Growth',
    description:
      'Technical foundations, content and measurement that turn attention into steady progress.',
    tags: ['Technical SEO', 'Analytics', 'CRO', 'Content'],
    kind: 'seo',
    accent: '#FF6535',
  },
]

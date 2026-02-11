import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'سيتي إيدج للتطوير العقاري | المطور العقاري الوطني',
    short_name: 'سيتي إيدج',
    description: 'سيتي إيدج للتطوير العقاري هي المطور العقاري الوطني لمشروعات سكنية وتجارية وإدارية متميزة في مصر.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a2b4b',
    icons: [
      {
        src: '/assets/images/logos/main-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

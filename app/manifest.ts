import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FreeResume',
    short_name: 'FreeResume',
    description: 'Free ATS Resume Builder and Resume Checker for students, freshers and professionals.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5B4DFF',
    icons: [
      {
        src: 'https://freeresume.dev/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://freeresume.dev/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

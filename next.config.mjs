/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/ats-scanner',
        destination: '/ats-score',
        permanent: true,
      },
      {
        source: '/examples',
        destination: '/resume-examples',
        permanent: true,
      },
      {
        source: '/examples/:slug',
        destination: '/resume-examples/:slug',
        permanent: true,
      },
      {
        source: '/resume-for-freshers',
        destination: '/templates?category=Fresher',
        permanent: true,
      },
      {
        source: '/resume-writing-guide',
        destination: '/resume-guide',
        permanent: true,
      },
      {
        source: '/ats-resume-format',
        destination: '/ats-format',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

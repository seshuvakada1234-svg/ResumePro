import { ResumeData } from '../types/resume';

export const dummyResumeData: ResumeData = {
  uid: 'dummy-user',
  title: 'Sample Software Engineer Resume',
  template: 'classic',
  personalInfo: {
    fullName: 'Arjun Sharma',
    email: 'arjun.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    summary: 'Enthusiastic Computer Science graduate with a strong foundation in Full-Stack Development. Proficient in React, Node.js, and Python. Passionate about building scalable web applications and solving complex problems. Seeking an entry-level position to contribute to innovative projects and grow as a professional developer.',
  },
  education: [
    {
      school: 'Indian Institute of Technology (IIT), Bombay',
      degree: 'B.Tech in Computer Science and Engineering',
      year: '2020 - 2024',
    },
    {
      school: 'St. Xavier\'s College, Mumbai',
      degree: 'Higher Secondary Certificate (HSC)',
      year: '2018 - 2020',
    },
  ],
  experience: [
    {
      company: 'Tech Solutions India',
      position: 'Software Engineering Intern',
      duration: 'June 2023 - August 2023',
      description: '• Developed and maintained React components for a customer-facing dashboard.\n• Optimized database queries, reducing load times by 20%.\n• Collaborated with the UI/UX team to implement responsive designs.',
    },
  ],
  skills: [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'SQL', level: 70 },
    { name: 'Git', level: 95 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'AWS', level: 65 }
  ],
  languages: [
    { name: 'English', level: 100 },
    { name: 'Hindi', level: 100 },
    { name: 'Marathi', level: 80 }
  ],
  projects: [
    {
      name: 'E-Commerce Platform',
      description: 'Built a full-stack e-commerce application with React, Node.js, and MongoDB. Features include user authentication, product search, and a secure payment gateway integration.',
      link: 'https://github.com/arjun/ecommerce',
    },
    {
      name: 'Weather Tracker App',
      description: 'Developed a real-time weather tracking application using OpenWeatherMap API and React. Implemented dynamic background changes based on weather conditions.',
      link: 'https://arjun-weather.vercel.app',
    },
  ],
};

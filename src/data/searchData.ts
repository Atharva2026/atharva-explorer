export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  technologies: string[];
  role: string;
  startDate: string;
  endDate: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  category: 'project';
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  type: 'skill';
}

export interface AboutItem {
  id: string;
  title: string;
  content: string;
  type: 'about';
}

export type SearchItem = Project | Skill | AboutItem;

export const projects: Project[] = [
  {
    id: 'nivana',
    title: 'Nivana -- AI Mental Health Platform',
    description: 'AI-driven mental health platform for personalized well-being and therapy.',
    summary: 'AI-driven mental health support platform.',
    technologies: ['React', 'Node.js', 'AI'],
    role: 'Developer',
    startDate: '2026-01',
    endDate: 'Present',
    githubUrl: '',
    liveUrl: '', // TODO: Paste your link here
    category: 'project',
  },
  {
    id: 'linkedin-genai',
    title: 'LinkedIn Post Generator (GenAI)',
    description: 'A generative AI tool for creating engaging LinkedIn posts.',
    summary: 'AI post generator tailored for LinkedIn.',
    technologies: ['GenAI', 'Python', 'React'],
    role: 'Developer',
    startDate: '2026-01',
    endDate: '2026-02',
    githubUrl: '',
    liveUrl: 'https://github.com/Atharva2026/LinkedIN_GENAI_PostGenerator', // TODO: Paste your link here
    category: 'project',
  },
  {
    id: 'ethicraft',
    title: 'Ethicraft Club Website',
    description: 'Official website for the Ethicraft Club.',
    summary: 'Club website with event management.',
    technologies: ['React', 'Nextjs', 'Tailwind CSS'],
    role: 'Developer',
    startDate: '2025-05',
    endDate: '2025-09',
    githubUrl: '',
    liveUrl: 'https://ethicraft.vercel.app', // TODO: Paste your link here
    category: 'project',
  },
  {
    id: 'CrediShield',
    title: 'CrediShield',
    description: 'Developed a Credit Risk Prediction stacked ensemble model to forecast financial defaults using LightGBM, XGBoost, and CatBoost with 5-Fold Stratified Cross-Validation. A Logistic Regression meta-learner combined base model predictions to improve ROC-AUC performance. The pipeline includes dynamic data cleaning and a custom scikit-learn transformer for domain-specific feature engineering to capture key financial risk indicators..',
    summary: 'Built a stacked ensemble Credit Risk Prediction model using LightGBM, XGBoost, and CatBoost with 5-Fold Stratified Cross-Validation. A Logistic Regression meta-learner combined predictions to maximize ROC-AUC, with a pipeline including data cleaning and custom feature engineering for financial risk indicators.',
    technologies: ['Python', 'LangChain', 'OpenAI'],
    role: 'Developer',
    startDate: '2026-01',
    endDate: '2026-02',
    githubUrl: '',
    liveUrl: 'https://github.com/Atharva2026/HOH', // TODO: Paste your link here
    category: 'project',
  },
  {
    id: 'portfolio-website',
    title: 'portfolio website',
    description: 'A nostalgic Windows XP-themed portfolio website with search functionality and draggable windows.',
    summary: 'Retro-styled portfolio with modern web technologies.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    role: 'Designer & Developer',
    startDate: '2024-01',
    endDate: 'Present',
    githubUrl: 'https://github.com/atharva/portfolio-xp',
    liveUrl: 'https://atharva.dev', // TODO: Update if necessary
    category: 'project',
  },
];

export const skills: Skill[] = [
  { id: 'python', name: 'Python', category: 'Languages', level: 'expert', description: 'Data science, ML, backend development', type: 'skill' },
  { id: 'typescript', name: 'TypeScript', category: 'Languages', level: 'advanced', description: 'Type-safe JavaScript development', type: 'skill' },
  { id: 'javascript', name: 'JavaScript', category: 'Languages', level: 'expert', description: 'Frontend and backend web development', type: 'skill' },
  { id: 'NextJs', name: 'NextJS', category: 'Fullstack', level: 'expert', description: 'Building interactive UIs and SPAs', type: 'skill' },

  { id: 'react', name: 'React', category: 'Frontend', level: 'expert', description: 'Building interactive UIs and SPAs', type: 'skill' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend', level: 'advanced', description: 'Server-side JavaScript runtime', type: 'skill' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'Machine Learning', level: 'advanced', description: 'Deep learning and neural networks', type: 'skill' },
  { id: 'aws', name: 'AWS', category: 'Cloud', level: 'intermediate', description: 'Cloud infrastructure and deployment', type: 'skill' },
  { id: 'docker', name: 'Docker', category: 'DevOps', level: 'advanced', description: 'Containerization and orchestration', type: 'skill' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases', level: 'advanced', description: 'Relational database management', type: 'skill' },
  { id: 'git', name: 'Git', category: 'Tools', level: 'expert', description: 'Version control and collaboration', type: 'skill' },
  { id: 'figma', name: 'Figma', category: 'Design', level: 'intermediate', description: 'UI/UX design and prototyping', type: 'skill' },
];

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  type: 'certificate';
}

export const certificates: Certificate[] = [
  { id: 'aws-ccp', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2023-06', credentialUrl: 'https://aws.amazon.com/certification/', type: 'certificate' },
  { id: 'gcp-ml', name: 'Google Cloud Professional ML Engineer', issuer: 'Google Cloud', date: '2023-09', credentialUrl: 'https://cloud.google.com/certification/', type: 'certificate' },
  { id: 'meta-react', name: 'Meta React Developer Certificate', issuer: 'Meta (Facebook)', date: '2022-12', credentialUrl: 'https://www.coursera.org/meta', type: 'certificate' },
  { id: 'tensorflow-dev', name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2023-03', type: 'certificate' },
];

export const aboutItems: AboutItem[] = [
  {
    id: 'about-me',
    title: 'About Me',
    content: 'Hi! I\'m Atharva, a passionate software developer and machine learning enthusiast. I love building beautiful, functional applications that solve real-world problems. When I\'m not coding, you can find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee.',
    type: 'about',
  },
  {
    id: 'education',
    title: 'Education',
    content: 'Bachelor of Science in Computer Science with a focus on Artificial Intelligence and Machine Learning. Graduated with honors and specialized in deep learning and natural language processing.',
    type: 'about',
  },
  {
    id: 'experience',
    title: 'Experience',
    content: 'Over 4 years of professional experience in software development, working with startups and established companies. Specialized in full-stack development and machine learning applications.',
    type: 'about',
  },
];

export const allItems: SearchItem[] = [
  ...projects,
  ...skills.map(s => ({ ...s, title: s.name, description: s.description } as any)),
  ...aboutItems,
];

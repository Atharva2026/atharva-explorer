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
    id: 'globe-express',
    title: 'Globe Express -- Multi-Agent Travel Orchestration Engine',
    description: 'Engineered a stateful multi-agent trip-planning system in LangGraph, using specialized agent nodes, conditional routing, and shared memory to coordinate flight search, weather, and itinerary generation. Implemented automated validation, retry logic, and LLM fallback across AviationStack, Tavily, and wttr.in integrations, increasing resilience against external API failures. Orchestrated asynchronous request handling via FastAPI and PostgreSQL, with PDF itinerary export and a React frontend, to minimize end-to-end planning latency. Enforced type-safe data flow between LangGraph nodes using Pydantic schema validation on structured LLM outputs, catching malformed agent responses before they reached downstream services.',
    summary: 'Stateful multi-agent travel orchestration engine built with LangGraph.',
    technologies: ['LangGraph', 'FastAPI', 'React', 'PostgreSQL', 'Python', 'LangChain', 'Pydantic'],
    role: 'AI Engineer',
    startDate: '2025',
    endDate: 'Present',
    githubUrl: 'https://github.com/Atharva2026/Trip-mate',
    liveUrl: 'https://globe-express.onrender.com/',
    category: 'project',
  },
  {
    id: 'nivana',
    title: 'Nivana -- Privacy-First AI Mental Health Platform',
    description: 'Architected a hybrid local/cloud LLM system with RAG retrieval over a FAISS vector store, combining on-device inference via Ollama (Llama 3) with cloud reasoning through Gemini 1.5, balancing privacy with response quality. Engineered an asynchronous processing pipeline with Flask + Celery to handle real-time mood analysis without blocking the main request thread. Designed a React SPA with real-time mood visualization, focused on accessible, low-friction UX for users in vulnerable states.',
    summary: 'AI-driven mental health support platform.',
    technologies: ['React', 'Flask', 'Celery', 'Ollama', 'Llama 3', 'Gemini 1.5', 'RAG', 'FAISS', 'Python'],
    role: 'Full-Stack Developer',
    startDate: '2026',
    endDate: 'Present',
    githubUrl: 'https://github.com/SarangRao20/techfiesta_mentalhealth',
    liveUrl: 'https://nivana-azure.vercel.app/',
    category: 'project',
  },
  {
    id: 'linkedin-genai',
    title: 'LinkedIn Post Generator (GenAI)',
    description: 'Built a GenAI content generator (Python, Streamlit, LangChain, Groq) that produces multiple LLM-generated post variants from a user-defined topic, tone, length, language, and hook style. Integrated Tavily for live context retrieval, adding a RAG layer that keeps generated content relevant and current, with prompt engineering and few-shot learning driving output quality.',
    summary: 'GenAI tool for creating engaging LinkedIn posts.',
    technologies: ['Python', 'Streamlit', 'LangChain', 'Groq', 'Tavily', 'GenAI'],
    role: 'Developer',
    startDate: '2026',
    endDate: '2026',
    githubUrl: 'https://github.com/Atharva2026/LinkedIN_GENAI_PostGenerator',
    liveUrl: 'https://linkedingenaipostgenerator-n9zkj2o8riskrjx26edfan.streamlit.app/',
    category: 'project',
  },
  {
    id: 'ethicraft',
    title: 'Ethicraft Club Website',
    description: 'Engineered a full-stack platform (Next.js + TypeScript, Supabase Auth/DB) with role-based student/admin portals, Razorpay payments, and an online test/assessment module used by 300+ students. Directed technical decision-making across 6+ shipped features.',
    summary: 'Club website with event management, portals, and online assessment.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Razorpay', 'React', 'Tailwind CSS'],
    role: 'Technical Head',
    startDate: '2024',
    endDate: 'Present',
    githubUrl: 'https://github.com/Atharva2026/website-',
    liveUrl: 'https://ethicraft.vercel.app',
    category: 'project',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'A nostalgic Windows XP-themed portfolio website with search functionality, draggable windows, utility applications, and retro design styling.',
    summary: 'Retro Windows XP portfolio built with React & Tailwind CSS.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    role: 'Designer & Developer',
    startDate: '2024',
    endDate: 'Present',
    githubUrl: 'https://github.com/Atharva2026/atharva-explorer',
    liveUrl: 'https://atharva-explorer.vercel.app',
    category: 'project',
  }
];

export const skills: Skill[] = [
  // AI / GenAI
  { id: 'langgraph', name: 'LangGraph', category: 'AI / GenAI', level: 'expert', description: 'Stateful multi-agent workflows', type: 'skill' },
  { id: 'langchain', name: 'LangChain', category: 'AI / GenAI', level: 'expert', description: 'LLM application orchestration', type: 'skill' },
  { id: 'rag', name: 'RAG', category: 'AI / GenAI', level: 'expert', description: 'Retrieval-Augmented Generation systems', type: 'skill' },
  { id: 'faiss', name: 'FAISS', category: 'AI / GenAI', level: 'advanced', description: 'Vector similarity search database', type: 'skill' },
  { id: 'multi-agent', name: 'Multi-Agent Systems', category: 'AI / GenAI', level: 'expert', description: 'Coordinating multiple autonomous AI agents', type: 'skill' },
  { id: 'llms', name: 'LLMs (Llama 3/3.1)', category: 'AI / GenAI', level: 'expert', description: 'Open-source and closed-source model deployment', type: 'skill' },
  { id: 'prompt-eng', name: 'Prompt Engineering', category: 'AI / GenAI', level: 'expert', description: 'Optimizing inputs for reasoning and structure', type: 'skill' },

  // Backend & APIs
  { id: 'fastapi', name: 'FastAPI', category: 'Backend & APIs', level: 'expert', description: 'Asynchronous Python web framework', type: 'skill' },
  { id: 'flask', name: 'Flask', category: 'Backend & APIs', level: 'advanced', description: 'Micro Python web framework', type: 'skill' },
  { id: 'celery', name: 'Celery', category: 'Backend & APIs', level: 'advanced', description: 'Distributed task queue', type: 'skill' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend & APIs', level: 'advanced', description: 'Server-side JavaScript runtime', type: 'skill' },
  { id: 'express', name: 'Express.js', category: 'Backend & APIs', level: 'advanced', description: 'Node.js web app framework', type: 'skill' },

  // Frontend
  { id: 'react', name: 'React.js', category: 'Frontend', level: 'expert', description: 'Building interactive SPAs', type: 'skill' },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', level: 'expert', description: 'React framework for production', type: 'skill' },
  { id: 'typescript-lang', name: 'TypeScript', category: 'Frontend', level: 'advanced', description: 'Type-safe JavaScript development', type: 'skill' },
  { id: 'reactnative', name: 'React Native', category: 'Frontend', level: 'intermediate', description: 'Hybrid mobile app development', type: 'skill' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases', level: 'advanced', description: 'Relational database management', type: 'skill' },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases', level: 'advanced', description: 'NoSQL document database', type: 'skill' },
  { id: 'supabase', name: 'Supabase', category: 'Databases', level: 'advanced', description: 'Firebase alternative with Postgres', type: 'skill' },

  // Languages
  { id: 'python', name: 'Python', category: 'Languages', level: 'expert', description: 'General purpose language, scripting, ML', type: 'skill' },
  { id: 'cpp', name: 'C++', category: 'Languages', level: 'advanced', description: 'System programming', type: 'skill' },
  { id: 'java', name: 'Java', category: 'Languages', level: 'intermediate', description: 'Object-oriented programming', type: 'skill' },
  { id: 'javascript', name: 'JavaScript', category: 'Languages', level: 'expert', description: 'Frontend and backend runtime scripting', type: 'skill' }
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
  { id: 'ethicraft-tech-head', name: 'Technical Head Appointed', issuer: 'Ethicraft Club', date: '2024-Present', type: 'certificate' },
  { id: 'btech-spuu', name: 'Electronics & Telecommunication B.Tech', issuer: 'Pune Institute of Computer Technology', date: '2024-2028', type: 'certificate' }
];

export const aboutItems: AboutItem[] = [
  {
    id: 'about-me',
    title: 'Summary',
    content: 'AI Engineer and Full-Stack Developer specializing in Agentic AI, Multi-Agent Systems, and LLM-powered applications. Experienced designing production-grade LangGraph workflows, RAG pipelines, and hybrid local/cloud AI systems. Seeking to build reliable, evaluation-driven GenAI products at scale.',
    type: 'about',
  },
  {
    id: 'experience',
    title: 'Work Experience',
    content: 'Technical Head – Ethicraft (2024 – Present)\n• Led a 4–6 developer team building the club’s official website end-to-end (Next.js + TypeScript, Supabase), owning architecture and deployment.\n• Directed technical decision-making across 6+ shipped features (auth, payments, admin dashboard, event management), serving 300+ active users.',
    type: 'about',
  },
  {
    id: 'education',
    title: 'Education',
    content: 'B.Tech in Electronics & Telecommunication (2024 – 2028)\nPune Institute of Computer Technology (SPPU)\nGPA: 8.9',
    type: 'about',
  },
];

export const allItems: SearchItem[] = [
  ...projects,
  ...skills.map(s => ({ ...s, title: s.name, description: s.description } as any)),
  ...aboutItems,
];

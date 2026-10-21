export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  date: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  certificatePdf?: string;
  skills: string[];
  summary?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  employmentType: string;
  description: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  highlight?: string;
  icon: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Madhav Zanwar",
    role: "Computer Science (AI & ML) Engineer",
    tagline: "Computer Science (AI & ML) Engineer at PCCOE. Passionate about machine learning, data structures and algorithms, and contributing to open-source ecosystems.",
    location: "Pune, Maharashtra, India",
    email: "madhavzanwar13@gmail.com",
    phone: "+91 8080956037",
    github: "https://github.com/madhavzanwar",
    linkedin: "https://www.linkedin.com/in/madhav-zanwar-395ba1389/",
    leetcode: "https://leetcode.com/u/madhav_builds/",
    resumeUrl: "https://drive.google.com/file/d/13CBm3TFJXFLnmvGnYJcgnU_7iMepAqPr/view?usp=sharing",
    education: {
      degree: "B.Tech in Computer Science (AI & ML)",
      institution: "Pimpri Chinchwad College of Engineering (PCCOE), Pune",
      period: "2025 – Present"
    },
    heroVideo: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4",
  },

  flagshipProjects: [
    {
      id: "quicksketch",
      title: "QuickSketch",
      category: "Computer Vision & Deep Learning",
      tagline: "Playful Neural Doodle & Real-Time Sketch Recognition",
      description: "A playful, high-performance sketch recognition web platform where users draw on an interactive canvas and a custom CNN model identifies the doodle in real time with high accuracy.",
      tags: [
        { name: "Python", color: "bg-[#3776AB]/15 text-[#6db3ec] border-[#3776AB]/30" },
        { name: "Custom CNN", color: "bg-[#06B6D4]/15 text-[#67e8f9] border-[#06B6D4]/30" },
        { name: "Computer Vision", color: "bg-[#06B6D4]/15 text-[#67e8f9] border-[#06B6D4]/30" },
        { name: "Flask", color: "bg-white/10 text-white border-white/20" },
        { name: "Railway", color: "bg-[#8B5CF6]/15 text-[#bca3f9] border-[#8B5CF6]/30" },
        { name: "Interactive Canvas", color: "bg-rose-500/15 text-rose-300 border-rose-500/30" }
      ],
      image: "/images/projects/quicksketch.jpg",
      githubUrl: "https://github.com/madhavzanwar/quicksketch",
      liveUrl: "https://madhavzanwar.github.io/quicksketch/",
      date: "May 2026"
    },
    {
      id: "memoryverse",
      title: "MemoryVerse AI",
      category: "LLM Reasoning & Semantic Knowledge",
      tagline: "Digital Identity System & Document Intelligence Engine",
      description: "An AI-powered digital identity platform that automatically ingests student certificates, resumes, and project documentation, extracts verified metadata, generates a chronological career timeline, and answers natural-language queries via semantic embeddings.",
      tags: [
        { name: "Python", color: "bg-[#3776AB]/15 text-[#6db3ec] border-[#3776AB]/30" },
        { name: "Gemini API", color: "bg-[#10B981]/15 text-[#5eead4] border-[#10B981]/30" },
        { name: "Vector Embeddings", color: "bg-[#8B5CF6]/15 text-[#bca3f9] border-[#8B5CF6]/30" },
        { name: "Semantic Search", color: "bg-[#06B6D4]/15 text-[#67e8f9] border-[#06B6D4]/30" },
        { name: "Vercel", color: "bg-white/10 text-white border-white/20" }
      ],
      image: "/images/projects/memoryverse.jpg",
      githubUrl: "https://github.com/madhavzanwar/memoryverse-ai",
      liveUrl: "https://memoryverse-ai-wheat.vercel.app",
      date: "Jul 2026"
    },
    {
      id: "kisansathi",
      title: "Kisan Sathi",
      category: "AgriTech & Multimodal AI",
      tagline: "AI AgriTech Platform with Multilingual Voice Assistance",
      description: "A comprehensive agricultural intelligence system empowering farmers with real-time leaf disease diagnosis via computer vision, automated voice assistance across regional Indian languages, and machine learning fertilizer recommendations.",
      tags: [
        { name: "JavaScript", color: "bg-[#F7DF1E]/15 text-[#fae863] border-[#F7DF1E]/30" },
        { name: "Computer Vision", color: "bg-[#06B6D4]/15 text-[#67e8f9] border-[#06B6D4]/30" },
        { name: "Voice AI", color: "bg-[#3B82F6]/15 text-[#93c5fd] border-[#3B82F6]/30" },
        { name: "AgriTech ML", color: "bg-[#22C55E]/15 text-[#86efac] border-[#22C55E]/30" },
        { name: "Vercel", color: "bg-white/10 text-white border-white/20" }
      ],
      image: "/images/projects/kisansathi.jpg",
      githubUrl: "https://github.com/madhavzanwar/kisan-sathi-app",
      liveUrl: "https://kisan-sathi-app-kappa.vercel.app",
      date: "Aug 2026"
    },
    {
      id: "placement",
      title: "Placement AI",
      category: "AI EdTech & Career Intelligence",
      tagline: "AI-Powered Placement Prep & Mock Interview Platform",
      description: "An end-to-end placement intelligence platform for college students featuring automated resume parsing, placement readiness scoring, interactive mock interviews with behavioral and technical feedback, and personalized skill roadmaps.",
      tags: [
        { name: "Python", color: "bg-[#3776AB]/15 text-[#6db3ec] border-[#3776AB]/30" },
        { name: "Flask", color: "bg-white/10 text-white border-white/20" },
        { name: "AI Integration", color: "bg-[#10B981]/15 text-[#5eead4] border-[#10B981]/30" },
        { name: "Resume Parsing", color: "bg-[#06B6D4]/15 text-[#67e8f9] border-[#06B6D4]/30" },
        { name: "Mock Interview", color: "bg-[#8B5CF6]/15 text-[#bca3f9] border-[#8B5CF6]/30" },
        { name: "Render", color: "bg-[#46E3B7]/15 text-[#46e3b7] border-[#46E3B7]/30" }
      ],
      image: "/images/projects/placement.jpg",
      githubUrl: "https://github.com/madhavzanwar/placement-ai",
      liveUrl: "https://placement-ai-g6ye.onrender.com",
      date: "Mar 2026"
    },
    {
      id: "synapse",
      title: "Synapse AI Tutor",
      category: "Cognitive Mentorship & AI Education",
      tagline: "Personalized AI Cognitive Tutor with Learning Telemetry",
      description: "An intelligent personalized tutoring platform that adapts learning roadmaps to individual student pacing, performs automated code syntax evaluation, and visualizes knowledge mastery curves over time.",
      tags: [
        { name: "Python", color: "bg-[#3776AB]/15 text-[#6db3ec] border-[#3776AB]/30" },
        { name: "Claude Prompting", color: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
        { name: "Interactive Dashboard", color: "bg-[#8B5CF6]/15 text-[#bca3f9] border-[#8B5CF6]/30" },
        { name: "Vercel", color: "bg-white/10 text-white border-white/20" }
      ],
      image: "/images/projects/synapse.jpg",
      githubUrl: "https://github.com/madhavzanwar/synapse-ai-teacher",
      liveUrl: "https://synapse-ai-teacher.vercel.app",
      date: "Sep 2026"
    },
    {
      id: "pulse-forge",
      title: "Pulse Forge",
      category: "IoT Telemetry & Clinical AI",
      tagline: "AI-Powered Smart Clinical Monitoring & Hemodynamic Triage",
      description: "An end-to-end intelligent IoT healthcare platform integrating continuous vital signs telemetry (SpO2, Heart Rate, Temperature), real-time ML risk stratification across 12 clinical scenarios, and context-aware medical AI guidance powered by Google Gemini.",
      tags: [
        { name: "Python", color: "bg-[#3776AB]/15 text-[#6db3ec] border-[#3776AB]/30" },
        { name: "React", color: "bg-[#61DAFB]/15 text-[#61dafb] border-[#61DAFB]/30" },
        { name: "Flask", color: "bg-white/10 text-white border-white/20" },
        { name: "Scikit-Learn", color: "bg-[#F7931E]/15 text-[#f7931e] border-[#F7931E]/30" },
        { name: "Gemini AI", color: "bg-[#10B981]/15 text-[#5eead4] border-[#10B981]/30" },
        { name: "ESP32 IoT", color: "bg-[#E7352C]/15 text-[#f87171] border-[#E7352C]/30" }
      ],
      image: "/images/projects/pulseforge.jpg",
      githubUrl: "https://github.com/madhavzanwar/Cep-project",
      liveUrl: "https://pulseforge-divyani22.vercel.app/",
      date: "Oct 2026"
    }
  ],

  archiveProjects: [
    {
      id: "genai-learn",
      title: "GenAI Learn",
      category: "Full-Stack EdTech & AI LMS",
      description: "Full-stack Learning Management System purpose-built for AI/ML education featuring modular video lessons, adaptive quizzes, progress-gated unlocking, and an embedded Gemini-powered AI tutor.",
      tags: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Gemini AI", "Vercel"],
      githubUrl: "https://github.com/madhavzanwar/genai-learn",
      liveUrl: "https://genai-learn-beta.vercel.app",
      date: "2026"
    },
    {
      id: "krishi-sahayak",
      title: "Krishi Sahayak (LLM Workshop)",
      category: "RAG & AgriTech Intelligence",
      description: "Advanced Retrieval-Augmented Generation (RAG) conversational agent powered by Gemini 2.0 Flash, ChromaDB vector store, and Sentence-Transformers for Indian agriculture with strict zero-hallucination citations.",
      tags: ["Python", "Gemini 2.0 Flash", "ChromaDB", "RAG", "Vector Search"],
      githubUrl: "https://github.com/madhavzanwar/llm-workshop",
      date: "2026"
    },
    {
      id: "traceguard",
      title: "TraceGuard",
      category: "Fintech & Expense Intelligence",
      description: "AI-Powered automated expense tracking application with intelligent spending categorization, budget management, and interactive dark-themed telemetry analytics built during Hack Carnival 2026.",
      tags: ["React", "JavaScript", "Fintech AI", "Dark Telemetry", "Vercel"],
      githubUrl: "https://github.com/madhavzanwar/hack-carnival-TraceGuard",
      liveUrl: "https://hack-carnival-trace-guard.vercel.app",
      date: "Apr 2026"
    },
    {
      id: "mathlab",
      title: "MathLab – Definite Integration Lab",
      category: "Mathematical Visualization",
      description: "Interactive virtual mathematics platform for dynamically visualizing bounded regions and iterated integrals for multivariable calculus using Desmos API.",
      tags: ["JavaScript", "Desmos API", "Calculus Visualizer", "Interactive Lab"],
      githubUrl: "https://github.com/madhavzanwar/interactive-definite-integration-lab",
      date: "May 2026"
    },
    {
      id: "pca-face-recognition",
      title: "PCA Face Recognition (Eigenfaces)",
      category: "Computer Vision & Linear Algebra",
      description: "Dimensionality reduction and facial recognition system in MATLAB using Eigenfaces, achieving 93.75% benchmark accuracy on the ORL dataset.",
      tags: ["MATLAB", "Eigenfaces", "ORL Dataset", "93.75% Accuracy"],
      githubUrl: "https://github.com/madhavzanwar/PCA-Face-Recognition-MATLAB",
      date: "Nov 2025"
    },
    {
      id: "maternal-health",
      title: "Maternal Health Risk Prediction",
      category: "Healthcare Machine Learning",
      description: "Clinical predictive modeling using decision trees and classification algorithms to detect maternal health risk factors during pregnancy.",
      tags: ["Python", "Scikit-Learn", "Healthcare ML", "EDA"],
      githubUrl: "https://github.com/madhavzanwar/maternal-health-risk-prediction",
      date: "Aug 2026"
    }
  ],

  certifications: [
    {
      id: "stanford-supervised-learning",
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "DeepLearning.AI & Stanford Online (Andrew Ng)",
      date: "Aug 2026",
      category: "AI & Machine Learning",
      credentialId: "1ZTKO3ZPFXFZ",
      credentialUrl: "https://coursera.org/verify/1ZTKO3ZPFXFZ",
      certificateImage: "/certificates/stanford-supervised-learning.png",
      certificatePdf: "/certificates/stanford-supervised-learning.pdf",
      skills: ["Supervised Learning", "Linear Regression", "Logistic Regression", "Gradient Descent", "Model Evaluation"],
      summary: "Authorized by DeepLearning.AI and Stanford Online, taught by Andrew Ng. Covers foundational machine learning algorithms, regularized cost functions, decision boundaries, and overfitting mitigation."
    },
    {
      id: "google-prompting-essentials",
      title: "Google Prompting Essentials Specialization (4 Courses)",
      issuer: "Google (Coursera)",
      date: "Jun 15, 2026",
      category: "AI & Machine Learning",
      credentialId: "MCLYT91Z170H",
      credentialUrl: "https://coursera.org/verify/specialization/MCLYT91Z170H",
      certificateImage: "/certificates/google-prompting-essentials.png",
      certificatePdf: "/certificates/google-prompting-essentials.pdf",
      skills: ["Prompt Engineering", "Prompt Chaining", "Multimodal Prompting", "AI Workflow Optimization"],
      summary: "Awarded for completing all 4 courses developed by Google: Start Writing Prompts like a Pro, Design Prompts for Everyday Work Tasks, Speed Up Data Analysis and Presentation Building, and Use AI as a Creative or Expert Partner."
    },
    {
      id: "google-speed-up-data-analysis",
      title: "Speed Up Data Analysis and Presentation Building",
      issuer: "Google (Coursera)",
      date: "May 28, 2026",
      category: "AI & Machine Learning",
      credentialId: "59J6PF1ZUQ1S",
      credentialUrl: "https://coursera.org/verify/59J6PF1ZUQ1S",
      certificateImage: "/certificates/google-speed-up-data-analysis.png",
      certificatePdf: "/certificates/google-speed-up-data-analysis.pdf",
      skills: ["Data Analysis", "AI Presentations", "Executive Synthesis", "Productivity"],
      summary: "Authorized by Google and offered through Coursera. Teaches hands-on techniques to accelerate data synthesis, uncover patterns, and build persuasive presentations using AI."
    },
    {
      id: "hackerrank-problem-solving",
      title: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      date: "Jun 29, 2026",
      category: "Skills & Engineering",
      credentialId: "A84982C7F5A8",
      credentialUrl: "https://www.hackerrank.com/certificates/a84982c7f5a8",
      certificateImage: "/certificates/hackerrank-problem-solving.png",
      certificatePdf: "/certificates/hackerrank-problem-solving.pdf",
      skills: ["Data Structures", "Algorithms", "Graph Traversal", "Optimization"],
      summary: "Verified intermediate problem solving credentials across data structures and complex algorithmic challenges assessed and signed by HackerRank CTO Harishankaran K."
    },
    {
      id: "wooble-memoryverse",
      title: "MemoryVerse AI '26 Challenge",
      issuer: "Wooble",
      date: "Jul 29, 2026",
      category: "Hackathons & Competitions",
      credentialId: "B830A02CF36E1B931D87893953",
      credentialUrl: "https://wooble.org/certifications/b830a02cf36e1b931d87893953",
      certificateImage: "/certificates/wooble-memoryverse.png",
      certificatePdf: "/certificates/wooble-memoryverse.pdf",
      skills: ["AI Engineering", "Semantic Retrieval", "Proof-of-Work", "Problem Solving"],
      summary: "Awarded for participating in a skill-based challenge hosted on Wooble, evidenced by a verified proof-of-work submission."
    },
    {
      id: "ai-odyssey-hackathon",
      title: "AI Odyssey: The LLM Design Workshop Mini Hackathon",
      issuer: "PCET's PCCOE (AAAI Chapter × AiMSA)",
      date: "Aug 14, 2026",
      category: "Hackathons & Competitions",
      certificateImage: "/certificates/ai-odyssey-llm-workshop.png",
      certificatePdf: "/certificates/ai-odyssey-llm-workshop.pdf",
      skills: ["LLM Design", "Prompt Engineering", "Mini Hackathon", "AI Architecture"],
      summary: "Organized by Team AAAI Student Chapter × AiMSA, Department of CSE (AI & ML), PCCOE Pune. Completed hands-on architectural sprint on LLM design and prompt workflows."
    },
    {
      id: "web-sprint-hackathon",
      title: "WEB-SPRINT Hackathon",
      issuer: "PCET's PCCOE (GeeksforGeeks Campus Body × AiMSA)",
      date: "Aug 18, 2026",
      category: "Hackathons & Competitions",
      certificateImage: "/certificates/web-sprint-gfg-pccoe.png",
      certificatePdf: "/certificates/web-sprint-gfg-pccoe.pdf",
      skills: ["Frontend Engineering", "Web Development", "Rapid Prototyping"],
      summary: "Organized by Team GeeksforGeeks Campus Body in association with Team AiMSA, PCCOE Pune. Intensive rapid web development and modern frontend sprint."
    },
    {
      id: "gdg-flutterflow",
      title: "Flutter Flow Workshop",
      issuer: "Google Developer Groups on Campus (GDG), PCCOE Pune",
      date: "2026",
      category: "Skills & Engineering",
      certificateImage: "/certificates/gdg-flutterflow.png",
      certificatePdf: "/certificates/gdg-flutterflow.pdf",
      skills: ["FlutterFlow", "Mobile App Development", "Cross-Platform UI"],
      summary: "Hands-on workshop organized by Google Developer Groups on Campus at PCCOE Pune covering FlutterFlow visual development and mobile architectures."
    },
    {
      id: "national-ds-olympiad",
      title: "National Data Science Olympiad 2026",
      issuer: "SRMIST Chennai (Pinnacle Excellence Conclave) / Unstop",
      date: "2026",
      category: "Hackathons & Competitions",
      certificateImage: "/certificates/srm-data-science-olympiad.png",
      certificatePdf: "/certificates/srm-data-science-olympiad.pdf",
      skills: ["Data Science", "Python", "Predictive Analytics", "Statistical Analysis"],
      summary: "Participated in the National Data Science Olympiad at Pinnacle Excellence Conclave 2026 organized by SRM Institute of Science and Technology (SRMIST), Kattankulathur, Chennai."
    },
    {
      id: "frontend-wars-2026",
      title: "Qualifier Round of Frontend Wars 2026: Build the Future",
      issuer: "Frontend Arena / Unstop",
      date: "2026",
      category: "Hackathons & Competitions",
      certificateImage: "/certificates/frontend-wars-2026.png",
      certificatePdf: "/certificates/frontend-wars-2026.pdf",
      skills: ["Frontend Engineering", "Modern CSS", "JavaScript", "Component Design"],
      summary: "Participated and qualified in the national Qualifier Round of Frontend Wars 2026: Build the Future organized by Frontend Arena on Unstop."
    },
    {
      id: "ieee-summer-of-code-2026",
      title: "IEEE Summer of Code 2026",
      issuer: "IEEE Student Branch, Graphic Era Hill University / Unstop",
      date: "2026",
      category: "Hackathons & Competitions",
      certificateImage: "/certificates/ieee-summer-of-code-2026.png",
      certificatePdf: "/certificates/ieee-summer-of-code-2026.pdf",
      skills: ["Open Source", "Software Engineering", "Git & GitHub", "Collaboration"],
      summary: "Participated in open-source software engineering and collaborative repository development during IEEE Summer of Code 2026."
    },
    {
      id: "inceptia-hackathon",
      title: "Inceptia Hackathon – Presentation Submission Round",
      issuer: "PCCOE & Research (PCCOE&R), Pune / Unstop",
      date: "2026",
      category: "Hackathons & Competitions",
      certificateImage: "/certificates/inceptia-hackathon-pccoer.png",
      certificatePdf: "/certificates/inceptia-hackathon-pccoer.pdf",
      skills: ["Technical Defense", "Product Architecture", "Pitch Presentation"],
      summary: "Participated in the presentation submission round of Inceptia Hackathon organized by Pimpri Chinchwad College Of Engineering & Research (PCCOE&R), Pune on Unstop."
    }
  ],

  experiences: [
    {
      id: "gdgc-competitive-programming",
      role: "Executive – Competitive Programming",
      organization: "Google Developer Groups on Campus (GDGC), PCCOE",
      location: "Pune, Maharashtra, India · On-site",
      period: "Aug 2026 – Present",
      employmentType: "Part-time",
      description: [
        "Executive in the Competitive Programming domain at GDGC, PCCOE.",
        "Contributing to coding initiatives, campus problem-solving activities, algorithmic contests, and technical events."
      ]
    },
    {
      id: "she-can-ai-intern",
      role: "AI Intern",
      organization: "She Can Foundation",
      location: "Remote",
      period: "Aug 2026 – Present",
      employmentType: "Internship",
      description: [
        "Selected for an AI internship at She Can Foundation through Internshala.",
        "Applying artificial intelligence and machine learning techniques to support the foundation's social impact initiatives, gaining hands-on project experience."
      ]
    },
    {
      id: "pccoe-web-intern",
      role: "Web Developer Intern",
      organization: "Office of Dean International, PCCOE",
      location: "Pune, Maharashtra, India · On-site",
      period: "Aug 2026 – Present",
      employmentType: "Internship",
      description: [
        "Working as a Web Developer Intern under the Office of Dean International, PCCOE.",
        "Contributing to international web development initiatives and technical systems while gaining practical experience in developing and maintaining web-based solutions."
      ]
    },
    {
      id: "issoc-contributor",
      role: "IEEE Summer of Code Contributor",
      organization: "IEEE Student Branch, Graphic Era Hill University (GEHU)",
      location: "Remote",
      period: "Jul 2026 – Present",
      employmentType: "Part-time",
      description: [
        "Contributing in IEEE Summer of Code 2026, engaging in a nationwide coding-focused open-source program.",
        "Collaborating on open-source repositories, tackling algorithmic challenges, and submitting peer-reviewed pull requests."
      ]
    },
    {
      id: "gssoc-contributor",
      role: "Open Source Contributor",
      organization: "GirlScript Summer of Code (GSSoC)",
      location: "Pune · Remote",
      period: "May 2026 – Present",
      employmentType: "Part-time",
      description: [
        "Selected as an active open source contributor among 35,000+ applicants.",
        "Contributing to the AI/Agents & Open Source track, working on production repositories, agent architectures, and technical documentation."
      ]
    },
    {
      id: "ieee-cis-member",
      role: "Member",
      organization: "IEEE Computational Intelligence Society",
      location: "Pune, Maharashtra, India",
      period: "Sep 2025 – Present",
      employmentType: "Member",
      description: [
        "Active member of IEEE Computational Intelligence Society.",
        "Engaging with the professional academic and engineering community in computational intelligence, deep learning, and advanced AI domains."
      ]
    }
  ],

  achievements: [
    {
      id: "treasure-hunt",
      title: "Spectrum Tech Winner",
      organization: "PCCOE Spectrum Campus Fest",
      date: "2026",
      description: "Led problem solving across logical, algorithmic, and campus technical challenges to secure 1st place with a cash prize.",
      highlight: "1st Place · ₹4,000 Cash Prize",
      icon: "Trophy"
    },
    {
      id: "reading-comp",
      title: "2nd Place – PCCOE Reading & Critical Reflection",
      organization: "PCCOE College Competition",
      date: "2026",
      description: "Recognized for analytical text comprehension, clarity of synthesis, and reflective presentation, securing second place.",
      highlight: "2nd Place · ₹2,000 Cash Prize",
      icon: "BookOpen"
    },
    {
      id: "leetcode",
      title: "350+ LeetCode Problems Solved",
      organization: "LeetCode (leetcode.com/u/madhav_builds/)",
      date: "Active Record 2026",
      description: "Consistent problem solving in C++ and Python across Arrays, Dynamic Programming, Recursion, Binary Trees, and Graphs.",
      highlight: "350+ DSA Solutions",
      icon: "LeetCode"
    },
    {
      id: "hack-carnival",
      title: "Hack Carnival 2026 Finalist (TraceGuard)",
      organization: "Hack Carnival 36-Hour Hackathon",
      date: "Apr 2026",
      description: "Qualified for the high-intensity final round by designing and building TraceGuard under rapid prototyping time constraints.",
      highlight: "Finalist Round",
      icon: "Compass"
    }
  ],

  // 100% Crisp, High-Contrast, Verified Tech Logos for Marquee
  techLogos: [
    { name: "Python", slug: "python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "C++", slug: "cplusplus", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "C", slug: "c", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "JavaScript", slug: "javascript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", slug: "typescript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "React", slug: "react", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Tailwind CSS", slug: "tailwindcss", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "HTML5", slug: "html5", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", slug: "css3", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Vite", slug: "vite", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
    { name: "Flask", slug: "flask", iconUrl: "/images/logos/flask.svg" },
    { name: "MATLAB", slug: "matlab", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" },
    { name: "Git", slug: "git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", slug: "github", iconUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z'/></svg>" },
    { name: "Vercel", slug: "vercel", iconUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 116 100' fill='white'><polygon points='58 0 116 100 0 100'/></svg>" },
    { name: "Linux", slug: "linux", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Pandas", slug: "pandas", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "NumPy", slug: "numpy", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Kaggle", slug: "kaggle", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg" },
    { name: "OpenCV", slug: "opencv", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" }
  ]
};

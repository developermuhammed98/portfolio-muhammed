export interface EducationItem {
  school: string;
  degree: string;
  period: string;
}

export interface SkillCategory {
  title: string;
  accent: "cyan" | "violet" | "indigo" | "slate";
  tags: string[];
}

export interface Project {
  title: string;
  featured: boolean;
  type: string;
  accent: "cyan" | "violet" | "indigo" | "slate";
  label?: string;
  year: number;
  github?: string;
  url?: string;
  tech: string[];
  description: string;
  highlights?: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  isSecondary?: boolean;
}

export interface PortfolioData {
  name: string;
  role: string;
  availableForWork: boolean;
  availableText: string;
  headline: string;
  bio: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  experienceTitle: string;
  skillsTitle: string;
  projectsTitle: string;
  contactTitle: string;
  stats: string;
  educationTitle: string;
  certificationTitle: string;
  education: EducationItem[];
  certifications: string[];
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    description: string;
    terminalCommand: string;
    referencesNote: string;
    sendEmailText: string;
  };
  // UI strings
  ui: {
    seeProjects: string;
    contactMe: string;
    workTogetherHeadline: string;
    previewBtn: string;
    liveBtn: string;
    newTab: string;
    closeBtn: string;
    reloadBtn: string;
    iframeWarning: string;
    openInNewTab: string;
    loading: string;
    availableForWork: string;
    references: string;
    referencesLong: string;
    tagline: string;
  };
}

export const portfolioDataTR: PortfolioData = {
  name: "Muhammed Bülbül",
  role: "Web Developer",
  availableForWork: true,
  availableText: "Çalışmaya Hazır",
  headline: "Karanlıkta kod yazar, fikirleri çalışan ürünlere dönüştürürüm.",
  bio: "React.js, Next.js, Laravel, PHP, MySQL ve Tailwind CSS ile modern, responsive ve yönetilebilir web uygulamaları geliştiriyorum.",
  aboutTitle: "Hakkımda",
  aboutParagraph1:
    "Merhaba, ben Muhammed. Web developer olarak modern, responsive ve kullanıcı dostu web arayüzleri geliştiriyorum. Frontend tarafında React.js, Next.js, JavaScript, HTML/CSS ve Tailwind CSS; backend tarafında Laravel, PHP, Blade, MySQL ve Eloquent ORM ile çalışıyorum.",
  aboutParagraph2:
    "Freelance projelerde kurumsal web siteleri geliştirdim, mevcut siteleri modernize ettim ve Next.js tabanlı bir yapının Laravel 12 mimarisine taşınması gibi kapsamlı migration süreçlerinde yer aldım. Benim için iyi bir web sitesi yalnızca estetik değil; hızlı, mobil uyumlu, yönetilebilir, sürdürülebilir ve gerçek kullanıcı ihtiyacına cevap veren bir üründür.",
  experienceTitle: "Deneyim",
  skillsTitle: "Yetenekler",
  projectsTitle: "Projeler",
  contactTitle: "İletişim",
  stats: "1+ yıl deneyim · 7+ proje · İstanbul",
  educationTitle: "Eğitim",
  certificationTitle: "Sertifikasyon",
  education: [
    {
      school: "Atatürk Üniversitesi",
      degree: "Bilgisayar Programcılığı, Ön Lisans",
      period: "2023 - Devam",
    },
    {
      school: "Biruni Üniversitesi",
      degree: "Ağız ve Diş Sağlığı, Ön Lisans",
      period: "2018 - 2020",
    },
  ],
  certifications: [
    "SoftITO Software Academy — Front-End Developer Training, 2025",
  ],
  skills: [
    {
      title: "Frontend",
      accent: "cyan",
      tags: [
        "HTML5",
        "CSS3",
        "JavaScript ES6+",
        "React.js",
        "Next.js",
        "Bootstrap",
        "Tailwind CSS",
        "Responsive Design",
      ],
    },
    {
      title: "Laravel / Backend",
      accent: "violet",
      tags: [
        "Laravel 12",
        "PHP",
        "Blade",
        "MySQL",
        "Eloquent ORM",
        "Middleware",
        "Routing",
        "Authentication",
      ],
    },
    {
      title: "Web & Deployment",
      accent: "indigo",
      tags: [
        "Vite",
        "Git",
        "GitHub",
        "SEO Basics",
        "XML Sitemap",
        "SMTP",
        "cPanel",
        "Plesk",
      ],
    },
    {
      title: "IT Support",
      accent: "slate",
      tags: [
        "Windows 10/11",
        "Office 365",
        "Troubleshooting",
        "AnyDesk",
        "TeamViewer",
        "VirtualBox",
        "VMware",
      ],
    },
  ],
  projects: [
    {
      title: "Kentled Website Modernization",
      featured: false,
      type: "Frontend",
      accent: "violet",
      year: 2025,
      url: "https://www.kentled.com/",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description:
        "Mevcut kurumsal web sitesinin kullanılabilirlik, görsel tutarlılık, responsive sunum ve navigasyon açılarından modernize edilmesi projesi.",
    },
    {
      title: "Fesa Architecture Website",
      featured: false,
      type: "Frontend",
      accent: "indigo",
      year: 2026,
      url: "https://www.fesamimarlik.com/",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description:
        "Mimarlık markası için modern, responsive ve performans odaklı web sitesi. UI tasarım, development, deployment ve launch süreçleri kapsamlı olarak yürütüldü.",
    },
    {
      title: "B2B Profesörü Laravel Migration",
      featured: true,
      type: "Full Stack",
      accent: "violet",
      year: 2026,
      url: "https://www.b2bprofesoru.com/",
      tech: ["Laravel 12", "PHP 8.2+", "Blade", "Tailwind CSS 4", "Vite", "MySQL"],
      description:
        "Next.js tabanlı yapının Laravel 12 mimarisine taşındığı kapsamlı migration projesi. Blade template, Tailwind CSS 4, Vite build, TR/EN çok dilli routing ve session-based admin auth üzerine çalışıldı.",
      highlights: [
        "Next.js → Laravel 12 migration",
        "TR/EN çok dilli routing + locale middleware",
        "Session-based admin authentication",
        "SMTP + contact reply emails",
        "XML sitemap + SEO configuration",
        "Unicode NFC/NFD Türkçe karakter sorunu çözümü",
      ],
    },
    {
      title: "DehaSoft E-Commerce Platform",
      featured: false,
      type: "Full Stack",
      accent: "cyan",
      year: 2026,
      github: "https://github.com/developermuhammed98/DehaSoft",
      tech: [
        "Next.js 14",
        "Laravel 13",
        "TypeScript",
        "PHP",
        "JWT Auth",
        "MySQL",
        "SQLite",
        "Proxy Architecture",
        "REST API",
      ],
      description:
        "Güvenlik odaklı proxy mimarisiyle inşa edilmiş full-stack e-ticaret projesi. Frontend (Next.js), Laravel API'ye hiçbir zaman doğrudan erişmez; tüm istekler Next.js API Route'ları üzerinden proxy edilir. JWT token'lar httpOnly Cookie'de saklanır.",
    },
    {
      title: "Softverra Technology Website",
      featured: false,
      type: "Frontend",
      accent: "cyan",
      year: 2025,
      url: "https://softverra.com",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description:
        "Teknoloji danışmanlığı firması için temiz, kullanıcı odaklı ve profesyonel marka sunumu sağlayan kurumsal web sitesi.",
    },
    {
      title: "Personal / Game Studio Website",
      featured: false,
      type: "Frontend",
      accent: "indigo",
      year: 2025,
      url: "https://salihcancengel.com",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description:
        "Responsive layout, görsel tutarlılık ve kullanıcı dostu navigasyon odağıyla yeniden tasarlanan kişisel ve game studio web sitesi.",
    },
    {
      title: "Order Tracking Admin Panel",
      featured: false,
      type: "Internal Concept",
      accent: "slate",
      label: "Konsept",
      year: 2025,
      tech: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS"],
      description:
        "Sipariş durumlarının admin panel üzerinden takip edildiği; listeleme, filtreleme, CRUD ve durum yönetimi içeren Laravel tabanlı özel yönetim paneli konsepti.",
    },
    {
      title: "AI English Learning App",
      featured: false,
      type: "Product Concept",
      accent: "violet",
      label: "Konsept",
      year: 2025,
      tech: ["Unity", "C#", "Azure OpenAI", "Realtime AI"],
      description:
        "Çocuklar için oyunlaştırılmış İngilizce öğrenme deneyimi; sesli etkileşim, realtime AI ve eğitsel mini-game akışları üzerine kurgulanan uygulama konsepti.",
    },
  ],
  experience: [
    {
      role: "Freelance Web Geliştirici",
      company: "Freelance",
      period: "2025 - Devam",
      location: "İstanbul / Remote",
      description:
        "Küçük ve orta ölçekli işletmeler için responsive web siteleri geliştirdim. UI planlama, frontend development, test, deployment ve launch support süreçlerinde yer aldım. Mevcut web sitelerini modernize ederek görsel tutarlılık, navigasyon ve kullanıcı deneyimini iyileştirdim.",
    },
    {
      role: "Dental Asistan",
      company: "Biruni Üniversitesi Diş Hastanesi",
      period: "2021 - 2022",
      description:
        "Yoğun klinik ortamında operasyon desteği, hasta hazırlığı ve ekip koordinasyonunda görev aldım. Bu deneyim iletişim, dikkat ve problem çözme becerilerimi güçlendirdi.",
      isSecondary: true,
    },
  ],
  contact: {
    email: "dentamhmmd@gmail.com",
    github: "https://github.com/developermuhammed98",
    linkedin: "https://linkedin.com/in/developermuhammed98",
    description:
      "Yeni bir web sitesi, Laravel tabanlı yönetim paneli, frontend geliştirme veya website modernizasyon projesi için benimle iletişime geçebilirsin.",
    terminalCommand: "reach_out --method=email --response=fast",
    referencesNote: "* referanslar talep doğrultusunda sunulabilir.",
    sendEmailText: "E-posta Gönder",
  },
  ui: {
    seeProjects: "Projelerimi Gör",
    contactMe: "İletişime Geç",
    workTogetherHeadline: "Birlikte çalışalım.",
    previewBtn: "Ön İzleme",
    liveBtn: "Live",
    newTab: "Yeni Sekme ↗",
    closeBtn: "Kapat",
    reloadBtn: "↻",
    iframeWarning:
      '⚠️ Bu web sitesi güvenlik protokolleri nedeniyle yüklenmeyebilir. Sayfa açılmazsa "Yeni Sekme ↗" butonunu kullanın.',
    openInNewTab: "Yeni Sekmede Aç ↗",
    loading: "Yükleniyor",
    availableForWork: "Available for work",
    references: "* referanslar talep doğrultusunda sunulabilir.",
    referencesLong: "* referanslar talep doğrultusunda sunulabilir.",
    tagline: "Web Developer • React.js • Next.js • Laravel",
  },
};

export const portfolioDataEN: PortfolioData = {
  name: "Muhammed Bülbül",
  role: "Web Developer",
  availableForWork: true,
  availableText: "Available for Work",
  headline: "I write code in the dark and turn ideas into working products.",
  bio: "I develop modern, responsive and manageable web applications with React.js, Next.js, Laravel, PHP, MySQL and Tailwind CSS.",
  aboutTitle: "About Me",
  aboutParagraph1:
    "Hello, I'm Muhammed. As a web developer, I build modern, responsive, and user-friendly web interfaces. I work with React.js, Next.js, JavaScript, HTML/CSS, and Tailwind CSS on the frontend; and Laravel, PHP, Blade, MySQL, and Eloquent ORM on the backend.",
  aboutParagraph2:
    "I have developed corporate websites in freelance projects, modernized existing sites, and participated in comprehensive migration processes such as porting Next.js-based systems to Laravel 12 architecture. For me, a good website is not only aesthetic; it is fast, mobile-friendly, manageable, sustainable, and meets real user needs.",
  experienceTitle: "Experience",
  skillsTitle: "Skills",
  projectsTitle: "Projects",
  contactTitle: "Contact",
  stats: "1+ year experience · 7+ projects · Istanbul",
  educationTitle: "Education",
  certificationTitle: "Certifications",
  education: [
    {
      school: "Ataturk University",
      degree: "Computer Programming, Associate Degree",
      period: "2023 - Present",
    },
    {
      school: "Biruni University",
      degree: "Oral and Dental Health, Associate Degree",
      period: "2018 - 2020",
    },
  ],
  certifications: [
    "SoftITO Software Academy — Front-End Developer Training, 2025",
  ],
  skills: [
    {
      title: "Frontend",
      accent: "cyan",
      tags: [
        "HTML5",
        "CSS3",
        "JavaScript ES6+",
        "React.js",
        "Next.js",
        "Bootstrap",
        "Tailwind CSS",
        "Responsive Design",
      ],
    },
    {
      title: "Laravel / Backend",
      accent: "violet",
      tags: [
        "Laravel 12",
        "PHP",
        "Blade",
        "MySQL",
        "Eloquent ORM",
        "Middleware",
        "Routing",
        "Authentication",
      ],
    },
    {
      title: "Web & Deployment",
      accent: "indigo",
      tags: [
        "Vite",
        "Git",
        "GitHub",
        "SEO Basics",
        "XML Sitemap",
        "SMTP",
        "cPanel",
        "Plesk",
      ],
    },
    {
      title: "IT Support",
      accent: "slate",
      tags: [
        "Windows 10/11",
        "Office 365",
        "Troubleshooting",
        "AnyDesk",
        "TeamViewer",
        "VirtualBox",
        "VMware",
      ],
    },
  ],
  projects: [
    {
      title: "Kentled Website Modernization",
      featured: false,
      type: "Frontend",
      accent: "violet",
      year: 2025,
      url: "https://www.kentled.com/",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description:
        "A project to modernize the existing corporate website in terms of usability, visual consistency, responsive presentation, and navigation.",
    },
    {
      title: "Fesa Architecture Website",
      featured: false,
      type: "Frontend",
      accent: "indigo",
      year: 2026,
      url: "https://www.fesamimarlik.com/",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description:
        "A modern, responsive, and performance-oriented website for an architecture brand. UI design, development, deployment, and launch processes were comprehensively managed.",
    },
    {
      title: "B2B Profesörü Laravel Migration",
      featured: true,
      type: "Full Stack",
      accent: "violet",
      year: 2026,
      url: "https://www.b2bprofesoru.com/",
      tech: ["Laravel 12", "PHP 8.2+", "Blade", "Tailwind CSS 4", "Vite", "MySQL"],
      description:
        "A comprehensive migration project porting a Next.js-based system to Laravel 12 architecture. Worked on Blade templates, Tailwind CSS 4, Vite build, TR/EN multilingual routing, and session-based admin auth.",
      highlights: [
        "Next.js → Laravel 12 migration",
        "TR/EN multilingual routing + locale middleware",
        "Session-based admin authentication",
        "SMTP + contact reply emails",
        "XML sitemap + SEO configuration",
        "Unicode NFC/NFD Turkish character issue solution",
      ],
    },
    {
      title: "DehaSoft E-Commerce Platform",
      featured: false,
      type: "Full Stack",
      accent: "cyan",
      year: 2026,
      github: "https://github.com/developermuhammed98/DehaSoft",
      tech: [
        "Next.js 14",
        "Laravel 13",
        "TypeScript",
        "PHP",
        "JWT Auth",
        "MySQL",
        "SQLite",
        "Proxy Architecture",
        "REST API",
      ],
      description:
        "A full-stack e-commerce project built with a security-focused proxy architecture. The frontend (Next.js) never directly accesses the Laravel API; all requests are proxied via Next.js API Routes. JWT tokens are stored in httpOnly Cookies.",
    },
    {
      title: "Softverra Technology Website",
      featured: false,
      type: "Frontend",
      accent: "cyan",
      year: 2025,
      url: "https://softverra.com",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description:
        "A corporate website for a technology consulting firm providing a clean, user-oriented, and professional brand presentation.",
    },
    {
      title: "Personal / Game Studio Website",
      featured: false,
      type: "Frontend",
      accent: "indigo",
      year: 2025,
      url: "https://salihcancengel.com",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description:
        "A personal and game studio website redesigned with a focus on responsive layout, visual consistency, and user-friendly navigation.",
    },
    {
      title: "Order Tracking Admin Panel",
      featured: false,
      type: "Internal Concept",
      accent: "slate",
      label: "Concept",
      year: 2025,
      tech: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS"],
      description:
        "A Laravel-based custom admin panel concept for tracking order statuses; includes listing, filtering, CRUD, and status management.",
    },
    {
      title: "AI English Learning App",
      featured: false,
      type: "Product Concept",
      accent: "violet",
      label: "Concept",
      year: 2025,
      tech: ["Unity", "C#", "Azure OpenAI", "Realtime AI"],
      description:
        "An educational app concept for children featuring gamified English learning, voice interaction, real-time AI, and educational mini-games.",
    },
  ],
  experience: [
    {
      role: "Freelance Web Developer",
      company: "Freelance",
      period: "2025 - Present",
      location: "Istanbul / Remote",
      description:
        "Developed responsive websites for small and medium-sized enterprises. Handled UI planning, frontend development, testing, deployment, and launch support. Modernized existing websites to improve visual consistency, navigation, and user experience.",
    },
    {
      role: "Dental Assistant",
      company: "Biruni University Dental Hospital",
      period: "2021 - 2022",
      description:
        "Assisted in surgeries, prepared patients, and coordinated team tasks in a fast-paced clinical environment. This experience strengthened my communication, detail-orientation, and problem-solving skills.",
      isSecondary: true,
    },
  ],
  contact: {
    email: "dentamhmmd@gmail.com",
    github: "https://github.com/developermuhammed98",
    linkedin: "https://linkedin.com/in/developermuhammed98",
    description:
      "Feel free to contact me for a new website, a Laravel-based admin panel, frontend development, or a website modernization project.",
    terminalCommand: "reach_out --method=email --response=fast",
    referencesNote: "* references available upon request.",
    sendEmailText: "Send Email",
  },
  ui: {
    seeProjects: "See My Projects",
    contactMe: "Get in Touch",
    workTogetherHeadline: "Let's work together.",
    previewBtn: "Preview",
    liveBtn: "Live",
    newTab: "New Tab ↗",
    closeBtn: "Close",
    reloadBtn: "↻",
    iframeWarning:
      '⚠️ This website may not load due to security protocols (iframe protection). Use "New Tab ↗" if it doesn\'t load.',
    openInNewTab: "Open in New Tab ↗",
    loading: "Loading",
    availableForWork: "Available for work",
    references: "* references available upon request.",
    referencesLong: "* references available upon request.",
    tagline: "Web Developer • React.js • Next.js • Laravel",
  },
};

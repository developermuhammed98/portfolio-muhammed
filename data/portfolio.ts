export interface Socials {
  email: string;
  github: string;
  linkedin: string;
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

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  availableForWork: boolean;
  headline: string;
  bio: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  stats: string;
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
  };
}

export const portfolioData: PortfolioData = {
  name: "Muhammed Bülbül",
  role: "Web Developer",
  availableForWork: true,
  headline: "Karanlıkta kod yazar,\nfikirleri çalışan ürünlere dönüştürürüm.",
  bio: "React.js, Next.js, Laravel, PHP, MySQL ve Tailwind CSS ile modern, responsive ve yönetilebilir web uygulamaları geliştiriyorum.",
  aboutParagraph1: "Merhaba, ben Muhammed. Web developer olarak modern, responsive ve kullanıcı dostu web arayüzleri geliştiriyorum. Frontend tarafında React.js, Next.js, JavaScript, HTML/CSS ve Tailwind CSS; backend tarafında Laravel, PHP, Blade, MySQL ve Eloquent ORM ile çalışıyorum.",
  aboutParagraph2: "Freelance projelerde kurumsal web siteleri geliştirdim, mevcut siteleri modernize ettim ve Next.js tabanlı bir yapının Laravel 12 mimarisine taşınması gibi kapsamlı migration süreçlerinde yer aldım. Benim için iyi bir web sitesi yalnızca estetik değil; hızlı, mobil uyumlu, yönetilebilir, sürdürülebilir ve gerçek kullanıcı ihtiyacına cevap veren bir üründür.",
  stats: "1+ yıl deneyim · 7+ proje · İstanbul",
  education: [
    {
      school: "Atatürk Üniversitesi",
      degree: "Bilgisayar Programcılığı, Ön Lisans",
      period: "2023 - Devam"
    },
    {
      school: "Biruni Üniversitesi",
      degree: "Ağız ve Diş Sağlığı, Ön Lisans",
      period: "2018 - 2020"
    }
  ],
  certifications: [
    "SoftITO Software Academy — Front-End Developer Training, 2025"
  ],
  skills: [
    {
      title: "Frontend",
      accent: "cyan",
      tags: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Next.js", "Bootstrap", "Tailwind CSS", "Responsive Design"]
    },
    {
      title: "Laravel / Backend",
      accent: "violet",
      tags: ["Laravel 12", "PHP", "Blade", "MySQL", "Eloquent ORM", "Middleware", "Routing", "Authentication"]
    },
    {
      title: "Web & Deployment",
      accent: "indigo",
      tags: ["Vite", "Git", "GitHub", "SEO Basics", "XML Sitemap", "SMTP", "cPanel", "Plesk"]
    },
    {
      title: "IT Support",
      accent: "slate",
      tags: ["Windows 10/11", "Office 365", "Troubleshooting", "AnyDesk", "TeamViewer", "VirtualBox", "VMware"]
    }
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
      description: "Mevcut kurumsal web sitesinin kullanılabilirlik, görsel tutarlılık, responsive sunum ve navigasyon açılarından modernize edilmesi projesi."
    },
    {
      title: "Fesa Architecture Website",
      featured: false,
      type: "Frontend",
      accent: "indigo",
      year: 2026,
      url: "https://www.fesamimarlik.com/",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description: "Mimarlık markası için modern, responsive ve performans odaklı web sitesi. UI tasarım, development, deployment ve launch süreçleri kapsamlı olarak yürütüldü."
    },
    {
      title: "B2B Profesörü Laravel Migration",
      featured: true,
      type: "Full Stack",
      accent: "violet",
      year: 2026,
      url: "https://www.b2bprofesoru.com/",
      tech: ["Laravel 12", "PHP 8.2+", "Blade", "Tailwind CSS 4", "Vite", "MySQL"],
      description: "Next.js tabanlı yapının Laravel 12 mimarisine taşındığı kapsamlı migration projesi. Blade template, Tailwind CSS 4, Vite build, TR/EN çok dilli routing ve session-based admin auth üzerine çalışıldı.",
      highlights: [
        "Next.js → Laravel 12 migration",
        "TR/EN multilingual routing + locale middleware",
        "Session-based admin authentication",
        "SMTP + contact reply emails",
        "XML sitemap + SEO configuration",
        "Unicode NFC/NFD Türkçe karakter sorunu çözümü"
      ]
    },
    {
      title: "DehaSoft E-Commerce Platform",
      featured: false,
      type: "Full Stack",
      accent: "cyan",
      year: 2026,
      github: "https://github.com/developermuhammed98/DehaSoft",
      tech: ["Next.js 14", "Laravel 13", "TypeScript", "PHP", "JWT Auth", "MySQL", "SQLite", "Proxy Architecture", "REST API"],
      description: "Güvenlik odaklı proxy mimarisiyle inşa edilmiş full-stack e-ticaret projesi. Frontend (Next.js), Laravel API'ye hiçbir zaman doğrudan erişmez; tüm istekler Next.js API Route'ları üzerinden proxy edilir. JWT token'lar httpOnly Cookie'de saklanır. Ürün yönetimi, sepet sistemi, sipariş akışı ve harici döviz kuru API entegrasyonu içerir.",
      highlights: [
        "Next.js 14 proxy katmanı + Laravel 13 REST API",
        "JWT + httpOnly Cookie authentication",
        "Ürün CRUD, sepet, sipariş sistemi",
        "Anlık döviz kuru (harici API entegrasyonu)",
        "Postman API dokümantasyonu",
        "SQLite → MySQL geçişi desteklenir"
      ]
    },
    {
      title: "Softverra Technology Website",
      featured: false,
      type: "Frontend",
      accent: "cyan",
      year: 2025,
      url: "https://softverra.com",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description: "Teknoloji danışmanlığı firması için temiz, kullanıcı odaklı ve profesyonel marka sunumu sağlayan kurumsal web sitesi."
    },
    {
      title: "Personal / Game Studio Website",
      featured: false,
      type: "Frontend",
      accent: "indigo",
      year: 2025,
      url: "https://salihcancengel.com",
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      description: "Responsive layout, görsel tutarlılık ve kullanıcı dostu navigasyon odağıyla yeniden tasarlanan kişisel ve game studio web sitesi."
    },
    {
      title: "Order Tracking Admin Panel",
      featured: false,
      type: "Internal Concept",
      accent: "slate",
      label: "Concept",
      year: 2025,
      tech: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS"],
      description: "Sipariş durumlarının admin panel üzerinden takip edildiği; listeleme, filtreleme, CRUD ve durum yönetimi içeren Laravel tabanlı özel yönetim paneli konsepti."
    },
    {
      title: "AI English Learning App",
      featured: false,
      type: "Product Concept",
      accent: "violet",
      label: "Concept",
      year: 2025,
      tech: ["Unity", "C#", "Azure OpenAI", "Realtime AI"],
      description: "Çocuklar için oyunlaştırılmış İngilizce öğrenme deneyimi; sesli etkileşim, realtime AI ve eğitsel mini-game akışları üzerine kurgulanan uygulama konsepti."
    }
  ],
  experience: [
    {
      role: "Freelance Web Developer",
      company: "Freelance",
      period: "2025 - Devam",
      location: "İstanbul / Remote",
      description: "Küçük ve orta ölçekli işletmeler için responsive web siteleri geliştirdim. UI planlama, frontend development, test, deployment ve launch support süreçlerinde yer aldım. Mevcut web sitelerini modernize ederek görsel tutarlılık, navigasyon ve kullanıcı deneyimini iyileştirdim."
    },
    {
      role: "Dental Asistan",
      company: "Biruni Üniversitesi Diş Hastanesi",
      period: "2021 - 2022",
      description: "Yoğun klinik ortamında operasyon desteği, hasta hazırlığı ve ekip koordinasyonunda görev aldım. Bu deneyim iletişim, dikkat ve problem çözme becerilerimi güçlendirdi.",
      isSecondary: true
    }
  ],
  contact: {
    email: "dentamhmmd@gmail.com",
    github: "https://github.com/developermuhammed98",
    linkedin: "https://linkedin.com/in/developermuhammed98",
    description: "Yeni bir web sitesi, Laravel tabanlı yönetim paneli, frontend geliştirme veya website modernizasyon projesi için benimle iletişime geçebilirsin.",
    terminalCommand: "reach_out --method=email --response=fast",
    referencesNote: "References available upon request."
  }
};

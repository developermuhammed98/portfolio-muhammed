"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { portfolioDataTR, portfolioDataEN } from "@/data/portfolio";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);
  const [activePreviewTitle, setActivePreviewTitle] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"tr" | "en">("tr");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang === "tr" || savedLang === "en") {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLang = (selected: "tr" | "en") => {
    setLang(selected);
    localStorage.setItem("lang", selected);
  };

  const portfolioData = mounted && lang === "en" ? portfolioDataEN : portfolioDataTR;



  // requestAnimationFrame Lerp Mouse Follower Effect (Desktop only)
  useEffect(() => {
    /* Dokunmatik cihazlarda tamamen kapat */
    if (window.matchMedia('(hover: none)').matches) return;
    /* Reduced motion → kapat */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const glow = document.getElementById('ambient-glow');
    if (!glow) return;

    /* Hedef koordinatlar */
    let targetX = window.innerWidth  / 2;
    let targetY = window.innerHeight / 2;
    /* Mevcut koordinatlar (lerp başlangıcı) */
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number | null = null;
    let isAnimating = false;

    /* Lerp sabiti: 0.06 → çok yumuşak, sıvı hissi */
    const LERP = 0.06;

    const animate = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Close enough to target: stop animation loop to free CPU/GPU
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        currentX = targetX;
        currentY = targetY;
        glow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
        isAnimating = false;
        rafId = null;
        return;
      }

      currentX += dx * LERP;
      currentY += dy * LERP;

      glow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const onMouseLeave = () => {
      glow.style.opacity = '0';
    };

    const onMouseEnter = () => {
      glow.style.opacity = '1';
    };

    /* İlk görünüş fade-in */
    glow.style.opacity = '0';
    const timer = setTimeout(() => {
      glow.style.opacity = '1';
    }, 1000);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    
    // Start animation loop
    isAnimating = true;
    rafId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Starry Sky Parallax Effect
  useEffect(() => {
    const sm = document.getElementById('stars-sm-parallax');
    const md = document.getElementById('stars-md-parallax');
    const lg = document.getElementById('stars-lg-parallax');
    let tick = false;

    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (sm) sm.style.transform = `translate3d(0,${y * 0.02}px,0)`;
        if (md) md.style.transform = `translate3d(0,${y * 0.04}px,0)`;
        if (lg) lg.style.transform = `translate3d(0,${y * 0.07}px,0)`;
        tick = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape key handler to close project preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePreviewUrl(null);
        setActivePreviewTitle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Section Observer for Active Navigation Highlighting
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null,
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Staggered Entrance Animations on Scroll
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".section-animate");
    const options = {
      root: null,
      threshold: 0.02,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    animatedElements.forEach((el) => observer.observe(el));
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "hero", label: lang === "tr" ? "Giriş" : "Hero" },
    { id: "about", label: lang === "tr" ? "Hakkımda" : "About" },
    { id: "skills", label: lang === "tr" ? "Yetenekler" : "Skills" },
    { id: "projects", label: lang === "tr" ? "Projeler" : "Projects" },
    { id: "experience", label: lang === "tr" ? "Deneyim" : "Experience" },
    { id: "contact", label: lang === "tr" ? "İletişim" : "Contact" },
  ];

  return (
    <div className="relative min-h-screen z-10 flex flex-col">

      {/* 3-Column Layout Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12 relative z-10">
        
        {/* COLUMN 1: LEFT PORTRAIT COLUMN (Desktop: sticky, Mobile: normal flow at the top) */}
        <div className="order-1 lg:order-1 w-full lg:w-[320px] xl:w-[400px] lg:h-screen lg:sticky lg:top-0 flex lg:items-start lg:justify-start justify-center pt-8 pb-4 lg:pt-24 lg:pl-0 lg:-ml-10 xl:-ml-20 border-b lg:border-b-0 lg:border-r border-white/[0.02] shrink-0">
          {/* Outer: handles scale so it zooms OUTSIDE the clip boundary */}
          <div className="relative z-20 w-[220px] h-[220px] lg:w-[300px] lg:h-[300px] xl:w-[360px] xl:h-[360px] select-none transition-transform duration-700 ease-out hover:scale-105">
            {/* Inner: circular crop + ring */}
            <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white/10 shadow-[0_0_40px_rgba(168,85,247,0.18)]">
              <Image
                src="/profile.png"
                alt={portfolioData.name}
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 220px, (max-width: 1280px) 300px, 360px"
                className="object-cover object-top"
                style={{ imageRendering: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* COLUMN 2: MIDDLE SCROLLABLE CONTENT COLUMN */}
        <div className="order-3 lg:order-2 flex-1 min-w-0 py-6 lg:py-16 flex flex-col gap-24 lg:gap-32">
          
          {/* Hero Section */}
          <section id="hero" className="min-h-[50vh] flex flex-col justify-center section-animate">
            <div className="flex flex-col gap-5 items-start">
              <div className="font-mono text-xs sm:text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full select-none">
                Web Developer • React.js • Next.js • Laravel
              </div>

              <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold leading-[1.2] text-white tracking-tight max-w-2xl">
                Fikirleri çalışan ürünlere dönüştürürüm.
                <span className="animate-[blink_1s_step-end_infinite] text-cyan-300 ml-1 select-none">|</span>
              </h2>

              <p className="text-slate-200 leading-relaxed text-sm sm:text-base lg:text-[17px] max-w-xl">
                {portfolioData.bio}
              </p>

              <div className="flex flex-wrap gap-3.5 mt-4 w-full sm:w-auto">
                <button
                  onClick={() => handleNavClick("projects")}
                  className="px-6 py-3 font-mono text-xs sm:text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300 flex-1 sm:flex-initial text-center cursor-pointer font-semibold"
                >
                  Projelerimi Gör
                </button>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="px-6 py-3 font-mono text-xs sm:text-sm text-slate-200 bg-white/[0.03] border border-white/20 rounded-2xl hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 flex-1 sm:flex-initial text-center cursor-pointer font-semibold"
                >
                  İletişime Geç
                </button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="section-animate">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-cyan-300">// 01. about</span>
              <div className="flex-1 h-[1px] bg-white/[0.05]" />
            </div>

            <div className="flex flex-col gap-5">
              <div className="glass-card p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-4 font-mono text-[7rem] text-cyan-300 opacity-[0.04] leading-none select-none pointer-events-none">
                  &ldquo;
                </div>
                <div className="relative z-10 flex flex-col gap-4 text-slate-100 text-sm sm:text-base leading-relaxed lg:pl-6">
                  <p>{portfolioData.aboutParagraph1}</p>
                  <p>{portfolioData.aboutParagraph2}</p>
                  
                  <div className="mt-4 pt-4 border-t border-white/[0.03] font-mono text-xs text-slate-300 flex flex-wrap gap-3 items-center">
                    <span>1+ Yıl Deneyim</span>
                    <span className="text-cyan-300 select-none">·</span>
                    <span>7+ Proje</span>
                    <span className="text-cyan-300 select-none">·</span>
                    <span>İstanbul</span>
                  </div>
                </div>
              </div>

              {/* Education Subcards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card p-5 flex flex-col gap-3">
                  <h3 className="font-mono text-xs sm:text-sm text-slate-200 font-semibold">// Eğitim</h3>
                  <div className="flex flex-col gap-3.5">
                    {portfolioData.education.map((edu, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-slate-50 text-sm font-semibold">{edu.school}</span>
                        <span className="text-slate-200 text-xs sm:text-sm mt-0.5">{edu.degree}</span>
                        <span className="font-mono text-[11px] text-slate-400 mt-1">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-5 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm text-slate-200 font-semibold">// Sertifikasyon</h3>
                    <div className="mt-3 flex flex-col gap-2.5">
                      {portfolioData.certifications.map((cert, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-sm leading-relaxed text-slate-100">
                          <svg className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-slate-350">
                    * references available upon request
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="section-animate">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-cyan-300">// 02. skills</span>
              <div className="flex-1 h-[1px] bg-white/[0.05]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioData.skills.map((category, idx) => {
                let accentColor = "text-cyan-300 font-semibold";
                let tagHover = "hover:shadow-[0_0_10px_rgba(34,211,238,0.22)] hover:border-cyan-400/50 hover:text-cyan-200";

                if (category.accent === "violet") {
                  accentColor = "text-violet-300 font-semibold";
                  tagHover = "hover:shadow-[0_0_10px_rgba(139,92,246,0.22)] hover:border-violet-400/50 hover:text-violet-200";
                } else if (category.accent === "indigo") {
                  accentColor = "text-indigo-300 font-semibold";
                  tagHover = "hover:shadow-[0_0_10px_rgba(129,140,248,0.22)] hover:border-indigo-400/50 hover:text-indigo-200";
                } else if (category.accent === "slate") {
                  accentColor = "text-slate-200 font-semibold";
                  tagHover = "hover:shadow-[0_0_10px_rgba(148,163,184,0.18)] hover:border-white/40 hover:text-slate-100";
                }

                return (
                  <div key={idx} className="glass-card p-5 flex flex-col gap-3.5">
                    <h3 className={`font-mono text-xs sm:text-sm tracking-wider ${accentColor}`}>
                      // {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`font-mono text-xs text-slate-100 bg-white/[0.06] border border-white/[0.16] px-2.5 py-1 rounded-full transition-all duration-200 cursor-default ${tagHover}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="section-animate">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-cyan-300">// 03. projects</span>
              <div className="flex-1 h-[1px] bg-white/[0.05]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioData.projects.map((project, idx) => {
                const isFeatured = project.featured;
                const accent = project.accent;

                // Accents mapping
                let dotStyle = "bg-cyan-300 shadow-[0_0_8px_#22d3ee]";
                let linkStyle = "hover:text-cyan-300";
                if (accent === "violet") {
                  dotStyle = "bg-violet-300 shadow-[0_0_8px_#8b5cf6]";
                  linkStyle = "hover:text-violet-300";
                } else if (accent === "indigo") {
                  dotStyle = "bg-indigo-300 shadow-[0_0_8px_#818cf8]";
                  linkStyle = "hover:text-indigo-300";
                } else if (accent === "slate") {
                  dotStyle = "bg-slate-400 shadow-[0_0_6px_rgba(255,255,255,0.35)]";
                  linkStyle = "hover:text-white";
                }

                // Inline code mock to minimize assets
                const codeSnippet = accent === "cyan" 
                  ? "const proxy = req.url;\nawait fetch(api_route);" 
                  : accent === "violet" 
                  ? "Route::middleware('locale')->group(fn() => ...);" 
                  : "export default function Component() { ... }";

                return (
                  <div
                    key={idx}
                    className={`glass-card p-6 flex flex-col justify-between gap-5 relative group overflow-hidden ${
                      isFeatured ? "md:col-span-2" : ""
                    }`}
                  >
                    {/* Glow Tech Snippet Decor */}
                    <div className="absolute top-4 right-4 max-w-[150px] pointer-events-none select-none opacity-0 group-hover:opacity-[0.035] transition-opacity duration-500 font-mono text-[8px] text-slate-400 leading-tight text-left overflow-hidden">
                      <pre className="bg-transparent border-0 font-mono">
                        {codeSnippet}
                      </pre>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
                          <span className="font-mono text-[11px] text-slate-300 uppercase tracking-wider font-semibold">
                            {project.type} {project.label && `· ${project.label}`}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-350">{project.year}</span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-50 group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-slate-200 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {isFeatured && project.highlights && (
                        <ul className="mt-1 flex flex-col gap-1">
                          {project.highlights.map((hl, hlIdx) => (
                            <li key={hlIdx} className="flex gap-2 items-start text-sm text-slate-200">
                              <span className="text-cyan-300 font-mono text-[11px] mt-0.5">&gt;</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.03] mt-2">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[11px] text-slate-100 bg-white/[0.06] border border-white/[0.16] px-2.5 py-1 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto font-mono text-[11px] select-none">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 bg-white/[0.04] text-slate-200 hover:text-white border border-white/[0.12] hover:border-white/[0.22] rounded-md transition-all duration-200 flex items-center gap-1 font-mono text-[11px]"
                          >
                            <span>GitHub</span>
                            <span className="text-slate-400">↗</span>
                          </a>
                        )}
                        {project.url && (
                          <>
                            <button
                              onClick={() => {
                                setActivePreviewUrl(project.url || null);
                                setActivePreviewTitle(project.title);
                                setIsLoadingPreview(true);
                              }}
                              className={`px-2.5 py-1.5 rounded-md border transition-all duration-200 cursor-pointer flex items-center gap-1 font-mono text-[11px] font-semibold ${
                                accent === "violet" 
                                  ? "bg-violet-500/20 text-violet-200 border-violet-500/50 hover:bg-violet-500/30 hover:text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.35)]"
                                  : accent === "indigo"
                                  ? "bg-indigo-500/20 text-indigo-200 border-indigo-500/50 hover:bg-indigo-500/30 hover:text-white hover:shadow-[0_0_10px_rgba(129,140,248,0.35)]"
                                  : "bg-cyan-500/20 text-cyan-100 border-cyan-500/50 hover:bg-cyan-500/30 hover:text-white hover:shadow-[0_0_10px_rgba(34,211,238,0.35)]"
                              }`}
                            >
                              <span>Ön İzleme</span>
                              <span className="text-[11px]">👁</span>
                            </button>
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 bg-white/[0.04] text-slate-200 hover:text-white border border-white/[0.12] hover:border-white/[0.22] rounded-md transition-all duration-200 flex items-center gap-1 font-mono text-[11px]"
                            >
                              <span>Live</span>
                              <span className="text-slate-400">↗</span>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="section-animate">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-cyan-300">// 04. experience</span>
              <div className="flex-1 h-[1px] bg-white/[0.05]" />
            </div>

            <div className="flex flex-col gap-5 relative pl-6 border-l border-white/[0.05]">
              {portfolioData.experience.map((exp, idx) => {
                const isSec = exp.isSecondary;

                return (
                  <div key={idx} className="relative group">
                    <span className={`absolute -left-[30px] top-6 w-2 h-2 rounded-full border border-bg-primary transition-all duration-300 ${
                      isSec 
                        ? "bg-slate-500 group-hover:bg-slate-300 shadow-[0_0_5px_rgba(148,163,184,0.3)]"
                        : "bg-cyan-300 group-hover:bg-cyan-200 shadow-[0_0_8px_#22d3ee]"
                    }`} />

                    <div className={`glass-card p-5 flex flex-col gap-2.5 ${isSec ? "opacity-80 hover:opacity-100" : ""}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <h4 className="text-white text-sm sm:text-base font-bold">{exp.role}</h4>
                          <span className="text-slate-200 text-xs sm:text-sm mt-0.5 block font-semibold">{exp.company}</span>
                        </div>
                        <div className="font-mono text-[11px] text-slate-350 sm:text-right shrink-0">
                          <div>{exp.period}</div>
                          {exp.location && <div className="text-slate-400 mt-0.5">{exp.location}</div>}
                        </div>
                      </div>
                      <p className="text-slate-200 text-sm leading-relaxed mt-1">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section-animate max-w-lg mx-auto w-full text-center flex flex-col gap-5 items-center justify-center py-6 min-h-[40vh]">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-sm text-cyan-300">// 05. contact</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Birlikte çalışalım.
              </h2>
            </div>

            <p className="text-slate-200 text-sm leading-relaxed">
              {portfolioData.contact.description}
            </p>

            <div className="w-full bg-[#030712]/60 border border-white/[0.12] rounded-xl px-4 py-3 font-mono text-xs sm:text-sm text-slate-200 flex items-center justify-center gap-2 select-none">
              <span className="text-cyan-300">&gt;</span>
              <span>{portfolioData.contact.terminalCommand}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2 select-none">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="flex-1 py-3 px-4 font-mono text-xs sm:text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl hover:bg-cyan-500/20 hover:shadow-[0_0_12px_rgba(34,211,238,0.22)] hover:border-cyan-500/45 transition-all text-center flex items-center justify-center gap-2 cursor-pointer font-semibold"
              >
                E-posta Gönder
              </a>

              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 font-mono text-xs sm:text-sm text-slate-200 bg-white/[0.04] border border-white/20 rounded-2xl hover:bg-white/[0.08] hover:border-white/30 transition-all text-center flex items-center justify-center gap-2 cursor-pointer font-semibold"
              >
                GitHub
              </a>

              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 font-mono text-xs sm:text-sm text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl hover:bg-indigo-500/20 hover:shadow-[0_0_12px_rgba(129,140,248,0.22)] hover:border-indigo-500/45 transition-all text-center flex items-center justify-center gap-2 cursor-pointer font-semibold"
              >
                LinkedIn
              </a>
            </div>

            <span className="font-mono text-xs text-slate-400 mt-4 select-none">
              {portfolioData.contact.referencesNote}
            </span>
          </section>

        </div>

        {/* COLUMN 3: RIGHT STICKY INFO PANEL (Desktop: sticky, Mobile: normal flow, ordered below the visual image and above the content) */}
        <aside className="order-2 lg:order-3 w-full lg:w-[280px] xl:w-[320px] lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between py-6 lg:py-16 border-b lg:border-b-0 lg:border-l border-white/[0.02] lg:pl-6 xl:pl-8 shrink-0">
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Profile Info */}
            <div className="text-center lg:text-left flex flex-col gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl xl:text-4xl font-semibold text-slate-100 tracking-tight">
                  {portfolioData.name}
                </h1>
                <div className="text-slate-200 text-sm sm:text-base font-mono mt-1.5">// {portfolioData.role}</div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 mt-1">
                <span className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full select-none">
                  React.js
                </span>
                <span className="font-mono text-xs text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full select-none">
                  Next.js
                </span>
                <span className="font-mono text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full select-none">
                  Laravel
                </span>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed max-w-xs mx-auto lg:mx-0 mt-1.5">
                React.js, Next.js, Laravel, PHP, MySQL ve Tailwind CSS ile modern, responsive ve yönetilebilir web uygulamaları geliştiriyorum.
              </p>

              {/* Pulse Dot Status */}
              {portfolioData.availableForWork && (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-full w-fit mx-auto lg:mx-0 select-none">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-[pulse-dot_2s_infinite] absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Available for work
                </div>
              )}
            </div>

            {/* Desktop and Mobile Responsive Navigation Bar */}
            <nav className="flex flex-row flex-wrap lg:flex-col justify-center lg:justify-start gap-3 lg:gap-4 py-2 border-y lg:border-y-0 border-white/[0.03]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center transition-all duration-200 group font-mono text-xs lg:text-sm cursor-pointer ${
                      isActive
                        ? "text-cyan-300 border-b lg:border-b-0 lg:border-l-2 border-cyan-300 px-1 lg:px-0 lg:pl-4"
                        : "text-slate-400 hover:text-slate-100 border-b-transparent lg:border-l-0 px-1 lg:px-0"
                    }`}
                  >
                    // {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Social Links Panel (Desktop bottom-pinned / Mobile flows naturally) */}
          <div className="mt-6 lg:mt-0 flex flex-col gap-4 items-center lg:items-start select-none">
            <div className="flex gap-3">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="w-8.5 h-8.5 rounded-xl flex items-center justify-center border border-white/[0.04] bg-white/[0.02] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-cyan-500/[0.02] transition-all"
                aria-label="Email Gönder"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 rounded-xl flex items-center justify-center border border-white/[0.04] bg-white/[0.02] text-slate-400 hover:text-slate-200 hover:border-white/20 hover:bg-white/[0.04] transition-all"
                aria-label="GitHub Profilim"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 rounded-xl flex items-center justify-center border border-white/[0.04] bg-white/[0.02] text-slate-400 hover:text-indigo-400 hover:border-indigo-500/20 hover:bg-indigo-500/[0.02] transition-all"
                aria-label="LinkedIn Profilim"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </aside>

      </div>

      {/* VS Code Status Bar (lg breakpoint only) */}
      <footer className="hidden lg:flex fixed bottom-0 left-0 right-0 h-[22px] bg-[#0f1123]/92 border-t border-[rgba(99,102,241,0.15)] backdrop-blur-sm font-mono text-[11px] text-slate-500 px-3 items-center justify-between z-50 select-none">
        <div className="flex items-center gap-3">
          <span className="hover:text-slate-300 transition-colors cursor-default">⎇ main</span>
          <span className="text-slate-700">·</span>
          <span className="hover:text-slate-300 transition-colors cursor-default">✓ TypeScript</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hover:text-slate-300 transition-colors cursor-default">UTF-8</span>
          <span className="text-slate-700">·</span>
          <span className="hover:text-slate-300 transition-colors cursor-default">Next.js</span>
          <span className="text-slate-700">·</span>
          <span className="hover:text-slate-300 transition-colors cursor-default">Tailwind CSS</span>
        </div>
      </footer>

      {/* Live Project Preview Modal */}
      {activePreviewUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/70 backdrop-blur-md transition-opacity duration-300"
          onClick={() => {
            setActivePreviewUrl(null);
            setActivePreviewTitle(null);
          }}
        >
          <div 
            className="relative w-full h-full max-w-6xl bg-[#090b16] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0c0f20]/90 border-b border-white/[0.04] select-none font-mono">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setActivePreviewUrl(null);
                    setActivePreviewTitle(null);
                  }}
                  className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors flex items-center justify-center text-[8px] text-rose-950 font-bold cursor-pointer"
                  title="Kapat"
                >
                  ✕
                </button>
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>

              {/* Address bar mockup */}
              <div className="flex-1 max-w-lg mx-4 bg-[#030510]/80 border border-white/[0.05] rounded-lg px-3 py-1 text-[11px] text-slate-400 flex items-center justify-between gap-2 overflow-hidden truncate">
                <div className="flex items-center gap-1.5 overflow-hidden truncate">
                  <span className="text-slate-600 select-none">https://</span>
                  <span className="truncate">{activePreviewUrl.replace(/^https?:\/\//, '')}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsLoadingPreview(true);
                    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
                    if (iframe) iframe.src = iframe.src;
                  }}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  title="Yenile"
                >
                  ↻
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a 
                  href={activePreviewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Yeni Sekme ↗
                </a>
                <button 
                  onClick={() => {
                    setActivePreviewUrl(null);
                    setActivePreviewTitle(null);
                  }}
                  className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 bg-white/[0.02] border border-white/[0.08] rounded-md cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>

            {/* Modal Security/Fallback Notice Banner */}
            <div className="bg-amber-500/10 border-b border-amber-500/15 px-4 py-2 text-[10px] sm:text-xs text-amber-400 font-mono flex items-center justify-between gap-4 select-none">
              <span>⚠️ Bu web sitesi güvenlik protokolleri (iframe koruması) nedeniyle yüklenmeyebilir. Sayfa açılmazsa sağ üstteki <strong>"Yeni Sekme ↗"</strong> butonuna tıklayabilirsiniz.</span>
              <a 
                href={activePreviewUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-white shrink-0"
              >
                Yeni Sekmede Aç ↗
              </a>
            </div>

            {/* Iframe container */}
            <div className="flex-1 w-full bg-slate-950 relative">
              {isLoadingPreview && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090b16]/95 z-10 gap-3 font-mono">
                  <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
                  <span className="text-[11px] text-slate-400">Yükleniyor: {activePreviewTitle}...</span>
                </div>
              )}
              <iframe
                id="preview-iframe"
                src={activePreviewUrl}
                title={`Preview of ${activePreviewTitle}`}
                className="w-full h-full border-0"
                onLoad={() => setIsLoadingPreview(false)}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

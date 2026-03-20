/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';

import { 
  Puzzle, 
  Award, 
  Layout, 
  Brain, 
  Code, 
  Terminal, 
  Monitor, 
  Trophy, 
  ShieldCheck, 
  Palette, 
  Cloud, 
  Sparkles, 
  Globe, 
  Bot, 
  Cpu, 
  Database, 
  CheckCircle, 
  BarChart, 
  Briefcase, 
  Users, 
  Zap, 
  Rocket, 
  Flag, 
  FileText, 
  PieChart,
  Atom,
  X
} from 'lucide-react';

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return <Atom size={14} />;
  if (t.includes('html')) return <Layout size={14} />;
  if (t.includes('css')) return <Palette size={14} />;
  if (t.includes('javascript') || t.includes('js')) return <Code size={14} />;
  if (t.includes('python')) return <Terminal size={14} />;
  if (t.includes('ai') || t.includes('machine learning') || t.includes('ml')) return <Brain size={14} />;
  if (t.includes('database') || t.includes('sql') || t.includes('mongo')) return <Database size={14} />;
  return <Code size={14} />;
};

const skillDescriptions: Record<string, { title: string; description: string }> = {
    "C": {
        title: "C Programming",
        description: "<p>My foundational understanding of C programming allows me to grasp core computing concepts, memory management, and data structures. It provides a solid base for low-level system programming and efficient algorithm implementation, crucial for understanding how software interacts with hardware.</p>"
    },
    "Java": {
        title: "Java Programming",
        description: "<p>Proficient in Java, I can develop robust, object-oriented applications suitable for various platforms. My skills include working with Java's extensive libraries and frameworks, enabling me to build scalable and maintainable software solutions, from enterprise systems to Android applications.</p>"
    },
    "HTML": {
        title: "HTML5",
        description: "<p>I master HTML5 to structure the content of web pages effectively and semantically. My expertise ensures that websites are well-organized, accessible, and ready to be styled and made interactive, forming the backbone of any web project.</p>"
    },
    "CSS": {
        title: "CSS3",
        description: "<p>Using CSS3, I design visually appealing and responsive user interfaces, transforming raw HTML into engaging web experiences. I am skilled in creating layouts, applying styles, and implementing animations to ensure a consistent and attractive look across devices.</p>"
    },
    "JavaScript": {
        title: "JavaScript",
        description: "<p>My JavaScript skills bring interactivity and dynamic functionality to web pages, enabling rich user experiences. I am capable of implementing complex client-side logic, handling events, and interacting with APIs to build modern, responsive web applications.</p>"
    },
    "GitHub": {
        title: "GitHub & Version Control",
        description: "<p>I effectively utilize GitHub for version control and collaborative development. My proficiency includes branching, merging, pull requests, and managing repositories, ensuring efficient teamwork and organized project history, essential for professional software development.</p>"
    },
    "VS Code": {
        title: "VS Code (Integrated Development Environment)",
        description: "<p>I leverage Visual Studio Code as my primary IDE, utilizing its powerful features for efficient coding, debugging, and project management. Its extensive ecosystem of extensions and integrated terminal significantly boosts my development workflow across various programming languages.</p>"
    }
};

export default function App() {
  const [activeSkill, setActiveSkill] = useState<{ title: string; description: string } | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  const [nameAnimate, setNameAnimate] = useState({ mohammed: false, anaan: false });
  const [certFilter, setCertFilter] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll('section');
    const headerHeight = (document.querySelector('.header') as HTMLElement)?.offsetHeight || 0;
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
        current = section.getAttribute('id') || '';
      }
    });

    if (current) setActiveNav(current);

    // Scroll progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollProgress(scrolled);

    // Back to top visibility
    if (winScroll > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }

    // Header scrolled state
    if (winScroll > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
      observerRef.current?.observe(section);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSkill(null);
        setIsPhotoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    console.log('%c Mohammed Anaan - Portfolio', 'color: #00FFFF; font-size: 20px; font-weight: bold;');
    console.log('%c Welcome to my portfolio! Feel free to explore my projects and skills.', 'color: #FF00FF; font-size: 14px;');
    console.log('%c Interested in collaboration? Reach out at zeb.begum786@gmail.com', 'color: #00FF00; font-size: 14px;');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      observerRef.current?.disconnect();
    };
  }, [handleScroll]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetSection = document.getElementById(id);
    if (targetSection) {
      const headerHeight = (document.querySelector('.header') as HTMLElement)?.offsetHeight || 0;
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const animateName = (part: 'mohammed' | 'anaan') => {
    setNameAnimate(prev => ({ ...prev, [part]: true }));
    setTimeout(() => {
      setNameAnimate(prev => ({ ...prev, [part]: false }));
    }, 400);
  };

  const profilePhoto = "images/profile.jpg";

  return (
    <div className="portfolio-app">
      {isLoading && (
        <div className="loading-screen">
          <div className="loader">
            <div className="loader-inner"></div>
            <div className="loader-text">Initializing System...</div>
          </div>
        </div>
      )}

      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <h1 className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>MA</h1>
          
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`navbar ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
            <ul>
              <li><a href="#hero" className={activeNav === 'hero' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'hero')}>Home</a></li>
              <li><a href="#education" className={activeNav === 'education' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'education')}>Education</a></li>
              <li><a href="#internship" className={activeNav === 'internship' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'internship')}>Internships</a></li>
              <li><a href="#about" className={activeNav === 'about' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'about')}>About Me</a></li>
              <li><a href="#skills" className={activeNav === 'skills' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'skills')}>Skills</a></li>
              <li><a href="#certificates" className={activeNav === 'certificates' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'certificates')}>Certificates</a></li>
              <li><a href="#projects" className={activeNav === 'projects' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'projects')}>Projects</a></li>
              <li><a href="#contact" className={activeNav === 'contact' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
            </ul>
          </nav>

          {isMobileMenuOpen && (
            <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
          )}
        </div>
        <div className="scroll-progress-container">
          <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
        </div>
      </header>

      <section id="hero" className="hero-section">
        <div className="container">
          <div className="hero-text">
            <h2>
              <span 
                className={`name-part mohammed ${nameAnimate.mohammed ? 'animate' : ''}`} 
                onClick={() => animateName('mohammed')}
              >
                Mohammed
              </span>
              {' '}
              <span 
                className={`name-part anaan ${nameAnimate.anaan ? 'animate' : ''}`} 
                onClick={() => animateName('anaan')}
              >
                Anaan
              </span>
            </h2>
            <p>An Aspiring Full Stack Web Developer leveraging AI/ML for innovative solutions.</p>
          </div>
          <div className="profile-photo-container" id="profilePhotoContainer" onClick={() => setIsPhotoModalOpen(true)}>
            <img src={profilePhoto} alt="Mohammed Anaan Profile Photo" className="profile-photo" referrerPolicy="no-referrer" />
            <div className="tap-hint">Tap to View</div>
          </div>
        </div>
      </section>

      <section id="education" className="education-section">
        <div className="container">
          <h3>My Academic Journey</h3>
          <div className="education-card">
            <h4>St. Peter's Engineering College</h4>
            <p><strong>Current Status:</strong> 2nd Year, 1st Semester, Computer Science Engineering (AIML)</p>
            <p><strong>Expected Graduation:</strong> 2028</p>
            <p>My studies here are providing a strong foundation in core computer science principles, with a specialized focus on Artificial Intelligence and Machine Learning, preparing me for the innovative demands of the tech industry.</p>
          </div>
        </div>
      </section>

      <section id="internship" className="internship-section">
        <div className="container">
          <h3>My Internship Experience</h3>
          <div className="internship-timeline">
            {[
              { date: "Sep 2025 – Oct 2025", company: "Cognifyz Technologies", role: "Frontend Developer (Internship)", location: "Telangana, India · Remote", skills: ["HTML5", "CSS", "JavaScript"], desc: "Developed responsive web interfaces using modern frontend technologies. Collaborated with the design team to implement pixel-perfect UI components and improved website performance by optimizing assets and implementing lazy loading techniques." },
              { date: "Aug 2025", company: "Kodacy", role: "Artificial Intelligence and Machine Learning Intern", location: "Hyderabad, Telangana, India · Remote", skills: ["Python", "Artificial Intelligence (AI)", "Machine Learning"], desc: "Assisted in developing machine learning models for data analysis. Implemented data preprocessing pipelines and contributed to the optimization of model performance through hyperparameter tuning." },
              { date: "Jul 2025 – Aug 2025", company: "CodSoft", role: "Frontend Web Developer (Internship)", location: "India · Remote", skills: ["HTML", "CSS", "JavaScript"], desc: "Created interactive web applications and responsive layouts. Worked on improving user experience through smooth animations and intuitive navigation patterns." },
              { date: "Jul 2025 – Aug 2025", company: "Codec Technologies India", role: "Python Intern", location: "India · Remote", skills: ["Python"], desc: "Developed Python scripts for data automation and analysis. Gained experience in working with various Python libraries and frameworks for data processing." },
              { date: "Jul 2025 – Aug 2025", company: "CodeAlpha", role: "Frontend Developer (Internship)", location: "India · Remote", skills: ["HTML", "CSS", "JavaScript"], desc: "Built responsive web components and contributed to the development of a client-facing application. Implemented interactive features using JavaScript and modern frontend frameworks." },
              { date: "Jul 2025 – Aug 2025", company: "Oasis Infobyte", role: "Web Design Intern", location: "Hyderabad, Telangana, India · Remote", skills: ["HTML", "CSS", "JavaScript"], desc: "Designed and developed web pages with a focus on user experience and visual appeal. Created responsive layouts that work seamlessly across different devices and screen sizes." }
            ].map((item, idx) => (
              <div className="internship-item" key={idx}>
                <div className="internship-date">{item.date}</div>
                <div className="internship-content">
                  <h4>{item.company}</h4>
                  <h5>{item.role}</h5>
                  <p><i className="fas fa-map-marker-alt"></i> {item.location}</p>
                  <div className="internship-skills">
                    {item.skills.map(skill => (
                      <span className="skill-tag" key={skill}>
                        {getTechIcon(skill)}
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="internship-description">
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <h3>About Me</h3>
          <p>
            As a dynamic 2nd-year CSE student specializing in Artificial Intelligence and Machine Learning at St. Peter's Engineering College, my academic journey is centered around building robust and intelligent software solutions. I am deeply passionate about leveraging technology to solve real-world problems and constantly seek opportunities to expand my knowledge and practical skills in the ever-evolving tech landscape.
          </p>
          <p>
            My ultimate goal is to become a Full Stack Web Developer, capable of crafting seamless and powerful applications from front-end user interfaces to complex back-end systems. My proficiency in C and Java, combined with a growing expertise in web technologies, positions me to embark on challenging projects that drive innovation and deliver exceptional user experiences. Expected to graduate in 2028, I am eager to contribute to forward-thinking teams and impactful initiatives.
          </p>
        </div>
      </section>

      <section id="skills" className="skills-section">
        <div className="container">
          <h3>My Core Skills</h3>
          <div className="skills-grid">
            {[
              { id: "C", icon: "fas fa-cuttlefish", label: "C" },
              { id: "Java", icon: "fab fa-java", label: "Java" },
              { id: "HTML", icon: "fab fa-html5", label: "HTML" },
              { id: "CSS", icon: "fab fa-css3-alt", label: "CSS" },
              { id: "JavaScript", icon: "fab fa-js", label: "JavaScript" },
              { id: "GitHub", icon: "fab fa-github", label: "GitHub" },
              { id: "VS Code", icon: "fas fa-code", label: "VS Code" }
            ].map(skill => (
              <div className="skill-card" key={skill.id} onClick={() => setActiveSkill(skillDescriptions[skill.id])}>
                <i className={skill.icon}></i>
                <span>{skill.label}</span>
              </div>
            ))}
          </div>
          <p className="skills-coming-soon">
            More skills coming soon as I continue my learning journey!
          </p>
        </div>
      </section>

      <section id="certificates" className="certificates-section">
        <div className="container">
          <h3>My Certificates</h3>
          
          <div className="filter-container">
            {[
              { id: 'all', label: 'All' },
              { id: 'certificate', label: 'Certificates' },
              { id: 'hackathon', label: 'Hackathon & Competition' },
              { id: 'internship', label: 'Internship' }
            ].map(btn => (
              <button 
                key={btn.id}
                className={`filter-btn ${certFilter === btn.id ? 'active' : ''}`}
                onClick={() => setCertFilter(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="certificates-grid">
            {[
              { title: "Problem Solving (Basic) HackerRank", icon: <Puzzle size={28} />, status: "Completed", category: "certificate" },
              { title: "Wadhwani", icon: <Award size={28} />, status: "Completed", category: "certificate" },
              { title: "Cognifyz Technologies - Frontend Developer", icon: <Layout size={28} />, status: "Completed", category: "internship" },
              { title: "Kodacy - AI & ML", icon: <Brain size={28} />, status: "Completed", category: "internship" },
              { title: "CodSoft - Frontend Web Developer", icon: <Code size={28} />, status: "Completed", category: "internship" },
              { title: "Codec Technologies India - Python", icon: <Terminal size={28} />, status: "Completed", category: "internship" },
              { title: "CodeAlpha - Frontend Developer", icon: <Monitor size={28} />, status: "Completed", category: "internship" },
              { title: "SpecFiesta Certificate of Participation", icon: <Trophy size={28} />, status: "Participated", category: "hackathon" },
              { title: "EY Microsoft AI Skills Passport", icon: <Cpu size={28} />, status: "Completed", category: "certificate" },
              { title: "Oasis Infobyte - Web Design", icon: <Palette size={28} />, status: "Completed", category: "internship" },
              { title: "Microsoft Azure AI Fundamentals", icon: <Cloud size={28} />, status: "Completed", category: "certificate" },
              { title: "OpenAI x NxtWave Buildathon Certificate of Appreciation", icon: <Sparkles size={28} />, status: "Participated", category: "hackathon" },
              { title: "IBM Web Development Fundamentals", icon: <Globe size={28} />, status: "Completed", category: "certificate" },
              { title: "Skillup Gemini for Google Workspace", icon: <Bot size={28} />, status: "Completed", category: "certificate" },
              { title: "Certificate of Internship Training AI with ChatGPT by IntrnForte", icon: <Cpu size={28} />, status: "Completed", category: "internship" },
              { title: "Certificate of Internship Training Data Science by IntrnForte", icon: <Database size={28} />, status: "Completed", category: "internship" },
              { title: "Certificate Completion of AI with ChatGPT by IntrnForte", icon: <CheckCircle size={28} />, status: "Completed", category: "internship" },
              { title: "Certificate Completion of Data Science by IntrnForte", icon: <BarChart size={28} />, status: "Completed", category: "internship" },
              { title: "Deloitte Technology Job Simulation", icon: <Briefcase size={28} />, status: "Completed", category: "internship" },
              { title: "OpenAI x NxtWave Buildathon Certificate of Participation", icon: <Users size={28} />, status: "Participated", category: "hackathon" },
              { title: "Freedom with AI Masterclass", icon: <Zap size={28} />, status: "Attended", category: "certificate" },
              { title: "24 hours KBN College Hackathon Vijayawada Certificate of Participation", icon: <Rocket size={28} />, status: "Attended", category: "hackathon" },
              { title: "8 hours Narsimha Reddy Engineering College Hackathon Certificate of Participation", icon: <Flag size={28} />, status: "Attended", category: "hackathon" },
              { title: "Resume Writing HP Life", icon: <FileText size={28} />, status: "Completed", category: "certificate" },
              { title: "Power BI Workshop", icon: <PieChart size={28} />, status: "Completed", category: "certificate" }
            ].filter(cert => certFilter === 'all' || cert.category === certFilter)
            .map((cert, idx) => (
              <div className="certificate-card" key={idx}>
                <div className="certificate-icon">
                  {cert.icon}
                </div>
                <div className="certificate-content">
                  <h4>{cert.title}</h4>
                  <span className={`status-badge ${cert.status.toLowerCase()}`}>{cert.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="container">
          <h3>My Projects</h3>
          <div className="projects-grid">
            {[
              { 
                title: "EduMind", 
                desc: "It is an AI / Machine Learning based web system that predicts whether a student will Pass or Fail based on their academic and behavioral data.", 
                tech: ["HTML5", "CSS3", "JavaScript"], 
                live: "http://openaiedumind.onrender.com/",
                github: "https://github.com/anaan-aiml/openaiedumind"
              },
              { 
                title: "Weather Forecast App", 
                desc: "A responsive weather application that provides real-time weather updates and forecasts for any location worldwide. Features include temperature displays, weather conditions, and 5-day forecasts with beautiful animations.", 
                tech: ["HTML5", "CSS3", "JavaScript", "React"], 
                live: "https://skycast-weather-wqkk.vercel.app/",
                github: "https://github.com/anaan-aiml/skycast-weather"
              },
              { 
                title: "Temperature Converter", 
                desc: "A simple web app where users can convert temperature values between Celsius (°C), Fahrenheit (°F), and Kelvin (K) instantly.", 
                tech: ["HTML5", "CSS3", "JavaScript"], 
                live: "https://anaan-aiml.github.io/temperatureconverter/",
                github: "https://github.com/anaan-aiml/temperatureconverter"
              }
            ].map((project, idx) => (
              <div className="project-card" key={idx}>
                <div className="project-content">
                  <h4>{project.title}</h4>
                  <p>{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map(t => (
                      <span className="tech-tag" key={t}>
                        {getTechIcon(t)}
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.live} className="btn view-project-btn" target="_blank" rel="noreferrer">Live Demo</a>
                    <a href={project.github} className="btn view-project-btn" target="_blank" rel="noreferrer">GitHub</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h3>Get In Touch</h3>
          <p>Feel free to reach out for collaborations or opportunities!</p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:zeb.begum786@gmail.com">zeb.begum786@gmail.com</a> | <a href="mailto:24bk1a66bt@stpetershyd.com">24bk1a66bt@stpetershyd.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+919246710026">+91 9246710026</a></p>
          </div>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/mohammed-anaan-b06b90360/" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile"><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/annu987" target="_blank" rel="noreferrer" aria-label="GitHub Profile"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Mohammed Anaan. All rights reserved.</p>
        </div>
      </footer>

      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`} 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        <Rocket size={24} />
      </button>

      {/* Modals */}
      <div className={`modal-overlay ${activeSkill ? 'active' : ''}`} onClick={() => setActiveSkill(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={() => setActiveSkill(null)}>&times;</button>
          <h4>{activeSkill?.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: activeSkill?.description || '' }}></div>
        </div>
      </div>

      {isPhotoModalOpen && (
        <div className="photo-modal" onClick={() => setIsPhotoModalOpen(false)}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setIsPhotoModalOpen(false)}>
              <X size={32} />
            </button>
            <img src={profilePhoto} alt="Mohammed Anaan Profile Photo" referrerPolicy="no-referrer" />
          </div>
        </div>
      )}
    </div>
  );
}

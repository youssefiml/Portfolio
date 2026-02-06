import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Close mobile menu on scroll
      setMobileMenuOpen(false)
      
      // Parallax effect for hero section
      if (heroRef.current) {
        const scrolled = window.pageYOffset
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }

      // Determine active section
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'contact', ref: contactRef }
      ]

      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY
          if (scrollPosition >= sectionTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const downloadPDF = async () => {
    try {
      const html2pdf = await import('html2pdf.js')
  
      // Select specific section instead of full body
      const element = document.getElementById('pdf-content') || document.body
  
      const opt = {
        margin: 0.5,
        filename: 'Youssef_Imlilss_Portfolio.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }
  
      await html2pdf.default().set(opt).from(element).save()
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('PDF generation failed. Please use Print (Ctrl+P) and save as PDF instead.')
      window.print()
    }
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#605e5e' }}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'backdrop-blur-md shadow-md' 
          : 'backdrop-blur-sm'
      }`}
      style={scrolled ? { backgroundColor: 'rgba(96, 94, 94, 0.95)' } : { backgroundColor: 'rgba(96, 94, 94, 0.8)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="text-2xl font-bold text-white">
              Youssef Imlilss
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="#about" 
                className="text-sm font-medium transition-colors duration-300"
                style={activeSection === 'about' ? { color: '#e7ff6e' } : { color: '#e5e7eb' }}
                onMouseEnter={(e) => e.target.style.color = '#e7ff6e'}
                onMouseLeave={(e) => e.target.style.color = activeSection === 'about' ? '#e7ff6e' : '#e5e7eb'}
              >
                About
              </a>
              <a 
                href="#skills" 
                className="text-sm font-medium transition-colors duration-300"
                style={activeSection === 'skills' ? { color: '#e7ff6e' } : { color: '#e5e7eb' }}
                onMouseEnter={(e) => e.target.style.color = '#e7ff6e'}
                onMouseLeave={(e) => e.target.style.color = activeSection === 'skills' ? '#e7ff6e' : '#e5e7eb'}
              >
                Skills
              </a>
              <a 
                href="#contact" 
                className="text-sm font-medium transition-colors duration-300"
                style={activeSection === 'contact' ? { color: '#e7ff6e' } : { color: '#e5e7eb' }}
                onMouseEnter={(e) => e.target.style.color = '#e7ff6e'}
                onMouseLeave={(e) => e.target.style.color = activeSection === 'contact' ? '#e7ff6e' : '#e5e7eb'}
              >
                Contact
              </a>
              <button
                onClick={downloadPDF}
                className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                style={{ backgroundColor: '#e7ff6e', color: '#000' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#d4f05a'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e7ff6e'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={downloadPDF}
                className="p-2 rounded-lg transition-all duration-300"
                style={{ backgroundColor: '#e7ff6e', color: '#000' }}
                title="Download PDF"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t" style={{ borderColor: 'rgba(231, 255, 110, 0.3)' }}>
              <div className="flex flex-col space-y-3 mt-4">
                <a 
                  href="#about" 
                  className="text-sm font-medium py-2 transition-colors duration-300"
                  style={activeSection === 'about' ? { color: '#e7ff6e' } : { color: '#e5e7eb' }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => e.target.style.color = '#e7ff6e'}
                  onMouseLeave={(e) => e.target.style.color = activeSection === 'about' ? '#e7ff6e' : '#e5e7eb'}
                >
                  About
                </a>
                <a 
                  href="#skills" 
                  className="text-sm font-medium py-2 transition-colors duration-300"
                  style={activeSection === 'skills' ? { color: '#e7ff6e' } : { color: '#e5e7eb' }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => e.target.style.color = '#e7ff6e'}
                  onMouseLeave={(e) => e.target.style.color = activeSection === 'skills' ? '#e7ff6e' : '#e5e7eb'}
                >
                  Skills
                </a>
                <a 
                  href="#contact" 
                  className="text-sm font-medium py-2 transition-colors duration-300"
                  style={activeSection === 'contact' ? { color: '#e7ff6e' } : { color: '#e5e7eb' }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => e.target.style.color = '#e7ff6e'}
                  onMouseLeave={(e) => e.target.style.color = activeSection === 'contact' ? '#e7ff6e' : '#e5e7eb'}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section 
        id="hero" 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, rgba(231, 255, 110, 0.1), #605e5e, rgba(231, 255, 110, 0.1))' }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(231, 255, 110, 0.3)' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-float-delayed" style={{ backgroundColor: 'rgba(231, 255, 110, 0.3)' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center pt-32 pb-20">
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full border" style={{ color: '#e7ff6e', backgroundColor: 'rgba(231, 255, 110, 0.1)', borderColor: 'rgba(231, 255, 110, 0.3)' }}>
              Full-Stack Developer
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight animate-fade-in-up animation-delay-200">
            Youssef Imlilss
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-200 mb-4 animate-fade-in-up animation-delay-400">
            Full-Stack Web Developer
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 animate-fade-in-up animation-delay-600">
            Age: 23 | MERN Stack Specialist
          </p>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed mb-12 animate-fade-in-up animation-delay-800">
            Passionate about building <span className="font-semibold" style={{ color: '#e7ff6e' }}>modern</span>, <span className="font-semibold" style={{ color: '#e7ff6e' }}>scalable</span>, and <span className="font-semibold" style={{ color: '#e7ff6e' }}>user-focused</span> web applications
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-1000">
            <a 
              href="#about" 
              className="px-8 py-4 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#e7ff6e', color: '#000' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#d4f05a'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#e7ff6e'}
            >
              Learn More
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ color: '#e7ff6e', borderColor: '#e7ff6e', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(231, 255, 110, 0.1)' }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent' }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef}
        className="py-24 px-6 lg:px-8 relative"
        style={{ backgroundColor: '#605e5e' }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-white">
            About Me
          </h2>
          <div className="space-y-8 text-lg md:text-xl text-gray-200 leading-relaxed">
            <p>
              I am a <span className="font-semibold" style={{ color: '#e7ff6e' }}>Full-Stack Web Developer</span> specialized in the <span className="font-semibold" style={{ color: '#e7ff6e' }}>MERN stack</span> (MongoDB, Express.js, React, and Node.js), passionate about building modern, scalable, and user-focused web applications.
            </p>
            <p>
              With over <span className="font-semibold" style={{ color: '#e7ff6e' }}>2 years</span> of hands-on experience in the IT field, I've developed strong expertise in both front-end and back-end development — from crafting responsive interfaces to designing efficient server-side architectures and APIs.
            </p>
            <p>
              Driven by curiosity and continuous learning, I enjoy turning complex problems into elegant, functional solutions. I thrive in collaborative environments where innovation, clean code, and user experience come together to create impactful digital products.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={skillsRef}
        className="py-24 px-6 lg:px-8 relative"
        style={{ backgroundColor: '#605e5e' }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 text-white">
            Key Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Programming Languages */}
            <div className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border" style={{ backgroundColor: 'rgba(96, 94, 94, 0.8)', borderColor: 'rgba(231, 255, 110, 0.3)' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(231, 255, 110, 0.2)' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#e7ff6e' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Languages & Frameworks</h3>
              </div>
              <ul className="space-y-3 text-gray-200">
                {['JavaScript (ES6+)', 'React.js', 'Node.js', 'Express.js', 'MongoDB'].map((skill) => (
                  <li key={skill} className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#e7ff6e' }}></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Backend & APIs */}
            <div className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border" style={{ backgroundColor: 'rgba(96, 94, 94, 0.8)', borderColor: 'rgba(231, 255, 110, 0.3)' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(231, 255, 110, 0.2)' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#e7ff6e' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Backend & APIs</h3>
              </div>
              <ul className="space-y-3 text-gray-200">
                {['RESTful APIs', 'Authentication (JWT)', 'State Management (Context)', 'Server-side Architecture'].map((skill) => (
                  <li key={skill} className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#e7ff6e' }}></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Deployment */}
            <div className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border" style={{ backgroundColor: 'rgba(96, 94, 94, 0.8)', borderColor: 'rgba(231, 255, 110, 0.3)' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(231, 255, 110, 0.2)' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#e7ff6e' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Tools & Deployment</h3>
              </div>
              <ul className="space-y-3 text-gray-200">
                {['Git/GitHub', 'Vercel', 'Render', 'Netlify'].map((skill) => (
                  <li key={skill} className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#e7ff6e' }}></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 lg:px-8 relative" style={{ backgroundColor: '#605e5e' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-white">
            My Philosophy
          </h2>
          <div className="relative">
            <div className="rounded-3xl p-12 border shadow-lg" style={{ background: 'linear-gradient(to bottom right, rgba(231, 255, 110, 0.1), rgba(231, 255, 110, 0.05))', borderColor: 'rgba(231, 255, 110, 0.3)' }}>
              <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-light mb-8">
                Always eager to <span className="font-semibold" style={{ color: '#e7ff6e' }}>learn</span>, <span className="font-semibold" style={{ color: '#e7ff6e' }}>share knowledge</span>, and contribute to meaningful projects that make a <span className="font-semibold" style={{ color: '#e7ff6e' }}>real difference</span>.
              </p>
              <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(231, 255, 110, 0.3)' }}>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  I believe in the power of <span className="font-semibold" style={{ color: '#e7ff6e' }}>continuous growth</span>, <span className="font-semibold" style={{ color: '#e7ff6e' }}>collaboration</span>, and building solutions that have a <span className="font-semibold" style={{ color: '#e7ff6e' }}>positive impact</span> on people's lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef}
        className="py-24 px-6 lg:px-8 relative"
        style={{ backgroundColor: '#605e5e' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://github.com/youssefiml" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              style={{ backgroundColor: '#e7ff6e', color: '#000' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#d4f05a'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#e7ff6e'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/youssef-imlilss-bab295225/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              style={{ color: '#e7ff6e', borderColor: '#e7ff6e', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(231, 255, 110, 0.1)' }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a 
              href="mailto:youssefimlilss10@gmail.com" 
              className="px-8 py-4 rounded-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              style={{ color: '#e7ff6e', borderColor: '#e7ff6e', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(231, 255, 110, 0.1)' }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t" style={{ backgroundColor: '#605e5e', borderColor: 'rgba(231, 255, 110, 0.3)' }}>
        <div className="max-w-7xl mx-auto text-center text-gray-300">
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} Youssef Imlilss. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
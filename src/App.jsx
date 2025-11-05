import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Check which sections are visible
      const sections = document.querySelectorAll('section')
      const newVisibleSections = new Set()
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionId = section.id || 'hero'
        // Consider section visible if it's in the viewport or slightly above
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > -100) {
          newVisibleSections.add(sectionId)
        }
      })
      
      setVisibleSections(newVisibleSections)
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check with a small delay to ensure DOM is ready
    setTimeout(handleScroll, 100)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-purple-500/10 border-b border-purple-500/30' 
          : 'bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
              Youssef Imlilss
            </div>
            <div className="flex space-x-6">
              <a 
                href="#about" 
                className="text-gray-300 hover:text-purple-400 transition-all duration-300 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="#skills" 
                className="text-gray-300 hover:text-purple-400 transition-all duration-300 relative group"
              >
                Skills
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="#contact" 
                className="text-gray-300 hover:text-purple-400 transition-all duration-300 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`mb-8 transition-all duration-1000 ${
            visibleSections.has('hero') || visibleSections.size === 0
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-block mb-6">
              <span className="text-sm md:text-base font-semibold text-purple-400 bg-purple-400/10 px-4 py-2 rounded-full border border-purple-400/20 backdrop-blur-sm animate-fade-in-up">
                Full-Stack Developer
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient block">
                Youssef Imlilss
              </span>
            </h1>
            <div className="space-y-2 mb-8">
              <p className="text-xl md:text-3xl font-semibold text-gray-200 animate-fade-in-up animation-delay-200">
                Full-Stack Web Developer
              </p>
              <p className="text-lg md:text-xl text-gray-400 animate-fade-in-up animation-delay-400">
                Age: 22 | MERN Stack Specialist
              </p>
            </div>
          </div>
          <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            visibleSections.has('hero') || visibleSections.size === 0
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 font-light">
              Passionate about building <span className="text-purple-400 font-semibold">modern</span>, <span className="text-pink-400 font-semibold">scalable</span>, and <span className="text-purple-400 font-semibold">user-focused</span> web applications
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#about" 
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden"
              >
                <span className="relative z-10">Learn More</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              <a 
                href="#contact" 
                className="group px-8 py-4 border-2 border-purple-500 text-purple-300 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/40 backdrop-blur-sm relative">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 transition-all duration-1000 ${
            visibleSections.has('about')
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className={`space-y-6 text-lg text-gray-300 leading-relaxed transition-all duration-1000 delay-200 ${
            visibleSections.has('about')
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-xl md:text-2xl leading-relaxed">
              I am a <span className="text-purple-400 font-semibold relative group">
                Full-Stack Web Developer
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span> specialized in the <span className="text-pink-400 font-semibold relative group">
                MERN stack
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span> (MongoDB, Express.js, React, and Node.js), passionate about building modern, scalable, and user-focused web applications.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed">
              With a background in <span className="text-purple-400 font-semibold">Software Engineering</span> and over <span className="text-pink-400 font-semibold">2 years</span> of hands-on experience in the IT field, I've developed strong expertise in both front-end and back-end development — from crafting responsive interfaces to designing efficient server-side architectures and APIs.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed">
              Driven by curiosity and continuous learning, I enjoy turning complex problems into elegant, functional solutions. I thrive in collaborative environments where innovation, clean code, and user experience come together to create impactful digital products.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20 transition-all duration-1000 ${
            visibleSections.has('skills')
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Key Skills
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Programming Languages */}
            <div className={`group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden transition-all duration-1000 ${
              visibleSections.has('skills')
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400">Languages & Frameworks</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  {['JavaScript (ES6+)', 'React.js', 'Node.js', 'Express.js', 'MongoDB'].map((skill, index) => (
                    <li key={skill} className="flex items-center group/item transition-all duration-300 hover:translate-x-2" style={{ transitionDelay: `${index * 50}ms` }}>
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-300"></span>
                      <span className="group-hover/item:text-purple-300 transition-colors duration-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Backend & APIs */}
            <div className={`group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 relative overflow-hidden transition-all duration-1000 delay-200 ${
              visibleSections.has('skills')
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-pink-400">Backend & APIs</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  {['RESTful APIs', 'Authentication (JWT)', 'State Management (Context)', 'Server-side Architecture'].map((skill, index) => (
                    <li key={skill} className="flex items-center group/item transition-all duration-300 hover:translate-x-2" style={{ transitionDelay: `${index * 50}ms` }}>
                      <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-300"></span>
                      <span className="group-hover/item:text-pink-300 transition-colors duration-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tools & Deployment */}
            <div className={`group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden transition-all duration-1000 delay-400 ${
              visibleSections.has('skills')
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400">Tools & Deployment</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  {['Git/GitHub', 'Vercel', 'Render', 'Netlify'].map((skill, index) => (
                    <li key={skill} className="flex items-center group/item transition-all duration-300 hover:translate-x-2" style={{ transitionDelay: `${index * 50}ms` }}>
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-300"></span>
                      <span className="group-hover/item:text-purple-300 transition-colors duration-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/40 backdrop-blur-sm relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-16 transition-all duration-1000 ${
            visibleSections.has('philosophy')
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Philosophy
            </span>
          </h2>
          <div className={`relative transition-all duration-1000 delay-300 ${
            visibleSections.has('philosophy')
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50"></div>
            <div className="relative z-10 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-500/20">
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light mb-6">
                Always eager to <span className="text-purple-400 font-semibold">learn</span>, <span className="text-pink-400 font-semibold">share knowledge</span>, and contribute to meaningful projects that make a <span className="text-purple-400 font-semibold">real difference</span>.
              </p>
              <div className="mt-8 pt-8 border-t border-purple-500/20">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  I believe in the power of <span className="text-purple-400 font-semibold">continuous growth</span>, <span className="text-pink-400 font-semibold">collaboration</span>, and building solutions that have a <span className="text-purple-400 font-semibold">positive impact</span> on people's lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-8 transition-all duration-1000 ${
            visibleSections.has('contact')
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className={`text-lg md:text-xl text-gray-300 mb-12 transition-all duration-1000 delay-200 ${
            visibleSections.has('contact')
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className={`flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-400 ${
            visibleSections.has('contact')
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <a 
              href="https://github.com/youssefiml" 
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a 
              href="https://www.linkedin.com/in/youssef-imlilss-bab295225/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group px-8 py-4 border-2 border-purple-500 text-purple-300 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a 
              href="mailto:youssefimlilss10@gmail.com" 
              className="group px-8 py-4 border-2 border-pink-500 text-pink-300 rounded-xl font-semibold hover:bg-pink-500/10 transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:shadow-pink-500/20 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20 bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} Youssef Imlilss.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, DigitalNetworkScene } from './components/QuantumScene';
import { SkillWidget, MusicWidget } from './components/Diagrams';
import { ArrowDown, Menu, X, Linkedin, Mail, MapPin, Briefcase } from 'lucide-react';

const ProjectCard = ({ title, role, desc, delay }: { title: string, role: string, desc: string, delay: string }) => {
  return (
    <div className="flex flex-col group items-start p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 w-full hover:border-blue-900/30" style={{ animationDelay: delay }}>
      <div className="mb-4 p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
        <Briefcase className="text-slate-700 group-hover:text-blue-900" size={24} />
      </div>
      <h3 className="font-serif text-xl text-slate-900 mb-2">{title}</h3>
      <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-3">{role}</p>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">FH</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              FRAN HIDALGO
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-600">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-blue-900 transition-colors cursor-pointer">SOBRE MÍ</a>
            <a href="#work" onClick={scrollToSection('work')} className="hover:text-blue-900 transition-colors cursor-pointer">EXPERIENCIA</a>
            <a href="#music" onClick={scrollToSection('music')} className="hover:text-blue-900 transition-colors cursor-pointer">MÚSICA</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">
              CONTACTO
            </a>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-blue-900 transition-colors cursor-pointer">SOBRE MÍ</a>
            <a href="#work" onClick={scrollToSection('work')} className="hover:text-blue-900 transition-colors cursor-pointer">EXPERIENCIA</a>
            <a href="#music" onClick={scrollToSection('music')} className="hover:text-blue-900 transition-colors cursor-pointer">MÚSICA</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="px-6 py-3 bg-slate-900 text-white rounded-full shadow-lg cursor-pointer">
              CONTACTO
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(248,250,252,0.8)_0%,rgba(248,250,252,0.1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-block mb-4 px-3 py-1 border border-blue-900/20 text-blue-900 text-xs tracking-[0.2em] uppercase font-bold rounded-full bg-blue-50">
              Portfolio 2024
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 text-slate-900">
              Fran <br/> Hidalgo
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed mb-8 max-w-lg">
              Responsable de Digitalización en <span className="font-medium text-slate-900">Nasertic</span>. 
              <span className="block mt-2">Apasionado de la tecnología y la música.</span>
            </p>
            
            <div className="flex gap-4">
                <a href="#work" onClick={scrollToSection('work')} className="px-8 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-lg font-medium">
                    Ver Proyectos
                </a>
                <a href="#music" onClick={scrollToSection('music')} className="px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-full hover:border-slate-400 transition-colors font-medium">
                    Mis Hobbies
                </a>
            </div>
          </div>
          <div className="hidden md:block">
            {/* The 3D scene handles the visual here */}
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="text-slate-400" size={24} />
        </div>
      </header>

      <main>
        {/* Introduction / About */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <SkillWidget />
            </div>
            <div className="md:col-span-7 text-lg text-slate-600 leading-relaxed space-y-6">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-blue-900 uppercase">Sobre Mí</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900">Impulsando la transformación digital de Navarra</h2>
              <div className="w-16 h-1 bg-blue-900 mb-6"></div>
              <p>
                Soy un profesional apasionado por el impacto que la tecnología puede tener en la sociedad. Actualmente, trabajo como <strong>Responsable del Área de Digitalización</strong> en Nasertic, la empresa pública del Gobierno de Navarra.
              </p>
              <p>
                Mi misión es liderar proyectos que modernicen y optimicen los servicios públicos, acercando la administración al ciudadano y mejorando la eficiencia de nuestra región a través de soluciones innovadoras.
              </p>
              <p>
                Cuando no estoy gestionando proyectos tecnológicos, me encontrarás tocando el piano o el ukelele. Creo firmemente que la creatividad musical y la estructura tecnológica se complementan para ofrecer mejores soluciones.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Work */}
        <section id="work" className="py-24 bg-[#f1f5f9] border-t border-slate-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative order-2 md:order-1 h-[400px] md:h-auto rounded-2xl overflow-hidden shadow-inner bg-slate-200">
                    <DigitalNetworkScene />
                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-lg shadow-sm border border-white/50">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">NASERTIC</p>
                        <p className="text-sm font-serif italic text-slate-800">
                            Empresa pública de Gobierno de Navarra
                        </p>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center order-1 md:order-2">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">TRAYECTORIA</div>
                    <h2 className="font-serif text-4xl mb-8 text-slate-900">Proyectos y Responsabilidades</h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                        <ProjectCard 
                            title="Transformación Digital" 
                            role="Responsable de Área"
                            desc="Liderazgo de iniciativas estratégicas para la digitalización de servicios públicos y optimización de procesos internos en la administración foral."
                            delay="0s"
                        />
                        <ProjectCard 
                            title="Gestión de Infraestructuras" 
                            role="Nasertic"
                            desc="Coordinación de equipos multidisciplinares para el despliegue y mantenimiento de infraestructuras tecnológicas críticas en Navarra."
                            delay="0.1s"
                        />
                         <ProjectCard 
                            title="Innovación Pública" 
                            role="Estrategia"
                            desc="Implementación de nuevas tecnologías para mejorar la conectividad y los servicios digitales ofrecidos a la ciudadanía navarra."
                            delay="0.2s"
                        />
                    </div>
                </div>
             </div>
        </section>

        {/* Music / Personal */}
        <section id="music" className="py-24 bg-slate-900 text-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-blue-600 blur-[100px] absolute top-[-100px] right-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-[#d4af37] blur-[100px] absolute bottom-[-100px] left-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-[#d4af37] uppercase">OTRAS PASIONES</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">Música y Comunidad</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">La tecnología es mi profesión, pero la música es mi lenguaje.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                     <div className="flex justify-center">
                        <MusicWidget />
                     </div>
                     <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-serif text-white mb-3">Navarra Ukeclub</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Como presidente de la asociación, organizo encuentros, talleres y eventos para difundir la cultura del ukelele en nuestra región. Es un espacio para compartir, aprender y disfrutar de la música en comunidad.
                            </p>
                        </div>
                        <div className="border-t border-slate-800 pt-8">
                            <h3 className="text-2xl font-serif text-white mb-3">Piano & Ukelele</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Toco el piano y el ukelele. La música me aporta equilibrio, creatividad y una perspectiva diferente que aplico en mi día a día profesional.
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 bg-white">
           <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center bg-slate-50 rounded-3xl p-12 border border-slate-200">
                    <h2 className="font-serif text-3xl md:text-5xl mb-6 text-slate-900">¿Hablamos?</h2>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                        Si estás interesado en transformación digital, tecnología o simplemente quieres charlar sobre música, estaré encantado de conectar.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="#" className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm group">
                            <Mail className="text-slate-400 group-hover:text-blue-500" />
                            <span className="font-medium">Enviar Email</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-xl hover:border-blue-700 hover:text-blue-700 transition-all shadow-sm group">
                            <Linkedin className="text-slate-400 group-hover:text-blue-700" />
                            <span className="font-medium">LinkedIn</span>
                        </a>
                        <div className="flex items-center gap-3 px-6 py-4 bg-slate-100 border border-transparent rounded-xl text-slate-500">
                            <MapPin />
                            <span className="font-medium">Navarra, España</span>
                        </div>
                    </div>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Fran Hidalgo</div>
                <p className="text-sm">Tecnología, Música y Transformación Digital.</p>
            </div>
            <div className="text-xs text-slate-600">
                &copy; 2024 Fran Hidalgo. Hecho con React & Three.js.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
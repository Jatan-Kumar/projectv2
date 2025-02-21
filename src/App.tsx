import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { Routes, Route, Link } from 'react-router-dom';

interface Technology {
  name: string;
  logo: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tech: string[];
}

const technologies: Technology[] = [
  {
    name: 'React',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg'
  },
  {
    name: 'JavaScript',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg'
  },
  {
    name: 'TypeScript',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg'
  },
  {
    name: 'Node.js',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg'
  },
  {
    name: 'Python',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg'
  },
  {
    name: 'PostgreSQL',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg'
  }
];

const projects: Project[] = [
  {
    title: "Diversity Blends",
    description: "A modern e-commerce platform showcasing diverse culinary products and experiences.",
    image: "https://diversityblends.co.za/wp-content/uploads/2024/02/diversity-blends-screenshot.jpg",
    link: "https://diversityblends.co.za/",
    tech: ["React", "Node.js", "WooCommerce"]
  },
  {
    title: "Design Central",
    description: "A portfolio website for a creative design agency featuring their work and services.",
    image: "https://designcentral.co.za/wp-content/uploads/2024/02/design-central-screenshot.jpg",
    link: "https://designcentral.co.za/",
    tech: ["React", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Javelin Sports",
    description: "A dynamic sports equipment and apparel e-commerce platform.",
    image: "https://javelin-sports.co.za/wp-content/uploads/2024/02/javelin-sports-screenshot.jpg",
    link: "https://javelin-sports.co.za/",
    tech: ["React", "Node.js", "Stripe"]
  }
];

function TechCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === technologies.length - 3 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div 
        className="flex transition-all duration-500 ease-in-out"
        animate={{ x: `-${currentIndex * (100 / 3)}%` }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {[...technologies, ...technologies].map((tech, index) => (
          <div 
            key={`${tech.name}-${index}`}
            className="flex-none w-1/3 px-4"
          >
            <div className="group relative">
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-16 h-16 mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <p className="text-center mt-2 text-textSecondary group-hover:text-secondary transition-colors">
                {tech.name}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary/50 p-6 rounded-lg border border-textSecondary/20 group hover:border-secondary/50 transition-all"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold text-textPrimary mb-2 group-hover:text-secondary transition-colors">
        {project.title}
      </h3>
      <p className="text-textSecondary mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-secondary hover:text-secondary/80 transition-colors"
      >
        Visit Website →
      </a>
    </motion.div>
  );
}

function Home() {
  return (
    <>
      <section className="min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <h1 className="text-5xl font-bold text-textPrimary mb-4">
            Hi, I'm <span className="text-secondary">Jatan Kumar</span>
          </h1>
          <h2 className="text-3xl text-textSecondary mb-6">
            Full Stack Developer
          </h2>
          <p className="text-textSecondary max-w-xl mb-8">
            I build exceptional and accessible digital experiences for the web.
            Specialized in React, Node.js, and modern web technologies.
          </p>
          <div className="flex gap-4">
            <motion.a
              href="https://github.com/Jatan-Kumar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-textPrimary hover:text-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/jatan-kumar-570a7916b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-textPrimary hover:text-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLinkedin />
            </motion.a>
            <motion.a
              href="mailto:jatan-c.k@hotmail.com"
              className="text-2xl text-textPrimary hover:text-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail />
            </motion.a>
          </div>
        </motion.div>
      </section>

      <section id="about" className="min-h-screen py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-textPrimary mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-textSecondary">
              <p className="mb-4">
                Hello! I'm Jatan, a software developer based in Lisbon, Portugal. I enjoy creating
                things that live on the internet, whether that be websites, applications, or
                anything in between.
              </p>
              <p className="mb-4">
                My journey in web development started with a passion for creating
                interactive and user-friendly web applications. This passion has driven
                me to continuously learn and master new technologies.
              </p>
              <p className="mb-4">
                Today, I specialize in building high-performance web applications
                using modern technologies and best practices.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-textPrimary mb-4">Technologies I work with:</h3>
                <TechCarousel />
              </div>
            </div>
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative group w-full max-w-md">
                <div className="absolute inset-0 bg-secondary/20 rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                <div className="relative overflow-hidden rounded-lg bg-secondary/10 p-2">
                  <img
                    src="/src/assets/photo.jpeg"
                    alt="Jatan Kumar"
                    className="w-full h-auto object-cover rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="projects" className="min-h-screen py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-textPrimary mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="min-h-screen py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-textPrimary mb-4">Get In Touch</h2>
          <p className="text-textSecondary mb-8">
            I'm currently looking for new opportunities. Whether you have a question
            or just want to say hi, I'll try my best to get back to you!
          </p>
          <motion.a
            href="mailto:jatan-c.k@hotmail.com"
            className="inline-block px-8 py-3 border-2 border-secondary text-secondary rounded hover:bg-secondary/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Say Hello
          </motion.a>
        </motion.div>
      </section>
    </>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const href = target.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
          setIsMenuOpen(false);
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <nav className="fixed w-full bg-primary/90 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-secondary font-bold text-2xl"
          >
            <Link to="/">JK</Link>
          </motion.div>
          
          <div className="hidden md:flex gap-6">
            <a href="#about" className="text-textPrimary hover:text-secondary transition-colors">About</a>
            <a href="#projects" className="text-textPrimary hover:text-secondary transition-colors">Projects</a>
            <a href="#contact" className="text-textPrimary hover:text-secondary transition-colors">Contact</a>
          </div>

          <motion.button 
            className="md:hidden text-textPrimary hover:text-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-primary/95 backdrop-blur-lg md:hidden"
              >
                <div className="flex flex-col h-full">
                  <motion.div 
                    className="flex-1 flex flex-col items-center justify-center gap-8"
                    initial="closed"
                    animate="open"
                    variants={{
                      open: {
                        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                      },
                      closed: {
                        transition: { staggerChildren: 0.05, staggerDirection: -1 }
                      }
                    }}
                  >
                    {['about', 'projects', 'contact'].map((item) => (
                      <motion.a
                        key={item}
                        href={`#${item}`}
                        className="text-2xl font-medium text-textPrimary hover:text-secondary transition-colors"
                        variants={{
                          open: { y: 0, opacity: 1 },
                          closed: { y: 50, opacity: 0 }
                        }}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </motion.a>
                    ))}
                  </motion.div>
                  
                  <motion.button
                    className="w-full py-8 flex justify-center items-center text-textPrimary hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <FiX size={32} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main className="container mx-auto px-6">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <footer className="container mx-auto px-6 py-8 text-center text-textSecondary">
        <p>Designed & Built by Jatan Kumar</p>
      </footer>
    </div>
  );
}

export default App;
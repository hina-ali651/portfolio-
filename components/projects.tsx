"use client"

import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react"

const projects = [
  {
    title: "OmniSight",
    subtitle: "Global Intelligence Engine",
    description: "AI dashboard that converts any query into visual reports with real-time data analysis and intelligent insights.",
    tech: ["Python", "FastAPI", "Gemini", "Next.js"],
    liveUrl: "https://omni-izjq.vercel.app/",
    githubUrl: "https://github.com/hina-ali651",
    featured: true,
    color: "#C9A489",
  },
  {
    title: "Nexus RAG",
    subtitle: "PDF Intelligence Chatbot",
    description: "Upload PDFs and chat with Gemini AI using RAG architecture for intelligent document analysis.",
    tech: ["RAG", "Pinecone", "MongoDB", "Gemini"],
    liveUrl: "https://rag-chatbot-seven-theta.vercel.app",
    githubUrl: "https://github.com/hina-ali651",
    featured: true,
    color: "#E8C9B0",
  },
  {
    title: "Avira",
    subtitle: "AI Conversational Chatbot",
    description: "Full stack chatbot with Google Auth and MongoDB integration for seamless conversations.",
    tech: ["Next.js", "NextAuth", "MongoDB", "AI"],
    liveUrl: "https://avira-chatbot1-lrt9.vercel.app",
    githubUrl: "https://github.com/hina-ali651",
    featured: false,
    color: "#D4B196",
  },
  {
    title: "WhatsApp AI Assistant",
    subtitle: "Voice & Text Automation with n8n",
    description: "No-code AI-powered WhatsApp bot built with n8n that auto-replies to text messages and intelligently responds to voice transcriptions without any backend code.",
    tech: ["n8n", "WhatsApp Business API", "AI/LLM", "Voice Transcription", "No-Code"],
    liveUrl: "https://youtu.be/vgpLoJYYIuE",
    githubUrl: "https://github.com/hina-ali651",
    featured: false,
    color: "#A88B70",
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    rotateY.set((e.clientX - centerX) / 15)
    rotateX.set(-(e.clientY - centerY) / 15)
    
    x.set((e.clientX - rect.left) / rect.width * 100)
    y.set((e.clientY - rect.top) / rect.height * 100)
  }
  
  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -10 }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-background-card border border-border rounded-xl overflow-hidden flex flex-col h-full"
      whileHover={{
        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.4), 0 0 40px ${project.color}15`,
        borderColor: `${project.color}50`,
      }}
    >
      {/* Spotlight effect following cursor */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${x.get()}% ${y.get()}%, ${project.color}10 0%, transparent 50%)`,
        }}
      />
      
      {/* Top gradient line with animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Animated corner decorations */}
      <motion.div
        className="absolute top-3 right-3 w-12 h-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute top-0 right-0 w-6 h-px"
          style={{ background: project.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-px h-6"
          style={{ background: project.color }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative p-8 flex flex-col flex-grow" style={{ transform: "translateZ(30px)" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <motion.p 
              className="text-rose font-sans text-xs tracking-[0.2em] uppercase mb-2"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {project.subtitle}
            </motion.p>
            <motion.h3 
              className="font-serif text-2xl md:text-3xl text-foreground"
              animate={{ 
                color: isHovered ? project.color : "#FAFAFA",
                x: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
          </div>
          <motion.div
            className="p-2 border border-border rounded-full"
            animate={{ 
              rotate: isHovered ? 45 : 0,
              borderColor: isHovered ? project.color : "rgba(39,39,42,1)",
              backgroundColor: isHovered ? `${project.color}15` : "transparent",
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-4 h-4 text-foreground-muted group-hover:text-rose transition-colors" />
          </motion.div>
        </div>

        {/* Description */}
        <motion.p 
          className="text-foreground-muted font-sans mb-6 leading-relaxed"
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          {project.description}
        </motion.p>

        {/* Tech stack with staggered animation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-3 py-1 bg-background border border-border text-foreground-muted font-sans text-xs rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.15 + techIndex * 0.05 + 0.3 }}
              whileHover={{ 
                scale: 1.1, 
                borderColor: project.color,
                color: project.color,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-auto">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose text-background font-sans text-sm tracking-wide uppercase relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-rose-light"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Live Demo
            </span>
            <motion.span 
              className="relative z-10"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.span>
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-sans text-sm tracking-wide uppercase relative overflow-hidden"
            whileHover={{ scale: 1.02, borderColor: project.color }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: `${project.color}10` }}
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <Github className="w-4 h-4 relative z-10" />
          </motion.a>
        </div>
      </div>

      {/* Floating particles on hover */}
      <AnimatePresence>
        {isHovered && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{ 
              background: project.color,
              left: `${20 + i * 15}%`,
              bottom: 0,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: -60,
              x: Math.random() * 20 - 10,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="relative py-32 bg-background-subtle overflow-hidden">
      {/* Animated background decoration */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(201,164,137,0.3), transparent)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 rounded-full bg-rose/20"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-3 h-3 rounded-full bg-rose/15"
        animate={{
          y: [0, 30, 0],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-rose font-sans text-sm tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Portfolio
          </motion.p>
          <motion.h2 
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3 }}
          >
            Featured{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-rose-light inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Projects
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-foreground-muted font-sans max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            A selection of my recent work combining AI capabilities with modern web technologies.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

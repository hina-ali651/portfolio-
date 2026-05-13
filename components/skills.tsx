"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"
import { Brain, Globe, Server, Database, Cloud, Workflow } from "lucide-react"

const skillCategories = [
  {
    icon: Brain,
    title: "AI / ML",
    skills: ["Google Gemini API", "RAG Architecture", "Pinecone", "LangChain"],
    color: "from-rose to-rose-light",
  },
  {
    icon: Globe,
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "from-rose-light to-rose",
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Python", "FastAPI", "Node.js"],
    color: "from-rose to-rose-dark",
  },
  {
    icon: Database,
    title: "Database",
    skills: ["MongoDB", "Pinecone Vector DB"],
    color: "from-rose-dark to-rose",
  },
  {
    icon: Cloud,
    title: "DevOps",
    skills: ["Vercel", "Google Cloud Run", "NextAuth.js", "Google OAuth"],
    color: "from-rose to-rose-glow",
  },
  {
    icon: Workflow,
    title: "No-Code Automation",
    skills: ["n8n", "WhatsApp Business API", "Voice Transcription", "Webhooks"],
    color: "from-rose-light to-rose",
  },
]

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) / 10
    const deltaY = (e.clientY - centerY) / 10
    
    x.set(deltaX)
    y.set(deltaY)
    rotateY.set(deltaX)
    rotateX.set(-deltaY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        perspective: "1000px" 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 bg-background-card border border-border rounded-xl overflow-hidden cursor-default"
      whileHover={{ 
        borderColor: "rgba(201,164,137,0.5)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(201,164,137,0.1)",
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(201,164,137,0.05) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Gradient top border on hover */}
      <motion.div 
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.color}`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: "left" }}
      />

      {/* Animated corner accents */}
      <motion.div
        className="absolute top-2 right-2 w-8 h-8 border-t border-r border-rose/30 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-rose/30 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative flex items-center gap-3 mb-6" style={{ transform: "translateZ(20px)" }}>
        <motion.div 
          className="p-2 bg-rose/10 rounded-lg"
          whileHover={{ scale: 1.2, rotate: 10 }}
          animate={{ 
            boxShadow: [
              "0 0 0 rgba(201,164,137,0)",
              "0 0 20px rgba(201,164,137,0.3)",
              "0 0 0 rgba(201,164,137,0)",
            ]
          }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <category.icon className="w-5 h-5 text-rose" />
          </motion.div>
        </motion.div>
        <motion.h3 
          className="font-sans text-sm tracking-[0.2em] uppercase text-foreground"
          whileHover={{ letterSpacing: "0.3em", color: "#C9A489" }}
          transition={{ duration: 0.3 }}
        >
          {category.title}
        </motion.h3>
      </div>

      <div className="relative flex flex-wrap gap-2" style={{ transform: "translateZ(10px)" }}>
        {category.skills.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 + skillIndex * 0.08,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ 
              scale: 1.1, 
              borderColor: "#C9A489",
              color: "#C9A489",
              boxShadow: "0 0 15px rgba(201,164,137,0.3)",
            }}
            className="px-3 py-1.5 bg-background border border-border text-foreground-muted font-sans text-xs rounded-full cursor-default transition-colors duration-300"
          >
            {skill}
          </motion.span>
        ))}
      </div>

      {/* Floating particles inside card */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-rose/30 pointer-events-none"
          style={{
            left: `${20 + i * 30}%`,
            bottom: "20%",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}
    </motion.div>
  )
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="relative py-32 bg-background overflow-hidden">
      {/* Animated background grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,164,137,0.8) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-rose/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-rose/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
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
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.3em" } : { opacity: 0, letterSpacing: "0.5em" }}
            transition={{ duration: 1 }}
          >
            Expertise
          </motion.p>
          <motion.h2 
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Skills &{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-rose-light inline-block"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Technologies
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCard key={category.title} category={category} index={categoryIndex} />
          ))}
        </div>
      </div>
    </section>
  )
}

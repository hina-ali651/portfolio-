"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Cpu, Code2, Zap } from "lucide-react"

const highlights = [
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Building intelligent systems with cutting-edge AI technologies",
    gradient: "from-rose to-rose-light",
  },
  {
    icon: Code2,
    title: "Full Stack",
    description: "End-to-end development from concept to deployment",
    gradient: "from-rose-light to-rose",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized, fast, and scalable solutions",
    gradient: "from-rose-dark to-rose",
  },
]

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = value / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [isInView, value])
  
  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

function FloatingCard({ 
  children, 
  delay, 
  className 
}: { 
  children: React.ReactNode
  delay: number
  className?: string 
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / 20)
    y.set((e.clientY - centerY) / 20)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-32 bg-background-subtle overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 border border-rose rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity } }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-64 h-64 border border-rose rounded-full"
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity } }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/2 w-32 h-32 border border-rose rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-rose/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left side - Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-rose font-sans text-sm tracking-[0.3em] uppercase mb-4"
            >
              About Me
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8"
            >
              <motion.span
                initial={{ display: "inline-block", opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Crafting
              </motion.span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose to-rose-light">
                <motion.span
                  initial={{ display: "inline-block", opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Intelligence
                </motion.span>
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-foreground-muted font-sans leading-relaxed">
                I am a passionate AI-Powered Full Stack Developer who builds intelligent web experiences. 
                I specialize in combining modern web technologies with cutting-edge AI to create 
                applications that don&apos;t just work — they think.
              </p>
              <p className="text-lg text-foreground-muted font-sans leading-relaxed">
                Based in Karachi, Pakistan, I transform complex ideas into elegant, 
                functional solutions that push the boundaries of what&apos;s possible on the web.
              </p>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-10"
            >
              {[
                { value: 15, suffix: "+", label: "Projects" },
                { value: 4, suffix: "+", label: "AI Apps" },
                { value: 100, suffix: "%", label: "Passion" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="font-serif text-3xl md:text-4xl text-rose mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-foreground-muted text-sm font-sans">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 origin-left"
            >
              <motion.div 
                className="w-24 h-0.5 bg-gradient-to-r from-rose to-transparent"
                animate={{ width: ["0%", "100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.div>
          </div>

          {/* Right side - Highlight cards */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <FloatingCard key={item.title} delay={0.3 + index * 0.15}>
                <motion.div
                  className="group relative p-6 bg-background-card border border-border rounded-lg overflow-hidden"
                  whileHover={{ 
                    borderColor: "rgba(201,164,137,0.5)",
                    boxShadow: "0 0 40px rgba(201,164,137,0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated gradient line on top */}
                  <motion.div
                    className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  <div className="relative flex items-start gap-4">
                    <motion.div 
                      className="p-3 bg-rose/10 rounded-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <item.icon className="w-6 h-6 text-rose" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="font-sans text-lg text-foreground mb-1"
                        whileHover={{ x: 5, color: "#C9A489" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.title}
                      </motion.h3>
                      <p className="text-foreground-muted text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

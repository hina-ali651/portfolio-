"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Mail, Github, MapPin, ArrowUpRight, Sparkles } from "lucide-react"

function MagneticButton({ children, href, className, external }: { 
  children: React.ReactNode
  href: string
  className?: string
  external?: boolean 
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / 4)
    y.set((e.clientY - centerY) / 4)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  )
}

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ")
  
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([])
  
  useEffect(() => {
    setParticles(
      [...Array(30)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
      }))
    )
  }, [])
  
  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-rose/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  )
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="relative py-32 bg-background overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,164,137,0.08) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <FloatingParticles />
      </div>

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,164,137,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,164,137,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-rose" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-rose font-sans text-sm tracking-[0.3em] uppercase mb-4"
          >
            Get In Touch
          </motion.p>
          
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
            style={{ perspective: "1000px" }}
          >
            <AnimatedText text="Let's Create" delay={0.2} />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-rose-light">
              <AnimatedText text="Something" delay={0.4} />
            </span>
            <br />
            <AnimatedText text="Extraordinary" delay={0.6} />
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-foreground-muted font-sans max-w-2xl mx-auto mb-12"
          >
            Have a project in mind? I&apos;d love to hear about it. 
            Let&apos;s collaborate and bring your vision to life.
          </motion.p>

          {/* Contact buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <MagneticButton
              href="mailto:alihaniya259@gmail.com"
              className="group relative flex items-center gap-4 px-8 py-5 bg-rose text-background font-sans overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-rose-light"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <Mail className="w-5 h-5 relative z-10" />
              <span className="text-sm tracking-wide relative z-10">alihaniya259@gmail.com</span>
              <motion.span
                className="relative z-10 ml-auto"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </MagneticButton>

            <MagneticButton
              href="https://github.com/hina-ali651"
              external
              className="group flex items-center gap-4 px-8 py-5 border border-border text-foreground font-sans relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-rose/10"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <Github className="w-5 h-5 relative z-10" />
              <span className="text-sm tracking-wide relative z-10">GitHub Profile</span>
              <motion.span
                className="relative z-10 ml-auto"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </MagneticButton>
          </motion.div>

          {/* Location with animated icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-background-card border border-border rounded-full"
          >
            <motion.div
              animate={{ 
                y: [0, -3, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-4 h-4 text-rose" />
            </motion.div>
            <span className="font-sans text-sm text-foreground-muted">Karachi, Pakistan</span>
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Decorative animated line */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-32 h-px bg-gradient-to-r from-transparent via-rose to-transparent"
              animate={{
                scaleX: [0.5, 1, 0.5],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

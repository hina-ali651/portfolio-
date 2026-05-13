"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { ArrowDown, Sparkles } from "lucide-react"

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large ambient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(201,164,137,0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(201,164,137,0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Floating small particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-rose/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function MagicCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 250)
      cursorY.set(e.clientY - 250)
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 hidden lg:block"
      style={{
        background: "radial-gradient(circle, rgba(201,164,137,0.08) 0%, transparent 60%)",
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  )
}

function TypewriterText() {
  const words = [
    "I build what others imagine.",
    "AI-Powered Full Stack Developer.",
    "Turning ideas into intelligent apps.",
    "Based in Karachi, Pakistan.",
  ]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 30 : 60)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words])

  return (
    <span>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-rose"
      >
        |
      </motion.span>
    </span>
  )
}

function AnimatedLetter({ letter, delay }: { letter: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 100, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="inline-block"
      style={{ transformStyle: "preserve-3d" }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  )
}

function MorphingBlob() {
  return (
    <motion.div
      className="absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-10">
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A489" />
            <stop offset="100%" stopColor="#E8C9B0" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#blobGradient)"
          animate={{
            d: [
              "M44.7,-76.4C58.8,-69.2,71.8,-58.1,79.6,-44.2C87.4,-30.3,90,-13.6,88.5,2.5C87,18.7,81.5,34.3,72.1,47.3C62.7,60.3,49.5,70.6,34.9,76.8C20.3,83,-5.7,85.1,-28.9,79.3C-52.1,73.5,-72.5,59.8,-82.2,42.1C-91.9,24.4,-90.9,2.7,-85.8,-17.1C-80.7,-36.9,-71.5,-54.8,-57.4,-62.1C-43.3,-69.4,-24.2,-66.1,-5.8,-57.8C12.6,-49.5,30.6,-83.6,44.7,-76.4Z",
              "M47.7,-79.9C62.5,-72.8,75.8,-61.5,83.4,-47.4C91,-33.3,92.9,-16.7,90.6,-1.3C88.3,14,81.8,28.1,73.2,40.5C64.6,52.9,53.9,63.7,41.1,70.8C28.3,77.9,13.5,81.3,-1.8,84.2C-17.1,87.1,-34.2,89.5,-47.8,83C-61.4,76.5,-71.5,61.1,-78.3,45C-85.1,28.9,-88.6,14.5,-87.7,0.5C-86.8,-13.4,-81.5,-26.8,-73.6,-38.6C-65.7,-50.4,-55.2,-60.6,-42.7,-68.9C-30.2,-77.2,-15.1,-83.6,0.7,-84.8C16.5,-86,32.9,-87,47.7,-79.9Z",
              "M44.7,-76.4C58.8,-69.2,71.8,-58.1,79.6,-44.2C87.4,-30.3,90,-13.6,88.5,2.5C87,18.7,81.5,34.3,72.1,47.3C62.7,60.3,49.5,70.6,34.9,76.8C20.3,83,-5.7,85.1,-28.9,79.3C-52.1,73.5,-72.5,59.8,-82.2,42.1C-91.9,24.4,-90.9,2.7,-85.8,-17.1C-80.7,-36.9,-71.5,-54.8,-57.4,-62.1C-43.3,-69.4,-24.2,-66.1,-5.8,-57.8C12.6,-49.5,30.6,-83.6,44.7,-76.4Z",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          transform="translate(100, 100)"
        />
      </svg>
    </motion.div>
  )
}

export function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])

  const nameLetters = "Hina".split("")
  const lastNameLetters = "Ali".split("")

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <MagicCursor />
      <FloatingOrbs />
      
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Grid pattern overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,164,137,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,164,137,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        animate={{
          backgroundPosition: ["0px 0px", "80px 80px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-rose/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-background-card border border-border rounded-full mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <motion.span 
                className="text-foreground-muted text-sm font-sans"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Available for opportunities
              </motion.span>
            </motion.div>

            {/* Name with letter animation */}
            <motion.h1 className="mb-6">
              <motion.span 
                className="block text-sm md:text-base font-sans tracking-[0.4em] text-rose uppercase mb-4"
                initial={{ opacity: 0, letterSpacing: "0.8em" }}
                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                Hello, I&apos;m
              </motion.span>
              <span className="block font-serif text-6xl md:text-7xl lg:text-8xl text-foreground leading-none">
                {nameLetters.map((letter, i) => (
                  <AnimatedLetter key={i} letter={letter} delay={0.3 + i * 0.08} />
                ))}
              </span>
              <span className="block font-serif text-6xl md:text-7xl lg:text-8xl leading-none mt-2 text-rose">
                {lastNameLetters.map((letter, i) => (
                  <AnimatedLetter key={i} letter={letter} delay={0.6 + i * 0.08} />
                ))}
              </span>
            </motion.h1>

            {/* Typewriter tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-8 h-8"
            >
              <p className="text-xl md:text-2xl text-foreground-muted font-sans">
                <TypewriterText />
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-rose text-background font-sans text-sm tracking-wider uppercase overflow-hidden"
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(201,164,137,0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.span>
                  View Projects
                </span>
                <motion.div 
                  className="absolute inset-0 bg-rose-light"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#contact"
                className="group px-8 py-4 border border-border text-foreground font-sans text-sm tracking-wider uppercase relative overflow-hidden"
                whileHover={{ scale: 1.02, borderColor: "#C9A489" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get In Touch</span>
                <motion.div
                  className="absolute inset-0 bg-rose/10"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Avatar with effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 1.2, type: "spring", stiffness: 50 }}
            className="relative flex justify-center lg:justify-end"
            style={{ perspective: "1000px" }}
          >
            <motion.div 
              className="relative"
              style={{ rotate }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Morphing blob background */}
              <MorphingBlob />
              
              {/* Outer glow with pulse */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(201,164,137,0.3), transparent, rgba(201,164,137,0.15), transparent)",
                  filter: "blur(40px)",
                }}
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              
              {/* Animated border ring */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <motion.div
                  className="absolute inset-0 rounded-full p-[3px]"
                  style={{
                    background: "conic-gradient(from 0deg, #C9A489, #E8C9B0, #C9A489, #A88B70, #C9A489)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full bg-background" />
                </motion.div>

                {/* Secondary rotating ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full border border-rose/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Third ring with dots */}
                <motion.div
                  className="absolute -inset-8 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-rose/30"
                      style={{
                        left: `${50 + 50 * Math.cos((i * Math.PI * 2) / 12)}%`,
                        top: `${50 + 50 * Math.sin((i * Math.PI * 2) / 12)}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Avatar container */}
                <div className="absolute inset-3 rounded-full overflow-hidden bg-background-subtle">
                  <Image
                    src="/images/avatar.webp"
                    alt="Hina Ali"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  />

                  {/* Color overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-rose/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Floating particles around avatar */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: `radial-gradient(circle, rgba(201,164,137,${0.6 + i * 0.05}) 0%, transparent 70%)`,
                      left: `${50 + 48 * Math.cos((i * Math.PI * 2) / 8)}%`,
                      top: `${50 + 48 * Math.sin((i * Math.PI * 2) / 8)}%`,
                    }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.2, 1, 0.2],
                      boxShadow: [
                        "0 0 0px rgba(201,164,137,0)",
                        "0 0 20px rgba(201,164,137,0.8)",
                        "0 0 0px rgba(201,164,137,0)",
                      ],
                    }}
                    transition={{ 
                      duration: 3 + i * 0.3, 
                      repeat: Infinity, 
                      delay: i * 0.3, 
                      ease: "easeInOut" 
                    }}
                  />
                ))}
              </div>

              {/* Tech badges with enhanced animation */}
              <motion.div
                className="absolute -left-8 top-1/4 px-4 py-2 bg-background-card border border-border rounded-lg text-xs font-sans text-rose backdrop-blur-sm"
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -10, 0],
                }}
                transition={{ 
                  opacity: { delay: 1.5, duration: 0.5 },
                  x: { delay: 1.5, duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ scale: 1.1, borderColor: "#C9A489" }}
              >
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Next.js
                </motion.span>
              </motion.div>
              <motion.div
                className="absolute -right-8 top-1/3 px-4 py-2 bg-background-card border border-border rounded-lg text-xs font-sans text-rose backdrop-blur-sm"
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, 10, 0],
                }}
                transition={{ 
                  opacity: { delay: 1.7, duration: 0.5 },
                  x: { delay: 1.7, duration: 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                }}
                whileHover={{ scale: 1.1, borderColor: "#C9A489" }}
              >
                AI / ML
              </motion.div>
              <motion.div
                className="absolute -left-4 bottom-1/4 px-4 py-2 bg-background-card border border-border rounded-lg text-xs font-sans text-rose backdrop-blur-sm"
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, 8, 0],
                }}
                transition={{ 
                  opacity: { delay: 1.9, duration: 0.5 },
                  x: { delay: 1.9, duration: 0.5 },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                }}
                whileHover={{ scale: 1.1, borderColor: "#C9A489" }}
              >
                Python
              </motion.div>
              <motion.div
                className="absolute -right-4 bottom-1/3 px-4 py-2 bg-background-card border border-border rounded-lg text-xs font-sans text-rose backdrop-blur-sm"
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -8, 0],
                }}
                transition={{ 
                  opacity: { delay: 2.1, duration: 0.5 },
                  x: { delay: 2.1, duration: 0.5 },
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                }}
                whileHover={{ scale: 1.1, borderColor: "#C9A489" }}
              >
                React
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.span 
            className="text-foreground-muted text-xs font-sans tracking-widest uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4 text-rose" />
            </motion.div>
          </motion.div>
          {/* Animated line below arrow */}
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-rose to-transparent"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

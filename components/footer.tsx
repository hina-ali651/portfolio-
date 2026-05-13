"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, ArrowUp } from "lucide-react"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={ref} className="relative py-20 bg-background-subtle border-t border-border overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(201,164,137,0.1) 0%, transparent 60%)",
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-rose/20"
          style={{
            left: `${10 + i * 9}%`,
            bottom: "20%",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-10"
        >
          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className="group relative p-4 border border-border rounded-full hover:border-rose transition-colors duration-300"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp className="w-5 h-5 text-foreground-muted group-hover:text-rose transition-colors" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full bg-rose/10"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Logo / Name with letter animation */}
          <motion.a 
            href="#" 
            className="group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-serif text-4xl text-foreground group-hover:text-rose transition-colors duration-300">
              {"Hina".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  whileHover={{ y: -5, color: "#C9A489" }}
                  transition={{ type: "spring", stiffness: 500, delay: i * 0.02 }}
                >
                  {letter}
                </motion.span>
              ))}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-rose-light">
                {"Ali".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 500, delay: i * 0.02 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </span>
          </motion.a>

          {/* Navigation with staggered animation */}
          <motion.nav 
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-foreground-muted hover:text-rose font-sans text-sm tracking-wide transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-px bg-rose"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.nav>

          {/* Animated Divider */}
          <motion.div 
            className="relative w-48 h-px"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose/50 to-transparent" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Copyright with animated heart */}
          <motion.p 
            className="text-foreground-muted font-sans text-sm text-center flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span>&copy; {new Date().getFullYear()} Hina Ali.</span>
            <span className="flex items-center gap-1">
              Crafted with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-rose fill-rose" />
              </motion.span>
              and AI.
            </span>
          </motion.p>

          {/* Tech stack mini badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
          >
            {["Next.js", "Framer Motion", "Tailwind"].map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-background border border-border rounded-full text-xs text-foreground-muted font-sans"
                whileHover={{ 
                  borderColor: "#C9A489",
                  color: "#C9A489",
                  scale: 1.05,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

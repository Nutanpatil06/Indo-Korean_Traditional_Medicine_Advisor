"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Leaf, Heart, BookOpen } from "lucide-react"
import { gsap } from "gsap"
import styled from "@emotion/styled"

// Styled components
const HeroContainer = styled.div`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,100,0,0.1) 0%, rgba(0,128,0,0.2) 100%);
    z-index: 1;
  }
`

const HeroButton = styled(Button)`
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: all 0.6s;
  }
  
  &:hover::after {
    left: 100%;
  }
`

const ImageContainer = styled(motion.div)`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    padding: 3px;
    background: linear-gradient(135deg, #4ade80 0%, #16a34a 100%);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.7;
    z-index: 1;
  }
`

export function HeroSection() {
  const [activeSystem, setActiveSystem] = useState<"korean" | "ayurvedic">("korean")
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSystem((prev) => (prev === "korean" ? "ayurvedic" : "korean"))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // GSAP animations
  useEffect(() => {
    if (heroRef.current && textRef.current && statsRef.current) {
      // Initial animation
      gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" })

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" },
      )

      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
      )
    }
  }, [])

  return (
    <HeroContainer ref={heroRef} className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/herb-garden.jpg')] opacity-5 bg-cover bg-center"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div ref={textRef} className="md:w-1/2 mb-10 md:mb-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Ancient Wisdom, Modern Healing</h1>
              <p className="text-xl mb-8 text-green-100">
                Discover personalized herbal remedies from Korean and Indian traditional medicine systems, powered by
                AI.
              </p>

              <div className="flex flex-wrap gap-4">
                <HeroButton className="bg-white text-green-800 hover:bg-green-100 transition-colors font-semibold">
                  Get Started
                </HeroButton>
                <HeroButton className="bg-white/20 text-white hover:bg-white/30 transition-colors font-semibold border border-white/40 backdrop-blur-sm">
                  Learn More
                </HeroButton>
              </div>

              <div ref={statsRef} className="flex gap-8 mt-10">
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  <span>200+ Herbs</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  <span>Holistic Approach</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>Research-Backed</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80">
              <ImageContainer
                className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-64 h-64">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeSystem === "korean" ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src="/images/korean-medicine.jpg"
                      alt="Korean Traditional Medicine"
                      className="rounded-full object-cover w-full h-full"
                    />
                    <div className="absolute bottom-4 bg-green-800/80 px-3 py-1 rounded-full text-sm">
                      Korean Medicine
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeSystem === "ayurvedic" ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src="/images/ayurvedic-medicine.jpg"
                      alt="Ayurvedic Medicine"
                      className="rounded-full object-cover w-full h-full"
                    />
                    <div className="absolute bottom-4 bg-green-800/80 px-3 py-1 rounded-full text-sm">
                      Ayurvedic Medicine
                    </div>
                  </motion.div>
                </div>
              </ImageContainer>
            </div>
          </div>
        </div>
      </div>
    </HeroContainer>
  )
}

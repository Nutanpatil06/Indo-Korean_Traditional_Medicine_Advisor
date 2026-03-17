"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { gsap } from "gsap"
import styled from "@emotion/styled"

// Styled components
const ModelContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(to bottom, #f0f9f0, #e6f7e6);
`

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
`

// Herb model component
function Herb({ herbType = "ginseng", ...props }) {
  const group = useRef()
  const [hovered, setHovered] = useState(false)

  // In a real app, we would load different models based on herbType
  // For this demo, we'll simulate different herbs with color and rotation

  useEffect(() => {
    if (group.current) {
      // Use GSAP for smooth animation when herb type changes
      gsap.to(group.current.rotation, {
        y: Math.PI * 2,
        duration: 1,
        ease: "power2.inOut",
      })

      // Change color based on herb type
      const colors = {
        ginseng: "#e6c29f",
        ashwagandha: "#d4b886",
        turmeric: "#e6a23e",
        licorice: "#8b5a2b",
        st_johns_wort: "#f9dc5c",
      }

      gsap.to(group.current.children[0].material, {
        color: colors[herbType] || "#a0522d",
        duration: 0.5,
        ease: "power2.inOut",
      })
    }
  }, [herbType])

  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.05

      // Slow rotation
      if (!hovered) {
        group.current.rotation.y += 0.003
      }
    }
  })

  return (
    <group ref={group} {...props} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Simple herb model - in a real app, we would use actual 3D models */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.4, 1.5, 32]} />
        <meshStandardMaterial color="#a0522d" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#4caf50" roughness={0.6} />
      </mesh>
    </group>
  )
}

// Main component
export default function HerbModelViewer({ herbType = "ginseng", onLoad = () => {} }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
      onLoad()
    }, 1000)

    return () => clearTimeout(timer)
  }, [onLoad])

  return (
    <ModelContainer>
      {loading && (
        <LoadingOverlay>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </LoadingOverlay>
      )}

      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Herb herbType={herbType} position={[0, 0, 0]} />
        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={5} blur={2.4} />
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </ModelContainer>
  )
}

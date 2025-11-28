/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, Stars, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Fix for IntrinsicElements missing properties in some environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const FloatingShape = ({ position, color, scale = 1, speed = 1, geometry = 'sphere' }: { position: [number, number, number]; color: string; scale?: number, speed?: number, geometry?: 'sphere' | 'torus' | 'ico' }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.2;
      ref.current.rotation.x = t * 0.2 * speed;
      ref.current.rotation.z = t * 0.1 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={ref} position={position} scale={scale}>
            {geometry === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
            {geometry === 'torus' && <torusGeometry args={[0.8, 0.2, 16, 32]} />}
            {geometry === 'ico' && <icosahedronGeometry args={[1, 0]} />}
            <MeshDistortMaterial
                color={color}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                metalness={0.1}
                roughness={0.5}
                distort={0.3}
                speed={1.5}
            />
        </mesh>
    </Float>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#e11d48" />
        
        <group position={[2, 0, 0]}>
            <FloatingShape position={[1, 1, 0]} color="#1e3a8a" scale={1.5} geometry="sphere" speed={1} />
            <FloatingShape position={[-2, -1, -1]} color="#e11d48" scale={1} geometry="ico" speed={1.5} />
            <FloatingShape position={[2, -2, -2]} color="#d4af37" scale={0.8} geometry="torus" speed={0.8} />
        </group>

        <Environment preset="city" />
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
};

export const DigitalNetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
        <Environment preset="warehouse" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.2} speed={2}>
            {/* Abstract representation of a connected network/hub */}
            <group>
                 <Icosahedron args={[1.5, 1]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#1e3a8a" wireframe wireframeLinewidth={2} transparent opacity={0.3} />
                 </Icosahedron>
                 
                 <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
                     <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.5} />
                 </Sphere>
                 
                 {/* Orbiting particles */}
                 {[...Array(6)].map((_, i) => {
                     const angle = (i / 6) * Math.PI * 2;
                     const x = Math.cos(angle) * 2.5;
                     const z = Math.sin(angle) * 2.5;
                     return (
                         <group key={i} rotation={[0, angle, 0]}>
                             <Sphere args={[0.1, 16, 16]} position={[x, 0, z]}>
                                <meshStandardMaterial color="#1e293b" />
                             </Sphere>
                             {/* Connection lines would be complex in pure JSX, keeping it simple with floating nodes */}
                         </group>
                     )
                 })}
            </group>
        </Float>
        <Stars radius={50} depth={50} count={200} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
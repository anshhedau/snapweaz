import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ParticleCore = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const { positions, colors } = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color("#7c5cff");
    const c2 = new THREE.Color("#39a8ff");
    const c3 = new THREE.Color("#c45cff");
    for (let i = 0; i < count; i++) {
      // fibonacci sphere distribution
      const t = i / count;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.6 + Math.random() * 0.25;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const col = [c1, c2, c3][i % 3].clone().lerp(c2, Math.random() * 0.5);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
      // mouse parallax
      groupRef.current.position.x += (mouse.x * 0.4 - groupRef.current.position.x) * 0.04;
      groupRef.current.position.y += (mouse.y * 0.3 - groupRef.current.position.y) * 0.04;
    }
    if (pointsRef.current) {
      const geom = pointsRef.current.geometry as THREE.BufferGeometry;
      const arr = geom.attributes.position.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        const x = positions[i], y = positions[i + 1], z = positions[i + 2];
        const wave = Math.sin(t * 1.2 + (x + y + z) * 1.5) * 0.04;
        arr[i] = x * (1 + wave);
        arr[i + 1] = y * (1 + wave);
        arr[i + 2] = z * (1 + wave);
      }
      geom.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* inner glowing sphere */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.08} />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.018}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const AmbientParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 800;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#9aa8ff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
};

interface Props {
  className?: string;
}

export const ParticleScene = ({ className }: Props) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#7c5cff" />
        <pointLight position={[-3, -2, 2]} intensity={1} color="#39a8ff" />
        <AmbientParticles />
        <ParticleCore />
      </Canvas>
    </div>
  );
};

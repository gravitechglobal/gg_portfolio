"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

interface GlobeNodeData {
    id: string;
    label: string;
    lat: number;
    lng: number;
    color: string;
    targetSection: string;
}

const globeNodes: GlobeNodeData[] = [
    { id: "courses", label: "Courses", lat: 40, lng: -74, color: "#8B5CF6", targetSection: "#courses" },
    { id: "services", label: "IT Services", lat: 51.5, lng: -0.1, color: "#3B82F6", targetSection: "#services" },
    { id: "certs", label: "Certifications", lat: 35.7, lng: 139.7, color: "#06B6D4", targetSection: "#certifications" },
    { id: "about", label: "About Us", lat: -33.9, lng: 151.2, color: "#10B981", targetSection: "#contact" },
    { id: "cloud", label: "Cloud", lat: 1.35, lng: 103.8, color: "#F59E0B", targetSection: "#services" },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

function GlobeNode({ node, radius }: { node: GlobeNodeData; radius: number }) {
    const position = useMemo(
        () => latLngToVector3(node.lat, node.lng, radius),
        [node.lat, node.lng, radius]
    );

    const handleClick = () => {
        const target = document.querySelector(node.targetSection);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
                <mesh onClick={handleClick} onPointerEnter={() => { document.body.style.cursor = "pointer"; }} onPointerLeave={() => { document.body.style.cursor = "default"; }}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshStandardMaterial
                        color={node.color}
                        emissive={node.color}
                        emissiveIntensity={1.2}
                        toneMapped={false}
                    />
                </mesh>
                {/* Outer glow sphere */}
                <mesh>
                    <sphereGeometry args={[0.14, 16, 16]} />
                    <meshBasicMaterial
                        color={node.color}
                        transparent
                        opacity={0.15}
                    />
                </mesh>
                {/* Pulse ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.1, 0.16, 32]} />
                    <meshBasicMaterial
                        color={node.color}
                        transparent
                        opacity={0.25}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <Html
                    center
                    distanceFactor={6}
                    style={{
                        pointerEvents: "none",
                        userSelect: "none",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(5, 5, 16, 0.9)",
                            backdropFilter: "blur(12px)",
                            border: `1px solid ${node.color}60`,
                            borderRadius: 8,
                            padding: "5px 12px",
                            color: "white",
                            fontSize: 11,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            transform: "translateY(-28px)",
                            letterSpacing: "0.02em",
                            boxShadow: `0 0 15px ${node.color}30`,
                        }}
                    >
                        {node.label}
                    </div>
                </Html>
            </Float>
        </group>
    );
}

/* Grid lines on the globe surface */
function GlobeGridLines({ radius }: { radius: number }) {
    const linesRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (linesRef.current) {
            linesRef.current.rotation.y += delta * 0.08;
        }
    });

    const latLines = useMemo(() => {
        const lines: THREE.BufferGeometry[] = [];
        // Latitude lines every 30 degrees
        for (let lat = -60; lat <= 60; lat += 30) {
            const points: THREE.Vector3[] = [];
            for (let lng = 0; lng <= 360; lng += 2) {
                points.push(latLngToVector3(lat, lng, radius * 1.002));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            lines.push(geometry);
        }
        return lines;
    }, [radius]);

    const lngLines = useMemo(() => {
        const lines: THREE.BufferGeometry[] = [];
        // Longitude lines every 30 degrees
        for (let lng = 0; lng < 360; lng += 30) {
            const points: THREE.Vector3[] = [];
            for (let lat = -90; lat <= 90; lat += 2) {
                points.push(latLngToVector3(lat, lng, radius * 1.002));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            lines.push(geometry);
        }
        return lines;
    }, [radius]);

    return (
        <group ref={linesRef}>
            {latLines.map((geo, i) => (
                <line key={`lat-${i}`} geometry={geo}>
                    <lineBasicMaterial color="#6C63FF" transparent opacity={0.12} />
                </line>
            ))}
            {lngLines.map((geo, i) => (
                <line key={`lng-${i}`} geometry={geo}>
                    <lineBasicMaterial color="#6C63FF" transparent opacity={0.08} />
                </line>
            ))}
        </group>
    );
}

function GlobeMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.LineSegments>(null);
    const RADIUS = 2;

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.08;
        }
        if (wireRef.current) {
            wireRef.current.rotation.y += delta * 0.08;
        }
    });

    return (
        <group>
            {/* Main glass sphere — more visible */}
            <Sphere ref={meshRef} args={[RADIUS, 64, 64]}>
                <meshPhysicalMaterial
                    color="#1e1e5a"
                    transparent
                    opacity={0.25}
                    roughness={0.05}
                    metalness={0.3}
                    transmission={0.4}
                    thickness={0.8}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </Sphere>

            {/* Wireframe — icosahedron */}
            <lineSegments ref={wireRef}>
                <edgesGeometry
                    args={[new THREE.IcosahedronGeometry(RADIUS * 1.001, 4)]}
                />
                <lineBasicMaterial color="#8B83FF" transparent opacity={0.18} />
            </lineSegments>

            {/* Lat/Lng grid lines */}
            <GlobeGridLines radius={RADIUS} />

            {/* Inner core glow */}
            <Sphere args={[RADIUS * 0.6, 32, 32]}>
                <meshBasicMaterial
                    color="#6C63FF"
                    transparent
                    opacity={0.06}
                />
            </Sphere>

            {/* Surface glow */}
            <Sphere args={[RADIUS * 0.98, 32, 32]}>
                <meshBasicMaterial
                    color="#4a45b5"
                    transparent
                    opacity={0.08}
                />
            </Sphere>

            {/* Outer atmosphere glow — brighter */}
            <Sphere args={[RADIUS * 1.12, 32, 32]}>
                <meshBasicMaterial
                    color="#6C63FF"
                    transparent
                    opacity={0.07}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Second atmosphere ring */}
            <Sphere args={[RADIUS * 1.25, 32, 32]}>
                <meshBasicMaterial
                    color="#3B82F6"
                    transparent
                    opacity={0.03}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Equator ring accent */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[RADIUS * 1.003, 0.005, 8, 100]} />
                <meshBasicMaterial color="#6C63FF" transparent opacity={0.35} />
            </mesh>

            {/* Nodes */}
            {globeNodes.map((node) => (
                <GlobeNode key={node.id} node={node} radius={RADIUS * 1.02} />
            ))}
        </group>
    );
}

function GlobeLoading() {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: 48,
                    height: 48,
                    border: "2px solid var(--glass-border)",
                    borderTop: "2px solid var(--accent)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                }}
            />
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}

export default function GlobeScene() {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
        >
            <Suspense fallback={<GlobeLoading />}>
                <Canvas
                    camera={{ position: [0, 0, 5.5], fov: 45 }}
                    style={{ background: "transparent" }}
                    dpr={[1, 2]}
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: "high-performance",
                    }}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#6C63FF" />
                    <pointLight position={[-10, -5, 5]} intensity={0.5} color="#06B6D4" />
                    <pointLight position={[0, -10, 0]} intensity={0.3} color="#3B82F6" />

                    <GlobeMesh />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={false}
                        rotateSpeed={0.4}
                        dampingFactor={0.08}
                        enableDamping
                        minPolarAngle={Math.PI * 0.3}
                        maxPolarAngle={Math.PI * 0.7}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}

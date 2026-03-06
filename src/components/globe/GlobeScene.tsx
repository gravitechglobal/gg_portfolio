"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

/* ── Section Navigation Nodes ── */
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

/* ── World city data for dots ── */
interface CityData {
    name: string;
    lat: number;
    lng: number;
    pop: number; // population scale factor
}

const worldCities: CityData[] = [
    { name: "Tokyo", lat: 35.68, lng: 139.69, pop: 37400 },
    { name: "Delhi", lat: 28.64, lng: 77.21, pop: 30290 },
    { name: "Shanghai", lat: 31.23, lng: 121.47, pop: 27058 },
    { name: "São Paulo", lat: -23.55, lng: -46.63, pop: 22043 },
    { name: "Mumbai", lat: 19.08, lng: 72.88, pop: 20411 },
    { name: "Beijing", lat: 39.9, lng: 116.4, pop: 20384 },
    { name: "Cairo", lat: 30.04, lng: 31.24, pop: 20076 },
    { name: "Dhaka", lat: 23.81, lng: 90.41, pop: 21006 },
    { name: "Mexico City", lat: 19.43, lng: -99.13, pop: 21782 },
    { name: "Osaka", lat: 34.69, lng: 135.5, pop: 19281 },
    { name: "New York", lat: 40.71, lng: -74.01, pop: 18819 },
    { name: "Karachi", lat: 24.86, lng: 67.01, pop: 16094 },
    { name: "Istanbul", lat: 41.01, lng: 28.98, pop: 15190 },
    { name: "Buenos Aires", lat: -34.6, lng: -58.38, pop: 15154 },
    { name: "Kolkata", lat: 22.57, lng: 88.36, pop: 14850 },
    { name: "Lagos", lat: 6.52, lng: 3.38, pop: 14368 },
    { name: "Manila", lat: 14.6, lng: 120.98, pop: 13923 },
    { name: "Rio de Janeiro", lat: -22.91, lng: -43.17, pop: 13458 },
    { name: "Guangzhou", lat: 23.13, lng: 113.26, pop: 13301 },
    { name: "Los Angeles", lat: 34.05, lng: -118.24, pop: 12458 },
    { name: "Moscow", lat: 55.76, lng: 37.62, pop: 12410 },
    { name: "Shenzhen", lat: 22.54, lng: 114.06, pop: 12357 },
    { name: "London", lat: 51.51, lng: -0.13, pop: 9046 },
    { name: "Paris", lat: 48.86, lng: 2.35, pop: 10901 },
    { name: "Bangkok", lat: 13.76, lng: 100.5, pop: 10539 },
    { name: "Jakarta", lat: -6.21, lng: 106.85, pop: 10562 },
    { name: "Seoul", lat: 37.57, lng: 126.98, pop: 9963 },
    { name: "Lima", lat: -12.05, lng: -77.04, pop: 10391 },
    { name: "Taipei", lat: 25.03, lng: 121.57, pop: 7871 },
    { name: "Nairobi", lat: -1.29, lng: 36.82, pop: 4735 },
    { name: "Singapore", lat: 1.35, lng: 103.82, pop: 5686 },
    { name: "Sydney", lat: -33.87, lng: 151.21, pop: 5312 },
    { name: "Dubai", lat: 25.2, lng: 55.27, pop: 3331 },
    { name: "Toronto", lat: 43.65, lng: -79.38, pop: 6255 },
    { name: "Berlin", lat: 52.52, lng: 13.41, pop: 3645 },
    { name: "Madrid", lat: 40.42, lng: -3.7, pop: 6642 },
    { name: "Rome", lat: 41.9, lng: 12.5, pop: 4257 },
    { name: "Johannesburg", lat: -26.2, lng: 28.05, pop: 5783 },
    { name: "Hong Kong", lat: 22.32, lng: 114.17, pop: 7482 },
    { name: "Chicago", lat: 41.88, lng: -87.63, pop: 8865 },
    { name: "San Francisco", lat: 37.77, lng: -122.42, pop: 3318 },
    { name: "Bengaluru", lat: 12.97, lng: 77.59, pop: 12327 },
    { name: "Hyderabad", lat: 17.39, lng: 78.49, pop: 10269 },
    { name: "Kuala Lumpur", lat: 3.14, lng: 101.69, pop: 7996 },
    { name: "Santiago", lat: -33.45, lng: -70.67, pop: 6680 },
    { name: "Melbourne", lat: -37.81, lng: 144.96, pop: 5078 },
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

/* ── Clickable Section Node ── */
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
                <mesh
                    onClick={handleClick}
                    onPointerEnter={() => { document.body.style.cursor = "pointer"; }}
                    onPointerLeave={() => { document.body.style.cursor = "default"; }}
                >
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial
                        color={node.color}
                        emissive={node.color}
                        emissiveIntensity={1.5}
                        toneMapped={false}
                    />
                </mesh>
                {/* Glow sphere */}
                <mesh>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshBasicMaterial color={node.color} transparent opacity={0.2} />
                </mesh>
                {/* Pulse ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.08, 0.14, 32]} />
                    <meshBasicMaterial color={node.color} transparent opacity={0.3} side={THREE.DoubleSide} />
                </mesh>
                <Html
                    center
                    distanceFactor={6}
                    style={{ pointerEvents: "none", userSelect: "none" }}
                >
                    <div
                        style={{
                            background: "rgba(5, 5, 16, 0.92)",
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
                            boxShadow: `0 0 20px ${node.color}40`,
                        }}
                    >
                        {node.label}
                    </div>
                </Html>
            </Float>
        </group>
    );
}

/* ── City Dots rendered as instanced spheres ── */
function CityDots({ radius }: { radius: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const { matrices, colors } = useMemo(() => {
        const mats: THREE.Matrix4[] = [];
        const cols: Float32Array = new Float32Array(worldCities.length * 3);
        const color = new THREE.Color();

        worldCities.forEach((city, i) => {
            const pos = latLngToVector3(city.lat, city.lng, radius);
            const scale = Math.max(0.008, Math.sqrt(city.pop) * 0.00015);
            const matrix = new THREE.Matrix4();
            matrix.makeTranslation(pos.x, pos.y, pos.z);
            matrix.scale(new THREE.Vector3(scale, scale, scale));
            mats.push(matrix);

            // Orange-ish warm city glow
            color.setHSL(0.08 + Math.random() * 0.06, 0.9, 0.55 + (city.pop / 40000) * 0.3);
            cols[i * 3] = color.r;
            cols[i * 3 + 1] = color.g;
            cols[i * 3 + 2] = color.b;
        });

        return { matrices: mats, colors: cols };
    }, [radius]);

    useMemo(() => {
        if (!meshRef.current) return;
        matrices.forEach((mat, i) => {
            meshRef.current!.setMatrixAt(i, mat);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;

        // Set per-instance colors
        const colorAttr = new THREE.InstancedBufferAttribute(colors, 3);
        meshRef.current.instanceColor = colorAttr;
    }, [matrices, colors]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, worldCities.length]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
    );
}

/* ── Starry Sky Background ── */
function SkyBackground() {
    const skyTexture = useLoader(
        THREE.TextureLoader,
        "https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
    );
    return (
        <Sphere args={[50, 32, 32]}>
            <meshBasicMaterial map={skyTexture} side={THREE.BackSide} />
        </Sphere>
    );
}

/* ── Main Globe Mesh ── */
function GlobeMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const RADIUS = 2.2;

    // Load earth night texture
    const earthTexture = useLoader(
        THREE.TextureLoader,
        "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
    );

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.04;
        }
    });

    return (
        <group>
            {/* Textured Earth sphere */}
            <Sphere ref={meshRef} args={[RADIUS, 64, 64]}>
                <meshStandardMaterial
                    map={earthTexture}
                    roughness={0.6}
                    metalness={0.1}
                    emissiveMap={earthTexture}
                    emissive={new THREE.Color(0x336699)}
                    emissiveIntensity={1.2}
                />
            </Sphere>

            {/* Atmosphere glow */}
            <Sphere args={[RADIUS * 1.04, 64, 64]}>
                <meshBasicMaterial
                    color="#4488ff"
                    transparent
                    opacity={0.06}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Outer haze */}
            <Sphere args={[RADIUS * 1.15, 32, 32]}>
                <meshBasicMaterial
                    color="#6C63FF"
                    transparent
                    opacity={0.03}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* City dots */}
            <group rotation={[0, 0, 0]}>
                <CityDots radius={RADIUS * 1.005} />
            </group>

            {/* Section navigation nodes */}
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
                position: "absolute",
                inset: 0,
            }}
        >
            <Suspense fallback={<GlobeLoading />}>
                <Canvas
                    camera={{ position: [0, 0, 7], fov: 45 }}
                    style={{ background: "#000005" }}
                    dpr={[1, 2]}
                    gl={{
                        alpha: false,
                        antialias: true,
                        powerPreference: "high-performance",
                    }}
                >
                    <SkyBackground />
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
                    <pointLight position={[-10, -5, 5]} intensity={0.6} color="#06B6D4" />
                    <pointLight position={[0, -8, 5]} intensity={0.4} color="#3B82F6" />

                    <GlobeMesh />

                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.3}
                        rotateSpeed={0.5}
                        dampingFactor={0.1}
                        enableDamping
                        minDistance={4}
                        maxDistance={12}
                        minPolarAngle={Math.PI * 0.25}
                        maxPolarAngle={Math.PI * 0.75}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}

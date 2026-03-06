"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
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
    image: string;
    description: string;
    bullets: string[];
}

const globeNodes: GlobeNodeData[] = [
    {
        id: "courses", label: "Courses", lat: 40, lng: -74, color: "#8B5CF6", targetSection: "#courses",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop",
        description: "Interactive tech education",
        bullets: ["Full-stack development", "Cloud architecture", "AI/ML fundamentals"]
    },
    {
        id: "services", label: "IT Services", lat: 51.5, lng: -0.1, color: "#3B82F6", targetSection: "#services",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop",
        description: "Enterprise IT solutions",
        bullets: ["Cloud infrastructure", "Managed support", "Cybersecurity"]
    },
    {
        id: "certs", label: "Certifications", lat: 35.7, lng: 139.7, color: "#06B6D4", targetSection: "#certifications",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=200&auto=format&fit=crop",
        description: "Industry recognized",
        bullets: ["AWS & Azure certs", "CompTIA & Cisco", "Kubernetes admin"]
    },
    {
        id: "about", label: "About Us", lat: -33.9, lng: 151.2, color: "#10B981", targetSection: "#contact",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200&auto=format&fit=crop",
        description: "Empowering global tech",
        bullets: ["Global operations", "24/7 dedicated support", "Expert instructors"]
    },
    {
        id: "cloud", label: "Cloud", lat: 1.35, lng: 103.8, color: "#F59E0B", targetSection: "#services",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=200&auto=format&fit=crop",
        description: "Next-gen DevOps",
        bullets: ["Infrastructure as code", "CI/CD pipelines", "Kubernetes clusters"]
    },
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

/* ── Clickable Section Node (Beam + Interactive Hover Card) ── */
function GlobeNode({ node, radius, onHoverChange }: { node: GlobeNodeData; radius: number, onHoverChange: (val: boolean) => void }) {
    const [hovered, setHovered] = useState(false);

    // Position of the base of the node on the globe surface
    const position = useMemo(
        () => latLngToVector3(node.lat, node.lng, radius),
        [node.lat, node.lng, radius]
    );

    // Orientation: point local Y axis outwards along the surface normal
    const quaternion = useMemo(() => {
        const normal = position.clone().normalize();
        return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    }, [position]);

    const handleClick = () => {
        const target = document.querySelector(node.targetSection);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const BEAM_HEIGHT = 0.5;
    const BEAM_RADIUS = 0.008;
    const TIP_RADIUS = 0.05;

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "auto";
        }
    }, [hovered]);

    return (
        <group position={position} quaternion={quaternion}>
            {/* Intense Inner Beam Core */}
            <mesh position={[0, BEAM_HEIGHT / 2, 0]}>
                <cylinderGeometry args={[0.003, 0.015, BEAM_HEIGHT, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
            </mesh>

            {/* Glowing Mid Beam */}
            <mesh position={[0, BEAM_HEIGHT / 2, 0]}>
                <cylinderGeometry args={[0.008, 0.04, BEAM_HEIGHT, 16]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>

            {/* Subdued Outer Aura */}
            <mesh position={[0, BEAM_HEIGHT / 2, 0]}>
                <cylinderGeometry args={[0.02, 0.08, BEAM_HEIGHT, 16]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>

            {/* The Tip assembly (hover target) */}
            <group
                position={[0, BEAM_HEIGHT, 0]}
                onClick={handleClick}
                onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); onHoverChange(true); }}
                onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); onHoverChange(false); }}
            >
                {/* Invisible hit box for easier hovering */}
                <mesh visible={false}>
                    <sphereGeometry args={[TIP_RADIUS * 3, 16, 16]} />
                    <meshBasicMaterial />
                </mesh>

                {/* Inner glowing sphere at tip */}
                <mesh>
                    <sphereGeometry args={[TIP_RADIUS * 0.4, 16, 16]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>

                {/* Outer glowing aura at tip */}
                <mesh>
                    <sphereGeometry args={[TIP_RADIUS * 1.5, 16, 16]} />
                    <meshBasicMaterial color={node.color} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>

                {/* Hover disc ring (facing upwards relative to the beam) */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[TIP_RADIUS * 1.5, TIP_RADIUS * 1.8, 32]} />
                    <meshBasicMaterial color={node.color} side={THREE.DoubleSide} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>

                {/* Html Overlay */}
                <Html
                    center
                    distanceFactor={8}
                    style={{
                        pointerEvents: hovered ? "auto" : "none",
                        userSelect: "none"
                    }}
                    zIndexRange={[100, 0]}
                >
                    <div
                        style={{
                            background: hovered ? "rgba(4, 4, 12, 0.85)" : "transparent",
                            backdropFilter: hovered ? "blur(16px)" : "none",
                            border: hovered ? `1px solid ${node.color}60` : "none",
                            borderRadius: "16px",
                            padding: hovered ? "16px" : "0",
                            color: "white",
                            transform: "translate(20px, -20px)",
                            letterSpacing: "0.02em",
                            boxShadow: hovered ? `0 8px 32px ${node.color}30` : "none",
                            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            opacity: 1,
                            width: hovered ? "280px" : "auto",
                        }}
                    >
                        {/* Always show the simple label when not hovered */}
                        {!hovered && (
                            <div style={{
                                background: "rgba(5, 5, 16, 0.92)",
                                border: `1px solid ${node.color}60`,
                                borderRadius: 8,
                                padding: "4px 10px",
                                fontSize: 11,
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                boxShadow: `0 0 15px ${node.color}40`,
                            }}>
                                {node.label}
                            </div>
                        )}

                        {/* Rich content shown only on hover */}
                        {hovered && (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={node.image}
                                    alt={node.label}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: `2px solid ${node.color}80`,
                                        flexShrink: 0
                                    }}
                                />
                                <div style={{ flex: 1, textAlign: "left" }}>
                                    <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "white", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: node.color, boxShadow: `0 0 8px ${node.color}` }} />
                                        {node.label}
                                    </h4>
                                    <p style={{ margin: 0, fontSize: "10px", color: "var(--text-muted)", marginBottom: "8px", lineHeight: 1.3 }}>
                                        {node.description}
                                    </p>
                                    <ul style={{ margin: 0, paddingLeft: "14px", fontSize: "10px", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "3px" }}>
                                        {node.bullets.map(b => (
                                            <li key={b} style={{ listStyleType: "circle" }}>{b}</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </Html>
            </group >
        </group >
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
function GlobeMesh({ onHoverChange }: { onHoverChange: (val: boolean) => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const RADIUS = 2.2;

    // Load earth blue marble texture — continents clearly visible
    const earthTexture = useLoader(
        THREE.TextureLoader,
        "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
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
                <GlobeNode key={node.id} node={node} radius={RADIUS * 1.02} onHoverChange={onHoverChange} />
            ))}
        </group>
    );
}

/* ── Auto Zoom Camera Animation ── */
function CameraAutoZoom() {
    const { camera } = useThree();
    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += delta;
        // Smooth sine wave for zoom. Default zoom is 1.0.
        // Oscillates between 1.0 and 1.25 (which looks like 80% of original view)
        const z = 1.125 + Math.sin(timeRef.current * 0.3) * 0.125;

        if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
            const pc = camera as THREE.PerspectiveCamera;
            pc.zoom = z;
            pc.updateProjectionMatrix();
        }
    });

    return null;
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
    const [isGlobeHovered, setIsGlobeHovered] = useState(false);

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

                    <GlobeMesh onHoverChange={setIsGlobeHovered} />
                    <CameraAutoZoom />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={!isGlobeHovered}
                        autoRotateSpeed={0.3}
                        rotateSpeed={0.5}
                        dampingFactor={0.1}
                        enableDamping
                        minPolarAngle={Math.PI * 0.25}
                        maxPolarAngle={Math.PI * 0.75}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}
